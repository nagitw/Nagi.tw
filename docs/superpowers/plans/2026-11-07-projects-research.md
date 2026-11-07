# Projects & Research refinement implementation plan

> **For agentic workers:** Use superpowers:executing-plans for inline implementation.

**Goal:** Refine the two existing indexes and project reading experience while enforcing publication at build time.

**Architecture:** Keep Astro, current routes, themes and original content. A shared fail-closed publication selector feeds content routes, aliases, indexes and public knowledge. Curated metadata describes existing records without manufacturing results. Local page components/CSS provide editorial cards and grouped research.

**Spec:** User's Nagi.tw V3 Projects & Research UI/UX Refinement request, 2026-11-07.

**Constraints:** Work on `feat/nagi-v2`; preserve initial project-leads JSON/schema and project-status documentation. No push, merge, deployment, real identity or Raspberry Pi changes. CLI projects remain draft. Preserve all existing article bodies. New records default draft; existing approved migration snapshot retains its approval.

**Review focus:** Draft translation alongside published original; draft project versus independently published article; aliases and base paths; withdrawn topics even if incorrectly flagged published; empty collections and absent metadata.

## Tasks

- [ ] 1. Add publication tests that reject missing/draft/review/withdrawn records, and exercise independent editions. Implement `publication.ts`, apply explicit status to existing approved snapshots, route/alias filtering, disclosure and private-series statuses. Verify selectors and route expectations.
- [ ] 2. Add catalog tests for only populated categories, approved cross-links and unknown development status. Implement curated metadata, bilingual cards, grouped Research, featured Projects and conditional project detail context. Preserve article bodies and homepage markup.
- [ ] 3. Extend built-output tests for draft route/index absence, bilingual pages, actual translation alternates and related links. Run check/typecheck/build/full tests/validate including repository base. Attempt browser desktop/mobile light/dark/keyboard checks.
- [ ] 4. Review final diff, update `docs/v3-report.md`, record limitations, commit on the existing branch using Nagi identity. Do not push.

## Progress

### 2026-11-07 continuation

- Preserved the existing dirty tree; completed project attribution/outcome fields, factual research-project classification, and repository-only CV model/confirmation queue.
- Completed publication artifact scan and corrected approved lead membership validation after independent review. Added fail-closed selection to existing experience metadata without adding records.
- Check/build/typecheck/full tests/validate pass, including repository base. Browser host unavailable; visual runtime acceptance remains outstanding and is explicitly recorded in v3-report.md.
- Local delivery commit only, per current user request; no push/merge/deploy. The inventory and current verification results in v3-report.md supersede incomplete earlier task checkboxes.

- Inventory: branch confirmed; initial dirty files are exactly the three project-status files from the preceding authorized task. No AGENTS.md found in this checkout. Current article snapshot has 51 approved editions. Draft lead routes and missing-edition placeholders currently bypass per-record approval; replace these with actual published routes. The homepage Hero and penguin components need no edits.
- Execution: user requested direct implementation in this checkout, so no worktree/branch switch or additional design approval.
