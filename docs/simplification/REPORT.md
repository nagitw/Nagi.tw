# NAGI.TW simplification report

Implementation and local validation are complete. All 35 baseline pages remain.
No commit, push, deployment, DNS change or publication of an existing draft occurred.

## Before and after

| Area | Before | After |
| --- | --- | --- |
| Appearance | Forced black theme with no selector | Localized native Light, Dark and System select; warm paper light palette and retained black dark palette |
| Typography and structure | Existing editorial serif headings, system body fonts, whitespace and thin rules | Retained; no font downloads, new decorative components or visual framework |
| Article layout | Separate mobile/desktop contents, sticky desktop side column | One centered reading column and one native contents disclosure |
| Reading interactions | Progress bar, active-section scroll tracking, generated heading controls and copy buttons | Removed; native anchors, selection and browser navigation remain |
| Decoration | Animated, interactive footer mascot | Removed from output; original artwork file remains unchanged |
| Images | Cover component forced full width, 16:9 crop and generated width variants | Original cover dimensions, global responsive sizing, no forced enlargement or crop |
| Markdown images | Existing HTML-capable pipeline with limited authoring guidance | Same pipeline, explicitly documented and verified native img/figure/figcaption support |
| Code | Existing inline syntax colors designed for a dark background | Theme-safe monochrome code, with long lines scrolling inside their block |

## Changed files

Production files:

- `src/layouts/Layout.astro`: early native theme initialization, persistence, live system/toolbar updates; removes forced-dark metadata/style.
- `src/components/ThemeControl.astro` (new): English/Traditional Chinese labeled native appearance select.
- `src/components/Footer.astro`: appearance control replaces mascot output.
- `src/components/JournalArticle.astro`: removes reading enhancement script/progress and duplicate contents.
- `src/components/JournalToc.astro`: one native details/summary and standard heading anchors.
- `src/components/EditorialImage.astro`: original dimensions and no forced crop, upscale or width variants; removes unused card prop.
- `src/styles/global.css`: light/dark/system tokens, native selector styling, shared responsive image rule, readable code, and removal of unused reading-control/sidebar CSS.
- `src/components/Penguin.astro` (removed): unused decorative component.
- `src/lib/journal-reading.ts` (removed): unused scroll tracking, progress and injected controls.

Verification and documentation:

- `scripts/verify-simplification.mjs` (new): protected-file/route baseline, browser acceptance and isolated native-image fixtures.
- `scripts/verify-browser.mjs`: compatibility entrypoint for the expanded acceptance audit.
- `scripts/verify-static.mjs`: validates three appearance choices instead of forced-dark behavior.
- `scripts/verify-recovery.mjs`: updates only the obsolete mascot-presence assertion; keeps content/provenance checks.
- `scripts/penguin.test.mjs`: retains original artwork hashes and checks the decorative UI is absent from output.
- `docs/content.md`: native image examples, GitHub Pages/custom-domain path table, appearance and QA guidance.
- `README.md`: current workflow and verification commands.
- `docs/superpowers/plans/2026-11-26-simplification.md`: approved implementation plan and execution ledger.
- `docs/simplification/`: this report, baseline hashes/routes, three browser result JSON files and 28 PNG screenshots.

No dependency, lockfile, Astro configuration, route source, collection/schema,
editorial policy, existing public asset or content file was changed.

## Image verification

New article images belong in `public/images/blog/<article-slug>/`. On the current
deployment, native HTML uses `/Nagi.tw/images/blog/<article-slug>/<filename>`.
At a future root custom-domain deployment with `base: '/'`, it uses
`/images/blog/<article-slug>/<filename>`. A domain using the existing subpath retains
the existing prefix. Migration is documentation only; no deployment setting changed.
Raw HTML paths remain literal and are not automatically prefixed by Astro.

The native `.md` fixture was built only in the ignored disposable copy at
`.astro/simplification-fixture`; its two English/Traditional Chinese QA articles
are not present in source content or the production `dist`. No existing draft
status was changed. Test images also exist only inside that copy.

The 18 fixture cases cover both languages × three widths × three preferences:

- A standalone native img with src, alt, width, height and loading preserved.
- An 80×80 declared image that stays 80px wide.
- A 1200×1200 declared image that shrinks to the reading column without cropping.
- An image without width/height attributes using browser intrinsic sizing.
- A 120×60 intrinsic landscape SVG that stays 120×60 at every tested width.
- Native figure/figcaption, including wrapping Chinese captions.
- Actual decoded image dimensions, zero failed image decodes, and no cover-style object fitting.
- Markdown emphasis, headings, code and a wide table; theme-safe code contrast.
- Native image and contents/anchor operation with site JavaScript disabled.

The global rule is `img { display: block; max-inline-size: 100%; block-size: auto; }`.
It applies in both `.prose` and `.article-prose`; author dimensions are retained.
Existing MDX and cover/gallery metadata remain compatible; authors do not need
MDX, Astro Image imports, shortcodes or new plugins for body images.

## Validation results

| Command/check | Final result |
| --- | --- |
| `npm run check` | 49 files; 0 errors, 0 warnings, 0 hints |
| `npm run build` | Successful static production build; exactly 35 HTML pages |
| `npm run test:schema` | 10 tests passed |
| `npm run test:i18n` | Passed |
| `node scripts/about.test.mjs` | 4 tests passed |
| `node scripts/experience-timeline.test.mjs` | 3 tests passed |
| `npm run verify:static` | 15 base pages passed, including SEO/navigation/theme markup |
| `npm run verify:release` | All 35 pages; no broken internal links, local assets or fragments; 34 sitemap URLs and robots.txt passed |
| `npm run verify:recovery` | 112 recovery records; exact bodies/metadata and privacy exclusions passed |
| `node scripts/verify-about.mjs` | Bilingual About, language metadata, draft exclusion and internal links passed |
| `node scripts/security-migration.mjs --originals-only` | Five immutable snapshots and migrated image passed; paired with full recovery/release verification |
| `npm run test:penguin` | Original asset hashes unchanged; decorative UI absent from all 35 pages |
| `node scripts/verify-simplification.mjs preservation` | All 156 protected files byte-identical; all 35 baseline routes identical |
| `node scripts/verify-browser.mjs` | 315 cases: 35 pages × 375/768/1440px × Light/Dark/System; no horizontal overflow or page errors |
| Isolated build + `node scripts/verify-simplification.mjs fixture` | 37 pages only in disposable build (35 baseline + 2 QA pages); all 18 image cases passed |
| `git diff --check` | Passed |

The protected-file set includes all 135 files under `src/content`, all four
existing public files, route source files, Astro configuration, dependency manifests,
content schemas/selectors, localization and editorial policy. Evidence is in
[baseline.json](baseline.json), [audit-results.json](audit-results.json),
[fixture-results.json](fixture-results.json) and [before-results.json](before-results.json).

Theme checks include manual overrides, reload and language-navigation persistence,
live OS appearance changes, invalid preference fallback, denied storage, readable
no-JavaScript appearance, and matching browser toolbar color. Both localized theme
labels and equivalent language-switch destinations were checked. No external
network requests or animation were observed during the acceptance matrix.

The browser test first failed for the missing theme selector. Subsequent regression
assertions reproduced the OS-only toolbar mismatch and pale light-mode code text;
both were corrected and passed the final browser runs. Independent review found no
blocking issue and confirmed the final theme implementation.

## Screenshots

28 full-page PNGs are saved in this directory: four before, 16 production after,
and eight isolated native-image after screenshots. Representative comparisons:

| View | Before | After Light | After Dark |
| --- | --- | --- | --- |
| Desktop home (1440px) | [Before](before-home-1440.png) | [Light](after-home-1440-light.png) | [Dark](after-home-1440-dark.png) |
| Mobile home (375px) | [Before](before-home-375.png) | [Light](after-home-375-light.png) | [Dark](after-home-375-dark.png) |
| Desktop article | [Before](before-article-1440.png) | [Light](after-article-1440-light.png) | [Dark](after-article-1440-dark.png) |
| Mobile article | [Before](before-article-375.png) | [Light](after-article-375-light.png) | [Dark](after-article-375-dark.png) |
| Desktop native-image QA | — | [Light](after-native-images-1440-light.png) | [Dark](after-native-images-1440-dark.png) |
| Mobile native-image QA | — | [Light](after-native-images-375-light.png) | [Dark](after-native-images-375-dark.png) |
| Traditional Chinese mobile home | — | [Light](after-home-zh-375-light.png) | [Dark](after-home-zh-375-dark.png) |
| Traditional Chinese mobile image QA | — | [Light](after-native-images-zh-375-light.png) | [Dark](after-native-images-zh-375-dark.png) |

Desktop/mobile Photography screenshots preserve the existing empty state; no
photographs were invented, sourced or published for this change.

## Git diff summary and remaining issues

At handoff, the tracked diff is **14 files changed, 188 insertions and 389 deletions**.
This includes removal of the mascot component and reading enhancement module.
Git's tracked diff does not include the new theme component, QA script, plan,
report, baseline/result JSON and screenshots; these remain untracked for review.
All changes are deliberately uncommitted and unstaged.

No known acceptance failures remain. Local browser coverage used installed Google
Chrome through the existing external Playwright installation; Firefox/Safari were
not tested. Image fixtures use local SVG artwork and a simple SVG test trace;
this does not validate external hosts or future author-supplied assets. No live
deployment, DNS or external-link availability check was performed.

The older generic `test:content` script was not run: it writes/removes fixtures
and has legacy root-path/cover expectations. The dedicated disposable `.md` image
build covers this task without touching authoritative articles. Its output is
ignored under `.astro` and remains available for local inspection.

The existing build command uses `--force`, which prints Astro's expected
`data store cleared (force)` warning; Astro Check itself has zero diagnostics.
