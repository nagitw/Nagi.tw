# Phase 9.3 — Final Quality Assurance

Decision: **GO for Phase 9.4**, with the verification limits below. No reproducible application defect required a fix. This is a focused Journal audit, not a full WCAG conformance certification.

Audit date: 2026-11-22 (Asia/Taipei). Fresh evidence is in [run-20261122](run-20261122/). The pre-existing evidence directory is preserved and is not the basis for these conclusions.

## 1. Browser QA matrix

Real installed Chrome/Chromium 157.0.8103.79 was driven through Playwright; real installed Firefox 160.0.1 through WebDriver BiDi. Both ran headlessly on Windows with reduced motion enabled. No browser executable or system security policy was modified. The shell initially failed with access denied; execution proceeded through the tool's explicit escalation approval.

| Engine | English 320 | English 768 | English 1440 | zh-TW 320 | zh-TW 768 | zh-TW 1440 |
| --- | --- | --- | --- | --- | --- | --- |
| Chromium | PASS | PASS | PASS | PASS | PASS | PASS |
| Firefox | PASS | PASS | PASS | PASS | PASS | PASS |
| WebKit | UNAVAILABLE | UNAVAILABLE | UNAVAILABLE | UNAVAILABLE | UNAVAILABLE | UNAVAILABLE |

PASS covers the checks actually recorded in [results.json](run-20261122/results.json): pure black computed background; responsive measure and typography; TOC visibility and native disclosure; desktop sticky positioning; active heading selection on anchor navigation and ordinary scrolling; progress reaching 100%; short articles; copying both code blocks with original indentation; rejected clipboard feedback; encoded permalinks; unique duplicate-heading IDs; non-ASCII fragments; skip link, focus, TOC keyboard order, Enter/Space disclosure; no document horizontal overflow; and script-disabled operation. Chromium recorded 96 passing assertions; Firefox 90. No failed assertions or engine errors occurred.

Chromium clipboard success included native write completion and clipboard readback. Firefox included native write completion and equality of the submitted text to code text; clipboard readback was not tested there. Explicit browser clipboard-write permission denial was tested in Chromium. Firefox tested native rejection without user activation and a separately injected NotAllowedError; explicit Firefox OS/browser permission denial remains UNVERIFIED. The injected failure check is identified separately from native behavior.

Computed article widths were 288px at 320, about 707px at 768, and 720px at 1440. Body type was 17px/30.6px at narrow widths and 18px/32.4px at desktop. Wide code and tables retain internal scrolling. Eight screenshots at 320/1440 across both languages and engines were manually inspected; no clipping across the page edge or broken TOC layout was observed. Screenshots intentionally show a scrolled reading position and may show the tested copy-failure state. At 768, layout was checked by browser assertions; screenshots were not captured.

WebKit launch failed because ms-playwright/webkit-2336/Playwright.exe is absent; see [webkit.log](run-20261122/webkit.log). WebKit was not executed and receives no PASS.

## 2. Accessibility results

Automated results below are custom DOM, keyboard-input, geometry, computed-color, and Chromium accessibility-tree assertions. No axe installation was found in the available npm cache. Manual work comprised source/semantic review and visual inspection of the saved screenshots, not a manual assistive-technology session.

| WCAG 2.2 AA focus | Evidence and result |
| --- | --- |
| 1.3.1 structure; 2.4.6 headings | Article/header/main/footer/navigation and nested ordered TOC are semantic. One h1; fixture headings follow h2/h3/h4 order. Headings retain names when permalinks are appended. PASS in sampled content. Future author content requires editorial review. |
| 2.1.1 keyboard; 2.4.1 bypass; 2.4.3 order | Actual Tab/Enter navigation reaches skip link/main and visible TOC after breadcrumbs; Enter/Space toggle native details. Heading links and permalinks activate with Enter. PASS in both engines. |
| 2.4.7 visible focus; 2.4.11 not obscured | Skip-link focus-visible and solid outline asserted; summary focus has a solid outline and its center is hit-testable. Source has a global 2px white outline with 3px offset. PASS for sampled controls; exhaustive traversal of every link at every scroll position was not performed. |
| 1.4.3 contrast | Sampled headings, body, metadata, TOC summary, copy button and fixture syntax tokens have minimum computed contrast 7.158:1 against their actual black/code backgrounds. PASS for this sampled palette. Not an exhaustive test of future authored colors. |
| 1.4.10 reflow | No page-level horizontal overflow at all widths in both engines, with and without scripts. PASS. Code/table internal scrolling remains available. |
| 2.5.3 label in name; 4.1.2 name/role/value | Copy buttons use visible localized text as accessible names, including failure feedback. Permalinks include localized purpose and heading text. Native summary/details provides disclosure state; progress is named. Chromium AX tree exposes navigation, headings, button, progressbar and disclosure. PASS. Firefox AX tree was not separately inspected. |
| 4.1.3 status messages | A role=status region receives localized feedback; Chromium AX tree confirms polite live behavior. PASS for markup/tree and text updates. Actual speech output UNVERIFIED. |
| 3.1.1 page language | html lang=en and zh-TW asserted in the respective routes. PASS. |
| 2.5.8 target size | Permalink targets 24x24px; copy controls approximately 85x31px; summary at least 24px tall. PASS for sampled controls. Inline prose/footnote links fall under the inline-text exception. |
| Reduced motion | Browser emulation/profile preference recognized in both engines; progress transition duration 0s. Native anchor navigation has no scripted animation. PASS for tested preference. |

No actual NVDA or VoiceOver session was available. No speech output was tested. Text spacing overrides, full zoom/orientation coverage, forced colors, and every remaining WCAG criterion were not exhaustively audited.

## 3. Localization results

Both language routes passed assertions for breadcrumbs (Home/Journal and 首頁/札記), breadcrumb accessible names, TOC labels (On this page/本頁目錄), locale-formatted publication dates (January 10, 2026 / 2026年1月10日), reading-time UI, copy labels and success/failure feedback, permalink names, reading-progress name, footer return link and its destination, and HTML language. Source review confirmed the same locale formatter handles updated dates and that article-details and tags accessible names are localized. Existing localized copy was used unchanged; no article translations were created. The short Chinese fixture retains its pre-existing English test metadata and is not treated as translated editorial content.

## 4. Progressive enhancement

All 12 combinations passed. Chromium used a context with JavaScript disabled. Firefox used browser-enforced script-src 'none' CSP on the local test server; the assertion-evaluation channel remained available, while document scripts were blocked. This is not a Firefox global JavaScript preference test.

Articles and h1 remain visible; native mobile summary opens through Enter; encoded duplicate/non-ASCII TOC links navigate to heading IDs; code can be selected using a browser Range; and document width remains within the viewport. Enhanced copy controls, generated permalink controls and visible progress are absent as expected. Server-rendered heading IDs and TOC fragment links still work; generated # controls themselves require JavaScript. Mouse-drag code selection was not separately tested.

## 5. Performance and security findings

Reviewed JournalArticle.astro, JournalToc.astro, journal-reading.ts, both detail routes, global.css, layout, content loaders, schema publication filters, integration fixtures and regression scripts.

The implementation uses three window listeners (passive scroll, resize, hashchange), a single ResizeObserver and requestAnimationFrame coalescing. It does not use IntersectionObserver. Per frame it reads the article bounds and heading positions and updates aria-current only when the active heading changes. This is reasonable for the static reading pages sampled. Observer/listener teardown and idempotence would need review if client-side page transitions or repeated enhancement are introduced; neither exists in the current layout. No speculative lifecycle changes were made.

Copy writes occur only after a button action, use code.textContent, preserve indentation, catch unavailable/rejected clipboard operations and announce localized feedback. Labels and feedback are assigned with textContent; fragment URLs are encoded. No innerHTML injection, clipboard reads in application code, or additional runtime dependencies were introduced. The test harness reads the clipboard only to verify Chromium behavior.

Images in fixtures reserve dimensions. Chromium observed cumulative layout shift 0 during the sampled run. Firefox lacks the recorded layout-shift observation (null); its CLS is UNVERIFIED. These are local observations, not field performance measurements or a Lighthouse/Core Web Vitals certification.

## 6. Tests executed and exact results

All required production commands exited 0; full output is retained alongside this report.

| Command | Result |
| --- | --- |
| npm run test:i18n | PASS: language detection and equivalent route mapping |
| npm run test:schema | 5 tests, 5 pass, 0 fail, 0 skipped |
| node scripts/security-migration.mjs | PASS: 5/5 articles; exact original bodies including code/links; 1/1 image; 14 existing content files unchanged; unique slugs; drafts excluded |
| npm run check | 31 files; 0 errors, 0 warnings, 0 hints |
| npm run build | 17 page(s) built |
| npm run verify:static | PASS: 15 static pages, landmarks, h1, SEO, canonical, navigation, local links, 404 noindex, early black styling |

The static verifier covers the 15 base pages; its message is not the total site count. The two published BugTraceAI detail pages bring production to 17.

The isolated copy ran npm run test:content:prepare, npm run build, then npm run test:content. Result: PASS: all five lists, featured, four detail routes, Markdown/MDX, metadata, gallery, draft/archive exclusion. That build contained 25 pages: the 17 production pages, four Journal reading fixture routes, and four published integration detail routes. The integration test removed only its own manifest-owned fixtures. A second isolated npm run build generated the browser fixture build after integration cleanup. No fixture was inserted into the real src/content directory.

node docs/phase-9.3/run-20261122/publication-audit.mjs exited 0: PASS: 17 pages; 67 original files unchanged; five draft hashes; no public Journal detail or QA fixtures; BugTraceAI and canonical/hreflang intact. [publication.json](run-20261122/publication.json) records all page canonical/alternate URLs and draft SHA-256 values. The 67-file comparison covers the original src/public/scripts trees plus package/config files against the copy made before testing. The migration guard independently checks pinned migration hashes. Both BugTraceAI languages retain their source bytes and PR #9/#10 links.

Browser harness: node docs/phase-9.3/run-20261122/browser-audit.mjs with NAGI_QA_DIST pointing to the isolated dist and NAGI_QA_OUT to the evidence folder. All 186 assertions passed. The harness and exact isolated fixtures are saved for review; its Playwright module path is local to this machine. The local HTTP server and browser sessions close at completion. No Astro dev server was started.

## 7. Files modified

No existing application, content, dependency, configuration, or prior evidence file was modified. Added only this REPORT.md and run-20261122/: browser/publication harnesses, exact isolated fixtures, logs, results.json, publication.json, isolated-root.txt, and eight PNG screenshots. Production dist and ignored Astro build artifacts were regenerated by the required commands. Existing tracked changes and untracked files were preserved. No commit, push, merge, deploy or article publication occurred.

## 8. Unverified items

- WebKit/Safari rendering and interactions: executable unavailable.
- NVDA/VoiceOver speech output and real assistive-technology usability.
- Explicit Firefox clipboard permission denial and Firefox native clipboard readback.
- Firefox accessibility-tree inspection and CLS measurement.
- Firefox global-JavaScript-disabled setting (CSP blocking was tested instead).
- Full manual keyboard traversal, text-spacing overrides, forced colors, zoom/orientation and full WCAG conformance beyond sampled checks.
- Real-device touch behavior and production field performance.

Earlier phase-9.3/evidence/results.json has Firefox failures. The reviewed rerun includes active BiDi browsing-context activation, real pointer interactions for clipboard activation, and now real keyboard disclosure checks. Those old failures were not reproduced in either fresh run, so no website fix was justified. The historical files remain unchanged.

## 9. Phase 9.4 decision

**GO**: the available engines pass the Journal audit, required regressions pass, publication remains at 17 pages and all original application/content bytes are preserved. Carry the listed environment and coverage limits into Phase 9.4; this GO does not claim Safari support or screen-reader speech verification.
