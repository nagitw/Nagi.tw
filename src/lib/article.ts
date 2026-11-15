import { Marked } from 'marked';
import { codeToHtml, bundledLanguages } from 'shiki';

const escape = (s: string) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
export interface ArticleHeading { id: string; text: string; depth: number }
export interface ArticleReference { href: string; text: string }
// Explicitly approved assets only. Markdown cannot initiate third-party image requests.
const images = new Set(['/migrated/cybersec-2026.jpg']);
const plain = (s: string) => s.replace(/<[^>]*>/g, '').replace(/&(?:amp|lt|gt|quot|#39);/g, entity => ({ '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" }[entity]!));

export function readingMinutes(body: string): number {
  const text = body.replace(/```[\s\S]*?```/g, '').replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/https?:\/\/\S+/g, '').replace(/<[^>]*>/g, '');
  const han = text.match(/\p{Script=Han}/gu)?.length ?? 0;
  const words = text.replace(/\p{Script=Han}/gu, ' ').match(/[\p{L}\p{N}]+/gu)?.length ?? 0;
  return Math.max(1, Math.ceil(han / 300 + words / 220));
}

function parseArticle(body: string, base: string, code: (text: string, lang: string) => string, locale: 'zh' | 'en' = 'en') {
  const headings: ArticleHeading[] = [];
  const references: ArticleReference[] = [];
  const used = new Set<string>();
  const parser = new Marked({ gfm: true, breaks: false, renderer: {
    html({ text }) { return escape(text); },
    heading({ tokens, depth }) {
      const label = this.parser.parseInline(tokens);
      const text = plain(label);
      const slug = 'heading-' + (text.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, '').trim().replace(/\s+/g, '-') || 'section');
      let id = slug; let suffix = 2;
      while (used.has(id)) id = `${slug}-${suffix++}`;
      used.add(id);
      const level = Math.max(2, depth);
      headings.push({ id, text, depth: level });
      return `<h${level} id="${escape(id)}">${label}<a class="heading-anchor" href="#${escape(id)}" aria-label="${locale === 'zh' ? '連結至：' : 'Link to: '}${escape(text)}"><span aria-hidden="true">#</span></a></h${level}>`;
    },
    code({ text, lang }) { return code(text, lang?.split(/\s+/)[0] ?? 'text'); },
    image({ href, text }) {
      return images.has(href) ? `<img src="${escape(base + href)}" alt="${escape(text)}" width="800" height="394" loading="lazy" decoding="async" />` : escape(text);
    },
    link({ href, tokens }) {
      const label = this.parser.parseInline(tokens);
      if (href.startsWith('https://nagi.tw/')) {
        const url = new URL(href); href = url.pathname + url.hash;
        const redirects: Record<string, string> = { '/journal/series/medtrust/': '/journal/', '/experience/research/': '/research/', '/labs/': '/research/', '/zh/labs/': '/zh/research/' };
        href = redirects[href] ?? href;
      }
      if (href.startsWith('/') && !href.startsWith('//') && !href.includes('\\')) return `<a href="${escape(base + href)}">${label}</a>`;
      if (href.startsWith('#')) return label;
      try {
        const u = new URL(href);
        if (u.protocol === 'https:' && !u.username && !u.password) {
          if (!references.some(ref => ref.href === u.href)) references.push({ href: u.href, text: plain(label) || u.hostname });
          return `<a href="${escape(u.href)}" rel="noreferrer">${label}</a>`;
        }
      } catch {}
      return label;
    }
  }});
  return { html: parser.parse(body, { async: false }), headings, references };
}

export function renderArticle(body: string, base = ''): string {
  return parseArticle(body, base, text => `<pre tabindex="0"><code>${escape(text)}</code></pre>`).html;
}

export async function prepareArticle(body: string, base = '', locale: 'zh' | 'en' = 'en') {
  const blocks: { text: string; lang: string }[] = [];
  const result = parseArticle(body, base, (text, lang) => {
    blocks.push({ text, lang });
    return `<div data-highlight-slot="${blocks.length - 1}"></div>`;
  }, locale);
  const highlighted = await Promise.all(blocks.map(async ({ text, lang }, i) => {
    const language = Object.hasOwn(bundledLanguages, lang) ? lang as keyof typeof bundledLanguages : 'text';
    const html = await codeToHtml(text, { lang: language, themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: false });
    return `<div class="code-block"><div class="code-toolbar"><span>${escape(lang)}</span><button type="button" data-code-copy aria-describedby="code-status-${i}" hidden>${locale === 'zh' ? '複製程式碼' : 'Copy code'}</button><span class="sr-only" id="code-status-${i}" role="status"></span></div>${html}</div>`;
  }));
  result.html = result.html.replace(/<div data-highlight-slot="(\d+)"><\/div>/g, (_, i) => highlighted[Number(i)]!);
  return result;
}
