import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { definitions, resolveBusiness, safeSource } from '../lib/meta/config.mjs'
import { signContext, verifyContext, validateEvent, hashUser, sendMeta, attribution } from '../lib/meta/core.mjs'
import { claim, finish, rateLimit, consentSession } from '../lib/meta/store.mjs'
const env = {}
for (const [i, b] of definitions.entries()) { env[`META_${b.prefix}_ORIGINS`] = 'https://example.com'; env[`META_${b.prefix}_PIXEL_ID`] = String(100000 + i) }
const base = { name: 'PageView', id: 'unique-id-1234', time: Math.floor(Date.now() / 1000) }
test('Each real landing resolves independently, no prefix collisions', () => {
  for (const [i, b] of definitions.entries()) {
    assert.equal(resolveBusiness('https://example.com' + b.path, env).pixel, String(100000 + i))
    assert.equal(resolveBusiness('https://example.com' + b.path + '/next', env).key, b.key)
    assert.throws(() => resolveBusiness('https://example.com' + b.path + '-other', env))
  }
  assert.throws(() => resolveBusiness('https://evil.com/autocad_master', env))
  assert.throws(() => resolveBusiness('https://example.com/unknown', env))
})
test('Host mapping and ambiguous routes fail closed', () => {
  const e = { ...env, META_AUTOCAD_ORIGINS: 'https://autocad.example', META_AUTOCAD_PATHS: '/' }
  assert.equal(resolveBusiness('https://autocad.example/', e).key, 'autocad')
  assert.throws(() => resolveBusiness('https://example.com/cafeteria_en_casa', { ...env, META_AUTOCAD_PATHS: '/' }))
})
test('Source strips queries and fragments (PII)', () => assert.equal(safeSource('https://example.com/autocad_master?email=x#x'), 'https://example.com/autocad_master'))
test('Signed context rejects tampering and expiry', () => {
  const secret = 'a'.repeat(64); const payload = { sid: '123', exp: Date.now() + 10000 }
  const token = signContext(payload, secret)
  assert.deepEqual(verifyContext(token, secret), payload)
  assert.throws(() => verifyContext(token + 'x', secret))
  assert.throws(() => verifyContext(token, secret, Date.now() + 20000))
  assert.throws(() => verifyContext(token, 'wrong'.repeat(10)))
})
test('All six standard events preserve shared dedup ID/name; conversion events server only', () => {
  for (const name of ['PageView', 'ViewContent', 'Contact', 'Lead', 'InitiateCheckout', 'Purchase']) {
    const e = validateEvent({ ...base, name, value: 5.99, currency: 'USD' }, true)
    assert.equal(e.event_id, base.id); assert.equal(e.event_name, name)
    if (['Lead', 'InitiateCheckout', 'Purchase'].includes(name)) assert.throws(() => validateEvent({ ...base, name }))
  }
})
test('Malformed ids, old timestamps and currency rejected', () => {
  assert.throws(() => validateEvent({ ...base, id: 'bad' }))
  assert.throws(() => validateEvent({ ...base, time: 1 }))
  assert.throws(() => validateEvent({ ...base, name: 'Purchase', value: -1, currency: 'USD' }, true))
  assert.throws(() => validateEvent({ ...base, name: 'Purchase', value: 1, currency: 'usd' }, true))
  assert.equal(validateEvent({ ...base, name: 'Contact' }).custom_data.contact_method, 'whatsapp_link_click')
})
test('Email/phone normalized then hashed; unknown PII excluded', () => {
  const u = hashUser({ email: ' TEST@Example.COM ', phone: '+593 98-123-4567', address: 'not supported' })
  assert.equal(u.em[0], createHash('sha256').update('test@example.com').digest('hex'))
  assert.equal(u.ph[0], createHash('sha256').update('593981234567').digest('hex'))
  assert.equal(u.address, undefined); assert.throws(() => hashUser({ phone: '0981234567' }))
})
test('fbp/fbc validated and never hashed', () => {
  const fbc = 'fb.1.1760000000000.Click_123'; assert.equal(attribution(fbc, 'fbc'), fbc)
  assert.equal(attribution('<script>', 'fbp'), undefined)
})
test('CAPI dispatch uses server-selected dataset and token; HTTP 200 alone insufficient', async () => {
  const b = { pixel: '123456', token: 'test-private-token' }
  const config = { META_GRAPH_API_VERSION: 'v26.0' }
  const result = await sendMeta(b, validateEvent(base), async (url, options) => {
    assert.equal(url, 'https://graph.facebook.com/v26.0/123456/events'); assert(!url.includes(b.token))
    assert.equal(options.headers.Authorization, 'Bearer ' + b.token)
    assert.equal(JSON.parse(options.body).data[0].event_id, base.id)
    return { ok: true, json: async () => ({ events_received: 1 }) }
  }, config)
  assert.deepEqual(result, { status: 'received_by_meta', processed: false })
  for (const body of [{}, { events_received: 0 }, { error: { message: 'private' } }]) {
    await assert.rejects(() => sendMeta(b, {}, async () => ({ ok: true, json: async () => body }), config))
  }
  await assert.rejects(() => sendMeta(b, {}, async () => ({ ok: false, json: async () => ({ events_received: 1 }) }), config))
  await assert.rejects(() => sendMeta(b, {}, async () => { throw new Error('timeout') }, config))
})
test('Atomic idempotency: concurrent event claimed once, failure retry, completed replay blocked', async () => {
  process.env.META_DEV_MEMORY_STORE = 'true'
  const results = await Promise.all(Array.from({ length: 10 }, () => claim('same-event')))
  assert.equal(results.filter(Boolean).length, 1)
  await finish('same-event', results.find(Boolean), false)
  const next = await claim('same-event'); assert(next)
  await finish('same-event', next, true); assert.equal(await claim('same-event'), null)
  assert.equal(await rateLimit('rate-test', 1), true); assert.equal(await rateLimit('rate-test', 1), false)
})
test('Production never falls back to process-local abuse controls', async () => {
  const previous = process.env.NODE_ENV; process.env.NODE_ENV = 'production'
  try { await assert.rejects(() => rateLimit('production')) } finally { process.env.NODE_ENV = previous }
})
test('Legacy pixel loaders removed from layouts; all share the provider', () => {
  for (const name of ['autocad_master/layout.jsx', 'cafeteria_en_casa/layout.tsx', 'mundo_estetico/layout.jsx', 'velas_artesanales/layout.tsx']) {
    const source = readFileSync(new URL('../app/' + name, import.meta.url), 'utf8')
    assert(source.includes('<MetaTracking')); assert(!source.includes('fbq(')); assert(!source.includes('facebook.com/tr'))
  }
  const client = readFileSync(new URL('../components/meta/MetaTracking.jsx', import.meta.url), 'utf8')
  assert(!client.includes('ACCESS_TOKEN')); assert(!client.includes('/config.mjs')); assert(client.includes('trackSingle'))
})

test('Server-side withdrawal invalidates copied consent session', async () => {
  process.env.META_DEV_MEMORY_STORE = 'true'
  assert.equal(await consentSession('test-session', 'grant'), true)
  assert.equal(await consentSession('test-session'), true)
  await consentSession('test-session', 'revoke')
  assert.equal(await consentSession('test-session'), false)
})
