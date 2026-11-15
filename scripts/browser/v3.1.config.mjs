import { defineConfig } from '@playwright/test';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../../', import.meta.url));
const prefix = (process.env.SITE_BASE || '/').replace(/\/$/, '');
const baseURL = `http://127.0.0.1:4399${prefix}/`;
export default defineConfig({
  testDir: '.', testMatch: 'editorial.spec.mjs', workers: 1, retries: 0, timeout: 60000,
  outputDir: `${root}/qa/browser/v3.1/results`,
  reporter: [['list'], ['json', { outputFile: `${root}/qa/browser/v3.1/results.json` }]],
  use: { baseURL, headless: true, browserName: 'chromium', locale: 'zh-TW', serviceWorkers: 'block', screenshot: 'only-on-failure', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'tablet', use: { viewport: { width: 768, height: 1024 }, hasTouch: true } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
    { name: 'small-mobile', use: { viewport: { width: 320, height: 568 }, isMobile: true, hasTouch: true } },
  ],
  webServer: { command: 'npm run preview -- --host 127.0.0.1 --port 4399', cwd: root, url: baseURL, reuseExistingServer: false, timeout: 60000 },
});
