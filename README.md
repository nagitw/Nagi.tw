# nagi.tw

Personal website of Nagi.

A place for my projects, research, cybersecurity work, and technical notes.

## Website

- Main: https://nagi.tw
- Notes: https://notes.nagi.tw

## Stack

- Astro
- TypeScript
- CSS

## V3 — Penguin Interactive Studio

38 static English/Traditional Chinese pages: Home, Research, Projects, Journal, Technical Reports, About, Roadmap, the original Experience/Contact routes, and the planned From CTF to OSCP series with paired episode documents.
Typed records and source provenance live in `src/data/{site,projects,research,experience}.ts`.
`BaseLayout.astro` supplies per-page SEO, navigation and Penguin AI; `studio.css` extends the shared styles with soft blue/graphite themes and responsive layouts. `Penguin.astro` preserves the original pixel geometry and colors using layered SVG animations.
There are no UI frameworks, remote fonts, WebGL libraries or new dependencies. Small TypeScript controllers enhance navigation, theme, penguin states and the native chat dialog. All public page content is static HTML.

Notes remains independent. The homepage fetches at most three previews from the public Notes RSS feed at build time. A failed request produces a visible link to Notes. `NOTES_RSS_URL` can override the feed for local tests; fixture output is never used in the production build.

## Validation

- `npm run check` — Astro/TypeScript diagnostics
- `npm run build` — check and static production build
- `npm test` — RSS parser, penguin states, chat cancellation, API protocol/security and isolated RSS/base-path builds
- `npm run validate` — built routes, SEO, content boundaries, anchors and MedTrust limitations

Mobile navigation remains available without JavaScript. The Menu button controls it and Escape closes it. The initial theme follows the OS when no saved choice exists; the theme button persists explicit preference when storage is available. Reduced motion disables animation. Chat controls require JavaScript and native dialog support.

## Local preview

Use Node 24 (validated with 24.13.0), then `npm ci` if dependencies are missing.

```sh
npm run dev
# Or preview the exact production output:
npm run build
npm run preview
```

Default URL: http://localhost:4321. Review `/` and `/zh/`.

## Penguin AI and deployment

Default: **mock**, no AI network request. `.env.example` documents the optional public HTTPS endpoint and `SITE_BASE` for repository Pages. No production API is assumed. Do not put credentials in `PUBLIC_*`. The independent Raspberry Pi service is future work; nothing connects to medical projects, private files or service administration.

See [V3 delivery and API contract](docs/v3-report.md) for protocol, file inventory, verification and remaining visual QA. Existing V2 reports are historical. Deploy workflow is unchanged and this change is not deployed.

