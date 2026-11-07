# Experience master list

完整保留 audit 表格、不同年份、教學敘述及別名線索；不是已確認參與清單。來源歷史敘述使用 `source-recorded`，衝突使用 `conflicted`，無參與證據使用 `candidate-only`。所有找回的紀錄及欄位均為 draft。未知年份為 null，不製造日期。英文譯名僅供編輯，不作證據。

公開資料仍由 `src/data/experience.ts` 的八筆已核准快照提供；`src/data/experience-archive.json` 是完整待審檔案，包含來源、原文、角色、名次單位與待確認事項。兩者以既有來源與活動年份對照，draft 不覆寫公開快照。InfoSec 2026 的 07-07 僅存於 draft。

既有公開快照：HPC AI Summer Camp (2026)、AI for Good (2026)、InfoSec Taiwan (2026)、AIS3 MyFirstCTF (2026)、FTC (2026)、APCS 暑期營隊 (2025)、HITCON (2025)、COSCUP (2025)。verificationStatus=confirmed 表示保留既有審核範圍，並非本次獨立查證。

來源代碼與 immutable Git snapshot 見 [audit](experience-audit.md#sources-and-coverage)，每筆 JSON 亦保留展開的來源。競賽分組與學習類別是編輯分類，不表示已確認參與。沒有可靠官方證據 URL，因此 evidenceUrls 留空。

| ID | 年份 | 中文／原名 | English | 類別 | 身分 | 原始敘述（未確認） | 驗證 | 發布 |
|---|---|---|---|---|---|---|---|---|
| archive-001 | 2026 | FIRST Tech Challenge / FTC | FIRST Tech Challenge / FTC | competitions | Competitor | E: 參賽者; `最佳創意獎首席`; English `Inspire Award Winner`. A/L/D: 2024 team member, `Innovation Award`, L adds `(Lead Team)` | conflicted | draft |
| archive-002 | 2026 | 台灣選拔賽 MARC 機器人競賽 | MARC Taiwan Robotics Selection | competitions | Competitor | 參賽者; `入選 12 強` / `Top 12 selection` | source-recorded | draft |
| archive-003 | 2026 | 智慧鐵人創意競賽 | Intelligent Ironman Creativity Competition | competitions | Competitor | 參賽者 | source-recorded | draft |
| archive-004 | 2026 | 新北市 AI 智慧城市黑客松 | New Taipei AI Smart City Hackathon | competitions | unknown | `決賽` / `Finalist` | source-recorded | draft |
| archive-005 | 2025 | 第30屆大專院校資訊應用服務創新競賽 / The 30th InnoServe Awards | The 30th InnoServe Awards | competitions | Participant / presenter | O/B: `大專組佳作`, `高中職 / 大專組入圍決賽`; L: `Merit Award (College Division)`, high-school finalist; A/D: participant/presenter, Merit Award and finalist | conflicted | draft |
| archive-006 | 2026 | 國立宜蘭大學程式設計暨資訊及 AI 應用競賽 | National Ilan University Programming, Information & AI Competition | competitions | unknown | E zh: `入圍決賽`, `榮獲佳作`; en: only `Finalist`; L/C/D: 2025 finalist | conflicted | draft |
| archive-007 | 2025 | Daydream 遊戲開發黑客松 | Daydream Game Development Hackathon | competitions | unknown | `佳作`; English history `Commendable Work` | source-recorded | draft |
| archive-008 | 2025 | 高中職程式安全黑客松 / 北區高中職程式安全黑客松 | Northern Taiwan High School Program Security Hackathon | competitions | Participant | E/O/B: `挖蛋專家獎`; A/C/T/L/D: participant, `OSINT Excellence Award`; L training list says 16 Hours | conflicted | draft |
| archive-009 | 2024 | i-STEAM / iSTEAM PowerTech Robotics Competition (New Taipei City) | i-STEAM / iSTEAM PowerTech Robotics Competition (New Taipei City) | competitions | Team member | Team member; `First Place, Creativity Award` | source-recorded | draft |
| archive-010 | 2024 | PowerTech 青少年科技創作競賽 / i-STEAM PowerTech National Finals | i-STEAM PowerTech National Finals | competitions | Team member | `全國佳作` / `Honorable Mention`; team member in A | source-recorded | draft |
| archive-011 | 2026 | Junior Crypt CTF 2026 (user candidate Junior.Crypt) | Junior Crypt CTF 2026 (user candidate Junior.Crypt) | ctf | Competitor | 參賽者 | conflicted | draft |
| archive-012 | 2026 | BroncoCTF 2026 | BroncoCTF 2026 | ctf | Competitor | 參賽者 | source-recorded | draft |
| archive-013 | 2026 | Grodno::CTF 2026 | Grodno::CTF 2026 | ctf | Competitor | 參賽者 | source-recorded | draft |
| archive-014 | 未詳 | K17 | K17 | ctf | unknown | No matching participation record found in searched sources/history | candidate-only | draft |
| archive-015 | 2026 | picoCTF | picoCTF | ctf | unknown | Exact `Rank 1007 / 8748` | source-recorded | draft |
| archive-016 | 2026 | FhCTF | FhCTF | ctf | unknown | Exact `No. 8` | source-recorded | draft |
| archive-017 | 2026 | AIS3 MyFirstCTF / My First CTF | AIS3 MyFirstCTF / My First CTF | ctf | Competitor | E/P: 2026 參賽者; O: 2025 參賽者; B: 2026 Participant | source-recorded | draft |
| archive-018 | 2026 | AIS3 EOF CTF / AIS3 EOF 初賽 | AIS3 EOF CTF Preliminary Round | ctf | Competitor | E: competitor; O/B: preliminary-round participant | conflicted | draft |
| archive-019 | 2025 | EOF Preparation | EOF Preparation | training | Learner | Learner, practice record created | source-recorded | draft |
| archive-020 | 2025 | AIS3 Cybersecurity Activity | AIS3 Cybersecurity Activity | training | Participant | Participant, learning/competition activity; no placement | source-recorded | draft |
| archive-021 | 未詳 | HITCON CTF | HITCON CTF | ctf | unknown | No matching participation record found | candidate-only | draft |
| archive-022 | 2026 | 2026 雙北 FRC 季後賽 | 2026 Taipei / New Taipei FRC Off-season | competitions | unknown | `評審團獎` / `Judges' Award` | source-recorded | draft |
| archive-023 | 2026 | NVIDIA Agentic AI Hackathon | NVIDIA Agentic AI Hackathon | competitions | unknown | H metadata only `Edge AI / Healthcare` | candidate-only | draft |
| archive-024 | 未詳 | 青年志工行動競賽－青志獎 | Youth Volunteer Action Competition — Youth Volunteer Award | competitions | unknown | English JSON only: `Honorable Mention`, resultZh `佳作` | source-recorded | draft |
| archive-025 | 未詳 | 亞東科技大學全國高中職人工智慧與資訊生活應用創新競賽 | Asia Eastern University National Senior High School AI and Information Life Application Innovation Competition | competitions | Participant | E en: `Honorable Mention` / `佳作`; O broader event name `Project Participant`; B broader event name `佳作` | conflicted | draft |
| archive-026 | 2025 | 金盾獎 | Golden Shield Competition | competitions | unknown | `初賽參賽` | source-recorded | draft |
| archive-027 | 2024 | 21st National Technical Creativity Competition | 21st National Technical Creativity Competition | competitions | Participant | `Preliminary Round Participant` | source-recorded | draft |
| archive-028 | 2026 | Future Medical Design Hackathon (TMU) | Future Medical Design Hackathon (TMU) | competitions | Participant | Participant; completed learning/hackathon record, no award | source-recorded | draft |
| archive-029 | 2026 | LA CTF | LA CTF | ctf | unknown | `團隊排名 #9` / `Team Rank #9` | source-recorded | draft |
| archive-030 | 2026 | Srdnlen CTF Quals | Srdnlen CTF Quals | ctf | unknown | `團隊排名 #17` / `Team Rank #17` | source-recorded | draft |
| archive-031 | 2026 | DiceCTF Quals | DiceCTF Quals | ctf | unknown | `團隊排名 #23` / `Team Rank #23` | source-recorded | draft |
| archive-032 | 2026 | HPC AI Summer Camp | HPC AI Summer Camp | training | Student | 2026; 學員; 國立清華大學 | source-recorded | draft |
| archive-033 | 2026 | AI × Cybersecurity Workshop Series：AI for Good | AI × Cybersecurity Workshop Series：AI for Good | training | Participant | 2026; 參與者 | source-recorded | draft |
| archive-034 | 2026 | Songshan AI × Cybersecurity / AI × Cybersecurity 實作活動 | Songshan AI × Cybersecurity Workshop | training | Participant | 2026; participant; completed learning record | conflicted | draft |
| archive-035 | 2026 | InfoSec Taiwan 2026 | InfoSec Taiwan 2026 | conferences | Attendee | **2026-07-07 (day)**; 與會者 | source-recorded | draft |
| archive-036 | 2025 | InfoSec Taiwan / INFOSEC TAIWAN 國際資安組織大會 | InfoSec Taiwan 2025 | conferences | Attendee | 2025; participant/attendee | source-recorded | draft |
| archive-037 | 2026 | Bak3 C00kie | Bak3 C00kie | conferences | Attendee | 2026; attendee/participant | conflicted | draft |
| archive-038 | 2026 | ZeroDay Cookie Cybersecurity Conference | ZeroDay Cookie Cybersecurity Conference | conferences | unknown | 2026; role unspecified in list | conflicted | draft |
| archive-039 | 2025 | HITCON Conference | HITCON Conference | conferences | Attendee | 2025; attendee/participant | source-recorded | draft |
| archive-040 | 2026 | HITCON 2026 | HITCON 2026 | conferences | Attendee | 2026; attendee | source-recorded | draft |
| archive-041 | 2025 | COSCUP 開源人年會 / COSCUP | COSCUP 2025 | conferences | Attendee | 2025; attendee/participant | source-recorded | draft |
| archive-042 | 2025 | AWS Summit Taipei / Taiwan | AWS Summit Taipei / Taiwan | conferences | Attendee | 2025; attendee/participant | conflicted | draft |
| archive-043 | 2025 | QRACON 學生量子電腦年會 | QRACON Student Quantum Computing Conference | conferences | Attendee | 2025; attendee | source-recorded | draft |
| archive-044 | 2025 | APCS 模擬測驗團隊暑期營隊 | APCS Mock Test Team Summer Camp | training | Student | 2025; student | source-recorded | draft |
| archive-045 | 2025 | APCSS Computational Thinking Camp | APCSS Computational Thinking Camp | training | unknown | 2025; role unspecified | conflicted | draft |
| archive-046 | 2025 | 高中量子計畫暑期學習營 / Quantum Computing Summer Camp | High School Quantum Program Summer Camp | training | Student | 2025; student/participant; `30 Hours` / `30 小時` in L/W | conflicted | draft |
| archive-047 | 2026 | AIS3 高階培訓 | AIS3 Advanced Training | training | unknown | 2026; metadata `資安培訓` | source-recorded | draft |
| archive-048 | 2025 | CTF 資安種子培訓交流會（台北場） | Cybersecurity Seed Training Meeting (Taipei) | training | Participant | 2025; Participant | source-recorded | draft |
| archive-049 | 2025 | CTF 資安種子培訓交流會（高雄場） | Cybersecurity Seed Training Meeting (Kaohsiung) | training | Participant | 2025; Participant | source-recorded | draft |
| archive-050 | 2026 | Build with AI / Build with AI Taipei | Build with AI / Build with AI Taipei | training | Participant | 2026; participant | source-recorded | draft |
| archive-051 | 2026 | GDG Taipei Workshop | GDG Taipei Workshop | training | Participant | 2026; participant in W | conflicted | draft |
| archive-052 | 2026 | Gemini CLI + ADK + Cloud Run | Gemini CLI + ADK + Cloud Run | training | Participant | 2026; participant in W | source-recorded | draft |
| archive-053 | 2026 | Enterprise AI Agent Development using ADK | Enterprise AI Agent Development using ADK | training | unknown | 2026; role unspecified | conflicted | draft |
| archive-054 | 2026 | Antigravity SDK Workshop | Antigravity SDK Workshop | training | unknown | 2026; role unspecified | source-recorded | draft |
| archive-055 | 2026 | KiloShop AI Workshop | KiloShop AI Workshop | training | unknown | 2026; role unspecified | source-recorded | draft |
| archive-056 | 2026 | ClawShop 2 AI Workshop | ClawShop 2 AI Workshop | training | unknown | 2026; role unspecified | source-recorded | draft |
| archive-057 | 2026 | Smart Manufacturing Competition Training / Smart Manufacturing | Smart Manufacturing Competition Training / Smart Manufacturing | training | Participant | 2026; participant in W; completed learning record | source-recorded | draft |
| archive-058 | 2026 | Auden TechDay 2026 | Auden TechDay 2026 | conferences | unknown | 2026; role unspecified | source-recorded | draft |
| archive-059 | 2025 | Central Taiwan High School Computer Conference | Central Taiwan High School Computer Conference | conferences | unknown | 2025; role unspecified | source-recorded | draft |
| archive-060 | 2025 | International Cybersecurity Organization Conference | International Cybersecurity Organization Conference | conferences | unknown | 2025; role unspecified | conflicted | draft |
| archive-061 | 2025 | International Quantum Technology Exhibition | International Quantum Technology Exhibition | conferences | unknown | 2025; role unspecified | source-recorded | draft |
| archive-062 | 2024 | Smart-AI Programming Talent Program | Smart-AI Programming Talent Program | training | unknown | 2024; role unspecified | source-recorded | draft |
| archive-063 | 2024 | AI Humanoid Robot Control & Applications | AI Humanoid Robot Control & Applications | training | unknown | 2024; role unspecified | source-recorded | draft |
| archive-064 | 2026 | 2026 資安大會 / CYBERSEC reflection | CYBERSEC 2026 | conferences | Participant | 2026; Participant in B | source-recorded | draft |
| archive-065 | 2025 | CTF Training | CTF Training | teaching | Training support | 2025; training support | source-recorded | draft |
| archive-066 | 2026 | CTF Web Practice Lab | CTF Web Practice Lab | training | Learner | 2026; learner / note taker | source-recorded | draft |
| archive-067 | 2024 | FIRST Tech Challenge / FTC — 2024 | FIRST Tech Challenge / FTC — 2024 | competitions | Team member | Innovation Award (Lead Team) | conflicted | draft |
| archive-068 | 2025 | National Ilan University Programming, Information & AI Competition — 2025 | National Ilan University Programming, Information & AI Competition — 2025 | competitions | unknown | Finalist | conflicted | draft |
| archive-069 | 2025 | AIS3 MyFirstCTF — 2025 | AIS3 MyFirstCTF — 2025 | ctf | Competitor | 參賽者 | conflicted | draft |
| archive-070 | 2026 | 全國高中職人工智慧與資訊生活應用創新競賽 — 2026 | National Senior High School AI and Information Life Application Innovation Competition — 2026 | competitions | Project participant | O: Project Participant; B: 佳作 | conflicted | draft |
| archive-071 | 2024 | 校內外資訊安全與技術學習活動 | School and Community Cybersecurity and Technical Learning Activities | speaking | Speaker | speaker | source-recorded | draft |
| archive-072 | 2025 | CTF Instructor | CTF Instructor | teaching | Instructor | Instructor | source-recorded | draft |
| archive-073 | 2025 | Raspberry Pi Instructor | Raspberry Pi Instructor | teaching | Instructor | Instructor | source-recorded | draft |
| archive-074 | 2025 | Cybersecurity Teaching Assistant | Cybersecurity Teaching Assistant | teaching | Teaching assistant | Teaching assistant | source-recorded | draft |
| archive-075 | 2025 | Technical Session Support | Technical Session Support | teaching | Support staff | Support staff | source-recorded | draft |
| archive-076 | 2025 | Technical Training Support | Technical Training Support | teaching | Support staff | Support staff | source-recorded | draft |
| archive-077 | 2025 | Cybersecurity Seed Training Meeting | Cybersecurity Seed Training Meeting | training | unknown | Generic training list entry | conflicted | draft |
| archive-078 | 2025 | Northern Taiwan Cybersecurity Hackathon — training | Northern Taiwan Cybersecurity Hackathon — training | training | unknown | 16 Hours | conflicted | draft |
| archive-079 | 2025 | Quantum Computing Summer Camp | Quantum Computing Summer Camp | training | Participant | 30 Hours | conflicted | draft |

共 79 筆歷史 assertion；包含可能重複的別名，不可作為已參加活動總數。
