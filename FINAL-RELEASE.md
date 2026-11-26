# Nagi.tw V4 — FINAL RELEASE

Status: **PASS — Nagi.tw V4 — STABLE / MAINTENANCE ONLY**.

Released on 2026-11-27 (Asia/Taipei), following explicit final release authorization.
Deployed source commit: `3d725a9cde2506b9a07127ccc43f8b16207c02eb`.
Production branch: `main`, fast-forwarded from the approved `feat/nagi-v4` commit; no force push.
Rollback: annotated tag `nagi-v4-pre-release` preserves prior stable production
`e01fc2f51f88c077cb6997b0dba7701879e6fa0b` on GitHub.

- Production: https://nagitw.github.io/Nagi.tw/
- GitHub Actions: https://github.com/nagitw/Nagi.tw/actions/runs/45890124706 — build and deploy SUCCESS for the exact source commit.
- Astro Check: 80 files, zero errors/warnings/hints. Production Build: 53 HTML pages, 50 public Pagefind pages.
- Both homepages contain six selected projects. Both disclosure detail pages show ZD-2026-01297, Low and confirmed reporter 大家都是電神, with the official source and no unverified dates or CVE claims.
- Historical integrity: all 140 baseline content/assets unchanged, all 35 baseline HTML paths retained, 112 recovered records verified. Both languages retain matching public routes and portfolio/disclosure fields.
- Live verification: all 53 HTML paths and referenced assets, feeds, sitemap, robots, search entrypoint and both retained CSS URLs returned HTTP 200: 492 requests total. CSS/JavaScript MIME types passed; referenced fonts and images passed.
- English and Traditional Chinese browser smoke: CSS applied, penguin image and pause/persistence, light/dark theme and persistence, full-text search and result navigation PASS; zero page errors or HTTP errors.
- Existing production CSS URLs `Layout.meZlh1ij.css` and `Layout.D7zMT1RW.css` remain available for cached documents. GitHub Pages cache headers are recorded in the live evidence; no cache-policy change was made.
- Necessary targeted checks passed. The previously accepted complete browser/Lighthouse matrix was not rerun. Existing deployment workflow checks also passed.

Evidence: [live HTTP and browser results](docs/v4/LIVE-RELEASE.json).
Known minor issue retained from RC: during the 180ms search debounce, a previous query's result can briefly remain visible until the latest query finishes. No known release blocker.

This closure changes documentation only; deployed site source remains the commit above.
Development is closed. Future work is maintenance only.

## Previous release record (historical)

Status: PASS — CLOSED / MAINTENANCE ONLY.

Homepage: Create what you wish existed. / 把你希望存在的東西，親手創造出來。
Position: Cybersecurity · Software Engineering · Research.

Native annual details/summary timeline: 2026 open; 2025/2024 closed by default.
FRC: 2026.08.13–2026.08.14; Judges' Award / 評審團獎.
FTC: 2026.02.04–2026.02.05.
AIS3 MyFirstCTF: 2026.05.16, preliminary round.
AIS3 EOF CTF: 2026, preliminary round; no individual date displayed.
All other activities retain source-year grouping only, with individual dates
omitted. Missing month/day is explicitly no longer a publication blocker.
Conflicting-year entries remain hidden; original files are preserved.

Only author-confirmed results are shown; absent results are omitted. Source-record
placeholders and generic pending-result text are removed. Detail links point
only to existing published articles. No AI descriptions, dates or awards were
invented. All event classifications distinguish robotics, security competitions,
hackathons, conferences and technical training.

PASS: TypeScript zero diagnostics, production build, date sorting tests, EN/繁中
homepage and native accordion keyboard/mobile tests, source integrity, links and
SEO checks. Penguin, existing theme behavior and bilingual navigation preserved.
The baseline has dark site styling and light/dark mascot compatibility; no new
theme system or dependency was introduced.

URL: https://nagitw.github.io/Nagi.tw/
Deployed source commit: 7198b09e40b14a42cb306d7cae8f4e582f22782f.
Workflow: https://github.com/nagitw/Nagi.tw/actions/runs/45425046332
Build and GitHub Pages deployment: SUCCESS.
Live acceptance: PASS — 4 bilingual pages at 320/768/1440px; keyboard
accordion, confirmed date ranges and award, Penguin and homepage motto verified.
Other individual dates remain omitted by author instruction, without a release blocker.
Documentation-only closure commits do not change the deployed site.
