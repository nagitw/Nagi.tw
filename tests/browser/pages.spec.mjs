import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const prefix = (process.env.SITE_BASE || '/').replace(/\/$/, '');
const records = JSON.parse(readFileSync('src/data/migrated.json', 'utf8'));

for (const locale of ['en', 'zh']) {
  test(`${locale} legacy redirect stays within the Pages project`, async ({ page }) => {
    const record = records.find(r => r.locale === locale && r.publicationStatus === 'published'
      && r.kind === 'journal' && r.aliases?.some(a => a.startsWith('/') && !a.startsWith('//')));
    expect(record).toBeTruthy();
    const alias = record.aliases.find(a => a.startsWith('/') && !a.startsWith('//'));
    await page.goto(`${prefix}${alias}`);
    await expect(page).toHaveURL(`http://127.0.0.1:4399${prefix}${record.route}`);
    await expect(page.locator('.article-body')).toBeVisible();
  });
}

test('nested missing route retains styles and both home links', async ({ page }) => {
  const failed = [];
  page.on('requestfailed', request => failed.push(request.url()));
  page.on('response', response => {
    if (response.request().resourceType() !== 'document' && response.status() >= 400) failed.push(response.url());
  });
  const response = await page.goto(`${prefix}/zh/__qa_missing__/deep/`);
  expect(response.status()).toBe(404);
  await expect(page.locator('h1')).toContainText('404');
  for (const home of [`${prefix}/`, `${prefix}/zh/`]) {
    await expect(page.locator(`main a[href="${home}"]`)).toBeVisible();
  }
  expect(await page.evaluate(() => [...document.styleSheets].some(sheet => sheet.href?.includes('/_astro/') && sheet.cssRules.length > 0))).toBe(true);
  expect(failed).toEqual([]);
});

test('public Mock answers without a network request and cites the Pages route', async ({ page }) => {
  await page.route(`http://127.0.0.1:4399${prefix}/zh/`, async route => {
    const response = await route.fetch();
    await route.fulfill({ response, body: (await response.text()).replace('data-mode="offline"', 'data-mode="mock"') });
  });
  await page.goto(`${prefix}/zh/`);
  const calls = [];
  await page.route('**/*', route => { calls.push(route.request().url()); return route.abort(); });
  await page.locator('.chat-launcher').click();
  await page.locator('[data-question]').first().click();
  await expect(page.locator('.chat-status')).toContainText('回答完成');
  const site = (process.env.SITE_URL || 'https://nagi.tw').replace(/\/$/, '');
  await expect(page.locator('.chat-sources a')).toHaveAttribute('href', `${site}${prefix}/zh/about/`);
  expect(calls).toEqual([]);
});
