# Nagi.tw

**V4 RELEASE CANDIDATE** — Modern Research Studio is implemented on `feat/nagi-v4`. See [V4 acceptance](docs/v4/REPORT.md), [content/URL preservation](docs/v4/MIGRATION.md) and the [implementation ledger](docs/v4/PLAN.md). Production remains on `e01fc2f` until final user approval. This supersedes prior design-freeze instructions for this branch only.

Personal research and engineering studio using Astro, Markdown/MDX and static generation. Production: https://nagitw.github.io/Nagi.tw/ with English primary and Traditional Chinese at `/Nagi.tw/zh/`. Prior production release notes remain in [FINAL-RELEASE.md](./FINAL-RELEASE.md).

## V4 development and maintenance

`npm run check`, `npm run lint`, `npm run format:check`, `npm run build`, `npm run verify:v4`, and `npm run test:v4` validate the RC. Build includes the Pagefind index. Use `node scripts/v4-serve.mjs` for a complete production preview at `http://127.0.0.1:4322/Nagi.tw/`; the background Astro dev server is for editing and does not generate the search index.

Fonts are local npm assets (OFL); CSS tokens live in `src/styles/tokens.css`. Astro's built-in Shiki handles code highlighting. Search and RSS use the same public content selector as routes. No external AI service, backend, custom domain or CNAME is added.

Before future releases, retain the previous deployed hashed CSS under `public/_astro/` so cached documents can still load it. Do not regenerate `docs/v4/baseline.json` to accept content loss. Update publication policy only with explicit authorization; project intake drafts are not public case studies. Photography remains empty until original, approved images are supplied.

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

The approved simplification retains the existing content, routes and `/Nagi.tw`
base. Articles use a single reading column, native Markdown HTML images, and a
localized Light/Dark/System footer control. No new production dependencies are
required. See [image authoring and deployment paths](docs/content.md#native-article-images-and-deployment-paths)
and the [simplification report](docs/simplification/REPORT.md).

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
node scripts/verify-release-candidate.mjs
```

Browser acceptance (use an existing external QA installation of Playwright):

```powershell
$env:NAGI_PLAYWRIGHT = 'C:/path/to/existing/node_modules/playwright'
$env:NAGI_QA_BASELINE = 'docs/release-candidate/baseline.json'
$env:NAGI_QA_OUT = 'docs/release-candidate/chrome'
$env:NAGI_FIXTURE_ROOT = '.astro/release-candidate-fixture'
node scripts/verify-browser.mjs
node scripts/verify-simplification.mjs prepare-fixture
npm --prefix .astro/release-candidate-fixture run build
node scripts/verify-simplification.mjs fixture
$env:NAGI_BROWSER = 'firefox'
$env:NAGI_QA_OUT = 'docs/release-candidate/firefox'
node scripts/verify-browser.mjs
node scripts/verify-simplification.mjs fixture
```

`prepare-fixture` refuses to overwrite an existing QA copy. The recorded baseline
is immutable evidence from before the redesign; do not regenerate it to accept a
regression. Browser checks serve built files on a temporary loopback HTTP server
and close it afterward. They do not start a development server or publish anything.
The retained `test:penguin` command now verifies preservation of its original
artwork and absence of the removed decorative UI in the production build.

The default migration check preserves the exact original migration baseline. `--originals-only` checks provenance only. `--editorial` checks separately approved revision records and still requires every Journal entry to remain draft. Read [content maintenance](./docs/content.md) before selecting another mode. Passing schema/hash checks cannot prove facts or grant publication permission. Never rewrite immutable snapshots or baseline manifest hashes.

The content-recovery release pairs `--originals-only` with `verify:recovery`: the latter verifies every restored public body and metadata against pinned historical sources, privacy exclusions, and unchanged remaining content. Fetch full Git history before running it. The historical strict/editorial migration modes remain unchanged and are tested against their original draft fixture; they do not authorize or validate this separately authorized publication recovery.

Integration tests create/remove fixtures: use only a disposable Windows QA copy. The empty-site assertion does not apply to published content. Build writes local `dist/`; it does not deploy. The editorial selection currently includes 35 HTML pages and 34 indexable sitemap URLs; `verify:static` covers the 15 base pages and the release/recovery verifiers cover the complete output.

## Publication and privacy

The user's Final Content Recovery request separately authorizes restoring previously public, source-backed content. The exact scope is pinned in `docs/content-recovery/manifest.json`: historical public bodies (including the old private-plan exclusions), original recorded results and dates. The existing BugTraceAI case study remains unchanged; the remaining 16 drafts stay private. Current public presentation is additionally restricted by src/lib/editorial-policy.json; hidden source files and original results remain preserved. Do not treat this recovery as permission to publish other drafts, private plans or disputed archive candidates. Original author-reported results are not newly certified official results.

Editorial `status` is separate from `developmentStatus`/`researchStatus`. Featured flags and dates do not grant or schedule publication. The shared selector excludes drafts/archives; a directory alone provides no publication protection.

Never add legal names, private contacts, excluded education, secrets, patient information or confidential research. Drafts are not confidential storage; `public/` assets can be emitted even when their article is draft. Review evidence links and images for facts, privacy and rights.

Preserve a hash-verified baseline including untracked work before editing. Do not reset, clean or overwrite existing work. Phase 10.2 authorizes content architecture only, not publication, deployment or changes to the design system.
