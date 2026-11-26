# Portfolio content update — partial, evidence-gated

Continues V4 RC on `feat/nagi-v4`; no redesign, dependency change or production deployment.

- Home order: Hero → Selected Research (including existing interests) → Selected Projects → Vulnerability Disclosure → Latest Journal → Experience. Existing photography/contact links remain afterward.
- Five selected public works: BugTraceAI contributions, AEUST Life, Autonomous Robot, Medical Cybersecurity and MedTrust. All public works remain on Projects.
- AEUST Life is sourced to [public README revision 1bcfa41](https://github.com/nagitw/aeust-life/blob/1bcfa41f1589a799845860df148b6736448b6ab6/README.md). It is an independent unofficial initiative, in development and not deployed. New bilingual `aeust-life-overview` pages preserve the earlier intake draft unchanged. No personal education details, local infrastructure, patient information or unsupported results were carried over.
- Original 140 content/assets and all baseline routes remain unchanged. `portfolio-additions.json` pins the two newly authorized source files, without changing any baseline hashes.
- Added bilingual `/disclosures/` index pages and a strict public-only data list. The list is empty: there is no attributed case/detail page until identity and official fields are verified. No private intake record enters Pagefind.

## Required evidence still outstanding

Nagi Zero, RuralMed-Sat, Nagi Medical Agent, Nagi Smart Hospital and AEUST Research require an approved public source/revision and contributor scope. Current drafts explicitly lack this evidence. The new request does not establish implemented capabilities or override enterprise confidentiality.

The [official HITCON ZeroDay listing](https://zeroday.hitcon.org/vulnerability/all/page/16) identifies ZD-2026-01297 as public, Low, dated 2026-10-22, with reporter 「大家都是電神」. Its listing date does not establish separate report/disclosure dates or remediation. Detail-page requests returned HTTP 403; no challenge was bypassed. The alias-to-Nagi relationship and “Web Application Logic Flaw” classification remain unverified, so the record is not shown as Nagi's achievement and no ZD/CVE, remediation or bounty claim is made. User clarification is pending.

## Verification

- Astro Check: 77 files, zero errors/warnings/hints.
- Build: 41 HTML pages; Pagefind 38 public content pages.
- Targeted portfolio contract: bilingual ordering, five projects, added routes and disclosure attribution gate passed.
- All 41 pages' local links/assets/fragments, 40 sitemap URLs, original inventory and 112-record historical recovery/privacy checks passed.
- Related-file ESLint passed. Eight affected local route checks returned HTTP 200.
- No full browser matrix or Lighthouse rerun; previous scores/screenshots are historical V4 baseline evidence, not newly measured results for this update.

Preview: http://127.0.0.1:4322/Nagi.tw/ and http://127.0.0.1:4322/Nagi.tw/zh/ . Outstanding evidence must be resolved before this request is considered fully complete. Final user approval is still required for production release.
