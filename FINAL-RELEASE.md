# Nagi.tw — Final Editorial Release

**PASS — CLOSED / MAINTENANCE ONLY**

URL: https://nagitw.github.io/Nagi.tw/
Verified: 2026-11-24 (Asia/Taipei).
Deployed application: b27018cd58d4163e5f2d8bce15a7f657d21771fb.
Successful workflow: https://github.com/nagitw/Nagi.tw/actions/runs/45416770286
Rollback baseline: 304a2a517531a20084bca764c7084c860618e634.

## Outcome

The public scope is professional technical content: four projects, one research
note, five technical articles and 25 activities, paired in English/Traditional
Chinese. Public output has 35 HTML pages and 34 indexable URLs. Homelab/private
configuration, daily life, elementary smoke tests and duplicate summaries are
hidden. All original source files, 112 recovered records, original results,
photographs and 16 drafts are retained unchanged. Detailed selections, source
dates, image treatment and uncertainties are recorded in CONTENT-AUDIT.md and
docs/editorial-date-audit.json.

Medical Cybersecurity Research now displays the source-body date 2026-06-10.
FTC, Ilan and AIS3 MyFirstCTF remain 2026. Article publication dates and PR dates
are not relabeled as competition or project dates; unknown project dates remain
absent and activity dates retain year-only precision without fake durations.

All lists use the existing text-only Editorial treatment. A site-logo cover was
removed from content presentation. The unconfirmed-rights CYBERSEC photograph
is excluded from deployed output while its original source is preserved. Real
article covers, if subsequently authorized, have one 16:9 crop. No random or
AI-generated images were introduced. No Japanese display, page or locale is
emitted; older Japanese source editions remain in Git.

## Verification

PASS locally and in CI: Astro/TypeScript zero diagnostics, forced clean build,
10 schema tests, four About tests, i18n, Penguin provenance, immutable original
snapshots/image, complete link/canonical/sitemap output, source-body/date/metadata
integrity and privacy checks, no placeholder images or Japanese presentation,
and dependency audit (0 vulnerabilities). Staged secret-pattern and file-scope
checks passed; pattern checks are not a guarantee of secret absence.

PASS LIVE: all 35 pages at 320/768/1440px, bilingual switches, no overflow or page
errors, 34 sitemap/canonical URLs, 40 hidden detail routes returning 404, two
withheld activities absent, 50 public activity editions with correct source
years and conservative result text, source-backed research date, no image
placeholders, and unconfirmed photograph returning 404. Penguin keyboard
interaction, reduced motion, no-JS display and light/dark mascot surfaces pass;
no external requests are made by the mascot or UI.

## Pending facts and existing limits

Four factual questions were asked once and have not been answered: the Future
Healthcare Design Hackathon year, distinct InfoSec 2025/2026 attendance, approval
of historical competition outcomes, and CYBERSEC photograph usage rights.
Affected activity records, unconfirmed outcomes and the photo remain withheld;
only participation is presented for competitions. No response was inferred.
The original outcome strings are preserved, not overwritten or certified.

The existing full-site presentation is dark only; no site-wide light-mode toggle
existed in this baseline. That limitation is documented, not represented as a
newly tested feature. The Penguin remains compatible with both background types.
Standalone Lint remains unconfigured; Firefox/WebKit and physical devices were
not tested. Historic narrative assertions retain their original evidentiary limits.

## Maintenance

No dependency, AI feature, backend, new locale or architecture redesign was
added. Global design tokens, header/footer and Penguin artwork/animation were
not modified. Publication selection and narrowly scoped date/result projection
are controlled by src/lib/editorial-policy.json, which triggers normal CI when
changed. Stored Markdown bodies stay original. The build clears Markdown caches
so policy changes cannot preserve stale links; archived references become plain
text rather than dead links. Unconfirmed photos are removed only from dist.

Use Node 24.13.0, npm ci, full Git history and README validation commands. Publish
only the verified clean dist through the existing Pages workflow on main. Keep
/Nagi.tw/ and avoid custom-domain/DNS changes. Documentation-only closure commits
do not redeploy. Further work is authorized maintenance only; new facts require
explicit confirmation before changing the conservative publication policy.
