import { createHash, createHmac, timingSafeEqual } from 'node:crypto'
export const browserEvents = ['PageView', 'ViewContent', 'Contact', 'CheckoutLinkClick', 'WhatsAppClick']
export const serverEvents = [...browserEvents, 'Lead', 'InitiateCheckout', 'Purchase']
export function signContext (payload, secret) {
  if (!secret || secret.length < 32) throw new Error('Signing secret missing')
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url')
  return data + '.' + createHmac('sha256', secret).update(data).digest('base64url')
}
export function verifyContext (token, secret, now = Date.now()) {
  if (typeof token !== 'string' || token.length > 4096) throw new Error('Invalid context')
  const [data, signature, extra] = token.split('.')
  if (extra || !data || !signature) throw new Error('Invalid context')
  const expected = signContext(JSON.parse(Buffer.from(data, 'base64url').toString()), secret).split('.')[1]
  const a = Buffer.from(signature); const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) throw new Error('Invalid signature')
  const payload = JSON.parse(Buffer.from(data, 'base64url').toString())
  if (!Number.isFinite(payload.exp) || payload.exp < now) throw new Error('Expired context')
  return payload
}
export function validateEvent (input, internal = false, now = Math.floor(Date.now() / 1000)) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Invalid event')
  const allowed = internal ? serverEvents : browserEvents
  if (!allowed.includes(input.name) || !/^[A-Za-z0-9:_-]{8,128}$/.test(input.id || '')) throw new Error('Invalid event name/id')
  if (!Number.isInteger(input.time) || input.time > now + 60 || input.time < now - (internal ? 604800 : 3600)) throw new Error('Invalid event time')
  const data = {}
  if (input.name === 'Contact') data.contact_method = 'whatsapp_link_click'
  if (['Contact', 'CheckoutLinkClick', 'WhatsAppClick'].includes(input.name) && input.placement !== undefined) {
    if (typeof input.placement !== 'string' || !/^[\p{L}\p{N}_ -]{1,80}$/u.test(input.placement)) throw new Error('Invalid placement')
    data.placement = input.placement
  }
  if (internal && ['Purchase', 'InitiateCheckout'].includes(input.name)) {
    if (!Number.isFinite(input.value) || input.value < 0 || !/^[A-Z]{3}$/.test(input.currency || '')) throw new Error('Invalid amount')
    data.value = input.value; data.currency = input.currency
  }
  return { event_name: input.name, event_id: input.id, event_time: input.time, action_source: 'website', custom_data: data }
}
const hash = s => createHash('sha256').update(s).digest('hex')
export function hashUser (user = {}) {
  const out = {}
  if (user.email != null) {
    const email = String(user.email).trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) throw new Error('Invalid email')
    out.em = [hash(email)]
  }
  if (user.phone != null) {
    // Require explicit international prefix: never guess a country.
    if (!/^\+[1-9][\d ()-]{6,24}$/.test(user.phone)) throw new Error('International phone required')
    const phone = user.phone.replace(/\D/g, '')
    if (phone.length < 7 || phone.length > 15) throw new Error('Invalid phone')
    out.ph = [hash(phone)]
  }
  if (user.externalId != null) {
    if (typeof user.externalId !== 'string' || !user.externalId.trim() || user.externalId.length > 256) throw new Error('Invalid external id')
    out.external_id = [hash(user.externalId.trim())]
  }
  return out
}
export function attribution (value, kind) {
  if (typeof value !== 'string' || value.length > 512) return undefined
  return (kind === 'fbp' ? /^fb\.\d\.\d{10,16}\.\d+$/ : /^fb\.\d\.\d{10,16}\.[A-Za-z0-9_-]+$/).test(value) ? value : undefined
}
export async function sendMeta (business, event, fetcher = fetch, env = process.env) {
  const version = env.META_GRAPH_API_VERSION
  if (!/^v\d+\.0$/.test(version || '') || !business.token) throw new Error('Meta configuration missing')
  const response = await fetcher(`https://graph.facebook.com/${version}/${business.pixel}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${business.token}` },
    body: JSON.stringify({ data: [event], ...(business.testCode ? { test_event_code: business.testCode } : {}) }),
    signal: AbortSignal.timeout(8000),
    cache: 'no-store'
  })
  const body = await response.json()
  if (!response.ok || body.error || body.events_received !== 1) {
    // Do not include upstream message, request, access token, or personal data.
    throw new Error('Meta did not acknowledge event')
  }
  return { status: 'received_by_meta', processed: false }
}
