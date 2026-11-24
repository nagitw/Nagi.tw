# Nagi.tw Final Release

Release target: https://nagitw.github.io/Nagi.tw/
Status: **REOPENED — CONTENT RECOVERY IN PROGRESS**. The previous release remains
the rollback baseline; closure requires renewed engineering and content acceptance.
Date: 2026-11-24 (Asia/Taipei).

## Final scope

Preserved the existing Pure Black Editorial design and all restored Penguin
functionality. English is primary; Traditional Chinese uses /Nagi.tw/zh/.
The mascot reuses the original pixel artwork and wave/breathe/blink keyframes;
it only toggles a local greeting. No AI, backend, external API or new dependency.
Animations are finite and honor reduced motion. Keyboard, light/dark mascot
surfaces, no-JS display and responsive layouts were verified.

Astro site is https://nagitw.github.io and base is /Nagi.tw. Canonical,
hreflang, navigation, evidence links, assets, 16 sitemap URLs and robots.txt
match the approved Pages target. No CNAME or DNS change is required or made.
Unused starter favicons and obsolete demo verification were removed.

## Acceptance results

- PASS: Astro/TypeScript check, zero diagnostics; production build, 17 HTML pages.
- PASS: 10 schema tests, i18n tests, four About tests, Penguin provenance/contracts.
- PASS: editorial migration safeguards; no newly published drafts.
- PASS: static/About/release output validators, links/assets/fragments and SEO.
- PASS: all 17 pages at 320/768/1440px, both languages, images, no overflow/errors.
- PASS: Penguin keyboard greeting, reduced motion, light/dark surfaces, no JS and
  zero external requests. Inline silhouette is checked against the original SVG.
- PASS: disposable-copy content integration during this release iteration.
- PASS: dependency audit, zero vulnerabilities; source token-pattern scan and
  script syntax checks. Pattern scans are not a guarantee of secret absence.
- PASS: GitHub Actions build/deploy and public HTTPS acceptance. All 17 pages
  at 320/768/1440px passed on the live site, including Penguin keyboard interaction,
  reduced motion, light/dark surfaces, no-JS display and no external requests.
- PASS: all 16 public sitemap/canonical routes and 21 distinct local resources
  returned HTTP 200. An unknown route returned HTTP 404; the explicit 404.html
  asset correctly returned HTTP 200. No custom-domain/DNS dependency remains.

## Known technical limitations (accepted)

- No standalone Lint configuration. No linter was added; this is not a Lint pass.
- Historical strict migration baseline differs from later Projects/Research draft
  edits. It was not rewritten. The current editorial verifier passes and keeps
  Journal entries draft; immutable original Journal provenance remains checked.
- No full-site light theme; the existing website remains dark. The Penguin works
  on both light and dark surfaces. Firefox/WebKit and physical devices untested.
- The pre-existing draft-linked CYBERSEC image remains public with its previously
  documented rights limitation. No article or new factual claim was published.
- Browser QA uses installed Chrome and Playwright supplied via NAGI_PLAYWRIGHT.

Penguin source: nagitw/Nagi.tw commits c547622 (artwork/keyframes) and 952f055
(simple greeting). SVG Git blob: 4bc3390d5023defb6391e6070fd7989801a51a66.
SHA-256: b96fcf6e5f71019f2b667fee7c352bdc8fa1bc60289ef317f3fa0214030512a4.
The upstream historical preservation JSON has a different SHA-256; the restored
bytes match the independently fetched Git blob, not that outdated JSON value.

## Deployment record

Deployed application commit: `0688792e5003923c44cef933a9bbc3e274222fb2`.
GitHub Actions run: https://github.com/nagitw/Nagi.tw/actions/runs/45393969798
(build SUCCESS, deploy SUCCESS).
Live URL: https://nagitw.github.io/Nagi.tw/
Live validation: PASS, 2026-11-24 (Asia/Taipei), after the successful deployment.
The closure record is a documentation-only follow-up commit; the deployed
application commit above remains the release artifact. No application code was
changed after public acceptance.
Previous remote main (rollback): c54762236098c5c824ea73e26bd5829c222f25d2.
Remote ancestry is preserved; no force push or history replacement is used.

## Maintenance

This project is CLOSED / MAINTENANCE ONLY following successful live verification.
No further feature expansion is authorized. Maintain dependencies/security,
correctness, existing content and hosting only. Use Node 24.13.0 and npm ci;
README lists validation commands. Keep draft/publication and provenance safeguards.
Development must use astro dev --background per AGENTS.md.

Pushes to main run the existing GitHub Pages build/artifact/deploy flow, adapted
for this static app. CI runs schema/i18n/About/Penguin tests, editorial integrity,
check/build, output validators and dependency audit. Documentation-only changes
do not redeploy. Never upload a fixture build; run content integration only in a
disposable copy and rebuild after cleanup. The Pages origin serves this project
under /Nagi.tw/; its origin-level robots.txt belongs to the account root.

For rollback, restore the previous approved source tree in a new commit and use
the same Pages workflow, then verify HTTPS and representative routes. Retain
history and prior artifacts; do not delete the repository or change DNS.

Original 176-file SHA-256-verified local backup: Windows TEMP
nagi-final-20261124-191406. Local QA copy: nagi-final-integration-20261124-200606.
These temporary paths are not durable off-machine backups.
