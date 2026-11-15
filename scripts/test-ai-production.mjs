import assert from 'node:assert/strict';
import { resolveChatConfig } from '../src/lib/chat-config.ts';
import { askPenguin } from '../src/lib/penguin-ai.ts';
assert.deepEqual(resolveChatConfig({}, true), { mode: 'offline', endpoint: '' });
assert.deepEqual(resolveChatConfig({ mode: 'mock', endpoint: 'http://localhost:11434' }, true), { mode: 'mock', endpoint: '' });
const mockEvents = [];
for await (const event of askPenguin('Who is Nagi?', { mode: 'mock', site: 'https://seraphforge.github.io', base: '/nagi.tw/', locale: 'zh' })) mockEvents.push(event);
assert.equal(mockEvents.find(e => e.type === 'source').url, 'https://seraphforge.github.io/nagi.tw/zh/about/');
assert.throws(() => resolveChatConfig({ mode: 'api' }, true), /explicit HTTPS endpoint/);
assert.deepEqual(resolveChatConfig({ mode: 'api', endpoint: 'https://api.nagi.tw/chat' }, true), { mode: 'api', endpoint: 'https://api.nagi.tw/chat' });
const original = globalThis.fetch;
try {
  let calls = 0;
  globalThis.fetch = async () => { calls++; return calls === 1 ? new Response('', {status:503}) : new Response('{"type":"done"}\n', {headers:{'content-type':'application/x-ndjson'}}); };
  for await (const event of askPenguin('Hi', {mode:'api', endpoint:'https://api.nagi.tw/chat', retries:1})) assert.equal(event.type,'done');
  assert.equal(calls,2);
  calls=0;
  globalThis.fetch = async () => { calls++; return new Response('{"type":"delta","text":"partial"}\n', {headers:{'content-type':'application/x-ndjson'}}); };
  await assert.rejects(async () => { for await (const e of askPenguin('Hi',{mode:'api',endpoint:'https://api.nagi.tw/chat',retries:1})) void e; }, /Incomplete/);
  assert.equal(calls,1,'Never replay an already started stream');
} finally { globalThis.fetch=original; }
console.log('Production offline configuration and bounded pre-stream retry: PASS');
