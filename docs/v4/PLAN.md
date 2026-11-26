# Nagi.tw V4 implementation plan

**Goal:** Modern Research Studio release candidate on `feat/nagi-v4`; production stays on `e01fc2f` until final approval.
**Architecture:** Retain Astro static output, strict TypeScript, existing Content Collections, bilingual URLs and source bodies. Use shared editorial layouts, locally hosted fonts and Pagefind. Existing publication restrictions stay in force.
**Spec:** User's NAGI.TW V4 specification (2026-11-27), including exact bilingual motto and final deployment approval.
**Execution:** Inline, six checkpoints. User requests autonomous execution; no intermediate design gate or unnecessary parallel agents.

## Design decisions
Obsidian/Platinum canvas with fine rules, Swiss sans typography and generous editorial columns. Home leads with the exact motto, a restrained research diagram, selected public work and latest writing. Lists replace repeated boxed cards. Light/Dark/System share semantic tokens. Geist, Noto Sans TC and Geist Mono are hosted locally. The original pixel penguin returns as a small optional animated companion.

## Tasks and validation
- [x] Phase 1: Capture hashes for all original content/assets and every built URL in `docs/v4/baseline.json`; record public/draft selection and migration mapping. Confirm production and clean branch.
- [x] Phase 2: Add `tokens.css`, shared header/footer/layout and mascot. Test exact motto, preserved mascot, theme persistence, mobile navigation, reduced motion and base-aware assets.
- [x] Phase 3: Implement Home, Research directions, publication-safe project listings, About, Journal search/filter and article navigation, RSS and gallery dialog. Tests cover empty photography, coverless articles, fallback language, no-JS navigation and search paths.
- [x] Phase 4: Preserve all original source hashes and old routes, restrict dates to four user-confirmed events, clean placeholder result text in presentation, retain confirmed rankings. Do not publish drafts or excluded personal/network notes. Keep both previous CSS assets for cached production documents.
- [x] Phase 5: Add compatible Pagefind, ESLint, Prettier and Playwright tools; run schema, type, lint, build, integrity, all-link and browser acceptance. Measure Lighthouse rather than assuming scores. Review metadata of any photos used; do not emit unapproved photography.
- [ ] Phase 6: Commit RC, keep a working local preview, save real screenshots and a concise results report with limitations and SHA. No merge, production push or deployment before user approval.

## Review focus
Draft text must never enter RSS/search; root and Chinese assets must retain `/Nagi.tw/`; previous CSS URLs must survive; translated fallback must not claim a translation exists; all original article bodies and source images remain hash-identical.

## Migration
All 35 existing HTML paths remain unchanged. New search/RSS routes are additive. No source files are deleted. Historical private drafts and rights-restricted images remain excluded. The photography collection currently has no published entry: retain its real empty state instead of fabricating a gallery.

## Ledger
- Phase 1: baseline production is successful Actions run 45668153285, `e01fc2f51f88c077cb6997b0dba7701879e6fa0b`; Pages workflow source, no CNAME.
- Ruling: use the requested isolated feature branch in the current clean checkout; do not create a second checkout or change the production branch.
- Ruling: named unverified project/research drafts remain private. Public research interests come from the user's explicit V4 scope; no claimed experiments, papers, affiliations or completed results are added.

- Phase 5: schema 10/10, About contracts 4/4, i18n, immutable snapshots, 112 recovered records, original 140 source/asset hashes, 37 route/asset/link checks, Astro Check (zero diagnostics), lint, Prettier and npm audit passed. Playwright 14/14 includes all-route axe scans and a synthetic gallery/code-copy fixture.
- Final review: no Critical/Important issues. Minor deferred: during the 180ms search debounce, an old response can briefly render for the prior query; the next query replaces it.
- Final verification found and fixed theme color transitions producing transient low contrast; immediate semantic color switching now passes all theme/width axe cases.
