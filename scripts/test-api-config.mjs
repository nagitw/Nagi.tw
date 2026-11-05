import assert from 'node:assert/strict';
import { askPenguin } from '../src/lib/penguin-ai.ts';
const collect = async endpoint => { for await (const e of askPenguin('Hi', { mode: 'api', endpoint })) { void e; } };
const previous = globalThis.fetch;
let called = false;
globalThis.fetch = async () => { called = true; return new Response('{"type":"done"}\n', { headers: {'content-type':'application/x-ndjson'} }); };
try {
 for (const endpoint of ['https://127.0.0.1/chat','https://192.168.1.1/chat','https://localhost/chat','https://localhost./chat','https://ai.local./chat','https://service.internal./chat','https://ai.local/chat','https://example.com:11434/chat','https://example.com/chat?key=secret']) {
  called = false; await assert.rejects(collect(endpoint)); assert.equal(called, false);
 }
} finally { globalThis.fetch = previous; }
console.log('Public API configuration rejects local services and URL credentials: PASS');
