import { publicRecords, type DevelopmentStatus } from './publication.ts';
import type { Locale } from '../i18n/ui';

export interface CatalogRecord {
  route: string; title: string; description: string; locale: string; kind: string;
  publicationStatus?: string; date?: string; body?: string;
  developmentStatus?: DevelopmentStatus; tools?: string[]; github?: string; demo?: string;
  role?: string; projectType?: string; contributions?: string[]; projectResults?: string[]; verifiedResults?: string[];
}
type Localized = Record<Locale, string>;
export const fields = {
  'iot-security': { en: 'IoT & Medical Security', zh: 'IoT 與醫療安全' },
  'web-security': { en: 'Web Security', zh: 'Web 安全' },
  'ctf-practice': { en: 'CTF & Security Practice', zh: 'CTF 與資安實作' },
  'embedded-systems': { en: 'Embedded Systems', zh: '嵌入式系統' },
  infrastructure: { en: 'Infrastructure', zh: '基礎設施' },
  'research-notes': { en: 'Research Notes', zh: '研究筆記' },
} satisfies Record<string, Localized>;
export type Field = keyof typeof fields;
export const recordTypes: Record<string, Localized> = {
  project: { en: 'Project overview', zh: '專案概覽' },
  research: { en: 'Research Notes', zh: '研究筆記' },
  lab: { en: 'Lab Experiment', zh: '實驗紀錄' },
  journal: { en: 'Journal', zh: '學習日誌' },
  report: { en: 'Technical Report', zh: '技術報告' },
  'research-project': { en: 'Research Project', zh: '研究專案' },
  writeup: { en: 'Security Write-up', zh: '資安解題紀錄' },
};
export const developmentLabels: Record<DevelopmentStatus, Localized> = {
  'active-development': { en: 'In development', zh: '開發中' },
  maintained: { en: 'Maintained', zh: '長期維護' },
  completed: { en: 'Completed', zh: '已完成' },
  paused: { en: 'Paused', zh: '暫停開發' },
  archived: { en: 'Archived', zh: '已封存' },
};
interface Metadata {
  field: Field; title?: Localized; tools?: string[]; phase?: Localized;
  developmentStatus?: DevelopmentStatus; related?: string[]; compatibility?: boolean;
  recordType?: string; role?: Localized; contributions?: Record<Locale, string[]>; outcomes?: Localized;
}
// Presentation metadata derived from the existing public records. No inferred lifecycle or results.
const metadata: Record<string, Metadata> = {
  '/systems/medtrust/': {
    recordType: 'project',
    role: { en: 'Prototype author', zh: '原型作者' },
    contributions: { en: ['Documented gateway message checks and exported evidence integrity.'], zh: ['整理 Gateway 訊息檢查與匯出證據完整性的原型流程。'] },
    outcomes: { en: 'The source describes an integrity-consistency prototype. Reproducible public test evidence is pending; no clinical readiness claim.', zh: '原始紀錄描述 integrity consistency 原型；可重現的公開測試證據待補，不宣稱臨床可用。' },
    field: 'iot-security', tools: ['ESP32-S3', 'FastAPI', 'SQLite', 'HMAC-SHA256'],
    phase: { en: 'Research prototype', zh: '研究原型' },
    related: ['/research/archive-notes/', '/technical-reports/evidence-integrity-archive/', '/journal/series/medtrust/00/', '/journal/series/medtrust/01/'],
  },
  '/systems/home-lab/': {
    field: 'infrastructure', title: { en: 'Home Lab', zh: '個人實驗室' }, tools: ['Ubuntu Server', 'Docker', 'Tailscale', 'OpenWrt', 'MQTT', 'Node-RED'],
    role: { en: 'Personal lab operator', zh: '個人實驗室維運者' },
    contributions: { en: ['Run services, test network boundaries and remote access, and keep recovery notes.'], zh: ['運行服務、測試網路邊界與遠端存取，並整理復原筆記。'] },
    outcomes: { en: 'The source documents the lab setup and use; no measured reliability or performance results are supplied.', zh: '現有紀錄說明實驗室配置與用途，尚未提供可靠性或效能的量測成果。' },
  },
  '/systems/home-lab-infrastructure/': { field: 'infrastructure', compatibility: true },
  '/projects/autonomous-robot/': {
    role: { en: 'Prototype developer', zh: '原型開發者' },
    contributions: { en: ['Built a prototype path for ROS2 setup, device integration, sensor experiments and motor tests.'], zh: ['建立 ROS2 環境、裝置整合、感測器實驗與馬達測試的原型流程。'] },
    outcomes: { en: 'Documented prototype and basic movement trials; the robot remains experimental.', zh: '已記錄原型與基本移動測試，機器人仍處於實驗階段。' },
    field: 'embedded-systems', title: { en: 'Autonomous Robot', zh: '自主機器人' }, tools: ['ROS2', 'Ubuntu', 'Raspberry Pi', 'LiDAR'],
    phase: { en: 'Experimental prototype', zh: '實驗原型' }, related: ['/labs/ros2-topic-communication/', '/labs/esp32-uart-test/'],
  },
  '/projects/medical-cybersecurity/': {
    recordType: 'research-project',
    role: { en: 'Research note author', zh: '研究紀錄作者' },
    contributions: { en: ['Organized questions about device trust, data validation, privacy and healthcare workflows.'], zh: ['整理裝置信任、資料驗證、隱私與醫療工作流程的研究問題。'] },
    outcomes: { en: 'Early notes and concepts provide a basis for future prototypes; no validated clinical system.', zh: '目前成果為早期筆記與概念，供後續原型參考，並非已驗證的臨床系統。' },
    field: 'iot-security', title: { en: 'Medical Cybersecurity', zh: '醫療資安' },
    phase: { en: 'Early research', zh: '早期研究' },
    related: ['/labs/medical-cybersecurity-research/', '/journal/nurse-made-me-rethink-medical-cybersecurity/'],
  },
  '/research/archive-notes/': { field: 'iot-security', recordType: 'research-project', title: { en: 'Medical IoT trust boundaries', zh: '醫療 IoT 的信任邊界' }, related: ['/systems/medtrust/', '/projects/medical-cybersecurity/', '/labs/medical-cybersecurity-research/', '/technical-reports/evidence-integrity-archive/', '/journal/series/medtrust/00/'] },
  '/technical-reports/evidence-integrity-archive/': { field: 'iot-security', title: { en: 'Evidence integrity: phase archive', zh: '證據完整性：階段紀錄' }, phase: { en: 'Evidence pending', zh: '驗證證據待補' }, related: ['/systems/medtrust/', '/journal/series/medtrust/00/', '/journal/series/medtrust/01/'] },
  '/labs/web-security/': { field: 'web-security', title: { en: 'Web security fundamentals', zh: 'Web 安全基礎' }, phase: { en: 'Learning notes', zh: '學習筆記' } },
  '/labs/ctf-web-practice/': { field: 'ctf-practice', title: { en: 'CTF Web practice', zh: 'CTF Web 實作' }, phase: { en: 'Archived learning note', zh: '封存學習紀錄' }, related: ['/journal/ctf-meets-malware-analysis-windows/'] },
  '/labs/medical-cybersecurity-research/': { field: 'iot-security', title: { en: 'Medical cybersecurity: early observations', zh: '醫療資安：早期觀察' }, related: ['/journal/nurse-made-me-rethink-medical-cybersecurity/'] },
  '/labs/esp32-uart-test/': { field: 'embedded-systems', title: { en: 'ESP32 UART communication', zh: 'ESP32 UART 通訊測試' }, phase: { en: 'Completed learning note', zh: '已完成的學習紀錄' } },
  '/labs/ros2-topic-communication/': { field: 'embedded-systems', title: { en: 'ROS2 topic communication', zh: 'ROS2 主題通訊' }, phase: { en: 'Learning in progress', zh: '持續學習中' } },
  '/journal/ctf-meets-malware-analysis-windows/': { field: 'ctf-practice', related: ['/labs/ctf-web-practice/'] },
};
export const normalizedPath = (route: string) => route.replace(/^\/zh(?=\/)/, '');
export function catalogEntries(records: readonly CatalogRecord[], locale: Locale, kinds: string[]) {
  const approved = publicRecords(records);
  const paths = [...new Set(approved.filter(r => kinds.includes(r.kind)).map(r => normalizedPath(r.route)))];
  return paths.flatMap(path => {
    const record = approved.find(r => normalizedPath(r.route) === path && r.locale === locale)
      ?? approved.find(r => normalizedPath(r.route) === path)!;
    const meta = metadata[path];
    if (meta?.compatibility) return [];
    return [{
      path, record, title: record.locale === locale ? meta?.title?.[locale] ?? record.title : record.title,
      field: meta?.field ?? 'research-notes' as Field,
      tools: record.tools ?? meta?.tools ?? [], phase: meta?.phase?.[locale], developmentStatus: record.developmentStatus ?? meta?.developmentStatus,
      typeLabel: record.projectType ?? recordTypes[meta?.recordType ?? (path === '/labs/web-security/' ? 'research' : record.kind)]?.[locale] ?? record.kind,
      role: record.role ?? meta?.role?.[locale], contributions: record.contributions ?? meta?.contributions?.[locale] ?? [],
      outcomes: meta?.outcomes?.[locale], projectResults: record.projectResults ?? [], verifiedResults: record.verifiedResults ?? [],
    }];
  }).sort((a, b) => (b.record.date ?? '').localeCompare(a.record.date ?? ''));
}
export type CatalogEntry = ReturnType<typeof catalogEntries>[number];
export function projectEntries(records: readonly CatalogRecord[], locale: Locale) {
  return catalogEntries(records, locale, ['project']).filter(entry => entry.path !== '/projects/medical-cybersecurity/');
}
export function researchGroups(records: readonly CatalogRecord[], locale: Locale) {
  const entries = catalogEntries(records, locale, ['research', 'lab', 'report', 'journal', 'project'])
    .filter(entry => ['research', 'lab', 'report'].includes(entry.record.kind) || entry.path === '/journal/ctf-meets-malware-analysis-windows/')
    // One entry point for the medical trust topic; notes/report remain linked from its dossier.
    .filter(entry => !['/labs/medical-cybersecurity-research/', '/technical-reports/evidence-integrity-archive/'].includes(entry.path));
  return (Object.keys(fields) as Field[]).flatMap(id => {
    const items = entries.filter(entry => entry.field === id);
    return items.length ? [{ id, label: fields[id][locale], entries: items }] : [];
  });
}
export function relatedEntries(records: readonly CatalogRecord[], path: string, locale: Locale) {
  const links = metadata[path]?.related ?? [];
  return catalogEntries(records, locale, ['project', 'research', 'lab', 'journal', 'report']).filter(entry => links.includes(entry.path));
}
