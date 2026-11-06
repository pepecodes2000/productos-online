import { randomUUID } from 'node:crypto';
// Redis REST (Upstash compatible): shared atomic controls for Vercel instances.
const memory = new Map();
export async function redis(command) {
  if (!process.env.META_REDIS_REST_URL || !process.env.META_REDIS_REST_TOKEN) throw new Error('Shared store not configured');
  const response = await fetch(process.env.META_REDIS_REST_URL, {
    method: 'POST', headers: { Authorization: `Bearer ${process.env.META_REDIS_REST_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command), signal: AbortSignal.timeout(3000), cache: 'no-store',
  });
  const result = await response.json();
  if (!response.ok || result.error) throw new Error('Shared store unavailable');
  return result.result;
}
const memoryEnabled = () => process.env.NODE_ENV !== 'production' && process.env.META_DEV_MEMORY_STORE === 'true';
function prune() { for (const [k, v] of memory) if (v.expires < Date.now()) memory.delete(k); }
export async function rateLimit(key, max = 100) {
  if (memoryEnabled()) {
    prune(); const v = memory.get(key) || { count: 0, expires: Date.now() + 60000 }; v.count++; memory.set(key, v); return v.count <= max;
  }
  const n = await redis(['EVAL', "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],60) end; return n", 1, key]);
  return Number(n) <= max;
}
export async function claim(key) {
  const token = randomUUID();
  if (memoryEnabled()) { prune(); if (memory.has(key)) return null; memory.set(key, { token, expires: Date.now() + 120000 }); return token; }
  return await redis(['SET', key, token, 'EX', 120, 'NX']) === 'OK' ? token : null;
}
export async function finish(key, token, success) {
  if (memoryEnabled()) { if (memory.get(key)?.token === token) { if (success) memory.set(key, { token: 'done', expires: Date.now() + 7 * 86400000 }); else memory.delete(key); } return; }
  await redis(['EVAL', success
    ? "if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('SET',KEYS[1],'done','EX',604800) end; return 0"
    : "if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('DEL',KEYS[1]) end; return 0", 1, key, token]);
}
// Consent sessions are revocable server-side, not just deleted in the browser.
export async function consentSession(sid, action = 'read') {
  const key = `meta:consent:${sid}`;
  if (memoryEnabled()) {
    prune();
    if (action === 'grant') { memory.set(key, { expires: Date.now() + 180 * 86400000 }); return true; }
    if (action === 'revoke') { memory.delete(key); return false; }
    return memory.has(key);
  }
  if (action === 'grant') { await redis(['SET', key, '1', 'EX', 180 * 86400]); return true; }
  if (action === 'revoke') { await redis(['DEL', key]); return false; }
  return await redis(['GET', key]) === '1';
}
