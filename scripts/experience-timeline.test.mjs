import test from 'node:test';
import assert from 'node:assert/strict';
import { groupExperience, experienceType } from '../src/lib/experience-timeline.ts';

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
test('month precision is preserved and ordered against other event months', () => {
  const group = groupExperience([entry('august', '2026-08'), entry('july-day', '2026-07-31'), entry('year', '2026')])[0];
  assert.deepEqual(group.entries.map(e => e.data.slug), ['august', 'july-day', 'year']);
  assert.equal(group.entries[0].data.startedAt, '2026-08');
  assert.throws(() => groupExperience([entry('bad', '2026-13')]), /event date/i);
  assert.equal(experienceType('first-robotics-competition', 'en'), 'Robotics Competition');
  assert.equal(experienceType('new-taipei-hackathon', 'en'), 'Hackathon');
  assert.equal(experienceType('ais3-myfirstctf-2026', 'en'), 'Cybersecurity Competition');
});
