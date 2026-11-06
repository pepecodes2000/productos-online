import { NextRequest, NextResponse } from 'next/server';
import { randomUUID, createHash } from 'node:crypto';
import { isIP } from 'node:net';
import { resolveBusiness, safeSource } from '../../../lib/meta/config.mjs';
import { signContext, verifyContext, validateEvent, attribution } from '../../../lib/meta/core.mjs';
import { rateLimit, consentSession } from '../../../lib/meta/store.mjs';
import { deliver } from '../../../lib/meta/server';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const cookieName = 'meta_marketing_consent';
const reply = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

async function readBody(request: NextRequest) {
  if (!request.headers.get('content-type')?.startsWith('application/json')) throw new Error('Body');
  const reader = request.body?.getReader(); if (!reader) throw new Error('Body');
  const chunks: Uint8Array[] = []; let size = 0;
  while (true) {
    const { value, done } = await reader.read(); if (done) break;
    size += value.byteLength; if (size > 8192) { await reader.cancel(); throw new Error('Body too large'); }
    chunks.push(value);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}
export async function POST(request: NextRequest) {
  if (process.env.META_TRACKING_ENABLED !== 'true') return reply({ status: 'disabled' }, 503);
  let body; let business; let source: string; let origin: string;
  try {
    body = await readBody(request);
    origin = request.headers.get('origin') || '';
    const sourceURL = new URL(body.source);
    if (origin !== sourceURL.origin || request.headers.get('sec-fetch-site') === 'cross-site') throw new Error('Origin');
    business = resolveBusiness(body.source);
    source = safeSource(body.source);
  } catch { return reply({ error: 'invalid_request' }, 400); }
  // Only trust Vercel's overwritten forwarding header on Vercel. Else use one
  // shared conservative bucket; configure your reverse proxy before changing it.
  const candidate = process.env.VERCEL === '1' ? request.headers.get('x-vercel-forwarded-for')?.split(',')[0].trim() : '';
  const ip = candidate && isIP(candidate) ? candidate : undefined;
  const key = createHash('sha256').update(ip || 'shared-local').digest('hex');
  try { if (!(body.action === 'consent' && body.granted === false) && !await rateLimit(`meta:rate:${business.key}:${key}`)) return reply({ error: 'rate_limited' }, 429); }
  catch { return reply({ error: 'protection_unavailable' }, 503); }
  const secret = process.env.META_SIGNING_SECRET || '';
  const secure = new URL(origin).protocol === 'https:';
  if (body.action === 'consent' && body.granted === false) {
    try {
      const old = request.cookies.get(cookieName)?.value;
      if (old) {
        let session; try { session = verifyContext(old, secret); } catch { session = null; }
        if (session?.origin === origin) await consentSession(session.sid, 'revoke');
      }
    } catch { return reply({ error: 'protection_unavailable' }, 503); }
    const response = reply({ status: 'revoked' });
    response.cookies.set(cookieName, '', { httpOnly: true, secure, sameSite: 'strict', path: '/', maxAge: 0 });
    return response;
  }
  try {
    let consent;
    try { consent = verifyContext(request.cookies.get(cookieName)?.value, secret); } catch { consent = null; }
    if (body.action === 'consent' && body.granted === true) {
      // This request is issued only by the explicit consent UI/CMP bridge.
      if (consent?.origin === origin) await consentSession(consent.sid, 'revoke');
      consent = { sid: randomUUID(), origin, exp: Date.now() + 180 * 86400000 };
      await consentSession(consent.sid, 'grant');
    }
    if (!consent || consent.origin !== origin || !await consentSession(consent.sid)) return reply({ error: 'consent_required' }, 403);
    if (body.action === 'config' || body.action === 'consent') {
      const context = signContext({ sid: consent.sid, source, business: business.key, exp: Date.now() + 30 * 60000 }, secret);
      const response = reply({ pixel: business.pixel, business: business.key, product: business.product, context });
      if (body.action === 'consent') response.cookies.set(cookieName, signContext(consent, secret), {
        httpOnly: true, secure, sameSite: 'strict', path: '/', maxAge: 180 * 86400,
      });
      return response;
    }
    if (body.action !== 'event') return reply({ error: 'invalid_action' }, 400);
    let context;
    try { context = verifyContext(body.context, secret); } catch { return reply({ error: 'invalid_context' }, 403); }
    if (context.sid !== consent.sid || context.source !== source || context.business !== business.key) return reply({ error: 'invalid_context' }, 403);
    let event;
    try { event = validateEvent(body.event); } catch { return reply({ error: 'invalid_event' }, 400); }
    const result = await deliver(business, { ...event, event_source_url: source,
      custom_data: { ...(event.event_name === 'PageView' ? {} : business.product), ...event.custom_data },
      user_data: {
        ...(ip ? { client_ip_address: ip } : {}),
        client_user_agent: (request.headers.get('user-agent') || '').slice(0, 512),
        fbp: attribution(body.fbp, 'fbp'), fbc: attribution(body.fbc, 'fbc'),
      },
    });
    return reply(result, result.status === 'duplicate_or_inflight' ? 202 : 200);
  } catch { return reply({ error: 'tracking_unavailable' }, 503); }
}
