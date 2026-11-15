# V3.1 browser QA

The root Playwright setup was already uncommitted when V3.1 began and is deliberately not included in this change. This isolated package makes the new checks reproducible from the V3.1 commit:

```powershell
npm ci
npm run build
npm install --prefix scripts/browser
npm exec --prefix scripts/browser -- playwright install chromium
npm --prefix scripts/browser test
```

With Playwright already installed at the repository root, use `npx playwright test --config scripts/browser/v3.1.config.mjs`.

Reports, screenshots and traces go to `qa/browser/v3.1/`. The local preview process is owned and stopped by Playwright. No external service is needed by the pages. Tests cover 1440, 768, 390 and 320px viewports in Chromium, both languages, light/dark, reading tools, semantic/accessibility basics and local performance observations. These are not a comprehensive WCAG audit or field Core Web Vitals.

Published content currently has no fenced code blocks. The copy test intercepts a real article response with output from the production Markdown renderer before the real reading script runs. No test article, draft, or fixture route is added to `dist`.

Additional checks: `node scripts/test-editorial.mjs` and (after build) `node scripts/test-editorial-build.mjs`.
