# Website Simplification Implementation Plan

> Execute inline with superpowers:executing-plans. The user approved the revised design and explicitly requested implementation in place; no further design gate or worktree is needed.

**Goal:** Simplify the static website while preserving all 35 baseline pages, content bytes, translations, image files, and editorial states.

**Architecture:** Keep Astro, existing routes and content loaders. Use shared CSS, native Markdown HTML images and one small native theme control. Retain existing MDX compatibility and cover metadata; no new production dependency.

**Tech Stack:** Astro, Markdown, CSS, native JavaScript, existing external Playwright installation for QA only.

**Spec:** User-approved revised design and implementation requirements in this conversation, 2026-11-26.

## Global Constraints

- Work in place. Do not commit, push, deploy, modify DNS or publish drafts.
- Preserve English-first and Traditional Chinese localization, `/Nagi.tw` base, and all existing public files and content.
- Light, Dark and System must work with persistence, with no theme dependency.
- Native image attributes survive; small images are not enlarged and no images are cropped.
- Verify 375px, 768px and 1440px, every baseline route, internal links and images.

## Review Focus

- System appearance changes after page load; explicit preferences override it.
- Storage denial, invalid preferences and disabled JavaScript leave readable content.
- Raw HTML image paths respect the deployment base; no automatic URL rewriting is promised.
- Long code, tables, captions and Chinese navigation must fit narrow viewports.
- Native image QA must use a separate build, without adding public fixture articles to source or final output.

## Tasks

- [x] 1. Record protected-file hashes, routes and before screenshots. Add browser acceptance checks and observe the missing theme control failure.
  Files: `scripts/verify-simplification.mjs`, `docs/simplification/`.
  Interfaces: baseline JSON contains protected hashes and HTML routes; browser audit consumes built output and optional fixture output.
- [x] 2. Add localized Light/Dark/System select and early preference loading; share light/dark CSS tokens with system fallback.
  Files: `src/components/ThemeControl.astro`, `src/layouts/Layout.astro`, `src/components/Footer.astro`, `src/styles/global.css`.
  Verify real browser selection, reload/navigation persistence, OS changes, invalid/blocked storage, and JavaScript-disabled readability.
- [x] 3. Remove decorative mascot from output and reading enhancement JS; use one native contents disclosure and one reading column. Preserve intrinsic image proportions everywhere.
  Files: `src/components/JournalArticle.astro`, `src/components/JournalToc.astro`, `src/components/EditorialImage.astro`, `src/styles/global.css`; remove unused `src/lib/journal-reading.ts` and `src/components/Penguin.astro` while retaining original public artwork.
  Verify all baseline pages plus isolated Markdown image fixtures at all widths and themes; capture after screenshots.
- [x] 4. Document image authoring and deployment paths. Update verifiers for the approved behavior; run schema, localization, recovery, static/release, Astro Check and production build.
  Files: `docs/content.md`, `README.md`, existing static/browser/mascot verification entrypoints, final report.
  Verify baseline routes and protected hashes exactly, no broken built links/assets/fragments, and no fixture routes in final output. Report stale historical test limitations explicitly.

## Execution ledger

- Ruling: Work in the current authoritative checkout, per the user's explicit in-place instruction; no commits or extra worktree.
- Ruling: Keep `/Nagi.tw` configuration unchanged; document literal root-relative URLs including this prefix. Custom-domain migration is documentation only.
- Ruling: Use a single native disclosure for article contents; remove progress, active-section tracking, copy buttons and injected heading controls.
- Pre-flight: Tasks 2/3 share global CSS; Task 4 verifies their rendered output. Preserve token names and existing content classes.
- Task 1 complete: 156 protected files and 35 HTML routes recorded; four before screenshots; browser check failed on missing theme select as expected.
- Task 2 complete: all three appearances, reload/language persistence, live System updates, invalid/denied storage and no-JS fallbacks verified in Chrome.
- Task 3 complete: 315 baseline browser cases and 18 bilingual native-image fixture cases passed; 24 after screenshots captured.
- Task 4 complete: schema (10), About (4), timeline (3), i18n, provenance, recovery (112 records), static/release checks and preservation passed. Astro Check: zero errors/warnings/hints. Production build: 35 pages.
- Independent review: no blocking issues. Toolbar-color finding corrected and regression-tested; unused image prop removed. Reviewer confirmed final theme code.
- Visual QA: reproduced pale inline Shiki code colors in light appearance; corrected the pre foreground override and added a rendered-color regression assertion. Final browser runs passed.
- Ruling: retain existing syntax-highlighting infrastructure but render code in theme-safe monochrome; no new highlighting dependency or config migration.
- Ruling: existing generic content-integration script is not used because its legacy root-path/cover assumptions are outside this change; dedicated isolated Markdown fixtures exercise the required behavior without modifying authoritative content.
- Handoff: keep all changes uncommitted in place, as explicitly requested. Temporary QA output stays ignored under `.astro`; no development server, deployment or DNS changes.
