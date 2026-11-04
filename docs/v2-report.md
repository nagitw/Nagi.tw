# Nagi.tw v2 implementation report

## Checkpoint and preservation

Work is on `feat/nagi-v2`, uncommitted for review. The original tracked files remain recoverable from the branch base. Pre-existing changes were saved in `../.tmp/nagi-v2-checkpoint/` before implementation. SHA-256 comparisons confirm the existing `astro.config.mjs` and the tracked Notes diff are unchanged. No Notes files, DNS, deployment, Cloudflare, or GitHub settings were edited.

## Files changed

Updated:
- `src/pages/index.astro`
- `src/layouts/BaseLayout.astro`
- `src/components/SiteHeader.astro`
- `src/components/SiteFooter.astro`
- `src/components/NotesPreview.astro`
- `src/styles/global.css`
- `scripts/validate-build.mjs`
- `package.json`
- `README.md`

Added:
- `src/data/site.ts`
- `src/data/projects.ts`
- `src/data/research.ts`
- `src/data/experience.ts`
- `src/pages/research/index.astro`
- `src/pages/projects/index.astro`
- `src/pages/experience/index.astro`
- `src/pages/contact/index.astro`
- `scripts/test-site.mjs`
- `docs/v2-implementation.md`
- `docs/v2-report.md`

`astro.config.mjs` appears in Git status from the pre-existing domain swap; this implementation did not change it. No dependencies were added.

## Architecture and presentation

Five static Astro pages share a fixed desktop sidebar, per-page metadata, canonical URLs, RSS discovery, and a footer. The existing sitemap integration now includes all five pages. A compact mobile disclosure has a semantic button, expanded state, Escape handling, breakpoint reset, and a no-JavaScript navigation fallback. Theme selection is optional, with light as default, charcoal dark tokens, and guarded local storage. Focus styles and reduced-motion rules are included.

The homepage follows the approved name/focus/introduction, Currently, Featured Research, Featured Projects, and Recent Notes hierarchy. Dashboard layout, oversized serif hero, colorful borders and penguin were removed. System sans-serif typography, subdued green links, whitespace and thin rules provide the visual identity. There are no React/Vue components or remote fonts.

## Content migrated

- User-approved Hong Xin-Fu identity and current areas of interest.
- MedTrust prototype: documented device/gateway/evidence workflow, technologies, and explicit integrity-consistency-only scope. No Digital Signature, Identity Proof, or Non-repudiation claim. Missing public verification evidence remains explicit.
- Home Lab: personal service hosting, network boundaries, remote access and recovery practice.
- Medical IoT research question; conservative 5G and embedded/autonomous interests without invented results or publications.
- Eight selected training, community and competition participation entries from existing experience data; no inferred employment or awards.
- Existing email and GitHub profile.
- Up to three build-time RSS previews from external Notes, with visible fallback when unavailable. No local article collection or cached snapshot was introduced.

Typed records contain source provenance. Sparse optional fields are omitted instead of generating empty sections or links.

## Validation results

- `npm run check`: PASS, 0 errors, 0 warnings, 0 hints across 22 files.
- `npm run build`: PASS, five static pages and sitemap generated.
- Existing RSS parser test: PASS.
- `npm test`: PASS, including isolated builds with working and unavailable RSS fixtures, three-preview limit, and escaped untrusted description text.
- `npm run validate`: PASS, five routes, homepage hierarchy, unique metadata, active navigation, internal anchors, MedTrust limitations and Notes isolation.
- `git diff --check`: PASS; Git emits Windows line-ending normalization notices.
- Independent source review: one validation bug found and fixed. The validator had treated stylesheet URLs as page links; it now checks anchors. The failing validation was reproduced before the fix and passes afterward.
- Final diff and added files inspected. Domain config and tracked Notes diff preservation verified.

## Incomplete verification and omitted data

- The reference attachment was not accessible in this session. Implementation follows the written visual brief; direct image comparison is pending.
- The browser runtime returned no available browsers after connection recovery. Visual checks at 375, 768, 1024 and 1440+ pixels, keyboard interaction, theme persistence and runtime overflow checks remain unverified. Responsive rules are implemented but browser behavior is not claimed as tested.
- The production RSS URL failed with DNS `ENOTFOUND`, including outside the sandbox. The production build therefore has a fallback link rather than live previews. Fixture tests verify both paths without saving fixture content to the production build.
- Network Installation certification omitted because source locales disagree on the year (2024 versus 2026); user confirmation is needed before inclusion.
- Detailed 5G methods/results/publications, MedTrust public evidence/repository/demo links, and additional project claims remain omitted until supported data is supplied.
- No deployment performed. No commit, push, merge, or external settings changes performed.
