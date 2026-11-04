import type { Locale } from '../i18n/ui';
export interface Project {
  id: string;
  title: string;
  category: string;
  status: string;
  summary: string;
  details: string;
  tools: readonly string[];
  limitations: readonly string[];
  sources: readonly string[];
  featured: boolean;
}

const zhProjects: readonly Project[] = [
  {
    id: 'medtrust', title: 'MedTrust', category: 'Medical IoT', status: 'Prototype', featured: true,
    summary: '檢查醫療 IoT 訊息與匯出實驗證據一致性的原型，以 Gateway 作為訊息驗證邊界。',
    details: '目前記錄的流程串接 ESP32-S3、FastAPI Gateway 與 SQLite，並包含儀表板、證據封裝與離線驗證工具。測試情境區分有效訊息、無效簽章、未知裝置、錯誤金鑰與重放攻擊。',
    tools: ['ESP32-S3', 'FastAPI', 'SQLite', 'HMAC-SHA256'],
    limitations: ['目前僅主張 integrity consistency（完整性一致性）。', '尚未提供 Digital Signature、Identity Proof 或 Non-repudiation。', '定位為研究原型，非醫院或護理工作平台；尚未提供公開測試證據與建置驗證紀錄。'],
    sources: ['source/systems/medtrust/index.md', 'source/_data/portfolio.json'],
  },
];

export const projects: readonly Project[] = zhProjects.map((project) => ({
  ...project,
  summary: 'A prototype for checking Medical IoT messages at a gateway and the consistency of exported experiment evidence.',
  details: 'The documented workflow connects ESP32-S3 devices to a FastAPI gateway and SQLite, with a dashboard, evidence packages, and an offline verifier. Test scenarios distinguish valid messages, invalid signatures, unknown devices, wrong keys, and replay attempts.',
  limitations: ['The current claim is integrity consistency only.', 'Does not provide Digital Signature, Identity Proof, or Non-repudiation.', 'A research prototype, not a hospital or nursing platform. Public test evidence and build verification records are not yet provided.'],
}));
export const getProjects = (locale: Locale): readonly Project[] => locale === 'zh' ? zhProjects : projects;
