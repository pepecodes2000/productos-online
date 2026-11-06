// Requires a dev server with tests/mock-meta.cjs preload and fake credentials.
// All third-party browser requests are blocked. Never sends real Meta events.
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
const require = createRequire(import.meta.url)
const { chromium } = process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES
  ? require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES + '/playwright')
  : await import('playwright')
const browser = await chromium.launch({ headless: true, executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || chromium.executablePath(), args: ['--no-sandbox'] })
const base = 'http://localhost:3000'
const summary = []
try {
  for (const [i, route] of ['autocad_master', 'cafeteria_en_casa', 'mundo_estetico', 'velas_artesanales'].entries()) {
    const context = await browser.newContext()
    await context.route('**/*', async r => {
      if (r.request().url().startsWith(base)) return r.continue()
      if (r.request().url().includes('fbevents.js')) return r.fulfill({ contentType: 'application/javascript', body: '/* test stub: fbq queue is inspected */' })
      return r.abort()
    })
    const page = await context.newPage(); const posts = []
    page.on('request', r => { if (r.url().endsWith('/api/meta')) { const p = r.postDataJSON(); if (p.action === 'event')posts.push(p) } })
    await page.goto(base + '/' + route)
    await page.getByRole('button', { name: 'Aceptar', exact: true }).waitFor()
    assert.equal(await page.evaluate(() => typeof window.fbq), 'undefined')
    assert.equal(posts.length, 0)
    const viewResponse = page.waitForResponse(r => r.url().endsWith('/api/meta') && r.request().postDataJSON()?.event?.name === 'ViewContent' && r.status() === 200)
    await page.getByRole('button', { name: 'Aceptar', exact: true }).click()
    await page.waitForFunction(() => window.fbq?.queue?.filter(q => q[0] === 'trackSingle').length === 2)
    await viewResponse
    const calls = await page.evaluate(() => window.fbq.queue)
    assert.deepEqual(calls.filter(q => q[0] === 'init').map(q => q[1]), [String(100000 + i)])
    for (const event of ['PageView', 'ViewContent']) {
      const pixel = calls.find(q => q[2] === event); const capi = posts.filter(p => p.event.name === event)
      assert.equal(capi.length, 1); assert.equal(pixel[4].eventID, capi[0].event.id)
    }
    // Query/hash changes do not count as another content page.
    await page.evaluate(() => history.pushState(null, '', location.pathname + '?preview=1#test'))
    await page.waitForTimeout(100)
    assert.equal(posts.filter(p => p.event.name === 'PageView').length, 1)
    if (route === 'autocad_master') {
      const contactResponse = page.waitForResponse(r => r.url().endsWith('/api/meta') && r.request().postDataJSON()?.event?.name === 'Contact')
      await page.locator('a[href*="chat.whatsapp.com"]').first().click()
      await contactResponse
      assert.equal(posts.filter(p => p.event.name === 'Contact').length, 1)
      assert.equal(posts.filter(p => ['Lead', 'Purchase', 'InitiateCheckout'].includes(p.event.name)).length, 0)
      const prior = posts[0]
      const checks = await page.evaluate(async p => {
        const send = async body => { const r = await fetch('/api/meta', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }); return { status: r.status, body: await r.json() } }
        return { purchase: await send({ ...p, event: { ...p.event, name: 'Purchase' } }), replay: await send(p), cross: await send({ ...p, source: location.origin + '/mundo_estetico' }) }
      }, prior)
      assert.equal(checks.purchase.status, 400); assert.equal(checks.cross.status, 403); assert.equal(checks.replay.status, 202)
      assert.equal(checks.replay.body.status, 'duplicate_or_inflight')
    }
    const revokeResponse = page.waitForResponse(r => r.url().endsWith('/api/meta') && r.request().postDataJSON()?.granted === false)
    await page.getByRole('button', { name: 'Retirar permiso de Meta' }).click()
    await revokeResponse
    const before = posts.length
    await page.evaluate(() => window.dispatchEvent(new CustomEvent('meta:track', { detail: { name: 'Contact' } })))
    await page.waitForTimeout(100); assert.equal(posts.length, before)
    assert(!(await context.cookies()).some(c => c.name === 'meta_marketing_consent'))
    summary.push(route + ': consent, isolated Pixel, shared ids, no duplicate PageView, withdrawal PASS')
    await context.close()
  }
  const c = await browser.newContext()
  await c.addInitScript(() => Object.defineProperty(navigator, 'globalPrivacyControl', { value: true }))
  await c.route('**/*', r => r.request().url().startsWith(base) ? r.continue() : r.abort())
  const p = await c.newPage(); await p.goto(base + '/autocad_master')
  await p.getByRole('button', { name: 'Privacidad de Meta' }).waitFor()
  assert.equal(await p.evaluate(() => typeof window.fbq), 'undefined')
  await p.getByRole('button', { name: 'Privacidad de Meta' }).click()
  await p.getByRole('button', { name: 'Aceptar', exact: true }).click()
  await p.waitForTimeout(200); assert.equal(await p.evaluate(() => typeof window.fbq), 'undefined')
  summary.push('GPC blocks tracking even if Accept is clicked PASS')
  await c.close()
  const capturePath = process.env.META_TEST_CAPTURE
  if (capturePath) {
    const captured = readFileSync(capturePath, 'utf8').trim().split('\n').map(JSON.parse)
    for (const row of captured) { assert(!JSON.stringify(row).includes('LOCAL_FAKE_SECRET')); assert.equal(row.data.length, 1) }
    summary.push('Real API route reached mocked upstream; capture contains no credentials PASS')
  }
  console.log(summary.join('\n'))
} finally { await browser.close() }
