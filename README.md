# Nagi.tw

**CLOSED / MAINTENANCE ONLY** — final release verified at https://nagitw.github.io/Nagi.tw/. See [release evidence and known limits](./FINAL-RELEASE.md).

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
node scripts/security-migration.mjs --editorial
npm run check
npm run build
npm run verify:static
node scripts/about.test.mjs
node scripts/verify-about.mjs
npm run verify:release
npm audit
npm run test:penguin
```

The default migration check preserves the exact original migration baseline. `--originals-only` checks provenance only. `--editorial` checks separately approved revision records and still requires every Journal entry to remain draft. Read [content maintenance](./docs/content.md) before selecting another mode. Passing schema/hash checks cannot prove facts or grant publication permission. Never rewrite immutable snapshots or baseline manifest hashes.

The current release uses `--editorial`: later Projects/Research draft edits intentionally differ from the migration's historical hashes. The strict historical baseline is preserved and does not pass against those later drafts. See [FINAL-RELEASE.md](./FINAL-RELEASE.md) for release status, limitations and maintenance.

Integration tests create/remove fixtures: use only a separately authorized disposable Windows QA copy. The empty-site assertion does not apply to the published BugTraceAI baseline. Build writes local `dist/`; it does not deploy. Verify both BugTraceAI detail routes in addition to the static check's 15 base pages. Current production has 17 HTML pages and no Journal detail pages.

## Publication and privacy

Only the existing bilingual BugTraceAI-CLI contribution case study is published. All five migrated Journal articles remain draft. The retail security-culture article must not be edited or published without separate explicit authorization. Unknown project, research and experience facts stay absent or draft; never invent features, outcomes, affiliations, rankings or credentials.

Editorial `status` is separate from `developmentStatus`/`researchStatus`. Featured flags and dates do not grant or schedule publication. The shared selector excludes drafts/archives; a directory alone provides no publication protection.

Never add legal names, private contacts, excluded education, secrets, patient information or confidential research. Drafts are not confidential storage; `public/` assets can be emitted even when their article is draft. Review evidence links and images for facts, privacy and rights.

Preserve a hash-verified baseline including untracked work before editing. Do not reset, clean or overwrite existing work. Phase 10.2 authorizes content architecture only, not publication, deployment or changes to the design system.
