import { Marked } from 'marked';
const escape = (s: string) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
export function renderArticle(body: string, base = ''): string {
  const parser = new Marked({ gfm: true, breaks: false, renderer: {
    html({ text }) { return escape(text); },
    heading({ tokens, depth }) { return `<h${Math.max(2, depth)}>${this.parser.parseInline(tokens)}</h${Math.max(2, depth)}>`; },
    image({ text }) { return escape(text); },
    link({ href, tokens }) {
      const label = this.parser.parseInline(tokens);
      if (href.startsWith('https://nagi.tw/')) {
        const url = new URL(href); href = url.pathname;
        const redirects: Record<string, string> = { '/journal/series/medtrust/': '/journal/', '/experience/research/': '/research/', '/labs/': '/research/', '/zh/labs/': '/zh/research/' };
        href = redirects[href] ?? href;
      }
      if (href.startsWith('/') && !href.startsWith('//')) return `<a href="${escape(base + href)}">${label}</a>`;
      if (href.startsWith('#')) return label;
      try { const u = new URL(href); if (u.protocol === 'https:' && !u.username && !u.password) return `<a href="${escape(u.href)}" rel="noreferrer">${label}</a>`; } catch {}
      return label;
    }
  }});
  return parser.parse(body, { async: false });
}
