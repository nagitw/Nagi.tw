import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';
import { transpile, ModuleKind } from 'typescript';
const base = '/Nagi.tw/';
const baseline = JSON.parse(readFileSync('docs/v4/baseline.json', 'utf8')) as {
  routes: string[];
};

test('every preserved route and its stylesheets return 200', async ({
  page,
}) => {
  test.setTimeout(90000);
  const failed: string[] = [];
  page.on('response', (response) => {
    if (response.status() >= 400)
      failed.push(`${response.status()} ${response.url()}`);
  });
  for (const file of [
    ...baseline.routes,
    'search/index.html',
    'zh/search/index.html',
  ]) {
    expect(
      (
        await page.goto(base + file.replace(/index.html$/, ''), {
          waitUntil: 'load',
        })
      )?.status(),
    ).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    const a11y = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      a11y.violations.map((v) => ({
        file,
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
    expect(
      await page
        .locator('body')
        .evaluate((body) => getComputedStyle(body).margin),
    ).toBe('0px');
  }
  expect(failed).toEqual([]);
});

test('code copying and photo dialog work with isolated synthetic fixtures', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const journal = base + 'journal/ctf-meets-malware-analysis-windows/';
  await page.route('**' + journal, async (route) => {
    const response = await route.fetch();
    const body = (await response.text()).replace(
      /(<div class="article-prose"[^>]*>)/,
      '$1<pre><code>console.log("fixture");</code></pre>',
    );
    await route.fulfill({ response, body });
  });
  await page.goto(journal);
  await page.locator('.copy-code').first().click();
  await expect(page.locator('.copy-code').first()).toHaveText('Copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    'console.log("fixture");',
  );
  const project = base + 'projects/autonomous-robot/';
  await page.route('**' + project, async (route) => {
    const response = await route.fetch();
    const body = (await response.text()).replace(
      '</main>',
      `<div class="photo-gallery"><figure><img src="${base}nagi-penguin.svg" alt="Synthetic image fixture" width="48" height="48"><figcaption>Test caption</figcaption></figure></div><dialog class="photo-dialog" data-photo-dialog aria-label="Photo viewer"><button type="button" data-photo-close>Close</button><img data-photo-full alt=""><p data-photo-caption></p></dialog></main>`,
    );
    await route.fulfill({ response, body });
  });
  await page.goto(project);
  // There are no public photography entries. Exercise the actual gallery client
  // against a non-published fixture without adding content to the site.
  await page.addScriptTag({
    type: 'module',
    content:
      transpile(readFileSync('src/scripts/photo-viewer.ts', 'utf8'), {
        module: ModuleKind.ESNext,
      }) + '\ninitPhotoViewer();',
  });
  await page.locator('.photo-open').click();
  await expect(page.locator('[data-photo-dialog]')).toBeVisible();
  await expect(page.locator('[data-photo-caption]')).toHaveText('Test caption');
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-photo-dialog]')).not.toBeVisible();
  await expect(page.locator('.photo-open')).toBeFocused();
});

for (const language of ['', 'zh/']) {
  for (const width of [375, 768, 1440]) {
    test(`${language || 'en'} ${width}px themes, layout, mascot, keyboard and accessibility`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(base + language);
      await page.evaluate(() => document.fonts.ready);
      const motto = language
        ? '把你希望存在的東西，親手創造出來。'
        : 'Create what you wish existed.';
      await expect(page.locator('h1')).toHaveText(motto);
      for (const [theme, color] of [
        ['light', 'rgb(250, 250, 250)'],
        ['dark', 'rgb(9, 9, 11)'],
        ['system', 'rgb(250, 250, 250)'],
      ]) {
        await page.emulateMedia({ colorScheme: 'light' });
        await page.selectOption('#theme', theme);
        expect(
          await page
            .locator('body')
            .evaluate((body) => getComputedStyle(body).backgroundColor),
        ).toBe(color);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
        const accessibility = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze();
        expect(
          accessibility.violations.map((v) => ({
            id: v.id,
            nodes: v.nodes.map((n) => n.target),
          })),
        ).toEqual([]);
        if (width !== 768 && theme !== 'system')
          await page.screenshot({
            path: `docs/v4/screenshots/${language ? 'zh' : 'en'}-${width}-${theme}.png`,
            fullPage: true,
          });
      }
      await page.selectOption('#theme', 'dark');
      await page.reload();
      await expect(page.locator('#theme')).toHaveValue('dark');
      const penguin = page.locator('[data-penguin-toggle]');
      await penguin.click();
      await expect(penguin).toHaveAttribute('aria-pressed', 'true');
      await page.reload();
      await expect(penguin).toHaveAttribute('aria-pressed', 'true');
      await page.emulateMedia({ reducedMotion: 'reduce' });
      expect(
        await penguin
          .locator('img')
          .evaluate((img) => getComputedStyle(img).animationName),
      ).toBe('none');
      await page.goto(base + language);
      await page.keyboard.press('Tab');
      await expect(page.locator('.skip')).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(page.locator('main')).toBeFocused();
      await page
        .locator(`.language-switch a[lang="${language ? 'en' : 'zh-TW'}"]`)
        .click();
      await expect(page.locator('html')).toHaveAttribute(
        'lang',
        language ? 'en' : 'zh-TW',
      );
    });
  }

  test(`${language || 'en'} year accordion and confirmed event data`, async ({
    page,
  }) => {
    await page.goto(base + language + 'experience/');
    const years = page.locator('.timeline-year');
    expect(
      await years.evaluateAll((nodes) =>
        nodes.map((node) => ({
          text: node.querySelector('h3')?.textContent,
          open: node.hasAttribute('open'),
        })),
      ),
    ).toEqual([
      { text: '2026', open: true },
      { text: '2025', open: false },
      { text: '2024', open: false },
    ]);
    await years.nth(1).locator('summary').click();
    await expect(years.nth(1)).toHaveAttribute('open', '');
    await expect(page.locator('#ais3-eof-2026 time').first()).toHaveAttribute(
      'datetime',
      '2025-12-20',
    );
    await expect(
      page.locator('#first-robotics-competition time').first(),
    ).toHaveAttribute('datetime', '2026-08-13');
    await expect(page.locator('#first-robotics-competition')).toContainText(
      language ? '評審團獎' : "Judges' Award",
    );
    await expect(page.locator('.timeline-meta time')).toHaveCount(7);
    await expect(page.locator('.rankings')).toContainText('1007 / 8748');
    await expect(page.locator('.rankings')).toContainText('55 / 1450');
    const a11y = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    expect(a11y.violations.map((v) => v.id)).toEqual([]);
    await page.screenshot({
      path: `docs/v4/screenshots/${language ? 'zh' : 'en'}-experience.png`,
      fullPage: true,
    });
  });

  test(`${language || 'en'} full-text search, filters and article navigation`, async ({
    page,
  }) => {
    await page.goto(base + language + 'search/');
    await page.locator('#search-input').fill(language ? '醫療' : 'security');
    await expect(page.locator('.search-results li').first()).toBeVisible({
      timeout: 15000,
    });
    for (const link of await page
      .locator('.search-results a')
      .evaluateAll((nodes) =>
        nodes.map((node) => (node as HTMLAnchorElement).pathname),
      ))
      expect(link.startsWith(base)).toBe(true);
    await page.locator('.search-results a').first().click();
    await expect(page.locator('main')).toBeVisible();
    await page.goto(base + language + 'journal/');
    const options = await page.locator('#journal-tag option').allTextContents();
    if (options.length > 1) {
      await page.selectOption('#journal-tag', { index: 1 });
      const visible = page.locator('[data-journal-entry]:visible');
      expect(await visible.count()).toBeGreaterThan(0);
      expect(await visible.count()).toBeLessThanOrEqual(
        await page.locator('[data-journal-entry]').count(),
      );
    }
    await page.goto(
      base + language + 'journal/ctf-meets-malware-analysis-windows/',
    );
    await expect(page.locator('.article-prose')).toBeVisible();
    await expect(page.locator('.article-pagination a').first()).toBeVisible();
    await expect(page.locator('.journal-meta')).toContainText(
      language ? '分鐘' : 'min read',
    );
    await expect(page.locator('.journal-toc')).toBeVisible();
    const code = page.locator('.article-prose pre');
    if (await code.count())
      await expect(page.locator('.copy-code').first()).toBeVisible();
  });
}

test('RSS and search do not expose private project drafts', async ({
  request,
  page,
}) => {
  for (const path of ['rss.xml', 'zh/rss.xml']) {
    const response = await request.get(base + path);
    expect(response.status()).toBe(200);
    expect(await response.text()).not.toMatch(
      /nagi-medical-agent|ruralmed-sat|2000-01-01|home-lab/,
    );
  }
  await page.goto(base + 'search/');
  await page.locator('#search-input').fill('Nagi Firmware Lab');
  await expect(page.locator('[data-search-status]')).toHaveText(
    'No results found.',
  );
  await expect(page.locator('.search-results li')).toHaveCount(0);
});

test('navigation and articles remain readable without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4322' + base);
  await page.locator('.site-nav a').first().click();
  await expect(page.locator('h1')).toHaveText('Projects');
  await page.locator('.card h3 a').first().click();
  await expect(page.locator('.prose')).toBeVisible();
  await context.close();
});
