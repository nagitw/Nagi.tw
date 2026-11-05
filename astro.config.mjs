import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';
const records = JSON.parse(readFileSync(new URL('./src/data/migrated.json', import.meta.url), 'utf8'));
const canonical = new Set(records.flatMap(r => { const p = r.route.replace(/^\/zh(?=\/)/, ''); return [p, '/zh' + p]; }));
for (const p of ['/', '/research/', '/projects/', '/experience/', '/contact/', '/journal/', '/technical-reports/', '/about/', '/roadmap/']) { canonical.add(p); canonical.add('/zh' + p); }
const redirects = Object.fromEntries(records.flatMap(r => r.aliases.filter(a => a.startsWith('/') && !canonical.has(a)).map(a => [a, r.route])));
const aliasPaths = new Set(Object.keys(redirects));

export default defineConfig({
  site: 'https://nagi.tw',
  base: process.env.SITE_BASE || '/',
  trailingSlash: 'always',
  output: 'static',
  redirects,
  integrations: [sitemap({ filter: page => !aliasPaths.has(new URL(page).pathname.replace((process.env.SITE_BASE || '/').replace(/\/$/, ''), '')), i18n: { defaultLocale: 'en', locales: { en: 'en', zh: 'zh-TW' } } })],
});
