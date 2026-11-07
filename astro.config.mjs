import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';
import { publicRedirects } from './src/lib/publication.ts';
const records = JSON.parse(readFileSync(new URL('./src/data/migrated.json', import.meta.url), 'utf8'));
const leads = JSON.parse(readFileSync(new URL('./src/data/project-leads.json', import.meta.url), 'utf8'));
const canonical = new Set(leads.flatMap(r => [`/projects/${r.slug}/`, `/zh/projects/${r.slug}/`]));
for (const p of ['/', '/research/', '/projects/', '/experience/', '/contact/', '/journal/', '/technical-reports/', '/about/', '/roadmap/']) { canonical.add(p); canonical.add('/zh' + p); }
const redirects = publicRedirects(records, [...canonical]);
const aliasPaths = new Set(Object.keys(redirects));

export default defineConfig({
  site: 'https://nagi.tw',
  base: process.env.SITE_BASE || '/',
  trailingSlash: 'always',
  output: 'static',
  redirects,
  integrations: [sitemap({ filter: page => !aliasPaths.has(new URL(page).pathname.replace((process.env.SITE_BASE || '/').replace(/\/$/, ''), '')), i18n: { defaultLocale: 'en', locales: { en: 'en', zh: 'zh-TW' } } })],
});
