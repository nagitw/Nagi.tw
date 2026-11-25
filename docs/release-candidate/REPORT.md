# Final content cleanup — local release candidate

The approved visual design, theme behavior and native Markdown image system are
preserved. Local technical validation passes. Seven visible competition dates
remain unresolved at day precision; the [official-date audit](competition-date-audit.md)
records the evidence and limitations without inventing dates.

Actual running preview: **http://127.0.0.1:4321/Nagi.tw/**.
English About: http://127.0.0.1:4321/Nagi.tw/about/.
Traditional Chinese: http://127.0.0.1:4321/Nagi.tw/zh/.
The server is Astro dev in background mode, PID25516 at validation time. It was
started with `npm run astro -- dev --background --host 127.0.0.1` and confirmed by
`npm run astro -- dev status`. Home, About and Experience in both languages were
fetched successfully with HTTP200 and the final content. Manage it with
`npm run astro -- dev status`, `logs`, or `stop`.

No commit, push, deployment, DNS modification or publication of an existing
draft occurred. All edits remain unstaged in the existing working checkout.

## Content changes

- Removed Research Interests / 研究興趣 and Technologies/Tools / 技術與工具 from
  About, including their populated Profile arrays, render blocks and unused
  category helpers. No renamed or equivalent section was added.
- Reduced the bilingual introduction to one sentence. About links to the full
  Experience chronology and displays the existing featured project with an
  All projects link. The complete project and experience records remain on their
  original collection routes; they are no longer duplicated in a long About list.
- Applied the saved FRC, FTC, MyFirstCTF2026 and preliminary-stage confirmations.
  Preserved FRC's author-confirmed Judges' Award and all existing historical
  awards/participation text. The previous global suppression no longer hides
  historical competition results; these remain author-reported, not newly
  independently certified official awards.
- Added source-backed schedule dates for unambiguous events across 2024–2026
  through the existing editorial overlay, without rewriting archival Markdown.
- Corrected the **AIS3 EOF2026 preliminary to December20–22, 2025**, using the
  [year-specific organizer rules](https://ais3.org/eof/2026/rule.html). It belongs
  under calendar2025 while retaining its 2026 season title and original slug.
- Kept years newest-first and sorted dated events within each year earliest-first.
  Year-only entries follow dated entries. A stable slug tie-break makes English
  and Traditional Chinese identity/order exactly match.
- The starting source had no MyFirstCTF2025 entry to delete. Added an explicit
  editorial exclusion for that incorrect identity and tested its absence.
  MyFirstCTF2026 remains exactly once in each language. EOF's genuine calendar2025
  preliminary was not mistaken for a MyFirstCTF2025 record.

## Date-verification limitations

Eleven date ranges are applied with official schedule references and the saved
author confirmations. FRC's generic source title is not enough to independently
establish its exact AiFRC event identity; its saved author-confirmed dates and
Judges' Award remain, with that distinction documented.

Seven visible competitions retain their existing year-only precision:

| Record | Remaining issue |
| --- | --- |
| BroncoCTF2026 | Organizer February schedule conflicts with July secondary listing; no verified postponement explanation |
| Grodno::CTF2026 | Exact event/stage/day not unambiguously identified |
| Junior Crypt CTF2026 | Conflicting July dates and inaccessible direct event platform |
| Cybersecurity Golden Shield | Preliminary and final fall in different calendar years; personal stage not established |
| Technical Creativity2024 | Preliminary, training and final have distinct dates; participation stage unspecified |
| Intelligent Ironman2026 | Multiple preliminary sessions and final; personal session/stage unspecified |
| Youth Volunteer competition2025 | Service year versus ceremony/edition year unclear |

The previously hidden Future Healthcare Design record also retains its existing
2025/2026 conflict and stays hidden. Nothing was newly removed or published to
resolve it. No further correction list arrived during this run; the saved
repository confirmations were applied and other historical results were retained.

These are factual-verification gaps, so a complete day-by-day chronological claim
cannot be made for those records. Their participation/award text remains available
and unchanged in source. See the [full event-by-event source audit](competition-date-audit.md).

## Changed files for this cleanup

Production content/presentation — six files:

- `src/components/AboutProfile.astro`: removes the requested sections and duplicate
  full Experience list; concise localized introduction/navigation and featured projects.
- `src/lib/sections.ts`: removes populated interest/tool arrays and shortens biography.
- `src/lib/experience-timeline.ts`: ascending dates within years; stable bilingual ties.
- `src/lib/editorial-policy.json`: schedule sources/corrections, historical-result
  preservation, and MyFirstCTF2025 exclusion.
- `src/lib/editorial.mjs`: preserves source competition results while applying
  confirmed overrides; publication filtering remains separate.
- `src/components/ExperienceTimeline.astro`: displays retained historical results
  alongside the existing confirmed overrides; no layout/style redesign.

Tests and documentation:

- `scripts/about.test.mjs`, `scripts/verify-about.mjs`: removed Profile data/sections
  and concise About navigation/output checks.
- `scripts/experience-timeline.test.mjs`: all-year ascending chronology and bilingual ties.
- `scripts/verify-release-candidate.mjs` (new): baseline/source/design/asset/state
  preservation, exact35 routes, rendered chronology, results and language consistency.
- `scripts/verify-simplification.mjs`: reuses existing browser acceptance with
  separate baseline/output/fixture paths, adds Firefox, expands year accordions
  during viewport checks, and avoids a Firefox no-JavaScript test-only promise hang.
- `README.md`, `docs/content.md`: current RC workflow and removed-section maintenance rules.
- `docs/superpowers/plans/2026-11-26-release-candidate.md`: execution plan and ledger.
- `docs/release-candidate/`: baseline, official-date audit, this report, browser
  JSON results and48 PNG screenshots.

Earlier simplification changes remain uncommitted in the shared checkout. The
files listed above describe this cleanup's incremental work, not a new redesign.
CSS tokens, Layout, Header/Footer/theme, EditorialImage, JournalArticle/TOC, routes,
dependencies, schemas, all existing content files and public assets were preserved
byte-for-byte relative to the new RC baseline. Earlier simplification evidence
was not regenerated to accept these content changes.

## Final validation

| Check | Result |
| --- | --- |
| Astro Check | 50 files; 0 errors, 0 warnings, 0 hints |
| Production build | Successful static build; exactly35 baseline HTML pages,34 sitemap URLs |
| Competition sorting tests | 4 passed; all years, actual dates rather than publication dates, month precision, stable bilingual ties |
| About tests | 4 passed; no populated removed fields, approval guards and publication protection |
| Schema tests | 10 passed |
| i18n tests | Passed |
| RC source/output verifier | 168 protected files byte-identical; all35 routes; matching bilingual records/results and corrected order |
| About output verifier | Both languages, concise navigation, absence of removed/duplicate sections, draft exclusion, links and metadata passed |
| Static verifier | 15 base pages passed |
| Release verifier | All35 pages; internal links/assets/fragments, image alt, base path, canonical/sitemap/robots passed |
| Recovery verifier | 112 pinned recovery records; exact source bodies/metadata and existing exclusions passed |
| Original migration provenance | Five immutable source snapshots and migrated image passed; paired with full recovery verification |
| Original mascot asset | Original hashes preserved; decorative UI remains absent |
| Chrome158.0.8127.37 | 315 page/viewport/theme cases +18 bilingual native-image fixture cases passed |
| Firefox153.0 | 315 page/viewport/theme cases +18 bilingual native-image fixture cases passed |
| Responsive layouts | No horizontal overflow at375,768,1440px in either browser; annual records expanded during checks |
| Draft protection | All16 draft states unchanged; no draft output routes;114 source published states unchanged and existing editorial exclusions retained |
| Local preview | Six key bilingual URLs returned200 with current content; background status confirmed |
| Git diff whitespace check | Passed |

The build command retains its existing `--force`, so Astro prints the expected
data-store-cleared notice. Astro Check itself has zero diagnostics.

Native image fixtures use ordinary `.md` HTML img/figure/figcaption with the
`/Nagi.tw/images/blog/<slug>/` path. Both browsers verify preserved attributes,
an80px declared image,120×60 intrinsic image, responsive large images, captions,
aspect ratios, theme-safe code text, and reading/images with site JavaScript
disabled. Fixtures live only in the ignored disposable
`.astro/release-candidate-fixture` build, which has37 pages; production `dist`
has35 pages and contains no fixture article. No new image/plugin/runtime dependency
was added. Firefox was downloaded only into the external QA browser cache.

Both browser suites additionally cover Light/Dark/System selection, persistence,
OS changes, invalid/denied storage, localized labels/navigation and no page errors
or external requests. The initial Firefox test hang was isolated to awaiting
image.decode() with page JavaScript disabled; synchronous native image-state
inspection resolved the QA hang without changing site functionality.

Independent review found no blocking content/ordering/attribution issue. Final
visual inspection confirmed the unchanged design and requested About simplification.

## Evidence and screenshots

- [RC preservation baseline](baseline.json)
- [Chrome page audit](chrome/audit-results.json), [Chrome native images](chrome/fixture-results.json)
- [Firefox page audit](firefox/audit-results.json), [Firefox native images](firefox/fixture-results.json)
- [Concise About — Chrome mobile](chrome/after-about-375-light.png)
- [Concise About — Firefox mobile](firefox/after-about-375-light.png)
- [Traditional Chinese About](firefox/after-about-zh-375-dark.png)
- [All-year chronology — Firefox desktop](firefox/after-experience-1440-dark.png)
- [Traditional Chinese chronology — Chrome mobile](chrome/after-experience-zh-375-light.png)
- [Native Markdown images — Firefox mobile](firefox/after-native-images-375-light.png)

48 full-page screenshots cover both browsers, mobile/desktop, light/dark, both
languages, About/Experience and native-image fixtures. Production code changes
remain limited to the six content/presentation files above. The overall Git diff
also includes the user's previously approved uncommitted simplification; no
existing work was reset, staged or committed.
