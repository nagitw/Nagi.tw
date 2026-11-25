import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';

const pages = ['', 'projects', 'research', 'journal', 'photography', 'experience', 'about'];
const localizedPages = [...pages, ...pages.map(page => 'zh' + (page ? '/' + page : '')), '404'];
for (const page of localizedPages) {
  const locale = page === 'zh' || page.startsWith('zh/') ? 'zh-TW' : 'en';
  const path = page === '404' ? 'dist/404.html' : `dist/${page ? `${page}/` : ''}index.html`;
  const html = readFileSync(path, 'utf8');
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${path}: one h1`);
  for (const tag of ['header', 'main', 'footer', 'nav']) assert.ok(html.includes(`<${tag}`), `${path}: ${tag}`);
  assert.ok(html.includes('<html lang="' + locale + '"'));
  assert.match(html, /<meta name="description" content="[^"]+"/);
  assert.match(html, /<title>[^<]+<\/title>/);
  assert.match(html, /<meta name="color-scheme" content="light dark"/);
  assert.match(html, /<meta name="theme-color" content="#000000"/);
  for (const theme of ['system', 'light', 'dark']) assert.ok(html.includes(`value="${theme}"`), `${path}: appearance ${theme}`);
  assert.ok(html.includes('id="theme"'), `${path}: native appearance control`);
  assert.doesNotMatch(html, /data-penguin-toggle|journal-progress|journal-copy|journal-permalink/);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.equal(canonical, `https://nagitw.github.io/Nagi.tw/${page ? `${page}/` : ''}`);
  assert.equal(html.includes('name="robots" content="noindex, follow"'), page === '404');
  assert.equal((html.match(/aria-current="page"/g) ?? []).length, page !== '404' && page !== '' && page !== 'zh' ? 1 : 0);
  if (page !== '404') {
    for (const language of ['en', 'zh-TW', 'x-default']) assert.ok(html.includes('hreflang="' + language + '"'), path + ': alternate');
    const base = page.replace(/^zh(?:\/|$)/, '');
    for (const [language, prefix] of [['en', ''], ['zh-TW', 'zh/'], ['x-default', '']]) {
      const alternate = `https://nagitw.github.io/Nagi.tw/${prefix}${base ? base + '/' : ''}`;
      assert.ok(html.includes(`hreflang="${language}" href="${alternate}"`), `${path}: alternate URL ${language}`);
    }
    const counterpart = locale === 'en' ? '/Nagi.tw/zh/' + (base ? base + '/' : '') : '/Nagi.tw/' + (base ? base + '/' : '');
    assert.ok(html.includes('href="' + counterpart + '" lang="' + (locale === 'en' ? 'zh-TW' : 'en') + '"'), path + ': switcher');
  }
  for (const [, href] of html.matchAll(/href="(\/[^"#]*)"/g)) {
    const target = href.endsWith('/') ? `dist${href.replace(/^\/Nagi.tw/, '')}index.html` : `dist${href.replace(/^\/Nagi.tw/, '')}`;
    assert.ok(existsSync(target), `${path}: broken link ${href}`);
  }
}

console.log(`PASS: ${localizedPages.length} static pages, landmarks, h1, SEO, canonical, navigation, local links, 404 noindex, and three appearance choices.`);
