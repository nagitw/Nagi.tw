import { defineConfig } from '@playwright/test';

const base = '/' + (process.env.SITE_BASE || '/').replace(/^\/+|\/+$/g, '');
const baseURL = `http://127.0.0.1:4399${base === '/' ? '/' : `${base}/`}`;

export default defineConfig({
  testDir: './tests/browser',
  outputDir: 'qa/browser/results',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 60000,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'qa/browser/report', open: 'never' }],
    ['json', { outputFile: 'qa/browser/report.json' }],
  ],
  use: {
    browserName: 'chromium',
    baseURL,
    headless: true,
    locale: 'en-US',
    timezoneId: 'Asia/Taipei',
    serviceWorkers: 'block',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'tablet', use: { viewport: { width: 768, height: 1024 }, hasTouch: true } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
    { name: 'small-mobile', use: { viewport: { width: 320, height: 568 }, isMobile: true, hasTouch: true } },
  ],
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4399',
    url: baseURL,
    reuseExistingServer: false,
    timeout: 60000,
  },
});
