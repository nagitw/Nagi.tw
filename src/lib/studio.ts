import type { Locale } from './i18n';
// Interests authorized by the V4 brief; no completed-study or affiliation claims.
export const researchDirections = [
  {
    en: 'B5G / 6G Communication Security',
    zh: 'B5G / 6G 通訊安全',
    note: [
      'Trust boundaries across next-generation communication systems.',
      '探索次世代通訊系統中的信任邊界。',
    ],
  },
  {
    en: 'AI-driven Security Research',
    zh: 'AI 驅動的資安研究',
    note: [
      'AI-assisted analysis, reliability and security questions.',
      '關注 AI 輔助分析、可靠性與安全問題。',
    ],
  },
  {
    en: 'Medical AI & Cybersecurity',
    zh: '醫療 AI 與資訊安全',
    note: [
      'Data integrity, privacy and the realities of healthcare workflows.',
      '從資料完整性、隱私與醫療工作流程思考安全。',
    ],
  },
  {
    en: 'Embedded / IoT Security',
    zh: '嵌入式與物聯網安全',
    note: [
      'Security where software meets devices and the physical world.',
      '探索軟體、裝置與實體環境交會處的安全。',
    ],
  },
];
export function directionText(index: number, locale: Locale) {
  const direction = researchDirections[index];
  return {
    title: locale === 'en' ? direction.en : direction.zh,
    note: direction.note[locale === 'en' ? 0 : 1],
  };
}
// Presentation stages grounded in existing public source bodies.
export const publicStages: Record<string, { en: string; 'zh-TW': string }> = {
  'aeust-life-overview': {
    en: 'Independent initiative · in development',
    'zh-TW': '自主發起・開發中',
  },
  'medical-cybersecurity-research': {
    en: 'Research in progress',
    'zh-TW': '研究中',
  },
  'medical-cybersecurity': { en: 'Early research', 'zh-TW': '初期研究' },
  'autonomous-robot': { en: 'Experimental prototype', 'zh-TW': '實驗原型' },
  medtrust: {
    en: 'Prototype · no clinical deployment claim',
    'zh-TW': '原型・不代表臨床部署',
  },
  'bugtraceai-cli-contributions': {
    en: 'Open-source contribution',
    'zh-TW': '開源貢獻',
  },
};
export const githubUrl = 'https://github.com/nagitw';
export const contactUrl = githubUrl;
