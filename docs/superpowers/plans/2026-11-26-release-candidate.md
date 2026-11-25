# Final content cleanup implementation plan

The user explicitly requests final local implementation in place, preserving the approved design. No redesign, commit, push, deployment or DNS work is authorized.

## Scope and sequence

- [x] Capture the current source, assets, routes and editorial states before cleanup; do not replace earlier simplification evidence.
- [x] Investigate every competition record against official schedule sources; record conflicts and stage ambiguity rather than inventing dates. Apply existing author-confirmed corrections through the existing editorial overlay, retaining archived source bytes. Seven visible day-level dates remain unresolved, as documented.
- [x] Remove About interests/tools markup and populated profile data, with no equivalent replacement; retain concise bilingual introduction and existing content sections.
- [x] Sort years newest first, events within each year earliest to latest. Year-only entries follow precisely dated entries. Tie-break by stable slug so English and Chinese orders match.
- [x] Keep MyFirstCTF 2026 and reject the incorrect 2025 identity; no such source record currently exists, so no historical file deletion is needed.
- [x] Validate corrected chronology, award/participation preservation, bilingual output, 35 routes, native Markdown images, themes, base path, internal links and draft exclusion in Chrome and Firefox.
- [x] Start `astro dev --background`, read actual status and verify the returned local URL; leave it running for review.

## Files and validation

- Production scope: `src/components/AboutProfile.astro`, `src/lib/sections.ts`, `src/lib/experience-timeline.ts`, `src/lib/editorial-policy.json`, `src/lib/editorial.mjs`, and the existing `ExperienceTimeline.astro` result presentation only if needed.
- Tests: update About and sorting expectations; add release-candidate source/output checks; extend existing browser harness to accept a separate baseline/output and Firefox without replacing earlier evidence.
- Evidence: `docs/release-candidate/` stores current baseline, official date audit, browser results/screenshots and final report.
- Authoritative Markdown articles, assets, routes, translations and statuses remain byte-identical. Do not change design CSS, theme or image components.
- Official schedules validate event dates, not personal results. Preserve confirmed results and retain historical records as author-reported; never infer advancement to select a date.

## Ledger

- Existing corrections located in `editorial-policy.json`, `pending-experience-dates.json` and `FINAL-RELEASE.md`.
- Read-only parallel research used for independent security and robotics competition schedules.
- No additional correction list was supplied during this run. Applied the saved confirmations and retained other historical results as author-reported; schedule evidence never certifies an individual's award.
- Source preservation: 168 protected files remain byte-identical, including all Markdown/content states, existing assets, routes, design CSS, theme and image components.
- Official research: 11 date ranges applied; seven visible date/stage ambiguities retained at year precision; existing hidden healthcare-design conflict stays excluded.
- Tests first: chronology and Profile-removal checks failed before implementation and passed afterward. A concise-About output check detected duplicated Experience content, then passed after linking to the full collection.
- Final browser validation: Chrome158 and Firefox153 each passed 315 baseline page/width/theme cases and 18 bilingual native-image fixture cases, including no-JavaScript operation.
- Firefox QA ruling: awaiting image.decode() in a JavaScript-disabled document stalled Firefox promise jobs. Replaced that test-only await with a synchronous native image-state assertion; final Firefox suites passed. No site workaround was added.
- About ruling: remove the duplicated full Experience listing; link to the full chronological collection and show existing featured projects with an All projects link. All records remain on their collection routes.
- Independent review: no blocking correctness/attribution issues; final About has no equivalent replacement for removed sections.
- Preview: Astro dev background PID25516 at http://127.0.0.1:4321/Nagi.tw/; six key bilingual URLs returned200 and current content.
- Handoff: all work remains uncommitted/unstaged. No push, deployment, DNS or draft publication.
