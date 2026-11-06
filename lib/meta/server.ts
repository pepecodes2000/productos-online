import 'server-only';
import { resolveBusiness, safeSource } from './config.mjs';
import { validateEvent, hashUser, sendMeta, attribution } from './core.mjs';
import { claim, finish } from './store.mjs';
import { isIP } from 'node:net';

export async function deliver(business: ReturnType<typeof resolveBusiness>, event: Record<string, unknown>) {
  const key = `meta:event:${business.key}:${business.pixel}:${event.event_name}:${event.event_id}`;
  const token = await claim(key);
  if (!token) return { status: 'duplicate_or_inflight', processed: false };
  try {
    const result = await sendMeta(business, event);
    await finish(key, token, true);
    return result;
  } catch {
    await finish(key, token, false);
    throw new Error('Delivery unavailable');
  }
}

// TRUSTED SERVER CALLERS ONLY. Call after verifying and persisting the actual
// registration, checkout or payment in your backend. NOT a webhook verifier.
// sourceUrl and marketingConsent must come from the saved attribution record,
// never directly from an unverified webhook/request. Stable id per transaction.
export async function trackVerifiedConversion(input: {
  sourceUrl: string; marketingConsent: boolean;
  name: 'Lead' | 'InitiateCheckout' | 'Purchase'; id: string; time: number;
  value?: number; currency?: string;
  user?: { email?: string; phone?: string; externalId?: string };
  fbp?: string; fbc?: string; ip?: string; userAgent?: string;
}) {
  if (process.env.META_TRACKING_ENABLED !== 'true' || !input.marketingConsent) return { status: 'disabled' };
  const business = resolveBusiness(input.sourceUrl);
  const event = validateEvent(input, true);
  return deliver(business, { ...event, event_source_url: safeSource(input.sourceUrl),
    custom_data: { ...business.product, ...event.custom_data },
    user_data: { ...hashUser(input.user), fbp: attribution(input.fbp, 'fbp'), fbc: attribution(input.fbc, 'fbc'),
      ...(input.ip && isIP(input.ip) ? { client_ip_address: input.ip } : {}),
      ...(input.userAgent ? { client_user_agent: input.userAgent.slice(0, 512) } : {}),
    },
  });
}
