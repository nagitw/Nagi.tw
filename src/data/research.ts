import type { Locale } from '../i18n/ui';
export interface ResearchArea {
  id: string;
  title: string;
  status: string;
  summary: string;
  question?: string;
  href?: string;
  linkLabel?: string;
  featured: boolean;
  sources: readonly string[];
}

const zhResearch: readonly ResearchArea[] = [
  {
    id: 'medical-iot', title: '醫療 IoT 安全', status: '原型研究', featured: true,
    summary: '研究裝置與 Gateway 邊界上的訊息信任與證據完整性。以 MedTrust 原型檢驗這些問題，目前僅主張 integrity consistency。',
    question: 'Gateway 如何檢查收到的訊息、辨識重放攻擊，並保留匯出後仍可檢查的證據？',
    href: '/projects/#medtrust', linkLabel: 'MedTrust 的範圍與限制',
    sources: ['source/research/index.md', 'source/systems/medtrust/index.md'],
  },
  {
    id: '5g-security', title: '5G 通訊安全', status: '持續探索', featured: false,
    summary: '目前持續探索的通訊安全方向，尚未整理公開的研究方法、成果或論文。',
    sources: ['Approved v2 user brief; detailed research data not supplied'],
  },
  {
    id: 'embedded-systems', title: '嵌入式／自主系統', status: '探索中', featured: false,
    summary: '透過裝置、Linux 與系統整合實作，探索嵌入式系統與機器人。',
    sources: ['source/_data/nagi_home.json', 'source/_posts/recent-projects-and-life-update.md', 'Approved v2 user brief'],
  },
];

const english: Record<string, Partial<ResearchArea>> = {
  'medical-iot': {
    title: 'Medical IoT Security', status: 'Prototype research',
    summary: 'Exploring message trust and evidence integrity at the boundary between devices and a gateway. MedTrust provides a concrete prototype for examining these questions, within an integrity-consistency-only scope.',
    question: 'How can a gateway check incoming messages, detect replay attempts, and preserve evidence that can be checked after export?',
    linkLabel: 'MedTrust scope and limitations',
  },
  '5g-security': {
    title: '5G Communication Security', status: 'Ongoing research area',
    summary: 'An ongoing area of study in communications security. Detailed methods, results, and publications are not presented here.',
  },
  'embedded-systems': {
    title: 'Embedded / Autonomous Systems', status: 'Exploration',
    summary: 'Exploring embedded systems and robotics through practical work with devices, Linux, and system integration.',
  },
};
export const research: readonly ResearchArea[] = zhResearch.map((area) => ({ ...area, ...english[area.id] }));
export const getResearch = (locale: Locale): readonly ResearchArea[] => locale === 'zh' ? zhResearch : research;
