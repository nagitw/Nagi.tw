import assert from 'node:assert/strict';
import { transition } from '../src/lib/penguin-state.ts';
import { askPenguin, safeSource } from '../src/lib/penguin-ai.ts';
import { ChatSession } from '../src/lib/chat-session.ts';
const session = new ChatSession();
const oldRequest = session.start();
session.close();
const newRequest = session.start();
assert.ok(oldRequest.signal.aborted, 'Closing cancels the old request');
assert.equal(session.owns(oldRequest), false, 'A late rejection cannot update a reopened chat');
assert.equal(session.owns(newRequest), true, 'The new request retains control');
session.close();
assert.equal(session.owns(newRequest), false);

assert.equal(transition('idle', 'enter'), 'curious');
assert.equal(transition('thinking', 'enter'), 'thinking');
assert.equal(transition('talking', 'sleep'), 'talking');
assert.equal(transition('error', 'ask'), 'thinking');
assert.equal(transition('thinking', 'chunk'), 'talking');
assert.equal(transition('talking', 'close'), 'idle');
assert.equal(safeSource('javascript:alert(1)'), null);
assert.equal(safeSource('https://user:password@example.com'), null);
assert.equal(safeSource('https://nagi.tw/projects/'), 'https://nagi.tw/projects/');
const collect = async (options) => { const events = []; for await (const event of askPenguin('Who is Nagi?', options)) events.push(event); return events; };
const mock = await collect({ mode: 'mock', locale: 'en' });
const based = await collect({ mode: 'mock', locale: 'zh', base: '/studio/' });
assert.equal(based.find(e => e.type === 'source').url, 'https://nagi.tw/studio/zh/about/');
assert.ok(mock.some(e => e.type === 'delta' && e.text.includes('Nagi')));
assert.equal(mock.at(-1).type, 'done');
await assert.rejects(collect({ mode: 'api', endpoint: 'http://example.com/chat' }), /HTTPS/);
const originalFetch = globalThis.fetch;
try {
  let request;
  globalThis.fetch = async (_url, options) => { request = options; return new Response(new ReadableStream({ start(c) {
    for (const part of ['{"type":"delta","text":"你', '好"}\n{"type":"source","title":"Research","url":"https://nagi.tw/research/"}\n', '{"type":"done"}\n']) c.enqueue(new TextEncoder().encode(part));
    c.close();
  }}), { headers: { 'content-type': 'application/x-ndjson' } }); };
  const events = await collect({ mode: 'api', endpoint: 'https://example.com/chat' });
  assert.equal(events[0].text, '你好');
  assert.equal(events[1].url, 'https://nagi.tw/research/');
  assert.equal(request.credentials, 'omit');
  assert.equal(request.redirect, 'error');
  for (const body of ['{"type":"delta","text":"partial"}\n', '{"type":"source","title":"Bad","url":"javascript:alert(1)"}\n', 'not json\n']) {
    globalThis.fetch = async () => new Response(body, { headers: { 'content-type': 'application/x-ndjson' } });
    await assert.rejects(collect({ mode: 'api', endpoint: 'https://example.com/chat' }));
  }
  globalThis.fetch = async () => new Response('Unavailable', { status: 503 });
  await assert.rejects(collect({ mode: 'api', endpoint: 'https://example.com/chat' }), /503/);
  const controller = new AbortController(); controller.abort();
  await assert.rejects(collect({ mode: 'mock', signal: controller.signal }));
} finally { globalThis.fetch = originalFetch; }
console.log('Penguin states, mock, streaming protocol, unsafe sources, cancellation and HTTP failures: PASS');
