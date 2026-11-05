# V3 production integration plan

Spec: user request, 2026-11-06. Execute inline with executing-plans.

Architecture: retain Astro static output and original penguin; curated local content feeds bilingual pages and indexes. Keep current English / and Traditional Chinese /zh routes to preserve URLs. Explicit URLs always win over stored preference.

- [x] Preserve initial dirty files; audit source publication flags and identity.
- [x] Exclude withdrawn series from route generation and public references; retain source drafts.
- [x] Render imported public editions and counterpart fallback pages; link project/research/journal indexes.
- [x] Gate disclosures independently by editorial publication, verification and authorization.
- [x] Add brand motto, public search/RSS, bilingual metadata and preference storage.
- [x] Test builds, links, privacy, base paths, AI and browser behavior; report limits; commit current branch only.

Review focus: untranslated articles, unsafe Markdown, unauthorized disclosures, explicit language URL precedence, external content privacy.

Ruling: the user explicitly requests immediate implementation, so no design approval stop. Existing dirty files remain intact and are extended where necessary. Current source and working tree are the baseline, not the stale phase2 plan clean-tree statement.

Verification ledger: final suite passed; source review fixes completed; browser runtime validation remains explicitly unverified. User-selected integration is commit on current feature branch only; no merge/push/deploy.
