# V3.1 GitHub Pages release validation

Target: https://nagitw.github.io/Nagi.tw/

Branch: feat/v3.1-editorial-redesign

Result: GO for release preparation. Remote GitHub Pages settings and an actual GitHub Actions deployment were not exercised.

## Reviewed source changes

These changes were already present when this validation session began and were retained:

- `.github/workflows/deploy.yml`: SITE_URL=https://nagitw.github.io; SITE_BASE=/Nagi.tw/.
- `scripts/test-ai-production.mjs`: AI source URL expectation uses the same origin and case-sensitive base.

PUBLIC_PENGUIN_AI_MODE remains offline and PUBLIC_PENGUIN_API_URL remains empty. Build, backend and browser jobs gate deploy through needs. Deployment retains scoped pages/id-token write permissions. Push trigger remains main; workflow_dispatch remains available. No workflow was triggered.

## Fresh local checks

All frontend checks used SITE_URL=https://nagitw.github.io, SITE_BASE=/Nagi.tw/, PUBLIC_PENGUIN_AI_MODE=offline and an empty PUBLIC_PENGUIN_API_URL. Playwright served the corresponding production artifact locally under /Nagi.tw/.

| Check | Result |
| --- | --- |
| npm run build | PASS, Astro check and 70 pages built |
| npm run typecheck | PASS |
| npm test | PASS |
| npm run validate:production | PASS, 99 files and 1,827 local references |
| npm run test:ai | PASS |
| Editorial source, regression and build checks | PASS, 51 articles |
| npm run test:browser | 160 passed |
| Playwright scripts/browser/v3.1.config.mjs | 28 passed |
| Backend pytest | 17 passed, one upstream Starlette/httpx deprecation warning |
| npm audit --audit-level=high | 0 vulnerabilities |
| Python pip_audit requirements.lock | No known vulnerabilities |
| Source secret pattern scan | PASS, 179 files |
| Reachable history secret pattern scan | PASS, 78 commits |
| git diff --check | PASS |

Production checks covered internal links, image/resource paths, RSS, sitemap, robots, canonical and language alternates, redirects and 404. Artifacts passed checks for private files, known secret patterns and loopback URLs. Secret pattern scanning is not a complete secret audit.

Logs: `qa/release-current-*.log`. Browser reports: `qa/browser/report.json` and `qa/browser/v3.1/results.json`.

Backup branch backup/pre-v3.1-main remains present. No website design, feature or research content changes were made. No commit, push, force push, merge, reset or deployment was performed.
