# GitHub Pages Release Preparation Implementation Plan

**Goal:** Prepare the existing V3.1 working tree for https://seraphforge.github.io/nagi.tw/ without publishing or changing Git history.

**Architecture:** Keep Astro static output and existing base-aware routing. Supply site origin and base through environment variables, remove domain-specific publication assumptions, and validate the generated artifact and browser navigation.

**Tech Stack:** Astro, TypeScript, Node, Playwright, GitHub Actions.

**Spec:** User request in this session, 2026-11-14.

## Constraints

- Preserve branch, existing modifications, UI, content and project data.
- No commit, push, merge, PR, deploy, reset, clean, or forced history changes.
- Pages uses Offline; retain public Mock support without a backend connection.
- Work directly in the current project as requested. Execute inline; no approval handoff or worktree switch.

## Tasks

- [ ] Record starting Git state and preserve pre-edit files for rollback.
- [ ] Reproduce incorrect Pages origin/base and Mock production rejection with regression checks.
- [ ] Update Astro site/base, CI build/browser environment, RSS/robots, Mock source URLs, and remove CNAME.
- [ ] Adapt production validation and browser tests to the configured deployment.
- [ ] Run TypeScript, Astro, build, production, unit, AI, secret/dependency scans and applicable browser tests.
- [ ] Review source/artifact safety and history divergence; write evidence, risks and GO/NO-GO.

## Review Focus

Check root-domain compatibility, nested missing-page recovery, redirect destinations, bilingual alternates and sitemap exclusions, and network-free Offline/Mock behavior. Inspect all generated HTML/CSS/JS references, not only the landing pages.

## Verification

Run with SITE_URL=https://seraphforge.github.io and SITE_BASE=/nagi.tw/ and PUBLIC_PENGUIN_AI_MODE=offline. Use existing npm scripts plus a Pages artifact regression check. Record every command's actual exit status and distinguish environmental blockers from passing tests. Inspect live remote SHA read-only and do not integrate unrelated histories.
