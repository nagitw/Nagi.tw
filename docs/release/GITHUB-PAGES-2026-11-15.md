# Nagi.tw V3.1 GitHub Pages 發布準備

驗證日期：2026-11-15（Asia/Taipei）。目標：`https://seraphforge.github.io/nagi.tw/`。

## 結論

GO：靜態產物與目前功能可準備提交至既有 feature branch，供人工審閱。

NO-GO：目前不能直接將這份歷史整合或覆蓋至遠端 `main`，也尚未驗證實際 Pages 部署。此次沒有 Commit、Push、Merge、PR 或 Deploy。

## 分支與既有成果

- 保留 `feat/v3.1-editorial-redesign`；HEAD 為 `7c93fea67d6162594e265d0c63351a3129e0f0f9`。
- 起始已有 29 個 tracked 變更（包含 `public/robots.txt` 刪除）及多組 untracked editorial、backend、測試與發布文件。本次延續這些成果，未重設、清除、暫存或覆寫使用者內容。
- 既有 `astro.config.mjs` 已支援 `SITE_URL`、`SITE_BASE`，並處理轉址目的地的 base。本次保留並補充設定說明。
- 既有 workflow 的全域 env 已讓 Build 與 Browser 共用 Pages origin/base，以及 Offline／空 API endpoint。本次保留並補上 editorial 回歸檢查。
- `public/CNAME` 在本次開始時已不存在，也未被目前 HEAD 追蹤；無須再次刪除。產物亦確認沒有 CNAME。
- 未變更研究、文章、專案資料或 UI 設計。

## 本次新增修改

| 檔案 | 修改與理由 |
| --- | --- |
| `astro.config.mjs` | 說明 origin 與 base 的分工，以及未來自訂網域的切換設定；保留既有環境變數邏輯。 |
| `.github/workflows/deploy.yml` | 新增三項 editorial source／regression／artifact 檢查，避免 CI 漏掉本機已有的驗證。 |
| `.gitignore` | 排除 QA log／JSON／文字與本機 shell 輸出、P12/PFX 私密容器；保留現有 QA 檔案。 |
| `package.json`、`package-lock.json` | 將原先 lock 的 Astro 7.4.6 更新並精確固定至 7.4.7，修補 GHSA-r3h5-4585-7x3w。未使用 blanket audit fix。 |
| `src/layouts/BaseLayout.astro` | 沒有可用語言版本時不輸出 x-default，修正 404 指向不存在 alternate 的問題。 |
| `scripts/test-pages-artifact.mjs` | 檢查 HTML hreflang 的 origin/base 與實際目標存在，並禁止 404 宣告語言版本。 |
| 本報告與對應 manifest | 記錄證據、變更範圍與回復資訊。 |

404 回歸測試先在未修正產物上失敗：`404.html: missing alternate https://seraphforge.github.io/nagi.tw/zh/404/`。修正後完整產物驗證通過。

## 實際驗證

最終設定：`SITE_URL=https://seraphforge.github.io`、`SITE_BASE=/nagi.tw/`、`PUBLIC_PENGUIN_AI_MODE=offline`、`PUBLIC_PENGUIN_API_URL=`。

Linux 驗證使用 WSL 隔離複本、校驗官方下載 SHA256 的 Node 24.13.0、`npm ci` 與最終 lockfile。瀏覽器為 Playwright Chromium。

| 指令／檢查 | 結果 |
| --- | --- |
| `npm ci` | exit 0；安裝過程 audit 零漏洞。 |
| `npm run typecheck` | exit 0。 |
| `npm run check` | exit 0；103 檔案，0 errors／warnings／hints。 |
| `npm run build` | exit 0；70 頁面，含轉址共 89 HTML，總計 99 個產物檔案。 |
| `npm run validate:production` | exit 0；1,827 個本地引用、canonical、hreflang、轉址、sitemap、robots、RSS、search、knowledge、404 與發布範圍檢查通過。 |
| `npm test` | exit 0；含 RSS 成功／失敗、root 與 `/studio/` 子路徑建置、內容保留與公開範圍測試。 |
| `npm run test:ai` | exit 0；Offline、公開 Mock、顯式 HTTPS API 的隔離建置測試與串流處理測試。正式產物維持 Offline。 |
| 三項 `scripts/test-editorial*.mjs` | exit 0；回歸 2/2，產物檢查涵蓋 51 篇文章。 |
| `npm run test:browser` | exit 0；160/160。四種視窗尺寸、雙語頁面／導覽、巢狀 404、legacy redirects、無網路 Mock、Offline、攔截的 API fixture、自動化無障礙檢查。 |
| `npx playwright test --config scripts/browser/v3.1.config.mjs` | exit 0；28/28。文章閱讀工具、主題／儲存失敗、鍵盤、無 JS、版面與程式碼複製 fixture。 |
| `npm audit --audit-level=low` | exit 0；0 vulnerabilities。 |
| `npm run test:secrets -- --history` | exit 0；含最終報告與 manifest 共 178 個候選原始檔案、77 個可達 commit，無已知憑證模式命中。 |
| `git diff --check` | exit 0；只有 Git 的 LF/CRLF 提示，沒有 whitespace error。 |
| 既有 backend pytest | 17 passed；1 個 Starlette/httpx deprecation warning。未啟動對外服務或部署。 |
| 既有 backend lockfile pip-audit | exit 0；No known vulnerabilities found。 |

Pages 產物已複製回目前專案 `dist/`，並在工作目錄執行 `npm run validate:production` 通過。`dist/` 仍被 Git 忽略。

修補後另在 Windows 目前工作目錄重跑 `typecheck`、`check`、`build`、`validate:production`、`test`、`test:ai`，全部 exit 0。最終 `dist/` 是 Windows 重新建置的 Pages 產物。

另以 `SITE_URL=https://nagi.tw`、`SITE_BASE=/` 建置隔離產物，Build、Pages artifact、routes、language、indexes 五項全部 exit 0；未改動 Pages 產物。

## 安全與發布邊界

- 原始碼候選清單沒有私密 env／key／P12／PFX 檔名，也沒有超過掃描器 2 MB 上限的候選檔案。
- `.env`、backend 私密部署設定與本機 knowledge、虛擬環境、QA 截圖／trace／日誌、`node_modules`、`dist` 均被忽略。`.env.example` 與 backend 的 `.example` 模板保留。
- 正式產物未包含 backend、source map、私密檔案、symlink、本機 HTTP API URL 或已知私鑰模式；70 個聊天視窗均採公開合法設定。
- CI 的 backend job 僅跑測試與依賴稽核；唯一部署產物是 `dist`，沒有後端部署步驟。
- 敏感資訊掃描是已知模式檢查，不是所有秘密、二進位或不可達 Git object 的完整稽核。

## 遠端歷史

`git ls-remote origin refs/heads/main` 回報 `952f05507d1a6115e8fc561eb8417eaec91b8c28`，與目前 `origin/main` 相符。

- `git rev-list --left-right --count HEAD...origin/main`：本機獨有 15，遠端獨有 51。
- `git merge-base HEAD origin/main`：exit 1，沒有共同祖先。
- `origin/main` reflog 明確記錄 `fetch origin: forced-update`。
- 兩個 committed tree 的差異涉及 248 檔案；遠端有獨立的內容、路由、Talks／研究成果。禁止把它視為一般落後分支而強制合併或直接覆蓋。
- 後續應先由人工決定保留哪些歷史與資料，再另行授權整合；本次未更動任何 refs 或 Git index。

## 切換與回復

- Pages：`SITE_URL=https://seraphforge.github.io`、`SITE_BASE=/nagi.tw/`。
- 未來自訂網域：`SITE_URL=https://nagi.tw`、`SITE_BASE=/`，重新建置並另行設定 GitHub Pages DNS／domain。這次不建立 CNAME。
- 本次修改前的 7 個既有檔案已備份於本機 `%TEMP%/nagi-release-before-20261115-8a422f001079430d891b9bb3da9899b3/`，含原有未提交內容。回復時應逐檔比較並套用反向差異，不要使用 `git restore` 抹掉原有成果。
- 最終候選檔案與 SHA256 記錄於同目錄 manifest；本機執行紀錄在被忽略的 `qa/pages-20261115-*.log`。

## 剩餘風險

1. 尚未在實際 GitHub Actions／Pages 上執行。GitHub repository 必須設定 Pages 使用 Actions，並在日後切換時移除帳號端可能仍存在的 custom domain 設定。
2. WSL 測試不是所有 OS／瀏覽器的保證；自動化 axe 檢查不是完整 WCAG 人工稽核。
3. 歷史無共同祖先；對 `main` 整合與上線仍為 NO-GO，需獨立決策。
4. 初始 Windows Build 因 Astro 7.4.6 的 Rolldown native binding 被 Application Control 阻擋。修補後 Windows Check／Build／Production／單元／AI 已通過；沒有停用或變更安全政策。
5. Astro 公告的攻擊條件涉及 `@astrojs/node` 的 on-demand image endpoint，本專案是靜態 Pages，原本不具該服務；仍更新至修補版以清除依賴風險。[官方公告](https://github.com/advisories/GHSA-r3h5-4585-7x3w)。
