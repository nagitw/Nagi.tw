# Nagi.tw V4 — Release Candidate

Latest content follow-up: [Portfolio update and outstanding evidence](PORTFOLIO-UPDATE.md). Current build has 41 pages; the measurements below describe the original V4 RC and were not rerun as a full matrix for the content follow-up.

Status: **LOCAL RC — awaiting final user approval**. Branch `feat/nagi-v4`; implementation checkpoint `78ecc5a`. This report is committed by the following RC checkpoint (use `git log -1` for its full SHA).

Production stays on `e01fc2f51f88c077cb6997b0dba7701879e6fa0b`. No merge, push, deployment, DNS or domain change was performed. The final `STABLE / MAINTENANCE ONLY` label is intentionally reserved for the approved production release after live verification.

## Preview and screenshots

Complete production-build preview, including Pagefind:

- English: http://127.0.0.1:4322/Nagi.tw/
- Traditional Chinese: http://127.0.0.1:4322/Nagi.tw/zh/
- Search: http://127.0.0.1:4322/Nagi.tw/search/

The retained preview server is `node scripts/v4-serve.mjs`. The Astro background dev server was started using `astro dev --background` and stopped after implementation; use the production preview for acceptance.

Real Chrome screenshots:

- [English desktop, dark](screenshots/en-1440-dark.png)
- [English desktop, light](screenshots/en-1440-light.png)
- [Traditional Chinese desktop, dark](screenshots/zh-1440-dark.png)
- [Traditional Chinese mobile, light](screenshots/zh-375-light.png)
- [English mobile, dark](screenshots/en-375-dark.png)
- [Traditional Chinese experience](screenshots/zh-experience.png)

## Implemented

Modern Research Studio tokens, local Geist / Geist Mono / Noto Sans TC fonts, a shared responsive editorial layout, exact bilingual motto, four research interests, public research and project stages, selected work, latest writing, GitHub contact and the unchanged original penguin asset with pause/persistence/reduced-motion support.

Journal has Pagefind full-text search, category/tag filters, existing TOC, Astro's built-in Shiki, copy controls, reading time, previous/next links, localized RSS and SEO metadata. Search indexes 34 public content pages; search pages and noindex output are explicitly excluded. Results use base-aware URLs and text nodes, not HTML injection.

Photography supports responsive lazy images and a keyboard-accessible native dialog. There are **zero approved public photography entries** in the baseline, so the honest empty state remains. The only source JPEG remains excluded by the existing rights policy; no new raster/photo metadata is exposed. Gallery/code-copy interaction tests use isolated synthetic browser fixtures, never published pages.

Experience preserves the annual accordion and timeline, descending years/latest year open, four confirmed date ranges and all valuable public records. Confirmed rankings are visible; unknown years are not inferred.

## Content difference

See [migration mapping](MIGRATION.md) and [immutable baseline](baseline.json).

- All 140 original content/assets remain byte-identical, including original articles, descriptions and penguin SVG.
- All 35 old HTML paths remain; two search pages are additive (37 HTML files total).
- No hidden source or Git history was deleted; draft/publication restrictions remain in force.
- Both former production CSS URLs are retained for cached English/Chinese HTML.
- No invented research results, role, degree, certification, publication, affiliation, medical deployment or private contact was added.

## Actual verification

| Check | Result |
|---|---|
| Astro Check / strict TypeScript | 0 errors, 0 warnings, 0 hints; 71 files |
| ESLint | Passed |
| Prettier | Passed |
| Production build | Passed; 37 HTML pages |
| Pagefind | 34 public pages; both locales search successfully |
| Original content/assets | 140 original hashes unchanged; one additional preserved CSS file |
| Historical recovery/privacy | 112 recovered records and five immutable source snapshots passed; private/withdrawn exclusions preserved |
| Schema | 10/10 tests passed |
| About contracts | 4/4 tests passed |
| i18n / publication safeguards | Passed |
| All internal links, fragments, assets, canonical URLs | Passed across all 37 pages |
| Sitemap / robots / RSS / 404 | Passed; 36 indexable sitemap URLs, localized feeds, noindex 404 |
| Browser acceptance | 14/14 passed, zero skips/flaky cases; [raw sanitized result](tests.json) |
| Automated accessibility | No WCAG A/AA violations across all 37 routes; homepage themes also tested at 375/768/1440px |
| Theme, language, timeline, mascot | Passed, including persistence, reduced motion, keyboard and no-JS article/navigation fallback |
| Code copy / photo dialog | Passed with isolated fixtures; Escape and focus return verified |
| Dependencies | npm audit: 0 vulnerabilities |

Lighthouse measured against the built preview using the official default mobile and official desktop configurations (Chrome, simulated throttling). These are measured samples, not a claim that every page or every production connection has the same score.

| Sample | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| English mobile home | 96 | 100 | 100 | 100 |
| Traditional Chinese mobile home | 96 | 100 | 100 | 100 |
| English desktop home | 100 | 100 | 100 | 100 |
| English mobile Journal article | 96 | 100 | 100 | 100 |

[Raw Lighthouse reports](lighthouse/summary.json) contain the measured audit details. An initial desktop experiment incorrectly retained mobile throttling; the final report uses Lighthouse's official desktop preset. No scores were invented.

## Review and decisions

A separate read-only whole-branch review found no Critical or Important blocker. Browser testing subsequently caught and fixed a transient contrast failure during theme color transitions; semantic colors now switch immediately. All 14 cases passed afterward.

Decisions: use the requested feature branch in the existing clean checkout; preserve all unapproved drafts; present the four requested domains as research interests; do not invent event years for K17/picoCTF; retain the empty photography collection; use GitHub as the verified public contact. These limits prioritize factual scope and leave unverified projects off the public site.

Minor deferred: during the 180ms search debounce, an older response can briefly show results for the previous input before the newest query replaces it. It does not expose drafts or change index permissions.

## Release gate

Review this RC before merging to the production branch. The existing workflow retains its deployment mechanism and adds V4 lint/format/integrity checks. After explicit approval, merge without force push, deploy using that workflow, then verify all live major routes and generated assets before marking **Nagi.tw V4 — STABLE / MAINTENANCE ONLY**.
