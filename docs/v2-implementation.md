# Nagi.tw v2 implementation

Approved scope: five static Astro routes; fixed desktop sidebar; accessible compact mobile navigation; light default and charcoal dark theme; typed content with provenance. No deployment.

1. Preserve pre-existing config and Notes diff in ../.tmp/nagi-v2-checkpoint; work on feat/nagi-v2.
2. Replace dashboard validation with rendered route, SEO, hierarchy, content-boundary and link checks. Observe failure before implementation.
3. Implement typed data, shared shell and five pages. Preserve MedTrust limitations. Keep Notes RSS independent.
4. Run check, build, RSS tests and validation; inspect responsive/keyboard/theme behavior and final diff.

Content sources: source/_data/portfolio.json, source/_data/experience.json, source/systems/medtrust/index.md, source/systems/home-lab/index.md, and the September project update. Identity/current areas follow the approved brief.

Omit unsupported publications and project demo/repository links. Omit Network Installation certification because locales disagree on 2024 vs 2026. Reference attachment is unavailable to the tools; direct visual comparison remains pending.

Baseline RSS parser: PASS.

Final: implementation and automated validation complete; see `v2-report.md` for results and browser/reference limitations. Independent review found one validator issue (asset URLs mistaken for page links); reproduced, fixed, and validated. No other important findings. No deferred minor review findings. Network Installation certification deliberately omitted due to conflicting source years.
