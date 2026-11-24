// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({ site: 'https://nagitw.github.io', base: '/Nagi.tw', i18n: { defaultLocale: 'en', locales: ['en', { path: 'zh', codes: ['zh-TW'] }], routing: { prefixDefaultLocale: false } }, integrations: [mdx()] });
