"""Reproducible local inventory from the reviewed audit; never publishes records."""
import json, re
from pathlib import Path

audit = Path('docs/experience-audit.md').read_text(encoding='utf-8')
records = []
section = ''
for line in audit.splitlines():
    if line.startswith('## '): section = line
    if section not in ('## Competition inventory', '## Training, conferences and related learning'): continue
    if not line.startswith('| ') or line.startswith('| Event'): continue
    cells = [x.strip() for x in line.strip('|').split('|')]
    title = cells[0]
    competition = section == '## Competition inventory'
    date, assertion, sources, notes = cells[1:] if competition else (cells[1], cells[1], cells[2], cells[3])
    year = re.search(r'20\d{2}', date)
    year = year.group() if year else None
    if title.startswith('亞東'): year = None
    category = 'competitions' if competition else 'training'
    if competition and ('CTF' in title or title == 'K17'): category = 'ctf'
    if title.startswith(('EOF Preparation', 'AIS3 Cybersecurity')): category = 'training'
    if not competition and any(x in title for x in ['InfoSec', 'INFOSEC', 'Cookie', 'C00kie', 'HITCON', 'COSCUP', 'AWS Summit', 'QRACON', 'Conference', 'Exhibition', 'TechDay', '資安大會']): category = 'conferences'
    if title == 'CTF Training': category = 'teaching'
    candidate = title in ['K17','HITCON CTF'] or 'event lead' in notes
    role = 'unknown'
    if not candidate:
        for pattern, value in [('team member|Team member', 'Team member'), ('participant/presenter','Participant / presenter'), ('參賽者|competitor', 'Competitor'), ('attendee|與會者', 'Attendee'), ('student|學員', 'Student'), ('training support', 'Training support'), ('learner|Learner', 'Learner'), ('Participant|participant|參與者', 'Participant')]:
            if re.search(pattern, assertion): role = value; break
    conflict = any(x in notes.lower() for x in ['conflict','reconcil','alias','equivalence','identity','possibly','possible','overlapping','relationship','merge only','year and award'])
    r = dict(id=f'archive-{len(records)+1:03}', titleZh=title, titleEn=title, category=category, year=year, datePrecision='year', role=role, rankingUnit='unknown', evidenceUrls=[], sourceReferences=['docs/experience-audit.md', sources], verificationStatus='candidate-only' if candidate else 'conflicted' if conflict else 'source-recorded', publicationStatus='draft', sourceAssertion=assertion, reviewNotes=notes)
    if title == 'InfoSec Taiwan 2026': r.update(eventDate='2026-07-07', datePrecision='day')
    if title == 'picoCTF': r.update(placement=1007, totalParticipants=8748)
    if title == 'FhCTF': r['placement']=8
    for name, rank in [('LA CTF',9),('Srdnlen CTF Quals',17),('DiceCTF Quals',23)]:
        if title==name: r.update(placement=rank,rankingUnit='team')
    records.append(r)

def extra(title, year, category, role, assertion, sources, notes, status='source-recorded'):
    records.append(dict(id=f'archive-{len(records)+1:03}',titleZh=title,titleEn=title,year=year,category=category,datePrecision='year',role=role,rankingUnit='unknown',evidenceUrls=[],sourceReferences=['docs/experience-audit.md',sources],verificationStatus=status,publicationStatus='draft',sourceAssertion=assertion,reviewNotes=notes))

extra('FIRST Tech Challenge / FTC — 2024','2024','competitions','Team member','Innovation Award (Lead Team)','A,L,D','Confirm separate edition versus year correction; award terminology and team unknown.','conflicted')
extra('National Ilan University Programming, Information & AI Competition — 2025','2025','competitions','unknown','Finalist','L,C,D','Confirm edition versus 2026; do not transfer award.','conflicted')
extra('AIS3 MyFirstCTF — 2025','2025','ctf','Competitor','參賽者','O','Confirm edition versus 2026.','conflicted')
extra('全國高中職人工智慧與資訊生活應用創新競賽 — 2026','2026','competitions','Project participant','O: Project Participant; B: 佳作','O,B','Do not merge with undated Asia Eastern University event without identity evidence.','conflicted')
extra('校內外資訊安全與技術學習活動','2024','speaking','Speaker','speaker','O','Exact event titles, dates and publication approval missing.')
for title, role in [('CTF Instructor','Instructor'),('Raspberry Pi Instructor','Instructor'),('Cybersecurity Teaching Assistant','Teaching assistant'),('Technical Session Support','Support staff'),('Technical Training Support','Support staff')]:
    extra(title,'2025','teaching',role,role,'L,D','Broad historical claim; exact session/date/evidence required. Speaking pages remain quarantined.')
extra('Cybersecurity Seed Training Meeting','2025','training','unknown','Generic training list entry','L','May summarize Taipei/Kaohsiung sessions; preserve unresolved alias.','conflicted')
extra('Northern Taiwan Cybersecurity Hackathon — training','2025','training','unknown','16 Hours','L','Training aspect may overlap competition; not a second confirmed attendance.','conflicted')
extra('Quantum Computing Summer Camp','2025','training','Participant','30 Hours','L,W,D','Confirm identity with High School Quantum Program Summer Camp; retain separate assertion.','conflicted')

# Separate bilingual display titles from original verbatim assertions. Translations are editorial, not evidence.
translations = {
 '台灣選拔賽 MARC 機器人競賽':'MARC Taiwan Robotics Selection',
 '智慧鐵人創意競賽':'Intelligent Ironman Creativity Competition',
 '新北市 AI 智慧城市黑客松':'New Taipei AI Smart City Hackathon',
 '第30屆大專院校資訊應用服務創新競賽 / The 30th InnoServe Awards':'The 30th InnoServe Awards',
 '國立宜蘭大學程式設計暨資訊及 AI 應用競賽':'National Ilan University Programming, Information & AI Competition',
 'Daydream 遊戲開發黑客松':'Daydream Game Development Hackathon',
 '高中職程式安全黑客松 / 北區高中職程式安全黑客松':'Northern Taiwan High School Program Security Hackathon',
 'PowerTech 青少年科技創作競賽 / i-STEAM PowerTech National Finals':'i-STEAM PowerTech National Finals',
 '2026 雙北 FRC 季後賽':'2026 Taipei / New Taipei FRC Off-season',
 '青年志工行動競賽－青志獎':'Youth Volunteer Action Competition — Youth Volunteer Award',
 '亞東科技大學全國高中職人工智慧與資訊生活應用創新競賽':'Asia Eastern University National Senior High School AI and Information Life Application Innovation Competition',
 '金盾獎':'Golden Shield Competition',
 'APCS 模擬測驗團隊暑期營隊':'APCS Mock Test Team Summer Camp',
 'QRACON 學生量子電腦年會':'QRACON Student Quantum Computing Conference',
 'AIS3 高階培訓':'AIS3 Advanced Training',
 'CTF 資安種子培訓交流會（台北場）':'Cybersecurity Seed Training Meeting (Taipei)',
 'CTF 資安種子培訓交流會（高雄場）':'Cybersecurity Seed Training Meeting (Kaohsiung)',
 '校內外資訊安全與技術學習活動':'School and Community Cybersecurity and Technical Learning Activities',
 '全國高中職人工智慧與資訊生活應用創新競賽 — 2026':'National Senior High School AI and Information Life Application Innovation Competition — 2026',
 '高中量子計畫暑期學習營 / Quantum Computing Summer Camp':'High School Quantum Program Summer Camp',
 '2026 資安大會 / CYBERSEC reflection':'CYBERSEC 2026',
 'InfoSec Taiwan / INFOSEC TAIWAN 國際資安組織大會':'InfoSec Taiwan 2025',
 'COSCUP 開源人年會 / COSCUP':'COSCUP 2025',
 'Songshan AI × Cybersecurity / AI × Cybersecurity 實作活動':'Songshan AI × Cybersecurity Workshop',
 'AIS3 EOF CTF / AIS3 EOF 初賽':'AIS3 EOF CTF Preliminary Round',
}
awards = {'Daydream 遊戲開發黑客松':'佳作 / Commendable Work','2026 雙北 FRC 季後賽':"評審團獎 / Judges’ Award",'青年志工行動競賽－青志獎':'佳作 / Honorable Mention','PowerTech 青少年科技創作競賽 / i-STEAM PowerTech National Finals':'全國佳作 / Honorable Mention','i-STEAM / iSTEAM PowerTech Robotics Competition (New Taipei City)':'First Place, Creativity Award','FIRST Tech Challenge / FTC — 2024':'Innovation Award (Lead Team)'}
source_lines = audit.split('## Sources and coverage')[1].split('Additional inventory:')[0]
source_map = {m[1]:m[2].strip() for m in re.findall(r'^(\| (\w+) \| (.+) \|)$',source_lines,re.M)}
for r in records:
    if r['titleZh'] == 'FIRST Tech Challenge / FTC': r['role'] = 'Competitor'
    if r['titleZh'] == 'HPC AI Summer Camp': r['organizer'] = '國立清華大學 / National Tsing Hua University'
    r['titleEn']=translations.get(r['titleZh'],r['titleZh'])
    if r['titleZh'] in awards: r['award']=awards[r['titleZh']]
    keys=re.findall(r'\b[EHAWCTOBLDPM]\b',r['sourceReferences'][1])
    r['sourceReferences'] += [f'{k}: {source_map[k]}' for k in dict.fromkeys(keys) if k in source_map]
Path('src/data/experience-archive.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
header = '''# Experience master list

完整保留 audit 表格、不同年份、教學敘述及別名線索；不是已確認參與清單。來源歷史敘述使用 `source-recorded`，衝突使用 `conflicted`，無參與證據使用 `candidate-only`。所有找回的紀錄及欄位均為 draft。未知年份為 null，不製造日期。英文譯名僅供編輯，不作證據。

公開資料仍由 `src/data/experience.ts` 的八筆已核准快照提供；`src/data/experience-archive.json` 是完整待審檔案，包含來源、原文、角色、名次單位與待確認事項。兩者以既有來源與活動年份對照，draft 不覆寫公開快照。InfoSec 2026 的 07-07 僅存於 draft。

既有公開快照：HPC AI Summer Camp (2026)、AI for Good (2026)、InfoSec Taiwan (2026)、AIS3 MyFirstCTF (2026)、FTC (2026)、APCS 暑期營隊 (2025)、HITCON (2025)、COSCUP (2025)。verificationStatus=confirmed 表示保留既有審核範圍，並非本次獨立查證。

來源代碼與 immutable Git snapshot 見 [audit](experience-audit.md#sources-and-coverage)，每筆 JSON 亦保留展開的來源。競賽分組與學習類別是編輯分類，不表示已確認參與。沒有可靠官方證據 URL，因此 evidenceUrls 留空。

| ID | 年份 | 中文／原名 | English | 類別 | 身分 | 原始敘述（未確認） | 驗證 | 發布 |
|---|---|---|---|---|---|---|---|---|
'''
for r in records:
    header += '| '+' | '.join(str(v).replace('|','／').replace('\n',' ') for v in [r['id'],r['year'] or '未詳',r['titleZh'],r['titleEn'],r['category'],r['role'],r['sourceAssertion'],r['verificationStatus'],'draft'])+' |\n'
header += f'\n共 {len(records)} 筆歷史 assertion；包含可能重複的別名，不可作為已參加活動總數。\n'
Path('docs/experience-master-list.md').write_text(header,encoding='utf-8')
conflicts='''# Experience conflicts and review queue

未確認欄位不得公開。完整來源值保留於 archive 的 sourceAssertion；確認後須分別設定 verificationStatus 與 publicationStatus，不可只把 draft 改 published。現有公開快照新增欄位也需獨立審核。

| 群組 | 需要使用者確認的欄位 | 處理 |
|---|---|---|
| FTC 2024 / 2026 | 屆次、年份、Innovation / Inspire / 最佳創意獎首席、Lead Team 的意思 | 分開年份，2026 僅保留既有參賽公開快照；獎項均 draft |
| 宜蘭 2025 / 2026 | 是否不同屆次、決賽與佳作、英文缺項 | 分開年份，保留原文，不從缺譯推論未獲獎 |
| AIS3 MyFirstCTF 2025 / 2026 | 重複參加或年份修正 | 兩筆保留，2026 原公開參賽狀態不變 |
| PowerTech | 地區／全國、組別、第一名與創意獎所屬 | 地區與全國分開，獎項不直接轉名次 |
| InnoServe | 高中職／大專組、佳作／Merit、決賽 | 同一屆一筆，原文列出各組結果，不拆成多次參與 |
| 資安黑客松 | 官方名稱、挖蛋專家／OSINT 是否相同、16 小時研習與競賽關係 | 原文並存，研習另列待確認，不將兩獎名互譯 |
| 研討會別名 | InfoSec／International Cybersecurity Organization、Bak3／ZeroDay Cookie、AWS Taipei／Taiwan | 別名候選並存，不自動去重 |
| 培訓別名 | APCS／APCSS、量子營／QRACON／展覽、Google／GDG／ADK、資安種子兩場與泛稱 | 保留獨立線索；不同地點場次不合併 |
| 排名 | picoCTF 1007/8748 的分母單位；FhCTF 8 的排名單位；LA 9／Srdnlen 17／Dice 23 的隊名與分母 | 未知 rankingUnit=unknown；團隊排名僅三筆明示 team；MARC 12 強不是第 12 名 |
| 未知年份競賽 | 青志獎年份；亞東名稱與 2026 泛稱是否同活動 | 未知年份 null；2026 泛稱另筆，不填給亞東 |
| K17 / HITCON CTF / NVIDIA hackathon lead | 實際參加證據、年份、角色 | candidate-only，role=unknown；不是參與聲明 |
| 教學／演講 | 真實活動名稱、日期、講者／助教／支援角色、公開授權 | 保留 draft；既有 CTF 文章含講解者敘述而 speaking 頁仍隔離，待明確審核，不擴張公開範圍 |
| 日期 | 除 InfoSec 2026 外的活動日期；InfoSec 日期發布授權 | 不以文章日期替代活動日期，沒有 1 月 1 日占位 |
| 歷史隊籍與證照 | 被刪除的 RCEs 隊籍；網路架設證照 2024/2026 | 不恢復隊籍或套用到排名；證照不屬本次六類，保留 audit 問題 |

## 逐筆待審欄位

每筆均需確認參與／身分、來源證據及發布範圍；以下列出特定缺口。

| ID | 來源 | 待確認 |
|---|---|---|
'''
for r in records: conflicts+=f"| {r['id']} | {r['sourceReferences'][1]} | {r['reviewNotes'].replace('|','／')} |\n"
Path('docs/experience-conflicts.md').write_text(conflicts,encoding='utf-8')
print(f'Recovered {len(records)} draft assertions')
