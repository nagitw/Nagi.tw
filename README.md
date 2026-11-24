# Nagi.tw

**CLOSED / MAINTENANCE ONLY** — final editorial selection and public verification passed. Unconfirmed facts remain withheld; see [content audit](./CONTENT-AUDIT.md).

Personal cybersecurity and engineering portfolio using Astro, Markdown/MDX and static generation. Published at https://nagitw.github.io/Nagi.tw/ with English primary and Traditional Chinese at `/Nagi.tw/zh/`. The Pure Black Editorial design is finalized. See [FINAL-RELEASE.md](./FINAL-RELEASE.md) for release status and maintenance limits.

## Architecture

- `src/content.config.ts`: Projects, Research, Journal, Photography and Experience collections.
- `src/lib/content-schema.ts`: compatible contracts, optional evidence/progress, publication selector and Profile schema.
- `src/lib/sections.ts`: section metadata and the single public Profile source consumed by About.
- `src/lib/content.ts`: published queries, language preference and links.
- `src/pages/`, `src/components/`, `src/layouts/`: static routes and shared presentation.
- `src/styles/global.css`: existing design tokens and typography.
- `docs/content.md`: field definitions, editorial approval and validation workflow.
- `docs/security-migration/`: immutable Journal snapshots and migration provenance.

No separate Profile collection, parallel content database or backend is needed. New optional metadata is not automatically rendered by the existing templates.

## Development

Use Node.js `>=22.23.4`, the existing lockfile and [AGENTS.md](./AGENTS.md). Work in the authoritative Windows repository; do not modify the WSL preview copy. Start development in background mode:

```sh
npm run astro -- dev --background
```

Manage with `npm run astro -- dev status`, `npm run astro -- dev logs`, and `npm run astro -- dev stop`.

## Validation

```sh
npm run test:schema
npm run test:i18n
node scripts/security-migration.mjs --originals-only
npm run check
npm run build
npm run verify:static
node scripts/about.test.mjs
node scripts/verify-about.mjs
npm run verify:release
npm run verify:recovery
npm audit
npm run test:penguin
```

The default migration check preserves the exact original migration baseline. `--originals-only` checks provenance only. `--editorial` checks separately approved revision records and still requires every Journal entry to remain draft. Read [content maintenance](./docs/content.md) before selecting another mode. Passing schema/hash checks cannot prove facts or grant publication permission. Never rewrite immutable snapshots or baseline manifest hashes.

The content-recovery release pairs `--originals-only` with `verify:recovery`: the latter verifies every restored public body and metadata against pinned historical sources, privacy exclusions, and unchanged remaining content. Fetch full Git history before running it. The historical strict/editorial migration modes remain unchanged and are tested against their original draft fixture; they do not authorize or validate this separately authorized publication recovery.

Integration tests create/remove fixtures: use only a disposable Windows QA copy. The empty-site assertion does not apply to published content. Build writes local `dist/`; it does not deploy. The editorial selection currently includes 35 HTML pages and 34 indexable sitemap URLs; `verify:static` covers the 15 base pages and the release/recovery verifiers cover the complete output.

## Publication and privacy

The user's Final Content Recovery request separately authorizes restoring previously public, source-backed content. The exact scope is pinned in `docs/content-recovery/manifest.json`: historical public bodies (including the old private-plan exclusions), original recorded results and dates. The existing BugTraceAI case study remains unchanged; the remaining 16 drafts stay private. Current public presentation is additionally restricted by src/lib/editorial-policy.json; hidden source files and original results remain preserved. Do not treat this recovery as permission to publish other drafts, private plans or disputed archive candidates. Original author-reported results are not newly certified official results.

Editorial `status` is separate from `developmentStatus`/`researchStatus`. Featured flags and dates do not grant or schedule publication. The shared selector excludes drafts/archives; a directory alone provides no publication protection.

Never add legal names, private contacts, excluded education, secrets, patient information or confidential research. Drafts are not confidential storage; `public/` assets can be emitted even when their article is draft. Review evidence links and images for facts, privacy and rights.

Preserve a hash-verified baseline including untracked work before editing. Do not reset, clean or overwrite existing work. Phase 10.2 authorizes content architecture only, not publication, deployment or changes to the design system.
