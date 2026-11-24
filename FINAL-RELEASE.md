# Nagi.tw Final Release — Content Recovery

**PASS — CLOSED / MAINTENANCE ONLY**

Public URL: https://nagitw.github.io/Nagi.tw/
Verified: 2026-11-24 (Asia/Taipei).
Deployed application commit: 022e79492bca6eb6350d2337e318cc8c6a4c76ff.
Deployment: https://github.com/nagitw/Nagi.tw/actions/runs/45404783286
GitHub Actions build and deploy: SUCCESS.
Rollback baseline: 8785863ea406c3552f1406035200ed8905a37a5f.

## Outcome

The user reopened the previous closure solely to recover public content. Both
engineering acceptance and content completeness acceptance now pass. Restored
112 source editions/records; with the two unchanged BugTraceAI editions there
are 114 published collection editions and 16 remaining private drafts.

- Public HTML pages: 17 -> 75; indexable sitemap URLs: 16 -> 74.
- Projects: 11 editions / six unique entries.
- Research/laboratory notes: 18 editions / nine unique entries.
- Journal/reference/experience articles: 31 editions / 19 unique entries.
- Activity records: 54 editions / 27 events, including 19 competition events.
- Dated articles within the recovered corpus: 19 editions / 13 distinct articles.

Exact original public prose, source dates/timestamps, image provenance,
classifications and competition outcome wording are retained. FTC, Ilan and
AIS3 MyFirstCTF are checked as 2026. No AI replacement prose, fabricated dates,
rank denominators, roles or new results were added. Previously excluded private
plans, identity data, withdrawn topics and other drafts remain non-public.
See CONTENT-AUDIT.md and docs/content-recovery/manifest.json for counts, sources
and exclusions. Historical author statements are not independently certified
official results; their original evidentiary limitations remain recorded.

## Verification

PASS: TypeScript/Astro check with zero diagnostics; production build; 10 schema
tests; four About tests; i18n; Penguin provenance/interaction; immutable source
snapshots/image; complete output link/asset/fragment/SEO validation; 112-record
body/metadata/provenance and privacy verification; dependency audit (0 issues).
Staged secret-pattern and scope scans passed; this is not a guarantee of secret
absence. Historical migration protection tests still pass using their original
draft fixture, independently of the separately authorized content recovery.

PASS LIVE: all 75 pages at 320/768/1440px; bilingual and missing-translation
fallback links; all 74 sitemap/canonical URLs and six static assets; 54 exact
activity title/result/year editions; existing About evidence links; images;
Penguin keyboard interaction, light/dark mascot surfaces, reduced motion,
no-JS display and no external requests. All 16 remaining drafts were checked
in both languages and returned 404; an unknown route also returned 404.

The existing Editorial styling, header/footer, Penguin asset and logic were not
changed. Existing collections and dynamic routes remain in use. Narrow rendering
compatibility permits genuinely absent historical fields, adapts old links to
/Nagi.tw/, and avoids duplicate body H1 without rewriting stored public prose.
No backend, new locale, external API or new dependency was introduced.

## Accepted limits and maintenance

No standalone Lint was configured or added. Historical strict/editorial migration
modes intentionally retain their old baseline and do not describe this newly
authorized publication state. Release gates pair originals-only provenance with
verify:recovery, which checks the actual published bodies, metadata and exclusions.

Japanese editions and two article families outside the latest approved public
scope remain in Git rather than being exposed as new routes. The 79-row draft
experience archive is not bulk-published. Unresolved candidate/award variants
are not invented or upgraded to official verification. Historical narratives,
certification-year variants and photo rights retain their documented limitations.
Firefox/WebKit and physical devices remain untested. The site retains its dark
Editorial theme; mascot compatibility with light surfaces does not add a theme.

Use Node 24.13.0, npm ci and the README validation commands. Full Git history is
required by the pinned-source recovery checks. Future work is maintenance only:
security/dependencies, correctness and authorized content/hosting upkeep. Never
publish fixture builds or bypass draft/privacy gates. No feature expansion or
redesign is authorized. Development follows AGENTS.md (astro dev --background).

The existing Pages workflow validates and deploys main to /Nagi.tw/. No custom
domain or DNS change was made. Documentation-only closure commits are excluded
from redeployment. On a failed future release, restore the last approved tree in
a new commit and deploy through the same workflow; retain history and artifacts.
