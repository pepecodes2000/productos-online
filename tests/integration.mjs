// Isolated local API test. All upstream Meta calls mocked, never real credentials.
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import assert from 'node:assert/strict'
const root = fileURLToPath(new URL('../', import.meta.url))
const tmp = await mkdtemp(path.join(tmpdir(), 'meta-test-'))
const origin = 'http://127.0.0.1:3107'
const env = { ...process.env, META_TRACKING_ENABLED: 'true', META_SIGNING_SECRET: 'local-only-test-secret-12345678901234567890', META_GRAPH_API_VERSION: 'v26.0', META_DEV_MEMORY_STORE: 'true', META_TEST_CAPTURE: path.join(tmp, 'capture.jsonl'), NODE_OPTIONS: '--require ' + path.join(root, 'tests/mock-meta.cjs') }
const paths = ['autocad_master', 'cafeteria_en_casa', 'mundo_estetico', 'velas_artesanales']
for (const [i, p] of ['AUTOCAD', 'CAFETERIA', 'MUNDO', 'VELAS'].entries()) {
  env[`META_${p}_PIXEL_ID`] = String(100000 + i); env[`META_${p}_ACCESS_TOKEN`] = 'INTEGRATION_FAKE_SECRET_' + p; env[`META_${p}_ORIGINS`] = origin
}
const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'dev', '--hostname', '127.0.0.1', '--port', '3107'], { cwd: root, env, stdio: ['ignore', 'pipe', 'pipe'] })
let logs = ''; child.stdout.on('data', d => logs += d); child.stderr.on('data', d => logs += d)
try {
  await new Promise((resolve, reject) => { let n = 0; const timer = setInterval(() => { if (logs.includes('Ready')) { clearInterval(timer); resolve() } else if (child.exitCode !== null || n++ > 300) { clearInterval(timer); reject(new Error(logs)) } }, 100) })
  async function post (body, cookie = '', requestOrigin = origin) {
    const r = await fetch(origin + '/api/meta', { method: 'POST', headers: { Origin: requestOrigin, 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}) }, body: JSON.stringify(body) })
    const result = await r.json(); assert(!JSON.stringify(result).includes('INTEGRATION_FAKE_SECRET'))
    return { status: r.status, body: result, cookie: r.headers.get('set-cookie')?.split(';')[0] }
  }
  for (const [i, p] of paths.entries()) {
    const source = origin + '/' + p
    assert.equal((await post({ action: 'config', source })).status, 403)
    const grant = await post({ action: 'consent', source, granted: true }); assert.equal(grant.status, 200); assert.equal(grant.body.pixel, String(100000 + i))
    const payload = { action: 'event', source, context: grant.body.context, event: { name: 'PageView', id: 'http-test-' + i, time: Math.floor(Date.now() / 1000) } }
    assert.equal((await post(payload)).status, 403)
    const result = await post(payload, grant.cookie); assert.equal(result.status, 200); assert.equal(result.body.processed, false)
    assert.equal((await post(payload, grant.cookie)).status, 202)
    for (const name of ['Purchase', 'Lead', 'InitiateCheckout']) assert.equal((await post({ ...payload, event: { ...payload.event, name } }, grant.cookie)).status, 400)
    assert.equal((await post({ ...payload, source: origin + '/' + paths[(i + 1) % 4] }, grant.cookie)).status, 403)
    assert.equal((await post(payload, grant.cookie, 'https://evil.example')).status, 400)
    assert.equal((await post({ ...payload, context: 'tampered' }, grant.cookie)).status, 403)
    assert.equal((await post({ ...payload, padding: 'x'.repeat(9000) }, grant.cookie)).status, 400)
    const revoke = await post({ action: 'consent', source, granted: false }, grant.cookie); assert.equal(revoke.status, 200); assert.equal(revoke.cookie, 'meta_marketing_consent=')
    assert.equal((await post(payload, grant.cookie)).status, 403)
    console.log(p + ': correct pixel, consent/context, mocked delivery, replay, cross-business, false conversions, revocation PASS')
  }
  const captured = (await readFile(env.META_TEST_CAPTURE, 'utf8')).trim().split('\n').map(JSON.parse)
  assert.equal(captured.length, 4)
  for (const [i, row] of captured.entries()) {
    assert.equal(row.url, `https://graph.facebook.com/v26.0/${100000 + i}/events`)
    assert.equal(row.data[0].event_id, 'http-test-' + i); assert.equal(row.data[0].event_source_url, origin + '/' + paths[i])
  }
  console.log('4 upstream deliveries, independently routed; no replay delivery PASS')
} catch (error) { console.error(logs); throw error } finally {
  child.kill('SIGTERM'); await Promise.race([once(child, 'exit'), new Promise(r => { const t = setTimeout(r, 3000); t.unref() })])
  await rm(tmp, { recursive: true, force: true })
}
