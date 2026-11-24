# Security Articles Migration Implementation Plan

**Goal:** Migrate only the five security articles specified in the user's request, as drafts, without changing their English bodies.

**Architecture:** Read original Markdown from `nagitw/Nagi.tw` at backup commit `952f05507d1a6115e8fc561eb8417eaec91b8c28`. Retain byte-verifiable originals and a provenance manifest under `docs/security-migration/`; adapt only frontmatter for Journal. Copy the single referenced cover to its original public URL. Existing articles are never overwritten.

**Tech Stack:** Astro content collections, Markdown, Zod, Node test runner.

**Spec:** User request “Nagi.tw — Security Articles Migration” in this conversation.

## Global Constraints

- Only the five exact English titles requested; no additional personal, FRC, or MedTrust articles or translations.
- Preserve body bytes, images, code, links, original dates and metadata. No translation or rewriting.
- Keep status draft; no Commit, Push, Deploy, source deletion, security policy changes, or dependency changes.
- Preserve other collections' required image validation. Journal may omit a cover; an image requires nonempty alt text, and orphan image metadata is rejected.
- Run Schema, Astro Check, Build, and an independent content integrity check. Report policy failures honestly.

## Inventory and conflicts

- Current main `c54762236098c5c824ea73e26bd5829c222f25d2` contains processed JSON, not the original Markdown.
- `backup/pre-v3.1-main` at the pinned commit contains all five originals: `articles/security/{retail-work-sme-security-culture,2026-security-conference}.en.md`, `articles/ctf/ctf-meets-malware-analysis-windows.en.md`, `articles/research/{infosec-taiwan-2026-student-industry-gap,nurse-made-me-rethink-medical-cybersecurity}.en.md`.
- Destination: five distinct `src/content/journal/<original-slug>.md` files. No existing title, slug, or filename matches.
- One original cover: `public/assets/images/cybersec-2026.jpg`, blob `b81ae84f8607b64a6cab2e829280cd44b6cab095`. Destination does not exist. The other four originals have no cover.
- The nurse and InfoSec articles have legacy `life` categories, but are explicitly requested. Preserve those source tags/categories rather than silently recategorizing their metadata.

## Review Focus

- Body changes: compare exact body bytes and SHA-256 to the pinned original.
- Image loss: compare original Git blob and local SHA-256; preserve public URL.
- Date loss: retain `date`/`updated` and map to quoted `publishedAt`/`updatedAt`.
- Existing work: record and compare pre-migration content hashes; refuse destination collisions.
- Draft protection: assert all five are excluded by the actual publication selector.

## Tasks

- [x] Add failing tests for Journal without a cover, paired image metadata, and unchanged other collection rules; run tests. Observed 1 FAIL / 3 PASS.
- [x] Make only Journal covers optional; guard image rendering in cards and detail pages; update content documentation; run tests again. Observed 4/4 PASS.
- [x] Save exact originals plus provenance, add five draft entries and the original image, refusing collisions.
- [x] Independently validate Git blobs, source/body hashes, dates, links/code preservation, all five entry schemas, slug uniqueness, and original content hashes. All passed; 14 existing content files unchanged.
- [x] Run `npm run test:schema`, `npm run check`, `npm run build`; record exact outcomes and remaining blockers. Schema passes; both Astro commands blocked by existing Application Control restriction before compilation. See `docs/security-migration/README.md`.

Execution: inline in the existing user workspace, preserving its pre-existing uncommitted changes. No commits or worktree switching. The user has explicitly authorized migration after inventory; no additional publishing permission is inferred.
