import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, cpSync, symlinkSync, statSync } from 'node:fs';
import { resolve, join, relative, extname, sep } from 'node:path';

// QA only: use an existing Playwright installation; never a site dependency.
const mode = process.argv[2] ?? 'audit';
const output = resolve(process.env.NAGI_QA_OUT ?? 'docs/simplification');
const fixture = resolve(process.env.NAGI_FIXTURE_ROOT ?? '.astro/simplification-fixture');
assert.ok(fixture.startsWith(resolve('.astro') + sep), 'QA fixtures must stay inside the ignored .astro directory');
mkdirSync(output, { recursive: true });
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]);
const key = path => relative(process.cwd(), path).replaceAll('\\', '/');
const hashes = (paths = [
  ...walk('src/content'), ...walk('public'), ...walk('src/pages'),
  'astro.config.mjs', 'package.json', 'package-lock.json', 'src/content.config.ts',
  ...['content.ts', 'content-schema.ts', 'i18n.ts', 'editorial.mjs', 'editorial-policy.json'].map(p => `src/lib/${p}`),
]) => Object.fromEntries(paths.sort().map(path => [key(resolve(path)), createHash('sha256').update(readFileSync(path)).digest('hex')]));
const routes = root => walk(root).filter(p => p.endsWith('.html')).map(p => relative(root, p).replaceAll('\\', '/')).sort();
const save = (name, data) => writeFileSync(join(output, name), JSON.stringify(data, null, 2) + '\n');

if (mode === 'baseline') {
  assert.ok(!existsSync(join(output, 'baseline.json')), 'Do not overwrite the baseline');
  const pages = routes(resolve('dist'));
  assert.equal(pages.length, 35);
  save('baseline.json', { protected: hashes(), pages });
  console.log(`PASS: captured ${pages.length} routes and protected-file hashes`);
  process.exit(0);
}
if (mode === 'prepare-fixture') {
  assert.ok(!existsSync(fixture), 'Refusing to overwrite an existing QA copy');
  mkdirSync(fixture, { recursive: true });
  for (const path of ['src', 'public', 'scripts', 'docs/content-recovery', 'docs/security-migration', 'astro.config.mjs', 'package.json', 'package-lock.json', 'tsconfig.json']) {
    cpSync(path, join(fixture, path), { recursive: true });
  }
  symlinkSync(resolve('node_modules'), join(fixture, 'node_modules'), 'junction');
  const images = join(fixture, 'public/images/blog/native-image-qa');
  mkdirSync(images, { recursive: true });
  // Existing approved artwork, copied only into the ignored disposable QA build.
  cpSync('public/nagi.svg', join(images, 'mark.svg'));
  writeFileSync(join(images, 'wide.svg'), '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="60" viewBox="0 0 120 60"><rect width="120" height="60" fill="#fff"/><path d="M10 45L45 15L75 35L110 10" fill="none" stroke="#171717" stroke-width="2"/></svg>');
  for (const [suffix, language] of [['', 'en'], ['.zh', 'zh-TW']]) {
    writeFileSync(join(fixture, `src/content/journal/native-image-qa${suffix}.md`), `---\ntitle: Native image verification\ndescription: Isolated QA fixture\nslug: native-image-qa\nlanguage: ${language}\npublishedAt: "2026-11-26"\nstatus: published\nkind: note\n---\n\n## Native Markdown\n\nMarkdown **renders correctly**, including 繁體中文 and [a base-aware link](/Nagi.tw/journal/).\n\n<img src="/Nagi.tw/images/blog/native-image-qa/mark.svg" alt="Small native image" width="80" height="80" loading="lazy">\n\n<figure>\n  <img src="/Nagi.tw/images/blog/native-image-qa/mark.svg" alt="Large native image" width="1200" height="1200" loading="eager">\n  <figcaption>A native caption that wraps naturally on narrow screens. 原生圖片與圖說。</figcaption>\n</figure>\n\n<img src="/Nagi.tw/images/blog/native-image-qa/mark.svg" alt="Intrinsic native image" loading="lazy">\n\n## Technical content\n\n\`\`\`text\n${'technical-content '.repeat(18)}\n\`\`\`\n\n| Field | Explanation |\n| --- | --- |\n| native | ${'longtablevalue'.repeat(18)} |\n`);
  }
  for (const suffix of ['', '.zh']) {
    const path = join(fixture, `src/content/journal/native-image-qa${suffix}.md`);
    writeFileSync(path, readFileSync(path, 'utf8').replace('## Technical content\n\n', '## Technical content\n\n<img src="/Nagi.tw/images/blog/native-image-qa/wide.svg" alt="Small intrinsic landscape image" loading="lazy">\n\n'));
  }
  console.log(`Prepared disposable QA copy: ${fixture}. Build this copy before fixture verification.`);
  process.exit(0);
}

const baseline = JSON.parse(readFileSync(process.env.NAGI_QA_BASELINE ?? join(output, 'baseline.json'), 'utf8'));
assert.deepEqual(hashes(Object.keys(baseline.protected)), baseline.protected, 'Protected content, assets, routes, design and dependencies must remain byte-identical');
assert.deepEqual(routes(resolve('dist')), baseline.pages, 'All 35 baseline pages must remain, with no fixture routes');
if (mode === 'preservation') {
  console.log(`PASS: ${Object.keys(baseline.protected).length} protected files and all 35 baseline routes unchanged`);
  process.exit(0);
}
const require = createRequire(import.meta.url);
const { chromium, firefox } = require(process.env.NAGI_PLAYWRIGHT ?? 'playwright');
const browserName = process.env.NAGI_BROWSER ?? 'chrome';
assert.ok(['chrome', 'firefox'].includes(browserName));
const root = mode === 'fixture' ? join(fixture, 'dist') : resolve('dist');
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg' };
const server = createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (!url.pathname.startsWith('/Nagi.tw/')) return res.writeHead(404).end();
  let file;
  try { file = resolve(root, '.' + decodeURIComponent(url.pathname.slice('/Nagi.tw'.length))); }
  catch { return res.writeHead(400).end(); }
  if (url.pathname.endsWith('/')) file = join(file, 'index.html');
  if (!file.startsWith(root + sep) || !existsSync(file) || !statSync(file).isFile()) return res.writeHead(404).end();
  res.setHeader('Content-Type', mime[extname(file)] ?? 'application/octet-stream');
  res.end(readFileSync(file));
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;
const home = `${origin}/Nagi.tw/`;
let browser;
const result = { mode, browser: browserName, cases: [], screenshots: [], errors: [] };
try {
  browser = browserName === 'firefox' ? await firefox.launch({ headless: true }) : await chromium.launch({ channel: 'chrome', headless: true });
  result.version = browser.version();
  const context = await browser.newContext({ colorScheme: 'light' });
  const page = await context.newPage();
  page.on('pageerror', e => result.errors.push(e.message));
  const externalRequests = [];
  page.on('request', request => { if (!request.url().startsWith(origin + '/')) externalRequests.push(request.url()); });
  const shot = async name => {
    await page.screenshot({ path: join(output, name), fullPage: true });
    result.screenshots.push(name);
  };
  if (mode === 'before') {
    for (const width of [375, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const [name, route] of [['home', ''], ['article', 'journal/ctf-meets-malware-analysis-windows/']]) {
        await page.goto(home + route);
        await shot(`before-${name}-${width}.png`);
      }
    }
  } else {
    await page.goto(home);
    assert.equal(await page.locator('#theme').count(), 1, 'Missing Light/Dark/System theme control');
    const background = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    // matchMedia change events are asynchronous; wait for the observable result.
    const toolbar = color => page.waitForFunction(expected => [...document.querySelectorAll('meta[name="theme-color"]')].every(tag => tag.getAttribute('content') === expected), color, { timeout: 2000 });
    const light = 'rgb(250, 249, 246)', dark = 'rgb(0, 0, 0)';
    await page.locator('#theme').selectOption('light');
    assert.equal(await background(), light);
    await toolbar('#faf9f6');
    await page.locator('#theme').selectOption('dark');
    assert.equal(await background(), dark);
    await toolbar('#000000');
    await page.reload();
    assert.equal(await page.locator('#theme').inputValue(), 'dark');
    assert.equal(await background(), dark);
    await page.goto(home + 'zh/');
    assert.equal(await page.locator('#theme').inputValue(), 'dark', 'Preference survives language navigation');
    assert.equal(await page.locator('label[for="theme"]').innerText(), '外觀');
    await page.locator('#theme').selectOption('system');
    await page.emulateMedia({ colorScheme: 'light' });
    assert.equal(await background(), light);
    await page.emulateMedia({ colorScheme: 'dark' });
    assert.equal(await background(), dark, 'System updates live');
    await toolbar('#000000');
    await page.locator('#theme').selectOption('light');
    assert.equal(await background(), light, 'Manual selection overrides system');
    await page.evaluate(() => localStorage.setItem('nagi-theme', 'invalid'));
    await page.reload();
    assert.equal(await page.locator('#theme').inputValue(), 'system', 'Invalid storage falls back to system');
    assert.equal(await background(), dark);
    result.theme = 'PASS: manual choices, reload, language navigation, system live changes, invalid preference';

    const tested = mode === 'fixture' ? ['journal/native-image-qa/index.html', 'zh/journal/native-image-qa/index.html'] : baseline.pages;
    for (const width of [375, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const theme of ['light', 'dark', 'system']) {
        await page.locator('#theme').selectOption(theme);
        await page.emulateMedia({ colorScheme: 'dark' });
        for (const file of tested) {
          const route = file.replace(/index\.html$/, '');
          const response = await page.goto(home + route);
          assert.equal(response.status(), 200, route);
          await page.locator('.timeline-year').evaluateAll(details => details.forEach(detail => { detail.open = true; }));
          await page.evaluate(async () => {
            await Promise.all([...document.images].map(async img => { img.loading = 'eager'; await img.decode().catch(() => {}); }));
          });
          const state = await page.evaluate(() => ({
            overflow: document.documentElement.scrollWidth > innerWidth,
            lang: document.documentElement.lang,
            switches: [...document.querySelectorAll('.language-switch a')].map(a => a.getAttribute('href')),
            background: getComputedStyle(document.body).backgroundColor,
            codeColor: document.querySelector('.article-prose pre code') ? getComputedStyle(document.querySelector('.article-prose pre code')).color : null,
            images: [...document.images].map(img => ({ src: img.getAttribute('src'), alt: img.getAttribute('alt'), width: img.getBoundingClientRect().width, height: img.getBoundingClientRect().height, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight, complete: img.complete, objectFit: getComputedStyle(img).objectFit })),
            animated: document.getAnimations().length,
            readingControls: document.querySelectorAll('.journal-progress,.journal-copy,.journal-permalink,[data-penguin-toggle]').length,
          }));
          assert.equal(state.overflow, false, `${width} ${theme} ${route}: overflow`);
          assert.equal(state.lang, route.startsWith('zh/') ? 'zh-TW' : 'en');
          if (file !== '404.html') {
            const english = route.replace(/^zh\//, '');
            const chinese = 'zh/' + english;
            const available = mode === 'fixture' ? routes(root) : baseline.pages;
            const target = candidate => available.includes(candidate + 'index.html') ? candidate : candidate.replace(/[^/]+\/$/, '');
            assert.deepEqual(state.switches, ['/Nagi.tw/' + target(english), '/Nagi.tw/' + target(chinese)], `${route}: language equivalents`);
          }
          assert.equal(state.background, theme === 'light' ? light : dark);
          assert.equal(state.animated, 0, `${route}: decorative animation`);
          assert.equal(state.readingControls, 0, `${route}: unnecessary interactions`);
          for (const image of state.images) {
            assert.ok(image.complete && image.naturalWidth > 0, `${route}: broken image ${image.src}`);
            assert.notEqual(image.alt, null, `${route}: missing alt`);
            assert.notEqual(image.objectFit, 'cover', `${route}: cropped image`);
          }
          if (mode === 'fixture') {
            assert.equal(state.codeColor, theme === 'light' ? 'rgb(48, 48, 48)' : 'rgb(212, 212, 212)', 'Code must remain readable against the selected theme background');
            assert.equal(await page.locator('.article-prose strong').innerText(), 'renders correctly');
            assert.equal(await page.locator('.article-prose figure figcaption').count(), 1);
            assert.equal(state.images.length, 4);
            assert.equal(state.images[0].width, 80, 'Small image must not enlarge');
            for (const image of state.images.slice(0, 3)) {
              assert.equal(image.src, '/Nagi.tw/images/blog/native-image-qa/mark.svg');
              assert.ok(Math.abs(image.width / image.height - image.naturalWidth / image.naturalHeight) < .01, 'Image aspect ratio preserved');
            }
            assert.ok(state.images[1].width <= width, 'Large image fits');
            assert.equal(state.images[3].width, 120, 'Intrinsic small landscape image must not enlarge');
            assert.equal(state.images[3].height, 60, 'Landscape ratio must not be cropped');
          }
          result.cases.push({ width, theme, route, images: state.images.length });
          if ([375, 1440].includes(width) && ['light', 'dark'].includes(theme)) {
            const screenshots = process.env.NAGI_QA_BASELINE
              ? { 'about/': 'about', 'zh/about/': 'about-zh', 'experience/': 'experience', 'zh/experience/': 'experience-zh' }
              : { '': 'home', 'zh/': 'home-zh', 'journal/ctf-meets-malware-analysis-windows/': 'article', 'photography/': 'photography' };
            const name = mode === 'fixture' ? (route.startsWith('zh/') ? 'native-images-zh' : 'native-images') : screenshots[route];
            if (name) await shot(`after-${name}-${width}-${theme}.png`);
          }
        }
      }
    }
    // Loading is changed above only to force offscreen assets to decode. Verify original native attributes on a fresh document.
    if (mode === 'fixture') {
      await page.goto(home + 'journal/native-image-qa/');
      const small = page.locator('img[alt="Small native image"]');
      assert.equal(await small.getAttribute('width'), '80');
      assert.equal(await small.getAttribute('height'), '80');
      assert.equal(await small.getAttribute('loading'), 'lazy');
      assert.equal(await page.locator('img[alt="Large native image"]').getAttribute('loading'), 'eager');
    }
    const blocked = await browser.newContext({ colorScheme: 'light' });
    await blocked.addInitScript(() => {
      Object.defineProperty(Storage.prototype, 'getItem', { value() { throw new Error('Storage blocked'); } });
      Object.defineProperty(Storage.prototype, 'setItem', { value() { throw new Error('Storage blocked'); } });
    });
    const blockedPage = await blocked.newPage();
    const blockedErrors = [];
    blockedPage.on('pageerror', e => blockedErrors.push(e.message));
    await blockedPage.goto(home);
    await blockedPage.locator('#theme').selectOption('dark');
    assert.equal(await blockedPage.evaluate(() => getComputedStyle(document.body).backgroundColor), dark);
    assert.deepEqual(blockedErrors, []);
    await blocked.close();
    for (const colorScheme of ['light', 'dark']) {
      const noJS = await browser.newContext({ javaScriptEnabled: false, colorScheme });
      const noJSPage = await noJS.newPage();
      await noJSPage.goto(home + (mode === 'fixture' ? 'journal/native-image-qa/' : 'journal/ctf-meets-malware-analysis-windows/'));
      assert.equal(await noJSPage.evaluate(() => getComputedStyle(document.body).backgroundColor), colorScheme === 'light' ? light : dark);
      assert.equal(await noJSPage.locator('#theme').isDisabled(), true);
      await noJSPage.locator('.journal-toc summary').click();
      assert.notEqual(await noJSPage.locator('.journal-toc details').getAttribute('open'), null, 'Contents disclosure works without JavaScript');
      await noJSPage.locator('.journal-toc a').first().click();
      assert.ok(new URL(noJSPage.url()).hash, 'Native heading links work without JavaScript');
      if (mode === 'fixture') {
        assert.equal(await noJSPage.locator('figure figcaption').count(), 1);
        const small = noJSPage.locator('img[alt="Small native image"]');
        await small.scrollIntoViewIfNeeded();
        // Firefox disables promise jobs along with page JavaScript; inspect native
        // image loading synchronously rather than awaiting HTMLImageElement.decode().
        assert.equal(await small.evaluate(img => img.complete && img.naturalWidth > 0 && img.getBoundingClientRect().width === 80), true, 'Native Markdown image works without JavaScript');
      }
      await noJS.close();
    }
    assert.deepEqual(result.errors, []);
    assert.deepEqual(externalRequests, [], 'No external requests or JavaScript services');
    result.fallback = 'PASS: denied storage, JavaScript disabled in both system appearances';
  }
  save(`${mode}-results.json`, result);
  console.log(`PASS: ${mode}, ${result.cases.length} responsive/theme/route cases, ${result.screenshots.length} screenshots`);
} finally {
  await browser?.close();
  await new Promise(r => server.close(r));
}
