import { chromium } from '@playwright/test';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import os from 'node:os';

// Start `npm run dev -- --host 127.0.0.1 --port 4398` in a separate terminal first.
const root = 'qa/browser';
mkdirSync(root, { recursive: true });
const log = {
  platform: os.platform(), release: os.release(), architecture: os.arch(), node: process.version,
  playwright: JSON.parse(readFileSync('node_modules/@playwright/test/package.json', 'utf8')).version,
  executable: chromium.executablePath(), console: [], pageErrors: [], blockedExternal: [],
};
let browser;
try {
  browser = await chromium.launch();
  log.chromium = browser.version();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, serviceWorkers: 'block' });
  await context.route('**/*', route => {
    if (new URL(route.request().url()).origin === 'http://127.0.0.1:4398') return route.continue();
    log.blockedExternal.push(route.request().url());
    return route.abort();
  });
  const page = await context.newPage();
  page.on('console', message => log.console.push({ type: message.type(), text: message.text() }));
  page.on('pageerror', error => log.pageErrors.push(String(error)));
  const response = await page.goto('http://127.0.0.1:4398/', { timeout: 30000 });
  log.devStatus = response.status();
  await page.locator('.chat-launcher').waitFor({ state: 'visible' });
  log.title = await page.title();
  log.penguinMode = await page.locator('#penguin-chat').getAttribute('data-mode');
  await page.screenshot({ path: `${root}/dev-smoke.png` });
  if (log.devStatus !== 200 || log.pageErrors.length || log.console.some(entry => entry.type === 'error') || log.blockedExternal.length || log.penguinMode !== 'mock') {
    throw new Error('Dev browser smoke failed; see environment.json');
  }
  log.passed = true;
} catch (error) {
  log.passed = false;
  log.error = String(error);
  process.exitCode = 1;
} finally {
  await browser?.close();
  writeFileSync(`${root}/environment.json`, JSON.stringify(log, null, 2));
  console.log(JSON.stringify(log, null, 2));
}
