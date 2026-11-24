import test from 'node:test';
import assert from 'node:assert/strict';
import { groupExperience } from '../src/lib/experience-timeline.ts';

const entry = (slug, startedAt, publishedAt = '2030-01-01') => ({ data: { slug, title: slug, startedAt, publishedAt } });
test('timeline groups by actual event year and sorts known event dates, never publication dates', () => {
  const groups = groupExperience([
    entry('older', '2025-12-30'), entry('year-only-z', '2026'),
    entry('march', '2026-03-01', '2029-01-01'), entry('october', '2026-10-01', '2020-01-01'),
    entry('year-only-a', '2026'), entry('oldest', '2024'),
  ]);
  assert.deepEqual(groups.map(group => group.year), ['2026', '2025', '2024']);
  assert.deepEqual(groups[0].entries.map(item => item.data.slug), ['october', 'march', 'year-only-a', 'year-only-z']);
  assert.equal(groups[0].entries[2].data.startedAt, '2026', 'No fabricated month/day');
});
test('unknown event dates do not fall back to publication or commit dates', () => {
  assert.throws(() => groupExperience([entry('unknown', '')]), /event date/i);
});
