export type ChatEvent = { type: 'delta'; text: string } | { type: 'source'; title: string; url: string } | { type: 'done' };
export interface ChatOptions { mode: 'mock' | 'api'; endpoint?: string; locale?: 'en' | 'zh'; base?: string; site?: string; signal?: AbortSignal; retries?: number }
export function safeSource(value: string): string | null {
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password ? url.href : null; } catch { return null; }
}
export function publicApiEndpoint(value: string): string | null {
  if (!safeSource(value)) return null;
  const api = new URL(value);
  const host = api.hostname.replace(/\.$/, '').toLowerCase();
  if (api.search || api.hash || api.port || !host.includes('.') || /(^[0-9.]+$|:|\.localhost$|\.local$|\.internal$)/i.test(host)) return null;
  return api.href;
}
function parseEvent(line: string): ChatEvent {
  const item: unknown = JSON.parse(line);
  if (!item || typeof item !== 'object' || !('type' in item)) throw new Error('Invalid stream event');
  if (item.type === 'done') return { type: 'done' };
  if (item.type === 'delta' && 'text' in item && typeof item.text === 'string' && item.text.length <= 8000) return { type: 'delta', text: item.text };
  if (item.type === 'source' && 'title' in item && typeof item.title === 'string' && item.title.length <= 200 && 'url' in item && typeof item.url === 'string') {
    const url = safeSource(item.url); if (url) return { type: 'source', title: item.title, url };
  }
  throw new Error('Invalid stream event');
}
/** Public information only. No conversation persistence, credentials, tools or private context. */
export async function* askPenguin(question: string, options: ChatOptions): AsyncGenerator<ChatEvent> {
  if (!question.trim() || question.length > 1000) throw new Error('Question must contain 1–1000 characters');
  options.signal?.throwIfAborted();
  if (options.mode === 'mock') {
    const zh = options.locale === 'zh';
    const topic = /project|專案/i.test(question) ? 'projects' : /recent|working|最近|研究/i.test(question) ? 'research' : 'about';
    const answers = {
      about: zh ? 'Nagi 是一名探索資安與系統的學生工程者。這是示範回答；詳細介紹請閱讀 About。' : 'Nagi is a student engineer exploring security and systems. This is a demo answer; read About for the public introduction.',
      research: zh ? '公開研究方向包含通訊安全與嵌入式系統。研究紀錄包含方法與限制。' : 'Public interests include communication security and embedded systems. Research records describe methods and limitations.',
      projects: zh ? '你可以在 Projects 閱讀公開專案介紹、技術背景與限制。本示範不存取任何專案後端或私人資料。' : 'Projects contains public descriptions, technical context and limitations. This demo does not access project backends or private data.',
    };
    for (const text of answers[topic].match(/.{1,24}/gu) ?? []) {
      await new Promise<void>((resolve) => setTimeout(resolve, 30));
      options.signal?.throwIfAborted(); yield { type: 'delta', text };
    }
    const base = (options.base ?? '/').replace(/^\/+|\/+$/g, '');
    yield { type: 'source', title: topic, url: new URL(`/${base ? `${base}/` : ''}${zh ? 'zh/' : ''}${topic}/`, options.site ?? 'https://nagi.tw').href };
    yield { type: 'done' }; return;
  }
  if (!options.endpoint || !publicApiEndpoint(options.endpoint)) throw new Error('An explicit public HTTPS endpoint without credentials is required');
  const signal = AbortSignal.any([AbortSignal.timeout(30000), ...(options.signal ? [options.signal] : [])]);
  const retries = Math.min(1, Math.max(0, options.retries ?? 0));
  let response: Response | undefined;
  for (let attempt = 0; attempt <= retries; attempt++) {
    signal.throwIfAborted();
    // Retry only an explicit temporary HTTP failure before accepting a stream.
    // Network failures can be ambiguous; never automatically replay those.
    response = await fetch(options.endpoint, {
    method: 'POST', credentials: 'omit', redirect: 'error', cache: 'no-store', referrerPolicy: 'no-referrer', signal,
    headers: { 'Content-Type': 'application/json', Accept: 'application/x-ndjson' },
    body: JSON.stringify({ question: question.trim(), locale: options.locale ?? 'en' }),
    });
    if (![502, 503, 504].includes(response.status) || attempt === retries) break;
    await response.body?.cancel();
    await new Promise<void>((resolve, reject) => {
      const abort = () => { clearTimeout(timer); reject(signal.reason); };
      const timer = setTimeout(() => { signal.removeEventListener('abort', abort); resolve(); }, 300);
      signal.addEventListener('abort', abort, { once: true });
      if (signal.aborted) abort();
    });
  }
  if (!response) throw new Error('AI service unavailable');
  if (!response.ok) throw new Error(`AI service returned ${response.status}`);
  if (!response.headers.get('content-type')?.includes('application/x-ndjson') || !response.body) throw new Error('Expected an NDJSON stream');
  const reader = response.body.getReader(); const decoder = new TextDecoder('utf-8', { fatal: true });
  let buffer = ''; let bytes = 0; let characters = 0;
  try {
    while (true) {
      signal.throwIfAborted();
      const { value, done } = await reader.read();
      bytes += value?.byteLength ?? 0;
      if (bytes > 128000) throw new Error('Response exceeds size limit');
      buffer += done ? decoder.decode() : decoder.decode(value, { stream: true });
      const lines = buffer.split('\n'); buffer = lines.pop() ?? '';
      if (done && buffer.trim()) { lines.push(buffer); buffer = ''; }
      for (const line of lines) {
        if (!line.trim()) continue;
        const event = parseEvent(line);
        if (event.type === 'delta') { characters += event.text.length; if (characters > 8000) throw new Error('Answer exceeds size limit'); }
        yield event;
        if (event.type === 'done') return;
      }
      if (buffer.length > 16000) throw new Error('Stream line exceeds size limit');
      if (done) throw new Error('Incomplete AI response');
    }
  } finally { await reader.cancel().catch(() => {}); reader.releaseLock(); }
}
