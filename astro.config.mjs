import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';
import { publicRedirects } from './src/lib/publication.ts';
const records = JSON.parse(readFileSync(new URL('./src/data/migrated.json', import.meta.url), 'utf8'));
const leads = JSON.parse(readFileSync(new URL('./src/data/project-leads.json', import.meta.url), 'utf8'));
const canonical = new Set(leads.flatMap(r => [`/projects/${r.slug}/`, `/zh/projects/${r.slug}/`]));
for (const p of ['/', '/research/', '/projects/', '/experience/', '/contact/', '/journal/', '/technical-reports/', '/about/', '/roadmap/']) { canonical.add(p); canonical.add('/zh' + p); }
// SITE_URL is the origin; SITE_BASE owns the project path. CI supplies Pages values.
// A future custom domain uses SITE_URL=https://nagi.tw and SITE_BASE=/.
const site = process.env.SITE_URL || 'https://nagi.tw';
const base = '/' + (process.env.SITE_BASE || '/').replace(/^\/+|\/+$/g, '');
const basePrefix = base === '/' ? '' : base;
const aliases = publicRedirects(records, [...canonical]);
const aliasPaths = new Set(Object.keys(aliases));
// Astro prefixes route files with base, but static redirect destinations are literal.
const redirects = Object.fromEntries(Object.entries(aliases).map(([from, to]) => [from, `${basePrefix}${to}`]));

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  output: 'static',
  redirects,
  integrations: [sitemap({ filter: page => {
    const pathname = new URL(page).pathname;
    const route = basePrefix && pathname.startsWith(`${basePrefix}/`) ? pathname.slice(basePrefix.length) : pathname;
    return route !== '/404.html' && !aliasPaths.has(route);
  }, i18n: { defaultLocale: 'en', locales: { en: 'en', zh: 'zh-TW' } } })],
});
