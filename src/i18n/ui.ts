export type Locale = 'en' | 'zh';

// Explicit language URLs always win; header stores preference without automatic redirects.
const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');
export const withoutBase = (path: string): string => base && (path === base || path.startsWith(`${base}/`)) ? path.slice(base.length) || '/' : path;
export const localPath = (path: string, locale: Locale): string =>
  path.startsWith('/') && !path.startsWith('//') ? `${base}${locale === 'zh' ? '/zh' : ''}${path}` : path;

export const ui = {
  en: {
    overview: 'Overview', research: 'Research', projects: 'Projects', experience: 'Experience', contact: 'Contact',
    currently: 'Currently', featuredResearch: 'Featured Research', featuredProjects: 'Featured Projects', recentNotes: 'Recent Notes',
    allResearch: 'All research', allProjects: 'All projects', allNotes: 'All notes',
    notes: 'Notes', menu: 'Menu', navigation: 'Main navigation', external: ' (external site)', darkMode: 'Dark mode',
    skip: 'Skip to content', email: 'Email', technologies: 'technologies', limitations: 'Scope & limitations',
    penguin: 'Nagi penguin greeting', footerNotes: 'Notes live at notes.nagi.tw',
    notesUnavailable: 'Recent previews are unavailable.', readNotes: 'Read the latest notes on Notes',
    researchIntro: 'Questions about trust, communication, and the systems that connect the physical and digital worlds.',
    projectsIntro: 'Systems built to make an idea testable. Each record includes its technical context and the boundaries of what it claims.',
    experienceIntro: 'Selected training, community events, and competitions that have shaped how I learn and build.',
    contactIntro: 'For questions about my work or a conversation about security, systems, and research, visit the public GitHub profile.',
    overviewDescription: 'Nagi, a student engineer exploring security, communications, Medical IoT, and embedded systems.',
    researchDescription: 'Ongoing research interests in Medical IoT trust, 5G communication security, and embedded systems, with the scope and limitations of current work.',
    projectsDescription: 'MedTrust, a Medical IoT integrity prototype. Project scope, technical context, and explicit limitations.',
    experienceDescription: 'Selected training, technical communities, and competition participation from Nagi’s learning record in security, computing, and robotics.',
    contactDescription: 'Find Nagi on GitHub, explore the GitHub profile, or read independent notes on security, systems, and engineering.',
  },
  zh: {
    overview: '首頁', research: '研究', projects: '專案', experience: '經歷', contact: '聯絡',
    currently: '目前研究', featuredResearch: '研究精選', featuredProjects: '專案精選', recentNotes: '近期筆記',
    allResearch: '所有研究', allProjects: '所有專案', allNotes: '所有筆記',
    notes: '筆記', menu: '選單', navigation: '主要導覽', external: '（外部網站）', darkMode: '深色模式',
    skip: '跳至主要內容', email: '電子郵件', technologies: '使用技術', limitations: '範圍與限制',
    penguin: 'Nagi 企鵝問候', footerNotes: '筆記收錄於 notes.nagi.tw',
    notesUnavailable: '暫時無法載入近期筆記。', readNotes: '前往筆記閱讀',
    researchIntro: '從訊息信任、通訊與裝置之間的邊界，整理目前探索的研究問題。',
    projectsIntro: '把想法做成可以測試的系統，並記錄技術選擇、實作範圍與限制。',
    experienceIntro: '整理參與過的研習、社群活動與競賽，留下學習與實作的軌跡。',
    contactIntro: '若想詢問專案內容，或交流資安、系統與研究相關問題，可以透過公開 GitHub 頁面認識我的工作。',
    overviewDescription: 'Nagi的個人研究與工程紀錄，整理資安、通訊、醫療 IoT 與嵌入式系統的實作與探索。',
    researchDescription: '醫療 IoT 信任、5G 通訊安全與嵌入式系統的研究方向，以及目前工作的範圍與限制。',
    projectsDescription: 'MedTrust 醫療 IoT 完整性原型，整理專案的技術脈絡、實作範圍與限制。',
    experienceDescription: 'Nagi參與資安、運算與機器人相關研習、社群活動與競賽的學習紀錄。',
    contactDescription: '透過公開 GitHub 與筆記認識 Nagi，或前往 GitHub 與獨立筆記站閱讀資安、系統與工程紀錄。',
  },
} as const;
