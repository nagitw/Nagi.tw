# Nagi.tw V3 — Release Candidate QA

驗收日期：2026-11-08（Asia/Taipei）

基準：`b5adb0b`；開始時 HEAD 與基準一致，工作目錄乾淨。

**建議：No-Go。** 自動化技術檢查通過，但跨裝置瀏覽器驗收未完成，且既有公開 Experience 文章仍含與待確認／superseded 歷史資料不一致的敘述。

## 環境及範圍

- Windows、PowerShell；Node.js `v24.13.0`、npm `11.6.2`、實際安裝 Astro `7.4.6`。
- 本機工作目錄 `C:\Users\0ping\Desktop\Seraph.tw\nagi.tw`；正式產物 `dist/`，預設 base `/`，另測 `/studio/`。
- 未執行 Push、Merge、Deploy；未改動任何 Experience 人工確認、原始 assertion、publicationStatus 或歷史資料。
- 瀏覽器工具 inventory 明確回報 `The browser access host is unavailable`；原生 Firefox 備援回報 `Computer Use app approval timed out`。沒有取得網站畫面、瀏覽器 Console 或跨裝置執行證據。
- 已執行 `npm run dev -- --host 127.0.0.1`。首次在 4321 啟動後出現 `Failed to create the dev server app: require is not defined`，HTTP probe 逾時；沙箱外第一次重試被既有 dev 鎖阻擋，經授權以 `--port 4322 --force` 替換本次啟動的程序後正常服務。沒有為此修改依賴或應用程式碼，不能據此判定該初始錯誤的精確根因。

## 實際執行的測試

| 測試 | 結果與界線 |
|---|---|
| Astro Check（`npm run build` 內執行 `astro check`） | 修復後 81 files；0 errors / 0 warnings / 0 hints |
| `npm run typecheck` | 通過，`tsc --noEmit` |
| `npm run build` | 通過，70 page(s)；共 89 個 HTML，包含 alias redirect 與 404 |
| `npm test` | 修復後完整通過；含資料、發布選擇器、Journal、RSS、Penguin、API 設定、揭露與 Markdown 安全、公開產物測試 |
| RSS 與替代 base 整合測試 | 成功／失敗 RSS fixture、`/studio/` build 與其驗證通過；503 是預期故障 fixture |
| 無 API endpoint 的 API 模式 | 測試確認建置拒絕，避免假裝後端已可用 |
| `npm run validate` | 通過：Experience 隔離、SEO、內部連結／anchor、語系、隱私指紋、索引、Projects／Research、Journal 與歷史 URL |
| 資料完整性 | 79 筆、79 筆仍 draft；既有全量／分層凍結雜湊測試通過；`git diff b5adb0b -- src/data` 無差異 |
| 本機資產檢查 | 遍歷產物 HTML 中本機圖片、SVG、CSS、JS 引用，缺少檔案 0 筆；不代表圖片外觀已驗收 |
| 開發伺服器 HTTP smoke | 4322 上雙語首頁、About、Experience、Projects、Research、Journal 及文章樣本均 200；企鵝 SVG 200／image/svg+xml、RSS 200／application/rss+xml；未知路由 404 且有自訂錯誤頁文字。不是瀏覽器執行測試 |
| favicon／404 | 基準缺漏測試先失敗；修復後預設與 `/studio/` 產物驗證通過 |
| `git diff --check` | 通過 |

首次 `npm test` 在 `test-site.mjs` 啟動子程序時遭沙箱 `spawn EPERM`，不能算通過；授權後於沙箱外完整重跑成功，修復後也再次成功。不得把 PowerShell 批次最後一個命令的 exit code 當成每個測試都成功。

封存檔案 SHA-256：`82d7671814fa34155111d6c6b28fbeafdc743b9b753ad10fd071a92fa6e331ed`。

## 桌面、平板、手機驗收

| 頁面／介面 | 桌面 | 平板 | 手機 | 已有非瀏覽器證據 |
|---|---|---|---|---|
| 首頁 `/`、`/zh/` | 未執行 | 未執行 | 未執行 | 產物、導覽目標、語系與資產存在 |
| About／Experience | 未執行 | 未執行 | 未執行 | 六類、8 筆公開快照、年份與未知日期標記 |
| Projects | 未執行 | 未執行 | 未執行 | 工程項目選擇、相關連結、draft 排除 |
| Research | 未執行 | 未執行 | 未執行 | dossier 去重與原有相關頁面路由 |
| Journal | 未執行 | 未執行 | 未執行 | 13 組文章、四類、日期順序、篩選標記 |
| Journal 文章頁 | 未執行 | 未執行 | 未執行 | 實際語系、canonical、舊 URL redirect、Markdown 產物 |
| Penguin AI | 未執行 | 未執行 | 未執行 | Mock／串流／取消／失敗單元測試，雙語 dialog 標記 |

所有頁面的導覽操作、展開選單、篩選點擊、中英文切換、文字溢出、圖片／圖示外觀、觸控、鍵盤焦點、主題切換及瀏覽器 Console 均**未經實際瀏覽器驗證**。CSS 與 HTML 檢查不能替代這些驗收。

## Experience 驗收

- 六類為 competitions、ctf、training、conferences、speaking、teaching；雙語公開選單存在。後兩類目前沒有核准公開快照，保留空狀態，不填造紀錄。
- 8 筆公開快照經 `published` + `confirmed` 雙重篩選；2026 在 2025 前。排序 fixture 覆蓋完整日期、月份與年精度；完整日期依日期倒序，同年未知日期置後。
- 8 筆仍只有年份；未填造月日，未將 draft 的 InfoSec `2026-07-07` 帶入公開經歷。
- 無得獎欄位的 FTC、MyFirstCTF 參賽快照照常產生 HTML，沒有要求得獎才能顯示。
- 79 筆 assertion 及人工補記完整保留；superseded 指向與排除參與計數測試通過。公開快照沒有讀取 draft archive；但**整站歷史敘述一致性未通過**，見 B2。
- draft／review／candidate-only 選擇器測試通過；封存 ID、來源 assertion、內部 reconciliation、未公開 CTF 數字等未進入公開 HTML、JS、XML、JSON。公開 search 與 knowledge 均 51 筆，且內容一致；RSS 僅收核准 Journal，Sitemap 只含公開路由。
- 以上是「來源紀錄發布閘門」通過，不能推論「所有已標 published 的舊文章敘述都已確認」。舊文章另有獨立發布狀態，仍可能重述待審內容。

## Journal 驗收

- 四個主要分類維持：資安 Cybersecurity、醫療 Medical、人生觀點 Perspectives、心得 Reflections。
- 13 個文章群組均有且只有一個主要分類；翻譯版本共用分類，tags 獨立。
- 兩語系索引產物的日期倒序測試通過；分類按鈕及文章分類標記齊備。實際篩選與手機版未操作。
- 英文未發布的文章明示中文原文，沒有偽造英文路由或 hreflang；雙語切換目標與替代語系已做靜態驗證。
- 公開文章及 alias 目標存在，內部連結與 anchor 通過；沒有刪改既有文章 URL。正式主機 redirect／404 回應仍待發布環境驗收。

## 公開內容安全

| 項目 | 結論 |
|---|---|
| 未確認獎項 | **未通過**：既有 Awards／CTF 文章有待核對獎名及舊年份，見 B2 |
| 未確認 CTF 排名 | 封存排名／分母與內部 metadata 的產物掃描通過；沒有將本次 draft 結果帶入公開資料 |
| 未來 Roadmap | 路由、alias、已知未來計畫段落／句型及 AI 提問範本排除測試通過 |
| 私有研究材料 | 非 published 路由、正文指紋與私有項目掃描通過；未公開 source archive |
| 個人敏感資訊 | 既有隱私指紋及撤回主題掃描通過；不是對所有未知個資的絕對保證，仍需內容擁有人終審 |
| BugTraceAI CLI 歸屬 | 公開產物不含 BugTraceAI；保持 draft，未描述成個人獨立作品 |
| Penguin AI 上線描述 | 產物預設 `data-mode="mock"`，明示 Demo／不連線後端；未聲稱後端正式上線 |

## 發現與修復

| ID | 發現 | 處理 |
|---|---|---|
| F1 | 共用 layout 未宣告 favicon | 引用原有 `nagi-penguin.svg`，不改 SVG；支援 base path |
| F2 | 無 `dist/404.html`，靜態主機缺少站內錯誤頁 | 新增簡潔雙語提示及兩個首頁連結；`noindex`，不列 Sitemap；實際主機 HTTP 狀態待驗 |
| B1 | 無法使用瀏覽器 host，原生 Firefox 控制逾時 | 保留未驗證，不能簽核跨裝置或 Console |
| B2 | 舊公開經歷與人工核對結果存在衝突 | 記錄阻擋，不改人工確認、不推定獎項、不修改發布狀態 |

新增產物回歸檢查驗證 favicon 檔案、404 存在、noindex、Sitemap 排除與雙語返回連結。三個修補檔案經獨立唯讀 code review，未發現具體問題。

### B2 具體證據及處理界線

- `dist/experience/awards/index.html` 與中文版本仍有 FIRST Tech Challenge／Innovation Award／2024；封存的舊年份 assertion 已 superseded 指向 2026。不能把獎項直接搬到新年份，也不能宣稱整站已消除舊年份衝突。
- 上述頁面及 `/experience/ctf/`、`/zh/experience/ctf/` 仍公開 `OSINT Excellence Award`。`docs/experience-conflicts.md` 明載它與使用者回報獎名的正式對應未明；InnoServe 組別及 PowerTech 獎項亦有待核對事項。
- CTF 公開文章仍含 `CTF Instructor`／講解者及訓練支援敘述，人工審核記錄仍要求具體活動、日期及角色證據。
- 這些來源文章本身標示 published，所以既有發布閘門測試會通過；測試通過並不能消除內容衝突。需由內容擁有人逐項決定核准、修正或撤下範圍。本輪不替使用者作人工事實判定，亦不擅改已核對資料。

## 發布阻擋與未完成人工驗收

1. **B1：完成實際瀏覽器矩陣。** 建議桌面 1440×900、平板 768×1024、手機 390×844，另檢查窄螢幕；涵蓋上表全部頁面、雙語、選單、分類、文章、Penguin、主題、鍵盤與觸控，保存 Console／network 結果及畫面。這些尺寸是待執行計畫，不是已測結果。
2. **B2：解決既有公開獎項、年份、教學角色的內容衝突。** 經擁有人決定公開範圍後重建並重掃 HTML、Sitemap、RSS、search、knowledge；不可用「archive 仍 draft」取代這項確認。
3. 正式主機上的 404 HTTP status、深層路由、RSS／Sitemap content type、favicon 顯示與外部連結可用性尚未驗證；本輪不得 Deploy，因此列為後續驗收。
4. 外部 Penguin AI 後端沒有端到端測試；目前只可將前端視為示範模式。若要啟用 API 模式，需另驗 HTTPS、CORS、串流、取消、timeout 與知識資料匯入範圍。

**最終 No-Go：** 本地技術檢查與小修補已完成，但視覺／互動證據和已知公開內容衝突尚未解除，不能建議正式發布。
