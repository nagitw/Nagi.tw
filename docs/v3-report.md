# Nagi.tw V3 — Integration & Production Readiness

## 2026-11-07 — Content architecture and experience history correction

This latest section supersedes the earlier Research membership and public-plan behavior. Starting tree was clean at `4d84564`; no user edits were discarded.

- Projects now uses an engineering-only selector: MedTrust, Home Lab and autonomous robot remain; the medical-security direction is not listed as an engineering artifact. All original article URLs and publication decisions remain intact.
- Research has one medical-topic entry, “Medical IoT trust boundaries.” MedTrust, early observations, medical direction and evidence-integrity report remain discoverable as typed related links, not repeated cards. Research notes and technical reports retain their independent pages.
- Journal has four explicit, mutually exclusive primary categories: 資安 / Cybersecurity, 醫療 / Medical, 人生觀點 / Perspectives and 心得 / Reflections. Thirteen article groups share the same category across translations; optional tags are separate. Filter buttons, article counts, descending dates, summaries, visible original-language fallback and a single-column mobile layout were added. Articles and canonical URLs are preserved; no keyword-based dual classification.
- Removed both Roadmap routes, navigation labels, chat suggestion/mock answer, homepage invitation to future plans and unused styles. The publication selector also blocks future/roadmap content routes and aliases. Explicit personal-plan sections and sentences in existing articles are omitted by a build-only projection; local source text remains unchanged in `migrated.json`, and the removed standalone plan is retained in local Git history. General industry outlook and historical reflection are not rewritten as achievements.
- Existing experience rows now distinguish Competitions, Training / Workshops, Conferences, Talks and Teaching. No attendee was promoted to speaker. `eventDate`, `year` and `datePrecision` are separate; sorting is year descending, complete dates descending, month-only dates descending, then the year's undated section. No unknown month/day is filled in. Legacy experience article records are regrouped by year while keeping each record's text, awards and roles.
- Added an event-edition model with a `results[]` array for divisions/awards, so multiple achievements can belong to one event. No recovered candidates were inserted into production data. Existing published claims remain, including conflicts flagged for owner review; no silent withdrawal or correction of awards.
- [Experience audit](experience-audit.md) covers current repository and reachable local history, legacy JSON/Markdown and historical sibling source snapshots. It records source hashes, dates/precision, awards/ranks, missing fields, duplicates/conflicts and publication status. Newly found candidates are draft. K17/HITCON CTF participation was not established; conference attendance is not competition evidence. FTC/Ilan/MyFirstCTF years and InnoServe/PowerTech grouping require confirmation.
- Independent review caught an English personal-plan sentence variant; it was added to source and built-output regression tests before delivery.

### Verification and limits

- Astro Check: 77 files, 0 errors / warnings / hints. `npm run build`: 69 pages. `npm run typecheck`: passed.
- `npm test`: full suite, including the new content architecture and output checks, plus `/studio/` base-path build. Initial sandbox attempt hit child-process `spawn EPERM`; authorized retry used for the complete suite. RSS 503 warning is the intentional failure fixture.
- `npm run validate`: route/canonical/anchor checks, bilingual alternates, Journal categories/date order, Research card deduplication, original URL retention, experience year grouping, approved search/RSS/AI membership, draft/OSCP/private-identity scans and plan exclusion.
- `git diff --check`: passed. Penguin SVG and Penguin component are unchanged. The only homepage change is the requested removal of the future-plan invitation.
- No browser runtime/visual inspection was performed in this correction; automated assertions cover markup and output, not actual touch/filter interaction or rendered mobile appearance. Existing browser-host limitation remains. The external AI backend was not modified; this repository's public manifest and mock sources were verified.
- No new experience publication, push, merge or deployment. Await owner confirmation of the audit before turning recovered candidates into public records.

Changed files: `src/lib/{catalog,content,experience,journal,public-content,publication,penguin-ai}.ts`, `src/data/{experience,site}.ts`, `src/components/{JournalIndex,PenguinChat}.astro`, `src/views/{Experience,Overview,Projects,Research,StudioPage}.astro`, `src/pages/[page].astro`, `src/pages/zh/[...path].astro`, `src/styles/studio.css`, `package.json`, `scripts/test-{content-architecture,content-build,language,site}.mjs`, this report, `docs/experience-audit.md`, and `docs/superpowers/plans/2026-11-07-content-architecture.md`.


## 2026-11-07 — Security Research Portfolio refinement

This section supersedes earlier route counts and placeholder behavior below.

- Continued the existing uncommitted Projects/Research implementation on `feat/nagi-v2`; no reset, checkout, stash, source-body replacement or homepage redesign. Existing task changes are retained in the local delivery commit.
- Information architecture reference: [Vincent55 CV](https://vincent55.tw/), consulted for category/date/evidence organization only. No reference code, CSS, copy, images or brand elements were reused.
- Projects: bilingual cards, selected MedTrust overview, responsive technology tags, contextual navigation and independently approved related articles. Added explicit personal role/contribution and documented outcome/limitation sections based on existing project prose. Personal verified results and overall project results are separate fields; missing GitHub, demo or evidence URLs are not invented.
- Nagi CLI remains `active-development` + `draft`; BugTraceAI CLI remains `maintained` + `draft`. BugTraceAI participation does not imply sole authorship. Draft project routes, including old placeholders, are absent from public output.
- Research: actual records grouped into Medical/IoT, Web, CTF practice and embedded work. Research Project, Technical Report, Lab Experiment, Research Notes and optional Security Write-up vocabulary is supported. No write-up is invented merely to populate a type. 5G stays an exploratory direction; no B5G/6G/AI research publication or completed result is manufactured.
- Publication: explicit `published` selection feeds article routes, aliases, cards, related articles, search, RSS, sitemap and `knowledge.json`. Missing status fails closed. Existing approved experience entries now carry explicit publication status; no new experience was added. OSCP remains excluded, even if accidentally flagged published. No draft source data is imported into client scripts.
- CV: repository-only [inventory, minimal model and confirmation queue](cv-structure.md). No new competition, talk, teaching, community, employment or disclosure record was published. Dates, organizations, rankings and teams remain subject to source verification.
- Visuals: retained original penguin SVG/interaction, homepage, theme tokens and bilingual navigation. Cards stack on narrow viewports, tags wrap, article tables scroll locally, and long text wraps. Removed the work-card hover translation; no new animation.
- Independent review found and resolved a future publication-test false positive for approved project leads and outdated authoring guidance. No current private content exposure was found in reviewed paths.

### Verification

- `npm run check` and build-integrated Astro Check: 0 errors, 0 warnings, 0 hints (71 files after refinement).
- `npm run build`: passed, 71 pages; `npm run typecheck`: passed.
- `npm test`: passed, including publication selectors, attribution metadata, RSS, Penguin behavior, API endpoint validation, disclosures, article rendering, RSS success/failure fixtures and `/studio/` base-path builds. Initial sandbox run encountered `spawn EPERM`; authorized retry passed. The fixture's RSS 503 warning is intentional.
- `npm run validate`: passed route/SEO/internal-link/anchor checks, bilingual alternates, preserved SVG, identity fingerprints, withdrawn topic scan, sitemap/search/RSS membership and Projects/Research checks.
- `scripts/test-publication-build.mjs`: scans built HTML/JSON/XML/JS/source maps/text/CSS/SVG for private route references and draft source payloads; checks public AI manifest membership against approved editions.
- `git diff --check`: passed. Original homepage and penguin files were not changed.
- Browser access host was unavailable. Desktop/mobile screenshots, runtime theme/keyboard/touch checks and visual overflow inspection are **not verified**. No Lighthouse/Core Web Vitals claims. The external Penguin API backend was not changed or validated; the generated public manifest is the approved source boundary for future ingestion.
- No push, merge or deploy. Full local commit file inventory: [refinement-files.md](refinement-files.md).


驗收日期：2026-11-06。這份報告取代前一版 V3 報告中的公開研究系列與測試結果；未推送、合併或部署。

## 起始盤點

- 工作目錄：目前 `nagi.tw` Astro 專案；分支 `feat/nagi-v2`，起始 HEAD `bc76999`。
- 起始已有修改：`docs/v2-report.md`、`src/data/site.ts`、`src/i18n/ui.ts`、`src/layouts/BaseLayout.astro`；以及未追蹤的遷移清單、phase2 計畫、遷移 JSON／圖片、漏洞資料與測試。保留並接續這些工作，未 reset 或覆蓋回舊版。
- 架構為 Astro 靜態頁、typed data、共用 view；無 Content Collections 或安全提交後端。原 V3 已有企鵝動畫、雙語 UI、原生聊天 dialog 與 NDJSON Mock/API 客戶端。
- 原始資料來自同一工作區既有網站 `source/` 與 Notes 的文章。完整 139 筆來源盤點見 [內容遷移清單](content-migration.md)。建置只讀本專案已審核的快照，不讀私人兄弟專案。
- GitHub Pages 自訂網域為 `https://nagi.tw`，預設 base `/`；保留 `SITE_BASE` 並驗證 `/studio/`。部署仍限 main push／手動工作流程。

## 實作結果

- 公開名稱統一 Nagi，移除重複姓名顯示及私人聯絡值；Hero 與 About 加入中英文座右銘、問題導向開發理念。沒有增加學歷或成果宣稱。
- 原始 `public/nagi-penguin.svg` 與 `src/components/Penguin.astro` 相對 `bc76999` 完全不變；原動畫、鍵盤入口、reduced-motion 規則保留。
- 整合 51 個公開內容版本：18 日誌、9 專案、10 lab、2 研究、2 技術報告、8 經歷、2 參考資料。形成 30 組雙語內容路徑，缺少翻譯的九頁清楚提示並連向原文。
- 新增七組專案線索頁。Nagi Notes 有公開文章與既有網站可引用；其餘六項缺少足夠公開來源，僅標記待補充，未捏造技術架構、完成狀態、驗證結果或 GitHub URL。
- 共 94 個一般頁面、17 個舊網址 redirect HTML，另有 RSS、search JSON 與 sitemap。一般頁面均驗證唯一標題、description、canonical、語言及本地連結。
- Markdown 原始 HTML 一律轉義、圖片語法不直接載入外部追蹤資源、危險 URL 不生成連結；已審核封面圖片本地呈現。文章提供適合閱讀的行長、行距、表格／程式碼水平捲動。
- `/security/disclosures/` 與 `/zh/security/disclosures/` 已建立。支援 Web/IoT、年份、Low/Medium/High、ZD 編號、GitHub Commit/PR 與 detail/year 路由。實際資料為空，沒有示範漏洞或無效表單。
- 漏洞工作流程為 Draft/Merged/Published，漏洞狀態獨立為 Verified/Remediated/Public Disclosure。只有 Published + verified + explicit authorization + 完整有效資料才進公開輸出；合併不等於授權或已修復。
- 撤下 OSCP 的公開路由、導覽內容、首頁、日誌、研究、報告、roadmap 及 AI 回答。`src/data/series.ts`、`src/views/Series.astro` 原始草稿保留；route 的 `getStaticPaths()` 為空。沒有刪除研究資料或改寫 Git 歷史。
- 語言沿用英文 `/`、繁中 `/zh/`，避免破壞既有 canonical。共用導航同頁切換、保留 hash，手機使用相同導航控制；記錄語言偏好但不自動覆蓋明確網址。`html lang`、hreflang、canonical、sitemap 語系對應已驗證。
- 公開頁面不再盲目讀取即時外部 RSS。首頁、日誌、RSS、search 使用本地審核內容；Penguin AI 僅使用四個人工整理的公開主題摘要，不匯入全文或私人草稿。

## Penguin AI 合約

- 預設 Mock，清楚標示不連線後端。API 模式為 opt-in，不能宣稱已正式接通 Raspberry Pi。
- `PUBLIC_PENGUIN_API_BASE_URL=https://public-host.example` 會加上 `/chat`；保留舊的完整 `PUBLIC_PENGUIN_API_URL` 相容設定。API 模式缺少網址會直接阻止建置。
- 建置與執行共用 HTTPS 網址驗證：拒絕 credentials、query、fragment、IP literal、localhost/local/internal 主機及 11434 port；包含尾端句點繞過的回歸測試。一般公開網域 DNS 是否解析至私人位址仍應由部署端管理。
- POST `{question, locale}`，不傳 cookies、API key、歷史或私人 context；redirect 拒絕、no-referrer。NDJSON 事件為 delta/source/done，UTF-8 增量解碼。
- 30 秒 timeout、輸入 1000 字、回答總長 8000 字、串流 128000 bytes 上限；保留 malformed/incomplete stream 錯誤處理、取消、關閉後取消與重開競態保護。新增停止回答按鈕及明確離線／逾時／服務不可用提示。
- 真實 FastAPI、SQLite FTS5、CORS、限流、後端公開資料授權與 Raspberry Pi 系統皆未修改，留待正式後端工作。

## 驗證

- `npm run build`：通過；Astro check 共 60 個檔案，0 errors / 0 warnings / 0 hints，production build 94 頁（另有 17 個 redirect HTML）。
- `npm run typecheck`：通過。
- `npm test`：RSS parser/HTTP 失敗 fixture、企鵝 state、Mock/NDJSON/取消、HTTPS 設定、漏洞發布閘門、Markdown 安全、公開內容隔離及三則首頁限制；一般與 `/studio/` build、無 API 設定 build 拒絕。
- `npm run validate`：所有一般頁面的 SEO、語言、sitemap、內部連結／anchor、script 路徑；缺少翻譯提示；公開 HTML/JS/CSS/JSON/XML/SVG/TXT 中已知身分 fingerprint 與撤下主題掃描；RSS/search 僅含核准快照項目。
- `git diff --check`：通過。原始 SVG 與企鵝 component diff：零變更。
- 獨立 source review 的三項問題（API 主機尾端句點繞過、CI 未執行驗證、API 模式缺網址）皆已修正。
- 安裝時 npm audit 發現 9 項依賴問題；執行相容範圍的 `npm audit fix` 後為 0 項。Astro lockfile 更新至 7.4.6；新增 marked 18.1.3。Windows 對舊 native binding 的清理有 EPERM 警告，修補後建置與完整測試正常。
- GitHub Pages action 現在於上傳前執行 `npm ci`、build、typecheck、完整測試與 validate。`build-cmd` 依 [官方 action 定義](https://raw.githubusercontent.com/withastro/action/main/action.yml) 設定；沒有執行遠端 workflow。

## 尚未驗證與待補充

- Browser access host unavailable。嘗試原生 Firefox 時無 accessibility tree，隨後偵測到使用者操作且視窗內容改變，因此停止 UI 操作。未完成桌面／平板／手機、實際鍵盤／focus、theme、touch、reduced-motion 的 runtime 驗收，沒有宣稱視覺驗收通過。
- 未測量 Lighthouse/Core Web Vitals；靜態資產與既有 CSS／動畫保留不等於實測效能證據。
- 未呼叫正式 Raspberry Pi API；公開 API 本次不在實作範圍。
- 六個專案線索的可公開細節、缺少的翻譯、未公開演講教學、真實漏洞授權與證據仍待提供。歷史來源敘述不等於獨立重驗成果。
- 隱私掃描涵蓋已知識別值與本次輸出；沒有重寫 Git 歷史，歷史提交仍可能保留舊公開身分資料。
- 沒有 push、merge main、正式部署或修改 Raspberry Pi。新提交作者／提交者使用 Nagi 與本機占位信箱 `nagi@localhost`，未修改全域 Git 設定。

## 修改檔案

完整清單見 [v3-files.md](v3-files.md)。起始既有修改納入本次網站快照，舊 phase2 計畫僅保留為歷史紀錄；本報告描述實際交付。

## Complete Experience Archive — 2026-11-07

- Recovered 79 draft source assertions from every audit table row, historical editions, teaching/support claims and unresolved aliases. This is not a count of verified attended events. See `experience-master-list.md`, `experience-conflicts.md`, and `src/data/experience-archive.json`.
- Compared legacy HEAD experience JSON, the original About snapshot (`3801cc5`), and the historical Experience inventory (`1a5573c`); exact source paths/snapshots are retained per record and in the audit. No external organizer verification was performed.
- Preserved all eight approved bilingual snapshots. Recovered records and fields remain draft, including InfoSec 2026's exact date. Verification and publication are separate gates; candidate-only records cannot publish even when publicationStatus is accidentally set to published. Existing migrated articles retain their prior state; the teaching/prose boundary inconsistency remains explicitly documented for review.
- Six category filters, descending years, chronological dated entries followed by year-only entries, bilingual labels, conditional awards/ranks/evidence links and narrow-screen layout use the existing Penguin studio design. No homepage penguin changes.
- Astro Check: 80 files, zero errors/warnings/hints. TypeScript passed. Production build: 69 pages. Full npm test passed after sandbox spawn EPERM required an approved rerun; tests include repository-base build and expected HTTP error fixtures. npm run validate and Experience artifact scan passed across public HTML, JS, JSON, RSS, sitemap and AI output. git diff --check passed.
- Independent code review found no important issues. Browser interaction and visual desktop/mobile QA were not performed; responsive CSS and rendered static structure were checked, without claiming a browser visual pass.
- Historical conflicts remain unresolved intentionally: edition years, aliases, official award names/divisions, ranking units, roles and evidence URLs need user confirmation before any new publication. No push, merge or deployment.
