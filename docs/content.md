# Content collections

Place `.md` files in `src/content/<collection>/`. Existing `.mdx` files remain supported;
MDX is not required for articles, native HTML images, figures or captions.
Lists, homepage featured content, and four detail routes now query collections.

Every entry requires `title`, `description`, `slug`, `publishedAt`, and `status`.
`cover` and `coverAlt` are required except in Journal, where both may be omitted
for articles without original artwork. A Journal cover still requires nonempty
`coverAlt`; `coverAlt` and `coverCaption` cannot exist without a cover.
Quote dates as `YYYY-MM-DD`. Slugs use lowercase ASCII
letters, numbers and single hyphens. `updatedAt` is optional and cannot precede
`publishedAt`. `tags` defaults to `[]`; `featured` and `demo` default to `false`.
`coverCaption` is optional. Astro's `image()` resolves and validates local images
relative to each content file. Provide meaningful alt text.

Status is explicitly `draft`, `published`, or `archived`. `selectPublished()`
excludes draft and archived entries, sorts newest first, rejects duplicate slugs
within a collection and language, and accepts `{ featured: true }` or `{ tag: 'notes' }` filters.
List/detail routes call this helper through `src/lib/content.ts`; collection loading alone does
not publish or hide pages. `publishedAt` is the editorial date, not a scheduler.

Required collection-specific fields:

| Collection | Fields |
| --- | --- |
| projects | `role`, nonempty `tools` array; optional `projectUrl`, `repositoryUrl` |
| research | `question`, nonempty `methods` array; optional `sources` URL array |
| journal | `kind`: `note`, `essay`, or `reading` |
| photography | `takenAt`, nonempty `images` array (`src`, `alt`, optional `caption`); optional `location` |
| experience | `organization`, `role`, `startedAt`; optional `endedAt`, on or after `startedAt` |

## 維護與發布

五類各有 `draft-template.md`（Journal 使用 `.mdx`）。複製後修改檔名與 slug；
亦可按 `projects/<slug>/index.md`、`projects/<slug>/cover.webp` 整理，封面用 `./cover.webp`。
同一分類、同一語言的 slug 在所有狀態間不可重複；公開網址使用 frontmatter slug，不使用檔名。
Projects、Research、Journal、Photography：`/<collection>/<slug>/`；
Experience 僅列表與 `/experience/#<slug>`，正文目前不渲染。

目前只有 BugTraceAI-CLI 貢獻案例的英文及繁中版本為 published；其餘內容維持 draft。
五篇舊站 Journal 全部未發布，零售 security-culture 原文未另獲明確授權前不得修改或發布。
五篇遷移文章的原始資料、日期、雜湊及驗證限制記錄於 `docs/security-migration/README.md`。
所有 `2000-01-01` 都是 Schema 日期占位，不代表實際事件日期。
封面 `../../../public/nagi.svg` 是既有標誌，僅驗證圖片欄位，並非照片或成果。
image() 使用相對檔案路徑；`/nagi.svg` 這類網址不可作為 image() 的本地檔案路徑。
新正文圖片放在 `public/images/blog/<article-slug>/`，使用包含部署 base 的根相對網址；
既有圖片檔案、網址及封面 metadata 保留。正文提供 Alt，從二級標題開始，頁面已有 h1。
一般文章使用 Markdown 與原生 HTML 即可；不需要 MDX、圖片元件或外掛。

### 人工確認欄位

| 類型 | 發布前確認 |
| --- | --- |
| 共用 | title、description、唯一 slug、真實 publishedAt；updatedAt 不早於發布日；標籤、精選選擇；封面權利、Alt、圖說 |
| Projects | 真實作品、本人 role、實際 tools、過程與可證實成果、可公開 projectUrl／repositoryUrl |
| Research | question、實際 methods、可查證 sources、結論與限制、對外公開許可 |
| Journal | 正文、kind（note／essay／reading）、引用與使用權、日期與公開範圍 |
| Photography | 原創照片與授權、takenAt、每張 src／alt／caption；location 不得暴露私人定位；移除私人 EXIF |
| Experience | organization、真實 role、startedAt、職責及公開許可；已結束須補 endedAt，否則列表會顯示「至今」 |

未確認維持 draft。`demo: true` 不是發布保護，仍以 status 為準。
發布前須替換所有占位日期、標誌與「待確認」，完成事實及授權核對，
將 demo 改 false，最後才設 status: published。不要虛構研究、工作、競賽或照片。
draft 不是機密儲存空間；原始檔、public、圖片及 EXIF 均不得含真實姓名、私人資訊、
API Keys、Token 或內部研究機密。不要加入未授權原圖。

### 驗證

依序執行 `npm run test:schema`、`npm run check`、`npm run build`、`npm run verify:static`。
發布後人工確認公開詳細頁、列表、首頁精選、圖片、Alt、圖說與所有外部連結。
無精選時顯示既有提示；draft／archived 不輸出公開詳細頁。

整合測試只在獲准的拋棄式 Windows QA 副本執行，不操作權威工作目錄或 WSL 預覽副本。
依序：`npm run test:content:prepare`、`npm run build`、`npm run test:content`。
測試結束會移除暫時內容；中斷時執行 `npm run test:content:cleanup`。
最後重跑 Build 與 verify:static，確保 dist 沒有測試內容。
`test:content` 驗證模式也會清除自有 fixture，並非唯讀。`test:content:empty` 要求無 published 內容，
不適用目前 BugTraceAI 基線。舊 demo 驗收腳本已於結案清理移除；正式網站使用 `npm run verify:release`。

## Languages

English is the source language for new UI and content. Entry frontmatter accepts
language: en (default) or language: zh-TW. Set this explicitly before publishing
existing Chinese drafts; their source files have been preserved unchanged.
English pages use unprefixed routes; Traditional Chinese pages use /zh/.
HTML language and hreflang use zh-TW, never the URL prefix zh.

Use separate files with the same collection and slug and different language
values for a translation pair. Both versions must be published to appear as
alternates. Home and collection pages prefer the selected language when both
versions are available and otherwise show the available version with a notice.
Each detail page has its own canonical URL. The language switcher links directly
to a published translation and falls back to the corresponding collection
when a translation is unavailable. Draft and archived entries are excluded.

The BugTraceAI-CLI case study uses the Nagi.tw mark as its editorial cover.
The mark identifies the portfolio in both languages.
See [the Phase 8 audit](./phase-8-content-audit.md) for evidence and pending entries.

Run npm run test:i18n for routing helpers, followed by the existing schema,
check, build, static verification, and content integration commands.

## Long-form Journal articles

The layout supplies the page title. Start body sections at Markdown `##` and
nest subsections in order. The required `description` supplies the listing
and SEO summary. Add `subtitle` for a visible introduction, `author` for an
approved public byline, and `references` for an optional list of objects with
`label` and an HTTP or HTTPS `url`. Reading time is an estimate from the source
body. A cover is optional. Use descriptive alt text for figures and
`<figure>` with `<figcaption>` when a body image needs a visible caption.

### Native article images and deployment paths

Store new article images in `public/images/blog/<article-slug>/`, for example
`public/images/blog/uart-notes/board.jpg`. Do not move or rename existing images.
HTML in ordinary `.md` files supports `src`, `alt`, `width`, `height`, and `loading`:

```html
<img src="/Nagi.tw/images/blog/uart-notes/board.jpg"
     alt="UART wiring between the board and the serial adapter"
     width="1200" height="800" loading="lazy">

<figure>
  <img src="/Nagi.tw/images/blog/uart-notes/trace.png"
       alt="Serial trace showing the boot sequence"
       width="960" height="640" loading="lazy">
  <figcaption>The boot sequence captured at 115200 baud.</figcaption>
</figure>
```

These paths illustrate authoring; supply the actual files before using them.
Use the image's real dimensions to reserve layout space. Small images keep their
intrinsic or declared size; larger images shrink to the reading column. Shared
global CSS preserves aspect ratio without cropping, filters or forced enlargement.
Use `loading="eager"` for an important image visible at page load, otherwise `lazy`.
No Astro Image import, MDX, shortcode, image plugin or JavaScript is needed.
Existing cover/gallery metadata still uses the existing Astro image component.

| Deployment | Astro `base` | Native HTML `src` for the example file |
| --- | --- | --- |
| Current GitHub Pages project | `/Nagi.tw` | `/Nagi.tw/images/blog/uart-notes/board.jpg` |
| Potential custom domain at its root | `/` | `/images/blog/uart-notes/board.jpg` |
| Custom domain retaining a subpath | `/Nagi.tw` | `/Nagi.tw/images/blog/uart-notes/board.jpg` |

`public` is never part of a browser URL. Raw HTML URLs are literal: Astro does not
automatically add `base` or interpolate expressions inside ordinary Markdown HTML.
Use the same image path in both languages; do not add `/zh` to image URLs.
Do not use `./images/...` or a bare `/images/...` on the current Pages deployment.

A future custom-domain migration must separately update `site`, `base`, canonical
and sitemap/robots configuration, and audit native HTML image URLs before building.
Changing a hostname alone does not change the correct path. Preserve old image URLs
through host redirects or compatibility copies if a migration changes their paths.
This implementation does not change deployment configuration or existing image URLs.

### Simplified reading and appearance

Articles use a single reading column and one native contents disclosure. Heading
anchors and browser navigation remain available without JavaScript. Reading progress,
scroll tracking, copy controls and decorative mascot animation are removed.
The localized footer provides Light, Dark and System appearance. A small native
script stores `nagi-theme`; System follows live OS changes using CSS. When JavaScript
or storage is unavailable, content remains readable in system appearance.

Native HTML image QA runs only in `.astro/simplification-fixture`, an ignored,
disposable copy. It adds new test-only English/Chinese articles there and never
changes existing source articles or their states. See `docs/simplification/REPORT.md`
for commands, results, screenshots and limitations.

The typography fixture lives at `scripts/fixtures/journal-typography.md`.
For local QA, build from a disposable project copy with the fixture placed in
that copy's Journal collection and its status set to published. Serve only
the disposable build on loopback. The fixture stays outside the workspace's
production content collection.

## Phase 10.2 content contract

本階段承接 Phase 10.1 對話中的唯讀稽核；不新增集合、路由或個人資料庫。
執行計畫：驗證 Windows 備份 → 先寫失敗測試 → 選填契約／Profile／遷移模式 →
文件與完整驗證。僅修改 content-schema、sections、schema tests、migration verifier、
本文件及 README；不改內容檔、發布旗標、原始 manifest、套件或設計。

### Optional metadata

既有必填欄位與預設不變。新增欄位一律選填且不設預設；未知時省略。
`description` 是摘要、`tools` 是技術列表、`language` 是 locale，不建立同義欄位。

| Contract | Additional optional fields |
| --- | --- |
| All collections | `evidence` |
| Projects | `developmentStatus`: `concept`, `in-progress`, `maintained`, `completed`, `paused`, `discontinued` |
| Research | `researchArea`, `institution`, `team`; `researchStatus`: `proposed`, `in-progress`, `completed`, `paused`; `verifiedOutputs`, `publications` |
| Experience | `responsibilities` (array of nonempty strings), `verifiedContributions` |
| Journal | `category` (topic); existing `kind` remains the writing form |

`evidence` is an array of strict objects: required `label`, HTTP(S) `url`, and
`claim` describing precisely what it supports; optional quoted ISO `accessedAt`.
Only approved public artifacts may be linked. Do not put private evidence or
identifiers in metadata. A link does not establish truth, execution or permission.
`verifiedOutputs`/`verifiedContributions` contain strict objects with `description`
and at least one `evidence` item. Verified is an editorial responsibility, not a
conclusion made by Zod. `publications` uses strict `{ label, url }` HTTP(S) objects.
Do not treat proposed experiments as outputs or invent papers.

Existing `sources`, `projectUrl` and `repositoryUrl` retain their previous validators
for compatibility; new evidence/profile/publication links accept HTTP(S) only.
`status` remains the sole editorial visibility control. Project/research progress,
evidence and featured never grant publication. Do not add a second draft boolean.
These contracts do not automatically render new fields. Experience body still
does not render; later authorized integration must choose what to display.
Legacy Journal `categories`, `site_lang`, `translation_key`, `seo_title`, etc.
remain untouched and are not automatically mapped into current fields.

### Central public Profile

`src/lib/sections.ts` exports `publicProfile`, validated by `profileSchema` from
`src/lib/content-schema.ts`. About's `note`/`zhNote` read this biography; visible
copy is unchanged. No Profile collection or parallel store is created.
The strict contract accepts optional `publicName`, `biography`, `technicalInterests`,
`skills`, `links`. Biography and each interest use `{ en, "zh-TW"? }`; skills are
nonempty strings; links use HTTP(S) `{ label, url }`. Empty Profile is valid and
creates no defaults. Only the existing Nagi.tw identity and bilingual About copy
are populated. Unconfirmed skills and contact links are absent.
The homepage retains its site introduction; future personal Profile displays
should consume `publicProfile`, not duplicate its biography into components.
Never insert legal names, private contact information or excluded education.

### Immutable migration and authorized revisions

`docs/security-migration/originals/` and `manifest.json` remain immutable provenance.
Never edit source snapshots, replace their pinned Git blobs or recalculate baseline
hashes to accept an edit. The migrated image remains pinned too.

| Command | Scope and limits |
| --- | --- |
| `node scripts/security-migration.mjs` or `--strict` | Default: exact original destination bytes/metadata/drafts, original snapshots/image, prior content hashes and original Journal inventory. |
| `node scripts/security-migration.mjs --originals-only` | Five immutable source snapshots and image only. Does NOT check current articles, publication or routes; never sufficient for release. |
| `node scripts/security-migration.mjs --editorial` | Immutable sources, recorded revision chains, current Journal schemas/unique slugs, stable migrated slug/source language/original date, and draft status for every Journal entry. Allows additional drafts without freezing unrelated Projects/Research edits. |

Unknown flags/extra arguments fail closed. `--import` is a write operation for the
initial migration only and refuses the existing manifest. No `revisions.json` is
created or authorized by Phase 10.2.

After separate explicit author approval, a future editor may add the audit ledger
`docs/security-migration/revisions.json`, with strict shape:

```json
{ "version": 1, "revisions": [] }
```

Each record requires `slug` (one of five migrated identities), `previousSha256`
(first: immutable manifest destination hash; later: preceding revision hash),
`sha256` of the complete approved revised file, ISO `approvedAt`, nonempty
`approvalReference` and `summary`. Only these keys are accepted. Add records in
per-article order; do not rewrite history. Approval dates cannot move backward;
no-op hashes fail. Retain each approved revision in reviewed version history or a
recoverable backup; the ledger alone cannot recover earlier bytes.

The verifier checks structure and hashes, not approval authenticity. A human must
check the referenced approval and compare the complete revision to its scope.
This ledger is audit metadata, not another content store or publication permission.
`--editorial` rejects published/archived Journal entries even with matching hashes.
Future publication requires separate release approval and authorized verifier work.
Retail remains untouched/unpublished; Phase 9.5's proposal is not an approval.
Translations require separately reviewed files with explicit language and shared
public slug; do not change a migrated source's language to fabricate a translation.

### Validation and recovery

Run `npm run test:schema`, `npm run test:i18n`, the appropriate migration mode,
`npm run check`, `npm run build`, `npm run verify:static`. Schema tests run the real
verifier against disposable Windows temp fixtures, never live content; those temp
fixtures are retained for diagnosis. Static verification covers 15 base pages,
not all detail routes. Separately verify both BugTraceAI pages, canonical/hreflang,
draft exclusion and absence of test fixtures. Current production has 17 HTML pages.

Preserve source, untracked files, Git metadata and existing dist before editing a
dirty tree. Regenerable node_modules/.astro may be excluded. Verify SHA-256 before
and after copying, retain the manifest, and restore only individually reviewed
files. Never reset/clean or overwrite newer work. Git commits alone omit untracked files.

## About maintenance — final content cleanup

About now uses `AboutProfile.astro` within the existing `SectionPage.astro` About
branch. `AboutSection.astro` provides semantic numbered sections. Existing routes,
Layout, ContentCard, global tokens and other collection pages are unchanged.
`publicProfile` in `sections.ts` remains the only Profile content source; do not
copy its biography or personal records into components or another data file.

The Research Interests and Technologies/Tools sections have been removed completely,
including their populated Profile data and display code. Do not reintroduce them
under another heading or as an equivalent list. The introduction is a short
bilingual description of the site's records. About links to the complete
chronological Experience collection and shows featured projects with a link to
all projects; it does not duplicate the full competition history.

Additional optional Profile fields (all strict objects):

| Field | Required data per entry |
| --- | --- |
| `honors` | localized `competition`, integer `year`, nonempty `evidence`, `approval`; optional localized `team`, `ranking` |
| `talks` | localized `event`, `title`, `role`; ISO `date`; nonempty `evidence`, `approval` |
| `education` | localized `organization`, `qualification`, `dateRange`; nonempty `evidence`, `approval`; optional localized `description` |

Localized values use `{ en, "zh-TW"? }`. The legacy optional schema fields for
interests and skill groups remain parser-compatible but are unpopulated and are
not rendered by About. This preserves schema compatibility without retaining the
removed website sections.
Evidence uses `{ label, url }` with HTTP(S) URLs. `dateRange` is approved text so
an education record never needs invented day-level precision.

`approval` is explicitly `pending` or `approved`, without a default. About filters
out pending honors, talks and education. This is a rendering guard, not proof of
approval authenticity; the author/editor must independently confirm facts,
privacy, public evidence and permission before marking any real record approved.
No honors, talks or education records have been supplied or added. Public links
remain absent; add only author-approved public links. Never place private data
in pending records: the repository is not confidential storage.

Experience and projects reuse existing collections, not Profile arrays. About
queries published featured projects and prefers the page language. Experience
is a direct localized link to its full collection. It never publishes drafts.
Missing honors,
talks, education and contact sections are omitted. Selected Projects currently
shows only the existing bilingual BugTraceAI case study, without changing either
source or publication status. Additional source-language records may use English
fallback; supply reviewed Traditional Chinese wording before a bilingual release.

Validation: `node scripts/about.test.mjs`, existing schema/i18n checks and
TypeScript, followed by fresh Astro Check/Build and
`node scripts/verify-about.mjs` on that build. The output verifier covers both
About routes, removal of interests/tools, concise Experience navigation, public project links, absent optional sections,
canonical/hreflang, draft detail exclusion and internal navigation. It checks
anchor navigation separately from metadata URLs such as the existing 404 canonical.

### Competition release candidate

The current official-date audit is `docs/release-candidate/competition-date-audit.md`.
Use the existing editorial policy to apply source-backed date/stage corrections;
do not rewrite byte-pinned historical Markdown or publication states. Years are
newest-first; dated records within a year run earliest-first, with year-only
records last and stable slug ordering in both languages. The 2026-season EOF
preliminary is grouped under its actual December 2025 date. MyFirstCTF 2025 is
excluded and MyFirstCTF 2026 remains. Source awards/participation are retained as
author-reported; schedule verification does not independently certify results.

The release-candidate baseline is separate from the earlier simplification
baseline. Run `node scripts/verify-release-candidate.mjs` for current preservation,
chronology and bilingual output checks. Do not regenerate an old baseline merely
to accept an authorized later change; retain its evidence and create a new one.
