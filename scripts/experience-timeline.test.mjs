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
  assert.deepEqual(groups[0].entries.map(item => item.data.slug), ['march', 'october', 'year-only-a', 'year-only-z']);
  assert.equal(groups[0].entries[2].data.startedAt, '2026', 'No fabricated month/day');
});
test('unknown event dates do not fall back to publication or commit dates', () => {
  assert.throws(() => groupExperience([entry('unknown', '')]), /event date/i);
});
test('month precision is preserved and ordered against other event months', () => {
  const group = groupExperience([entry('august', '2026-08'), entry('july-day', '2026-07-31'), entry('year', '2026')])[0];
  assert.deepEqual(group.entries.map(e => e.data.slug), ['july-day', 'august', 'year']);
  assert.equal(group.entries[1].data.startedAt, '2026-08');
  assert.throws(() => groupExperience([entry('bad', '2026-13')]), /event date/i);
  assert.equal(experienceType('first-robotics-competition', 'en'), 'Robotics Competition');
  assert.equal(experienceType('new-taipei-hackathon', 'en'), 'Hackathon');
  assert.equal(experienceType('ais3-myfirstctf-2026', 'en'), 'Cybersecurity Competition');
});

test('every year sorts earliest first and uses stable identities for bilingual unknown dates', () => {
  const inputs = [entry('z', '2025-05-03'), entry('a', '2025-02-04'), entry('later', '2024-12-14'), entry('earlier', '2024-05-04'), entry('unknown-z', '2025'), entry('unknown-a', '2025')];
  const english = groupExperience(inputs);
  const chinese = groupExperience(inputs.map(e => ({ data: { ...e.data, title: e.data.slug === 'unknown-a' ? '最後' : '最先', language: 'zh-TW' } })));
  assert.deepEqual(english.map(g => g.entries.map(e => e.data.slug)), [['a', 'z', 'unknown-a', 'unknown-z'], ['earlier', 'later']]);
  assert.deepEqual(chinese.map(g => g.entries.map(e => e.data.slug)), english.map(g => g.entries.map(e => e.data.slug)));
});
