import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFileSync, readdirSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { resolve, extname, join, sep } from 'node:path';
import { createRequire } from 'node:module';

// Use an existing QA Playwright installation; it is not a production dependency.
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.NAGI_PLAYWRIGHT ?? 'playwright');
const root = resolve('dist');
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]);
const routes = walk(root).filter(p => p.endsWith('.html')).map(p => p.slice(root.length).replaceAll('\\', '/').replace(/index.html$/, ''));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg' };
const server = createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (!url.pathname.startsWith('/Nagi.tw/')) return res.writeHead(404).end();
  let file = resolve(root, `.${decodeURIComponent(url.pathname.slice('/Nagi.tw'.length))}`);
  if (url.pathname.endsWith('/')) file = join(file, 'index.html');
  if (!file.startsWith(root + sep) || !existsSync(file) || !statSync(file).isFile()) return res.writeHead(404).end();
  res.setHeader('Content-Type', types[extname(file)] ?? 'application/octet-stream');
  res.end(readFileSync(file));
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const publicRoot = process.env.NAGI_PUBLIC_URL ?? `http://127.0.0.1:${server.address().port}/Nagi.tw`;
let browser;
try {
  browser = await chromium.launch({ channel: 'chrome', headless: true, ignoreDefaultArgs: ['--no-sandbox'], chromiumSandbox: true });
  const page = await browser.newPage();
  const errors = [];
  const externalRequests = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (!request.url().startsWith(publicRoot + '/')) externalRequests.push(request.url()); });
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      const response = await page.goto(`${publicRoot}${route}`);
      assert.equal(response.status(), 200, route);
      await page.evaluate(async () => {
        await Promise.all([...document.images].map(async image => {
          image.loading = 'eager';
          await image.decode().catch(() => {});
        }));
      });
      const state = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        brokenImages: [...document.images].filter(i => !i.complete || i.naturalWidth === 0).length,
        lang: document.documentElement.lang,
        switches: [...document.querySelectorAll('.language-switch a')].map(a => a.getAttribute('href')),
      }));
      assert.equal(state.overflow, false, `${width} ${route}: overflow`);
      assert.equal(state.brokenImages, 0, `${width} ${route}: images`);
      assert.equal(state.lang, route.startsWith('/zh/') ? 'zh-TW' : 'en', route);
      const penguin = page.locator('[data-penguin-toggle]');
      await penguin.focus();
      await page.keyboard.press('Enter');
      assert.equal(await penguin.getAttribute('aria-expanded'), 'true');
      assert.equal(await page.locator('#penguin-greeting').isVisible(), true);
      await page.keyboard.press('Space');
      assert.equal(await penguin.getAttribute('aria-expanded'), 'false');
      assert.equal(await page.locator('#penguin-greeting').isVisible(), false);
      if (route !== '/404.html') {
        const english = route.replace(/^\/zh\//, '/');
        const chinese = `/zh${english}`;
        const englishTarget = routes.includes(english) ? english : english.replace(/\/[^/]+\/$/, '/');
        const chineseTarget = routes.includes(chinese) ? chinese : chinese.replace(/\/[^/]+\/$/, '/');
        assert.deepEqual(state.switches, [`/Nagi.tw${englishTarget}`, `/Nagi.tw${chineseTarget}`], route);
      }
      if (process.env.NAGI_QA_OUT && ['/about/', '/zh/about/', '/'].includes(route) && width !== 768) {
        mkdirSync(process.env.NAGI_QA_OUT, { recursive: true });
        await page.screenshot({ path: join(process.env.NAGI_QA_OUT, `${width}-${route.replaceAll('/', '_')}.png`), fullPage: true });
      }
    }
  }
  assert.deepEqual(errors, []);
  for (const colorScheme of ['light', 'dark']) {
    await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' });
    await page.goto(`${publicRoot}/zh/`);
    await page.locator('[data-penguin-toggle]').click();
    const mascot = await page.locator('.penguin-signature').evaluate(element => {
      element.style.backgroundColor = matchMedia('(prefers-color-scheme: light)').matches ? '#fff' : '#000';
      element.style.color = matchMedia('(prefers-color-scheme: light)').matches ? '#000' : '#fff';
      return {
        background: getComputedStyle(element.querySelector('button')).backgroundColor,
        color: getComputedStyle(element.querySelector('button')).color,
        animations: [...element.querySelectorAll('svg *')].map(e => getComputedStyle(e).animationName),
        width: element.querySelector('button').getBoundingClientRect().width,
      };
    });
    assert.equal(mascot.background, 'rgb(247, 248, 246)');
    assert.equal(mascot.color, colorScheme === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)');
    assert.ok(mascot.animations.every(name => name === 'none'));
    assert.ok(mascot.width >= 44);
    if (process.env.NAGI_QA_OUT) await page.locator('.penguin-signature').screenshot({ path: join(process.env.NAGI_QA_OUT, `penguin-${colorScheme}.png`) });
  }
  const nojs = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await nojs.newPage();
  await staticPage.goto(`${publicRoot}/`);
  assert.equal(await staticPage.locator('.penguin svg').isVisible(), true);
  assert.equal(await staticPage.locator('[data-penguin-toggle]').isDisabled(), true);
  await nojs.close();
  assert.deepEqual(externalRequests, [], 'No API, backend or external requests');
  console.log(`PASS: ${routes.length} pages × 3 widths, images, EN/繁中, no overflow/errors; penguin keyboard greeting, light/dark surfaces, reduced motion, no JS and no external requests`);
} finally {
  await browser?.close();
  await new Promise(r => server.close(r));
}
