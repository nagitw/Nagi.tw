import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/v4',
  fullyParallel: false,
  workers: 1,
  timeout: 30000,
  outputDir: '.astro/v4-test-results',
  reporter: [['list'], ['json', { outputFile: 'docs/v4/tests.json' }]],
  use: {
    baseURL: 'http://127.0.0.1:4322',
    channel: 'chrome',
    headless: true,
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'node scripts/v4-serve.mjs',
    url: 'http://127.0.0.1:4322/Nagi.tw/',
    reuseExistingServer: true,
  },
});
