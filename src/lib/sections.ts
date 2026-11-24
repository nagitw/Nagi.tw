import { profileSchema, type PublicProfile } from './content-schema.ts';

// Author-supplied public identity and existing public interests; no inferred credentials.
export const publicProfile = {
  publicName: 'Nagi',
  biography: {
    en: 'I’m Nagi. My technical focus brings together cybersecurity, software engineering, communication systems, and embedded systems. I document engineering decisions and the evidence behind them, including open-source work on command-line reliability. Medical technology and autonomous systems are areas I’m interested in exploring.',
    'zh-TW': '我是 Nagi，關注資訊安全、軟體工程、通訊系統與嵌入式系統。我記錄工程決策及其依據，包含改善命令列工具可靠性的開源貢獻。醫療科技與自主系統是我希望持續探索的方向。',
  },
  technicalInterests: [
    { en: 'Web and Application Security', 'zh-TW': '網頁與應用程式安全' },
    { en: '5G / B5G / 6G Communication Security', 'zh-TW': '5G／B5G／6G 通訊安全' },
    { en: 'AI-assisted Security Research', 'zh-TW': 'AI 輔助資安研究' },
    { en: 'Embedded and IoT Security', 'zh-TW': '嵌入式與物聯網安全' },
    { en: 'Medical Device Security', 'zh-TW': '醫療裝置安全' },
    { en: 'UAV and Autonomous Systems', 'zh-TW': '無人機與自主系統' },
  ],
  skillGroups: [
    {
      category: 'programming-languages', items: ['Python'],
      context: { en: 'Used in the documented BugTraceAI-CLI contribution.', 'zh-TW': '用於已公開的 BugTraceAI-CLI 貢獻。' },
      evidence: [{ label: 'BugTraceAI-CLI contributions', url: 'https://nagitw.github.io/Nagi.tw/projects/bugtraceai-cli-contributions/' }],
    },
    {
      category: 'web-development', items: ['Astro', 'TypeScript', 'Markdown / MDX', 'HTML / CSS'],
      context: { en: 'Technologies used to build this website.', 'zh-TW': '本站採用的建置與內容技術。' },
      evidence: [{ label: 'Nagi.tw', url: 'https://nagitw.github.io/Nagi.tw/' }],
    },
    {
      category: 'security-engineering', items: ['Pytest', 'Rich'],
      context: { en: 'Command-line tooling and regression tests in the documented open-source contribution.', 'zh-TW': '用於已公開開源貢獻的命令列工具與回歸測試。' },
      evidence: [{ label: 'BugTraceAI-CLI contributions', url: 'https://nagitw.github.io/Nagi.tw/projects/bugtraceai-cli-contributions/' }],
    },
  ],
} satisfies PublicProfile;
profileSchema.parse(publicProfile);

export const sections = [
  {
    "slug": "projects",
    "title": "Projects",
    "zhTitle": "專案",
    "subtitle": "Ideas, made tangible.",
    "zhSubtitle": "讓想法成為實作。",
    "description": "Cybersecurity and engineering projects: problems, design decisions, and results.",
    "zhDescription": "作品與實作紀錄，整理問題、設計選擇與成果。",
    "heading": "Projects in progress",
    "zhHeading": "作品整理中",
    "note": "Project write-ups are being prepared, with context, process, and results.",
    "zhNote": "作品列表與案例內容待補。未來將記錄每個專案的背景、過程與成果。"
  },
  {
    "slug": "research",
    "title": "Research",
    "zhTitle": "研究",
    "subtitle": "Stay with the question.",
    "zhSubtitle": "讓問題引領探索。",
    "description": "Security research notes, questions, methods, and references.",
    "zhDescription": "研究筆記與探索紀錄，收集問題、方法與參考資料。",
    "heading": "Research notes in progress",
    "zhHeading": "研究筆記整理中",
    "note": "Research topics, methods, and references will be collected here as the work develops.",
    "zhNote": "研究主題、方法與參考來源待補。這裡保留持續探索與修正想法的空間。"
  },
  {
    "slug": "journal",
    "title": "Journal",
    "zhTitle": "札記",
    "subtitle": "Small observations, kept.",
    "zhSubtitle": "留下值得記住的觀察。",
    "description": "Notes on cybersecurity, engineering, reading, and everyday life.",
    "zhDescription": "資安、工程、閱讀與日常觀察的長短文字。",
    "heading": "Writing in progress",
    "zhHeading": "文字整理中",
    "note": "Essays and reading notes are being prepared. Check back for new writing.",
    "zhNote": "文章與閱讀筆記整理中，讓值得記住的想法有一個可以回來的地方。"
  },
  {
    "slug": "photography",
    "title": "Photography",
    "zhTitle": "攝影",
    "subtitle": "A slower way of seeing.",
    "zhSubtitle": "放慢腳步，看見細節。",
    "description": "Light, places, and everyday moments, recorded in photographs.",
    "zhDescription": "以影像記錄光線、地方與日常片刻。",
    "heading": "Photographs in progress",
    "zhHeading": "影像選輯整理中",
    "note": "No photo collections have been published yet. Original photographs will be added when ready.",
    "zhNote": "尚無已發表的影像選輯。原創影像將在整理完成後加入。"
  },
  {
    "slug": "experience",
    "title": "Experience",
    "zhTitle": "經歷",
    "subtitle": "Perspective, over time.",
    "zhSubtitle": "在經歷中累積視角。",
    "description": "Work, education, and learning, with room to reflect on progress.",
    "zhDescription": "經歷與學習軌跡，記錄投入與成長。",
    "heading": "Experience in progress",
    "zhHeading": "經歷內容待補",
    "note": "Work, education, and other experience will be added once the details are ready to share.",
    "zhNote": "工作、教育與其他經歷尚未提供。確認真實資料後，將依時間整理於此。"
  },
  {
    "slug": "about",
    "title": "About",
    "zhTitle": "關於",
    "subtitle": "A little more context.",
    "zhSubtitle": "多一點背景。",
    "description": "A personal portfolio on cybersecurity and software engineering.",
    "zhDescription": "記錄資安與軟體工程的個人作品集。",
    "heading": "About this space",
    "zhHeading": "關於這個空間",
    "note": publicProfile.biography.en,
    "zhNote": publicProfile.biography['zh-TW']
  }
];
