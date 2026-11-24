# Security articles migration audit

## Source inventory before migration

Repository: [nagitw/Nagi.tw](https://github.com/nagitw/Nagi.tw).
Original Markdown was found on `backup/pre-v3.1-main`, pinned to commit
`952f05507d1a6115e8fc561eb8417eaec91b8c28`. Current main
`c54762236098c5c824ea73e26bd5829c222f25d2` contains previously processed JSON,
which was not used as article source. GitHub connector retrieved the complete
originals; raw downloads were checked against their exact Git blob hashes.

All five original titles exactly match the user's requested English titles.
No Chinese/Japanese editions or additional life, FRC, or MedTrust articles
were migrated. Source `life` categories and `Personal` tags on explicitly
requested articles remain unchanged.

| Original path under `articles/` | New file under `src/content/journal/` | Original date | Original update |
| --- | --- | --- | --- |
| security/retail-work-sme-security-culture.en.md | retail-work-sme-security-culture.md | 2026-07-18 | — |
| ctf/ctf-meets-malware-analysis-windows.en.md | ctf-meets-malware-analysis-windows.md | 2026-07-08 | — |
| research/infosec-taiwan-2026-student-industry-gap.en.md | infosec-taiwan-2026-student-industry-gap.md | 2026-07-07 | — |
| research/nurse-made-me-rethink-medical-cybersecurity.en.md | nurse-made-me-rethink-medical-cybersecurity.md | 2026-06-23 | — |
| security/2026-security-conference.en.md | 2026-security-conference.md | 2026-05-09 | 2026-05-15 |

Before writing: no filename, title, or slug conflicts with existing content;
no destination image conflict. Import refuses collisions and uses exclusive
file creation. Four originals have no cover. Only the conference article
references `/assets/images/cybersec-2026.jpg`; the original 55,413-byte image
was copied to the identical public URL, verified by Git blob and SHA-256,
and visually inspected as CYBERSEC 2026 event signage.

## Preservation and adaptations

- `originals/` contains exact original Markdown bytes, including frontmatter.
- `manifest.json` records the fixed commit, original paths, Git blobs,
  SHA-256 hashes for full originals and destination files, body hashes,
  image provenance, and hashes of all 14 pre-existing content files.
- Destination body bytes are identical to each original, including whitespace,
  headings, code, links, and comments. No rewriting, translation, heading
  normalization, or URL replacement was performed in the bodies.
- Original frontmatter metadata and dates remain present. Added quoted
  `publishedAt`/`updatedAt` match the source `date`/`updated`; added
  `status: draft` and `kind: essay` adapt to the Journal collection.
- The conference `cover` field alone changes from public URL to the local
  relative path required by Astro `image()`. Its original `banner` URL is
  retained; descriptive `coverAlt` was added. Original cover metadata is
  also preserved in the byte-identical source snapshot.
- Journal permits articles without original artwork; image alt text remains
  required when a cover exists. Orphan alt/caption fields are rejected.
  Other collections and the base schema retain required cover validation.
  Card/detail rendering skips absent covers. No placeholders were invented.
- All five entries are excluded by the actual publication selector. Existing
  article files remain byte-identical; no source repository writes occurred.

## Verification (2026-11-20)

| Command | Result |
| --- | --- |
| `npm run test:schema` | PASS: 4/4, including new Journal cover regression |
| `node scripts/security-migration.mjs` | PASS: 5/5 original blobs, exact bodies, preserved metadata/dates, real Journal schemas, unique slugs, draft exclusion; 1/1 original image; all 14 existing content files unchanged; exactly five added articles |
| `npm run check` | BLOCKED before Astro diagnostics: native module load failure |
| `npm run build` | BLOCKED before content compilation: same native module load failure |

New cover regression was first run against the old schema: 1 FAIL, 3 PASS;
after the scoped implementation: 4 PASS. The integrity verifier runs offline
by default and does not import or modify content. Its explicit `--import`
mode refuses an existing manifest or destination file.

Blocked module:
`node_modules/@bruits/satteri-win32-x64-msvc/satteri_napi.win32-x64-msvc.node`.
Both Astro commands exit 1 with `ERR_DLOPEN_FAILED` and
`An Application Control policy has blocked this file.` The outer optional
dependency message is misleading: the binary exists. Prior read-only
CodeIntegrity events 3077/3033 identify the signing policy restriction;
no security policy or dependency was changed in this migration.

## Remaining work

Run Astro Check and Build in an environment where the required native module
is permitted; then verify rendered article bodies, image rendering, and
draft route exclusion. Browser/render verification is not claimed while
Astro cannot start. Source body h1 headings remain untouched as requested;
review their interaction with the page's own h1 before any later publication.
Keep all five drafts until these checks and publication review are complete.

No Commit, Push, Deploy, source deletion, dependency installation, or security
policy changes were performed.
