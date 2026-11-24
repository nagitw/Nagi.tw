import { readFileSync } from 'node:fs';

// Adapt rendered legacy URLs/headings; the recovered Markdown body stays intact.
export default function recoveredMarkdown() {
  const { records } = JSON.parse(readFileSync(new URL('../docs/content-recovery/manifest.json', import.meta.url), 'utf8'));
  const routes = new Map(records.filter(record => record.originalRoute).map(record => [record.originalRoute, record.route]));
  const aliases = { '/journal/series/medtrust/': '/journal/', '/experience/research/': '/research/', '/labs/': '/research/', '/zh/labs/': '/zh/research/' };
  function rewrite(node, ctx) {
        const url = node.url;
        if (url.startsWith('/') && !url.startsWith('//') || /^https:\/\/nagi.tw\//.test(url)) {
          const parsed = new URL(url, 'https://nagi.tw');
          const path = routes.get(parsed.pathname) ?? aliases[parsed.pathname] ?? parsed.pathname;
          ctx.setField(node, 'url', `${path.startsWith('/Nagi.tw/') ? '' : '/Nagi.tw'}${path}${parsed.search}${parsed.hash}`);
        }
  }
  return { name: 'recover-public-content',
    heading(node, ctx) { if (node.depth === 1) ctx.setField(node, 'depth', 2); },
    link: rewrite, image: rewrite, definition: rewrite,
  };
}
