import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import { launch } from 'chrome-launcher';
import { mkdirSync, writeFileSync } from 'node:fs';
const chrome = await launch({
  chromeFlags: ['--headless=new', '--disable-gpu', '--no-first-run'],
});
mkdirSync('docs/v4/lighthouse', { recursive: true });
const results = [];
try {
  for (const [name, path, desktop] of [
    ['en-mobile', '', false],
    ['zh-mobile', 'zh/', false],
    ['en-desktop', '', true],
    ['journal-mobile', 'journal/ctf-meets-malware-analysis-windows/', false],
  ]) {
    const report = await lighthouse(
      `http://127.0.0.1:4322/Nagi.tw/${path}`,
      {
        port: chrome.port,
        output: 'json',
        logLevel: 'error',
        onlyCategories: [
          'performance',
          'accessibility',
          'best-practices',
          'seo',
        ],
      },
      desktop ? desktopConfig : undefined,
    );
    if (!report) throw new Error('No Lighthouse report');
    writeFileSync(`docs/v4/lighthouse/${name}.json`, report.report);
    const scores = Object.fromEntries(
      Object.entries(report.lhr.categories).map(([key, value]) => [
        key,
        Math.round(value.score * 100),
      ]),
    );
    const failed = Object.values(report.lhr.audits)
      .filter(
        (a) =>
          a.score !== null &&
          a.score < 1 &&
          a.scoreDisplayMode !== 'informative',
      )
      .map((a) => ({
        id: a.id,
        title: a.title,
        score: a.score,
        description: a.description,
        details: a.details,
      }));
    results.push({ name, scores, failed });
    console.log(name, JSON.stringify(scores));
  }
  writeFileSync(
    'docs/v4/lighthouse/summary.json',
    JSON.stringify(results, null, 2) + '\n',
  );
} finally {
  chrome.kill();
}
