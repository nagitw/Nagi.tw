# Nagi.tw V3 — Penguin Interactive Studio

## Inspection and scope

- Actual app: `nagi.tw`, Astro 7.3.2, TypeScript 6, static output, sitemap integration. Installed dependencies were already available; no install or dependency change was necessary.
- Existing feature branch: `feat/nagi-v2`. The parent workspace is a different repository on main. Only the Nagi app is committed; the parent pointer, Notes worktree and medical projects are not edited.
- The starting app contained uncommitted V2 bilingual data, pages, styles and documentation. These are preserved and included as necessary in the final website snapshot; older V2 reports are historical, not this task's delivery state.
- Existing content uses typed records and external Notes RSS, not Astro Content Collections. Old routes and project scope/limitations remain intact. No article was deleted or migrated away from Notes.
- GitHub Pages targets the custom domain `https://nagi.tw`, without a prefix. Optional `SITE_BASE=/studio/` is now tested. Deployment workflow is unchanged; no push, merge or deployment.

## Delivered

- New responsive Home with Hello, I'm Nagi, original large pixel penguin, current interests, featured projects, research highlights, latest journal, AI invitation and footer.
- Mist-blue/graphite palette, dark theme, system fonts, cards and lightweight transform effects. No large animation or 3D dependency. Static content remains readable without JavaScript/WebGL.
- Original 24×24 SVG geometry and intrinsic colors from `public/nagi-penguin.svg`; the animated component splits the existing wing/eyes/beak without redesigning the character.
- Typed states: idle, welcome, curious, thinking, talking, sleeping, error. CSS breathing/blinking/waving, bounded cursor parallax, touch/focus handling and reduced-motion/slow-display fallback.
- English and Traditional Chinese Home, Research, Projects, Journal, Technical Reports, About, Roadmap; original Experience and Contact preserved. 38 generated pages including series and document slots.
- Three planned CTF-to-OSCP episodes, each with Learning Journal and Technical Report. No completed experiments, exam pass or certification invented.
- Native named modal with close/Escape/focus behavior, preset questions, streaming plain text, source links, loading/error/offline state, input bounds, no persistence and cancellation ownership across close/reopen.
- Mock uses prepared public information and performs no network request. API mode is opt-in only.

## Future API contract

Set `PUBLIC_PENGUIN_AI_MODE=api` and `PUBLIC_PENGUIN_API_URL` only after deploying/reviewing an independent public HTTPS service. Public environment values are bundled into the frontend; they must never contain secrets. Configuration requires a rebuild.

`POST` JSON `{ "question": "...", "locale": "en" }` (or `zh`), maximum 1000 input characters. No cookies, authorization headers, private files, history, tools or management endpoints. Redirects rejected; no referrer; 30-second request timeout.

Response content type: `application/x-ndjson`. One JSON object per line; examples:

```jsonl
{"type":"delta","text":"A public answer."}
{"type":"source","title":"About Nagi","url":"https://nagi.tw/about/"}
{"type":"done"}
```

UTF-8 chunk boundaries are decoded incrementally. Malformed/unknown events, unsafe source schemes/embedded credentials, missing done, oversized lines/responses and HTTP errors fail visibly. Delta text is capped at 8000 characters, source title at 200, total response at 128000 bytes. DOM uses `textContent`, never model-generated HTML. HTTPS links can point to external sources and open with noopener/noreferrer. The server must independently enforce CORS, validation, rate limits, public-knowledge retrieval and security; browser checks do not replace backend controls.

## Verification

- `npm run build`: PASS, Astro check reports 0 errors / 0 warnings / 0 hints across 42 files; 38 pages generated.
- `npm test`: PASS: existing RSS parser, penguin state/API/session tests, RSS fixture success/failure builds, escaping, three-item homepage limit and repository-base build.
- `npm run validate`: PASS: all 38 pages, unique titles, descriptions, canonical, sitemap, local links/anchors, script paths, language alternatives and preserved project limitations.
- Base-path fixture repeats both validators under `/studio/`: PASS.
- Independent source review found a close/reopen cancellation race and mock citation base issue. Both fixed with regression tests. Mode-independent homepage invitation avoids claiming demo when API mode is enabled.
- `git diff --check`: PASS (Windows line-ending normalization notices only).
- Production emitted approximately 6.4 KB external JavaScript plus small inline controllers and 18.3 KB CSS, uncompressed. No WebGL dependency or remote font. These are build sizes, not measured Core Web Vitals.

## Remaining work / limitations

- Actual browser visual, keyboard and responsive runtime acceptance remains unverified: browser access host unavailable; native browser access approval timed out. No screenshot, Lighthouse, CLS or frame-rate claim is made. Review 375/768/1024/1440 widths, both themes, reduced motion, touch, Tab/Escape and close/reopen while streaming.
- Production Notes RSS could not be fetched in this environment, including an unsandboxed build. Visible bilingual fallback links are rendered. Controlled live local fixtures verified both success and failure; no fixture articles were saved into production output.
- The existing Windows Node process emitted one transient native shutdown assertion during the baseline test. Subsequent final test/build runs completed with exit 0.
- Raspberry Pi backend, deployment, real model streaming and production authentication/rate limiting are intentionally not implemented.
- Episode content/evidence remains planned until supplied. No original penguin material is missing; optional artist-authored layered assets can replace the existing SVG later.

## File inventory

V3 implementation:
- `.env.example`, `astro.config.mjs`, `package.json`, `README.md`
- `src/components/Penguin.astro`, `src/components/PenguinChat.astro`, `src/components/SiteHeader.astro`
- `src/layouts/BaseLayout.astro`, `src/styles/studio.css`, `src/i18n/ui.ts`
- `src/lib/penguin-state.ts`, `src/lib/penguin-ai.ts`, `src/lib/chat-session.ts`
- `src/data/site.ts`, `src/data/series.ts`
- `src/views/Overview.astro`, `src/views/Research.astro`, `src/views/StudioPage.astro`, `src/views/Series.astro`
- `src/views/Contact.astro`, `src/views/Experience.astro`, `src/views/Projects.astro` (unused import cleanup)
- `src/pages/[page].astro`, `src/pages/zh/[...path].astro`, `src/pages/research/from-ctf-to-oscp/[...path].astro`
- `scripts/test-penguin.mjs`, `scripts/test-site.mjs`, `scripts/test-language.mjs`, `scripts/validate-build.mjs`
- `docs/superpowers/plans/2026-11-04-v3.md`, `docs/v3-report.md`

Preserved starting V2 files included in the website snapshot:
- `src/components/NotesPreview.astro`, `src/components/SiteFooter.astro`, `src/components/NagiPenguin.astro`
- `public/nagi-penguin.svg`, `src/styles/global.css`, `src/pages/index.astro`
- `src/data/experience.ts`, `src/data/projects.ts`, `src/data/research.ts`
- `src/pages/contact/index.astro`, `src/pages/experience/index.astro`, `src/pages/projects/index.astro`, `src/pages/research/index.astro`
- `docs/v2-implementation.md`, `docs/v2-report.md`

## Implementation decisions

Retained the user's current working directory/feature branch and existing dirty V2 work, as explicitly requested. Chose layered SVG and native browser primitives to keep dependencies and bundle weight low. New episode slots are published as clearly planned pages rather than fabricated results. These choices do not require new artwork or a production API.
