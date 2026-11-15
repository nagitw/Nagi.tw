import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { prepareArticle } from '../../src/lib/article.ts';
const prefix = (process.env.SITE_BASE || '/').replace(/\/$/, '');
const based = route => `${prefix}${route}`;
const records = JSON.parse(readFileSync(new URL('../../src/data/migrated.json', import.meta.url), 'utf8'));
const sample = records.find(r => r.kind === 'journal' && r.locale === 'zh' && r.cover && r.publicationStatus === 'published');
const routes = ['/', '/journal/', '/research/', '/projects/', '/experience/', '/about/', '/contact/', '/technical-reports/', '/security/disclosures/', '/systems/medtrust/'];

test.beforeEach(async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(String(error)));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('requestfailed', request => errors.push(`Request failed: ${request.url()}`));
  page.__errors = errors;
});
test.afterEach(async ({ page }, info) => {
  await info.attach('errors', { body: JSON.stringify(page.__errors), contentType: 'application/json' });
  expect(page.__errors).toEqual([]);
});

async function inspect(page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await expect(page.locator('main')).toHaveCount(1);
  await expect(page.locator('main h1')).toHaveCount(1);
  expect(await page.locator('img:not([alt])').count()).toBe(0);
  for (const image of await page.locator('main img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
  }
  expect(await page.locator('button:visible').evaluateAll(buttons => buttons.filter(button => !button.textContent.trim() && !button.getAttribute('aria-label')).length)).toBe(0);
  // Measure actual token contrast, not just declared hex constants.
  const contrast = await page.evaluate(() => {
    const probe = document.createElement('span'); document.body.append(probe);
    const rgb = color => { probe.style.color = color; return getComputedStyle(probe).color.match(/[\d.]+/g).slice(0,3).map(Number); };
    const luminance = values => values.map(v => { v /= 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }).reduce((v, x, i) => v + x * [.2126,.7152,.0722][i], 0);
    const vars = getComputedStyle(document.documentElement);
    const bg = luminance(rgb(vars.getPropertyValue('--paper')));
    const ratios = ['--ink','--muted','--accent'].map(key => { const fg = luminance(rgb(vars.getPropertyValue(key))); return (Math.max(bg,fg)+.05)/(Math.min(bg,fg)+.05); });
    probe.remove(); return ratios;
  });
  expect(Math.min(...contrast)).toBeGreaterThanOrEqual(4.5);
}

for (const locale of ['zh', 'en']) {
  test(`${locale} whole-site layout, accessibility basics and resources`, async ({ page }, info) => {
    const metrics = [];
    for (const route of routes) {
      const path = locale === 'zh' ? `/zh${route}` : route;
      const response = await page.goto(based(path));
      expect(response.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
      await inspect(page);
      metrics.push(await page.evaluate(() => ({ path: location.pathname, domReadyMs: performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd, resources: performance.getEntriesByType('resource').map(r => ({ name: new URL(r.name).pathname, bytes: r.transferSize, duration: r.duration })), external: performance.getEntriesByType('resource').filter(r => new URL(r.name).origin !== location.origin).length })));
      if (['/', '/journal/', '/research/', '/projects/', '/experience/', '/about/'].includes(route)) {
        await page.evaluate(() => scrollTo(0,0));
        await page.screenshot({ path: info.outputPath(`${locale}-${route.replaceAll('/','') || 'home'}.png`), fullPage:true });
      }
    }
    expect(metrics.every(m => m.external === 0)).toBe(true);
    await info.attach('performance-observations', { body: JSON.stringify(metrics,null,2), contentType:'application/json' });
  });
}

test('dark default, light persistence, keyboard focus and reader width', async ({ page }, info) => {
  await page.goto(based(sample.route));
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip')).toBeFocused();
  await page.locator('#theme-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  await inspect(page);
  const width = await page.locator('.article-body').evaluate(el => el.getBoundingClientRect().width);
  expect(width).toBeLessThanOrEqual(760);
  if (page.viewportSize().width >= 1024) expect(width).toBe(760);
  await page.screenshot({path: info.outputPath('article-light.png'),fullPage:true});
  await page.locator('#theme-toggle').click();
  await page.screenshot({path: info.outputPath('article-dark.png'),fullPage:true});
});

test('TOC, anchors, published neighbors and progress', async ({ page }) => {
  await page.goto(based(sample.route));
  const toc = page.locator('.article-toc a');
  expect(await toc.count()).toBeGreaterThan(0);
  const first = toc.first(); const hash = await first.getAttribute('href');
  await first.click();
  expect(decodeURIComponent(new URL(page.url()).hash)).toBe(hash);
  const last = page.locator('.heading-anchor').last();
  await last.scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('[data-reading-progress]').evaluate(el => getComputedStyle(el).transform)).not.toBe('matrix(0, 0, 0, 1, 0, 0)');
  for (const link of await page.locator('.article-neighbors a').all()) {
    const href = await link.getAttribute('href');
    expect(records.some(r => based(r.route) === href && r.kind === 'journal' && r.publicationStatus === 'published')).toBe(true);
  }
});

test('rendered code fixture copies real text and reports clipboard denial', async ({ page, context }) => {
  // No published article currently contains fenced code. Intercept one article response with
  // renderer output only for this test; no fixture route/content is added to the production build.
  const source = 'const value = "<tag>";\nconsole.log("' + 'long-code-value'.repeat(35) + '");';
  const fixture = await prepareArticle('## code-status-0\n\n## main\n\n## 中文\n\n## 中文\n\n' + 'long-word'.repeat(60) + '\n\n```js\n' + source + '\n```', '', 'zh');
  await page.route(`**${sample.route}`, async route => {
    const response = await route.fetch();
    const html = (await response.text()).replace(/(<article\b[^>]*id="article-body"[^>]*>)[\s\S]*?<\/article>/, `$1${fixture.html}</article>`);
    await route.fulfill({response, body:html});
  });
  await context.grantPermissions(['clipboard-read','clipboard-write']);
  await page.goto(based(sample.route));
  const button = page.locator('[data-code-copy]');
  await expect(button).toBeVisible();
  await expect(page.locator('.shiki')).toBeVisible();
  await button.click();
  // Windows normalizes the OS clipboard to CRLF; assert code content after newline normalization.
  expect((await page.evaluate(() => navigator.clipboard.readText())).replaceAll('\r\n', '\n')).toBe(source);
  await expect(page.locator('#code-status-0')).toContainText('已複製');
  await page.evaluate(() => { Object.defineProperty(navigator.clipboard, 'writeText', { value: async () => { throw new DOMException('Denied','NotAllowedError'); } }); });
  await button.click();
  await expect(page.locator('#code-status-0')).toContainText('手動複製');
  await expect(page.locator('.shiki code')).toHaveText(source);
  await expect(page.locator('#heading-code-status-0')).toContainText('code-status-0');
  expect(await page.locator('.shiki').evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true);
  expect(await page.locator('#article-body [id]').evaluateAll(elements => new Set(elements.map(el => el.id)).size === elements.length)).toBe(true);
  await inspect(page);
});

test('storage denied still allows theme switching', async ({ page }) => {
  await page.addInitScript(() => { Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Denied','SecurityError');}}); });
  await page.goto(based('/zh/'));
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  await page.locator('#theme-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme','light');
});

test('no-JS navigation and article remain readable', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled:false, viewport:{width:390,height:844} });
  const page = await context.newPage();
  await page.goto(based('/zh/'));
  await expect(page.locator('#site-navigation')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  await page.goto(based(sample.route));
  await expect(page.locator('.article-body')).toBeVisible();
  await expect(page.locator('.article-toc')).toBeVisible();
  await context.close();
});
