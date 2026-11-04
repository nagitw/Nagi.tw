import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://nagi.tw',
  base: process.env.SITE_BASE || '/',
  trailingSlash: 'always',
  output: 'static',
  integrations: [sitemap()],
});
