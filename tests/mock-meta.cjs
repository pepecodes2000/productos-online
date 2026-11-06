// Test-only preload, NEVER use in production. It blocks real Meta requests.
const originalFetch = globalThis.fetch;
globalThis.fetch = async function (url, options) {
  if (String(url).startsWith('https://graph.facebook.com/')) {
    const body = JSON.parse(options.body);
    require('node:fs').appendFileSync(process.env.META_TEST_CAPTURE, JSON.stringify({ url, data: body.data }) + '\n');
    return new Response(JSON.stringify({ events_received: 1 }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
  return originalFetch(url, options);
};
