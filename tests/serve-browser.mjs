// Local test server only: fake credentials + mocked upstream. Never deploy with NODE_OPTIONS below.
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { tmpdir } from 'node:os';
const root=fileURLToPath(new URL('../',import.meta.url));
const env={...process.env,META_TRACKING_ENABLED:'true',META_SIGNING_SECRET:'local-browser-test-only-12345678901234567890',META_DEV_MEMORY_STORE:'true',META_GRAPH_API_VERSION:'v26.0',META_TEST_CAPTURE:process.env.META_TEST_CAPTURE || path.join(tmpdir(),'meta-browser-capture.jsonl'),NODE_OPTIONS:'--require '+path.join(root,'tests/mock-meta.cjs')};
for(const [i,p] of ['AUTOCAD','CAFETERIA','MUNDO','VELAS'].entries()) {env[`META_${p}_PIXEL_ID`]=String(100000+i);env[`META_${p}_ACCESS_TOKEN`]='LOCAL_FAKE_SECRET_'+p;env[`META_${p}_ORIGINS`]='http://localhost:3000';}
const child=spawn(process.execPath,['node_modules/next/dist/bin/next','dev','--hostname','127.0.0.1'],{cwd:root,env,stdio:'inherit'});
process.on('SIGTERM',()=>child.kill('SIGTERM'));process.on('SIGINT',()=>child.kill('SIGINT'));
