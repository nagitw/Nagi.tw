# Phase 11.0 — About Page Technical Profile

2026-11-23，Asia/Taipei。已實作並驗證本地版本；沒有部署或發布新集合內容。

## A. Existing About architecture

原本 `/about/`、`/zh/about/` 都由既有 `[section].astro` 路由進入 SectionPage，
透過 sections.ts 的 note／zhNote 顯示單段 publicProfile biography。沒有獨立 Profile collection。

現在保留相同路由及 Layout，只在 SectionPage 的 About 分支使用 AboutProfile。
其餘分類仍使用原有版型、查詢及空狀態。publicProfile 仍是唯一個人內容來源，
Projects／Experience 仍來自原有 collections。

已讀 AGENTS.md 與既有維護／安全規範。修改前保留全部既存工作，建立並逐檔驗證
244 檔 Windows 備份：暫存目錄 `nagi-phase11-0-20261123-171728-1f4560ce`，
包含來源、Git metadata、未追蹤檔及原 dist；排除可重建的 node_modules／.astro。

## B. Reference information architecture analysis

參考：[NiNi About](https://blog.terrynini.tw/about/)。只採用其資訊架構觀察：
先建立身分與興趣，再以分類、時間與外部依據整理成果、公開貢獻、分享、教育及經歷。
這有助讀者分清關注領域、可查證成果與時間脈絡。

未複製參考頁文字、HTML、CSS、圖片、個人資料、成績或機構名稱。
不沿用其版面／色彩；Nagi.tw 使用既有 Pure Black Editorial tokens 與元件。

## C. Files modified

修改既有檔案：

- `src/lib/content-schema.ts`：選填技能群組及 honors／talks／education 契約；既有欄位相容。
- `src/lib/sections.ts`：集中雙語介紹、六類興趣及有依據的三個技術群組。
- `src/components/SectionPage.astro`：僅 About 分支接入新元件。
- `docs/content.md`：新增 About 維護、核准及驗證說明。

新增：

- `src/components/AboutSection.astro`：可重用、語意化的編號 section。
- `src/components/AboutProfile.astro`：About 組合、conditional rendering、既有集合查詢。
- `src/lib/about.ts`：核准過濾、Experience 證據條件與站內證據 URL 語言轉換。
- `scripts/about.test.mjs`：四項 Profile／Experience／連結／語言安全測試。
- `scripts/verify-about.mjs`：fresh HTML、路由與發布安全驗證。
- 本報告。

沒有改 package.json／lockfile、全域 CSS／tokens、路由檔、Header／Footer、其他頁面內容、
任何 content 檔案、Journal snapshots／manifest 或 migration verifier。
瀏覽器截圖、安裝日誌及 build 產物留在備份／隔離 QA 目錄，不加入 public。

## D. New About section structure

| 區塊 | 現在呈現／條件 |
| --- | --- |
| 01 Introduction | Nagi 與雙語自介；不新增研究員職稱、雇用關係或資格 |
| 02 Research Interests | 六類作者本次指定的探索方向，不是已完成實驗或論文 |
| 03 Technical Skills | 程式語言、網頁開發、安全工程三組，附使用脈絡與依據；不標技能等級 |
| 04 Experience | 只顯示 published 且有 evidence／具證據貢獻的原集合項目；目前中性空狀態 |
| 05 Selected Projects | getPublished + preferLocale；目前只顯示既有 BugTraceAI 英文或繁中案例 |
| 06 Competitions and Honors | 有資料且 approval 明確為 approved 才顯示；目前省略 |
| 07 Talks and Presentations | 同上；目前省略 |
| 08 Education | 同上；目前省略；不由專案名稱推論教育史 |
| 09 Contact and Links | 只有 publicProfile 內作者核准的公開 links 才顯示；目前無資料、省略 |

所有可選個人紀錄需要明確 review state 與至少一筆 HTTP(S) evidence。approval 沒有預設，
pending 不輸出。它只是一個 rendering guard，不能驗證核准真實性；本階段沒有加入任何
真實獎項、演講、教育或核准紀錄，也沒有新增 Experience。
education 使用核准的 dateRange 文字，避免為只有年份的資料捏造日／月。

## E. English and Chinese content

英文介紹：

> I’m Nagi. My technical focus brings together cybersecurity, software engineering, communication systems, and embedded systems. I document engineering decisions and the evidence behind them, including open-source work on command-line reliability. Medical technology and autonomous systems are areas I’m interested in exploring.

繁中介紹：

> 我是 Nagi，關注資訊安全、軟體工程、通訊系統與嵌入式系統。我記錄工程決策及其依據，包含改善命令列工具可靠性的開源貢獻。醫療科技與自主系統是我希望持續探索的方向。

六類研究興趣均有 EN／繁中對應：Web/Application、5G/B5G/6G、AI-assisted、Embedded/IoT、
Medical Device、UAV/Autonomous Systems。旁註明確表達為希望探索的問題與方向。
所有頁面標籤、空狀態與現有案例連結同步語言，保留 HTML lang、canonical 與 hreflang。
既有無譯本 fallback 規則不變；未來選填紀錄若只有英文，應在審稿時補上核准繁中內容。

## F. Evidence and privacy review

| 公開技術 | 來源與限制 |
| --- | --- |
| Python | 既有公開 BugTraceAI-CLI case study 的 tools／contribution；無熟練度宣稱 |
| Pytest、Rich | 同一公開案例中的命令列工具維護與回歸測試脈絡；不是滲透測試、漏洞發現或已部署成果 |
| Astro、TypeScript、Markdown/MDX、HTML/CSS | 本儲存庫 package、src/lib、components 與內容檔可支持；文案特別標為本站採用技術，不推成個人專精程度 |

沒有把未建立歸屬的 ESP32 snapshot 寫成嵌入式技能，也未從 WSL／電腦環境推論作業系統技能。
未驗證的 Operating Systems、Embedded Systems、Research Tools 群組保持不填。

沒有真實姓名、私人 email、電話、內部帳號、未核准教育／職位或獎項。沒有複製參考站資料。
public 資產不變；既有 CYBERSEC 圖片仍會隨 public 複製，這是原有行為，不代表新的照片權利
或出席證明。其授權限制維持先前報告結論，本階段沒有新增圖片。

全部 23 個 content 條目應維持原樣：2 published（既有 BugTraceAI 雙語）、21 draft。
Journal、原始快照、manifest 與公開案例來源未修改；新 About 僅查詢既有 published 項目。

## G. Responsive and accessibility results

Chrome 157，英繁各 320／768／1440，共六組、109 assertions：

- PASS：純黑 computed background、頁面無橫向溢位，手機單欄／較寬雙欄研究興趣。
- PASS：單一 h1、六類興趣、三個有依據的技術群組、唯一核准案例與正確語言連結。
- PASS：沒有 honors／talks／education／contact 等未供應區塊。
- PASS：Tab 可達 skip link、Enter 將焦點移入 main；無 browser page errors。
- PASS：About canonical／hreflang；原有導航與語言切換維持。

已檢視英文手機與繁中桌面長截圖；未見文字或卡片跨越頁面邊界。截圖記錄正常閱讀狀態，
鍵盤焦點功能另由實際操作驗證。使用原有字體、顏色、section/grid/card 與 focus tokens；
新增樣式僅限 About scoped CSS。既有站點為固定 dark，沒有新增 light/dark 開關或動畫。

Firefox／WebKit、螢幕閱讀器語音、完整 WCAG audit 與 field performance：NOT TESTED。
上述結果不是全面無障礙合規或所有未來資料的版面保證。

## H. Test results

### Fresh Linux-native build

Ubuntu WSL 中的 Linux Node.js v22.23.5；只使用全新 `/tmp/nagi-phase11-bavi9vg4/source`。
未覆寫既有 WSL 開發副本。來源複製排除 .git／node_modules／.astro／dist，逐檔 SHA-256 比對。

初次 npm 10.9.9 ci 回報缺少 @emnapi 記錄；使用與 Windows 相同的 npm 11.6.2 後，
原封不動的 lockfile `npm ci` 成功，安裝 275 packages。沒有修補／重算正式 lockfile。
Linux-native Node 路徑與 process.platform 已確認，未調用 Windows npm 建置。

| 命令／檢查 | 結果 |
| --- | --- |
| `npm run check` | PASS：37 files，0 errors／warnings／hints |
| `npm run build` | PASS：fresh production 17 pages |
| `npm run test:schema` | PASS：10/10 |
| `node scripts/about.test.mjs` | PASS：4/4；含 pending 隱藏、正向 approved、貢獻證據與 URL query/fragment |
| `npm run test:i18n` | PASS |
| `node node_modules/typescript/bin/tsc --noEmit` | PASS |
| `node scripts/security-migration.mjs --editorial` | PASS |
| `node scripts/security-migration.mjs --originals-only` | PASS；此模式僅驗原始來源／圖片 |
| `npm run verify:static` | PASS：15 base pages |
| `node scripts/verify-about.mjs` | PASS：fresh About、六類興趣、未核准區塊不輸出、17 routes、draft exclusion、內部 navigation |
| 預設 strict migration | FAIL，單獨記錄：五篇 Journal checks 先通過，仍停於歷史 `bugtraceai.md: existing content unchanged`。這是既有 Phase 10.3 歷史基線差異，未重算 hashes 或放寬 verifier |

About output verifier 初版曾把既有 404 canonical URL 當作 navigation，造成 false positive；
已限定為檢查 anchor href。這不修改 404／其他頁面，也不關閉任何 migration 檢查。

### Conditional-render fixtures

只在隔離 QA 副本暫時插入明確標記的 synthetic honors／talks／education 各 approved/pending
紀錄，fresh build 實際驗證：英繁頁只有 approved 顯示，pending 不出現，年份不輸出無效
datetime。之後立即還原 QA 來源並重新 Check／Build 全套測試，最終 HTML 無任何 synthetic
標記。Windows publicProfile 沒有這些紀錄；測試資料不是作者核准或成就。

獨立唯讀審查未見 Critical／Important；提出的三項 Minor 已處理：保留站內 evidence URL
query/fragment、補上僅貢獻 evidence 的 Experience 正向回歸、年份改普通文字而非無效 time。
URL 補充測試先觀察到預期失敗，再實作並通過。其餘核准條件在原功能不存在時已有 RED→GREEN。

瀏覽器以 Windows 已安裝 Chrome／Playwright，透過僅 loopback 的臨時伺服器讀取 Linux fresh
產物；伺服器及瀏覽器測試結束後關閉。沒有部署或開放公網。

## I. Remaining author confirmations

- 本次明示的興趣分類可表達為興趣；不能改成研究產出或正式研究員職稱。
- 如要補 OS／Embedded／Research Tools 技能，需確認本人實際使用範圍與可公開證據。
- Experience 需核准組織、真實角色、日期、描述與證據；不以 PR 日期代替任職日期。
- 獎項、演講、教育需逐項確認事實、公開許可與證據，再由作者／編輯設定 approved。
- 不由 AEUST Life 或其他名稱推論教育史；先前排除的學校經歷不可加入。
- 聯絡連結目前省略；只有作者明確指定可公開資料時才加入，不需法定姓名、私人 email 或電話。
- 如未來增加只含英文的紀錄，應審閱其語言 fallback／繁中翻譯及實際 responsive 版面。

## J. GO / NO-GO recommendation

**GO：About 本地實作與本次範圍的 fresh build／安全／雙語／responsive QA。**
可進入作者視覺與文案驗收；不代表未核准個人紀錄可公開。

**NO-GO：自行補造履歷、發布 draft／研究成果、加入未核准私密資料或部署。**
本階段沒有 commit、push、merge、deploy，也沒有改動任何 collection status、slug 或日期。
Windows 原 dist 保持不變；新的預覽與 QA 證據留在隔離環境及暫存備份目錄。
