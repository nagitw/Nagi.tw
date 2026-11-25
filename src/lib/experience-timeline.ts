type EventEntry = { data: { slug: string; title: string; startedAt: string; language?: string } };

export function groupExperience<T extends EventEntry>(entries: T[]) {
  const groups = new Map<string, T[]>();
  for (const entry of entries) {
    const date = entry.data.startedAt;
    const year = /^(\d{4})(?:-(0[1-9]|1[0-2])(?:-\d{2})?)?$/.exec(date)?.[1];
    if (!year || date.length === 10 && (Number.isNaN(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date)) {
      throw new Error(`Unconfirmed event date: ${entry.data.slug}`);
    }
    const group = groups.get(year) ?? [];
    group.push(entry);
    groups.set(year, group);
  }
  return [...groups].sort(([a], [b]) => b.localeCompare(a)).map(([year, group]) => ({
    year,
    entries: group.sort((a, b) => {
      // Keep imprecise dates after known dates, without inventing a month/day.
      const dateKey = (date: string) => date.length === 4 ? `${date}-99-99` : date.length === 7 ? `${date}-99` : date;
      return dateKey(a.data.startedAt).localeCompare(dateKey(b.data.startedAt))
        || a.data.slug.localeCompare(b.data.slug);
    }),
  }));
}

export function experienceType(slug: string, locale: string) {
  const groups: [string[], string, string][] = [
    [['first-robotics-competition', 'first-tech-challenge', 'isteam-powertech'], 'Robotics Competition', '機器人競賽'],
    [['ais3-eof-2026', 'ais3-myfirstctf-2026', 'broncoctf-2026', 'grodno-ctf-2026', 'junior-crypt-ctf-2026', 'cyber-shield'], 'Cybersecurity Competition', '資訊安全競賽'],
    [['new-taipei-hackathon', 'daydream-hackathon', 'northern-security-hackathon', 'future-medical-design'], 'Hackathon', '黑客松'],
    [['ilan-programming-ai', 'ai-life-innovation', 'it-services-innovation-30'], 'Programming & Innovation Competition', '程式設計與創新競賽'],
    [['technical-creativity', 'ironman-creativity'], 'Engineering Competition', '工程創意競賽'],
    [['youth-volunteer-competition'], 'Volunteer Competition', '志工行動競賽'],
    [['infosec-2026', 'infosec-taiwan-2025', 'hitcon-2025', 'coscup-2025'], 'Conference', '研討會'],
  ];
  const match = groups.find(([slugs]) => slugs.includes(slug));
  return match ? match[locale === 'zh-TW' ? 2 : 1] : locale === 'zh-TW' ? '技術培訓' : 'Technical Training';
}
