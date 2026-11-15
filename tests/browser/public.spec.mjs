import { test as base, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const prefix = (process.env.SITE_BASE || '/').replace(/\/$/, '');
const based = route => `${prefix}${route}`;
const records = JSON.parse(readFileSync('src/data/migrated.json', 'utf8'));
// Select an actual published bilingual article with a cover, rather than inventing a route.
const article = records.find(r => r.kind === 'journal' && r.locale === 'en' && r.cover && r.publicationStatus === 'published'
  && records.some(other => other.translationKey === r.translationKey && other.locale === 'zh' && other.publicationStatus === 'published'));
if (!article) throw new Error('A published bilingual Journal article with a cover is required');
const articleZh = records.find(r => r.translationKey === article.translationKey && r.locale === 'zh');
// These landing routes come from src/data/site.ts and the existing page modules.
const routes = ['/', '/about/', '/experience/', '/projects/', '/research/', '/journal/', article.route];

const test = base.extend({
  audit: [async ({ page, context, browser }, use, info) => {
    const log = { browser: browser.version(), viewport: page.viewportSize(), console: [], pageErrors: [], failedRequests: [], httpErrors: [], blockedExternal: [], visited: [] };
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      if (url.origin === 'http://127.0.0.1:4399') return route.continue();
      log.blockedExternal.push(url.href);
      return route.abort('blockedbyclient');
    });
    page.on('console', msg => log.console.push({ type: msg.type(), text: msg.text(), location: msg.location() }));
    page.on('pageerror', error => log.pageErrors.push(String(error)));
    page.on('requestfailed', request => log.failedRequests.push({ url: request.url(), type: request.resourceType(), error: request.failure() }));
    page.on('response', response => {
      if (response.status() >= 400) log.httpErrors.push({ url: response.url(), status: response.status(), type: response.request().resourceType() });
    });
    page.on('framenavigated', frame => { if (frame === page.mainFrame()) log.visited.push(frame.url()); });
    await use(log);
    await info.attach('browser-audit', { body: JSON.stringify(log, null, 2), contentType: 'application/json' });
    // The 404 test explicitly checks the one intentional missing-document response.
    const intentional404 = info.title === '404 and return links';
    expect(log.pageErrors, 'Unhandled page errors').toEqual([]);
    expect(log.failedRequests, 'Failed network requests').toEqual([]);
    expect(log.blockedExternal, 'No external services should be requested').toEqual([]);
    expect(log.httpErrors.filter(e => !(intentional404 && e.status === 404 && e.type === 'document')), 'HTTP errors').toEqual([]);
    expect(log.console.filter(e => e.type === 'error' && !(intentional404 && e.text.includes('404') && e.location.url.includes('/__qa_missing__/'))), 'Console errors').toEqual([]);
  }, { auto: true }],
});

async function layout(page) {
  await page.evaluate(() => document.fonts.ready);
  const problems = await page.evaluate(() => {
    const failures = [];
    if (document.documentElement.scrollWidth > innerWidth + 1) failures.push(`document ${document.documentElement.scrollWidth} > ${innerWidth}`);
    for (const el of document.querySelectorAll('main img, .article-body, .article-body pre, .article-body table, dialog[open]')) {
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) continue;
      if (rect.left < -1 || rect.right > innerWidth + 1) failures.push(`${el.tagName}.${el.className}: ${rect.left}..${rect.right}`);
      if (el instanceof HTMLImageElement && (!el.complete || !el.naturalWidth)) failures.push(`broken image ${el.currentSrc}`);
      if (el.matches('dialog') && el.scrollWidth > el.clientWidth + 1) failures.push('dialog horizontal overflow');
    }
    return failures;
  });
  expect(problems, 'Viewport and article containment').toEqual([]);
}

async function capture(page, info, name) {
  // Load lazy images throughout long articles before checking and capturing.
  for (const img of await page.locator('main img').all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
  }
  await page.evaluate(() => scrollTo(0, 0));
  await layout(page);
  const path = info.outputPath(`${name}.png`);
  await page.screenshot({ path, fullPage: true, animations: 'disabled' });
  await info.attach(name, { path, contentType: 'image/png' });
}

async function openMenu(page) {
  if (page.viewportSize().width < 768) {
    const menu = page.locator('.menu-toggle');
    await expect(menu).toBeVisible();
    if (await menu.getAttribute('aria-expanded') !== 'true') await menu.click();
  }
}

for (const locale of ['en', 'zh']) {
  const local = route => based(locale === 'zh' ? (route === article.route ? articleZh.route : `/zh${route}`) : route);
  for (const route of routes) {
    test(`${locale} page ${route}`, async ({ page }, info) => {
      const response = await page.goto(local(route));
      expect(response.status()).toBe(200);
      await expect(page.locator('main h1')).toBeVisible();
      await capture(page, info, 'page');
      await openMenu(page);
      const language = page.locator('[data-language-switch]');
      const destination = await language.getAttribute('href');
      await language.click();
      await expect(page).toHaveURL(new URL(destination, 'http://127.0.0.1:4399').href);
      await expect(page.locator('html')).toHaveAttribute('lang', locale === 'en' ? 'zh-TW' : 'en');
      await layout(page);
    });
  }

  test(`${locale} navigation and mobile menu`, async ({ page }, info) => {
    await page.goto(local('/'));
    if (page.viewportSize().width < 768) {
      await expect(page.locator('#site-navigation')).toBeHidden();
      await openMenu(page);
      await expect(page.locator('#site-navigation')).toBeVisible();
      await capture(page, info, 'menu-open');
      await page.locator('.menu-toggle').click();
      await expect(page.locator('#site-navigation')).toBeHidden();
      await openMenu(page);
      await page.keyboard.press('Escape');
      await expect(page.locator('#site-navigation')).toBeHidden();
      await expect(page.locator('.menu-toggle')).toBeFocused();
    }
    for (const href of await page.locator('.nav-list a').evaluateAll(links => links.map(a => a.getAttribute('href')))) {
      await openMenu(page);
      await page.locator(`.nav-list a[href="${href}"]`).click();
      await expect(page).toHaveURL(new URL(href, 'http://127.0.0.1:4399').href);
      await expect(page.locator('main h1')).toBeVisible();
      if (page.viewportSize().width < 768) await expect(page.locator('#site-navigation')).toBeHidden();
      await layout(page);
    }
  });

  test(`${locale} Experience six categories`, async ({ page }) => {
    await page.goto(local('/experience/'));
    const rows = page.locator('.experience-row');
    await expect(rows).toHaveCount(8);
    for (const category of ['competitions', 'ctf', 'training', 'conferences', 'speaking', 'teaching']) {
      const count = await rows.locator(`:scope[data-category="${category}"]`).count();
      await page.locator('#experience-category').selectOption(category);
      await expect(page.locator('.experience-row:visible')).toHaveCount(count);
      if (!count) await expect(page.locator('#experience-empty')).toBeVisible();
      else await expect(page.locator('#experience-empty')).toBeHidden();
      await layout(page);
    }
    await page.locator('#experience-category').selectOption('all');
    await expect(page.locator('.experience-row:visible')).toHaveCount(8);
  });

  test(`${locale} Journal four categories and article link`, async ({ page }) => {
    await page.goto(local('/journal/'));
    await expect(page.locator('[data-journal-category]')).toHaveCount(13);
    for (const category of ['cybersecurity', 'medical', 'perspectives', 'reflections']) {
      const count = await page.locator(`[data-journal-category="${category}"]`).count();
      expect(count).toBeGreaterThan(0);
      await page.locator(`[data-journal-filter="${category}"]`).click();
      await expect(page.locator('[data-journal-category]:visible')).toHaveCount(count);
      await expect(page.locator(`[data-journal-filter="${category}"]`)).toHaveAttribute('aria-pressed', 'true');
      await layout(page);
    }
    await page.locator('[data-journal-filter="all"]').click();
    await expect(page.locator('[data-journal-category]:visible')).toHaveCount(13);
    const link = page.locator('[data-journal-category] h2 a').first();
    const href = await link.getAttribute('href');
    await link.click();
    await expect(page).toHaveURL(new URL(href, 'http://127.0.0.1:4399').href);
    await expect(page.locator('.article-body')).toBeVisible();
  });

  test(`${locale} Penguin offline dialog`, async ({ page }, info) => {
    await page.goto(local('/'));
    const launcher = page.locator('.chat-launcher');
    await launcher.click();
    const dialog = page.locator('#penguin-chat');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute('data-mode', 'offline');
    await expect(dialog).toHaveAttribute('data-endpoint', '');
    await expect(page.locator('#chat-question')).toBeFocused();
    await capture(page, info, 'penguin-open');
    await page.locator('[data-question]').first().click();
    await expect(page.locator('.chat-status')).toContainText(locale === 'zh' ? '離線' : 'Offline');
    await expect(page.locator('.chat-message')).toHaveCount(0);
    await capture(page, info, 'penguin-answer');
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
    await expect(launcher).toBeFocused();
    await launcher.click();
    await page.locator('[data-chat-close]').click();
    await expect(dialog).not.toBeVisible();
  });
}

test('404 and return links', async ({ page }, info) => {
  // Deliberately missing route, not a claimed application URL.
  const response = await page.goto(based('/__qa_missing__/'));
  expect(response.status()).toBe(404);
  await expect(page.locator('h1')).toContainText('404');
  await capture(page, info, '404');
  for (const href of [based('/'), based('/zh/')]) {
    if (href === based('/zh/')) await page.goto(based('/__qa_missing__/'));
    await page.locator(`main a[href="${href}"]`).click();
    await expect(page).toHaveURL(new URL(href, 'http://127.0.0.1:4399').href);
    await expect(page.locator('.studio-hero')).toBeVisible();
  }
});
