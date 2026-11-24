type EventEntry = { data: { slug: string; title: string; startedAt: string; language?: string } };

export function groupExperience<T extends EventEntry>(entries: T[]) {
  const groups = new Map<string, T[]>();
  for (const entry of entries) {
    const date = entry.data.startedAt;
    const year = /^(\d{4})(?:-\d{2}-\d{2})?$/.exec(date)?.[1];
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
      const aKnown = a.data.startedAt.length === 10;
      const bKnown = b.data.startedAt.length === 10;
      return Number(bKnown) - Number(aKnown)
        || (aKnown && bKnown ? b.data.startedAt.localeCompare(a.data.startedAt) : 0)
        || a.data.title.localeCompare(b.data.title, a.data.language ?? 'en');
    }),
  }));
}
