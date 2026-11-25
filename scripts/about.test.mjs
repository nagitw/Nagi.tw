import test from 'node:test';
import assert from 'node:assert/strict';

const localized = { en: 'Synthetic test record', 'zh-TW': '測試資料' };
const evidence = [{ label: 'Test reference', url: 'https://example.org/reference' }];

test('optional profile sections reject unsupported links and expose only explicitly approved records', async () => {
  const { profileSchema } = await import('../src/lib/content-schema.ts');
  const { prepareAboutProfile } = await import('../src/lib/about.ts');
  const honor = { competition: localized, year: 2026, team: localized, ranking: localized, evidence, approval: 'pending' };
  const talk = { event: localized, title: localized, date: '2026-01-01', role: localized, evidence, approval: 'pending' };
  const education = { organization: localized, qualification: localized, dateRange: localized, evidence, approval: 'pending' };
  const input = { honors: [honor, { ...honor, approval: 'approved' }], talks: [talk], education: [education] };
  const data = profileSchema.parse(input);
  assert.equal(data.honors.length, 2, 'Contract must retain review state');
  const view = prepareAboutProfile(input);
  assert.equal(view.honors.length, 1);
  assert.equal(view.honors[0].approval, 'approved');
  assert.deepEqual(view.talks, []);
  assert.deepEqual(view.education, []);
  const approved = prepareAboutProfile({ talks: [{ ...talk, approval: 'approved' }], education: [{ ...education, approval: 'approved' }] });
  assert.equal(approved.talks.length, 1);
  assert.equal(approved.education.length, 1);
  for (const bad of [{ ...honor, approval: undefined }, { ...honor, evidence: [] }, { ...honor, evidence: [{ label: 'Unsafe', url: 'javascript:alert(1)' }] }, { ...honor, year: 2026.5 }]) {
    assert.equal(profileSchema.safeParse({ honors: [bad] }).success, false);
  }
  assert.deepEqual(prepareAboutProfile({}).honors, []);
  assert.equal(profileSchema.safeParse({ skillGroups: [{ category: 'operating-systems', items: ['Unverified'], evidence: [] }] }).success, false);
});

test('About timeline excludes draft, archived and unsupported experience even if featured', async () => {
  const { selectAboutExperience } = await import('../src/lib/about.ts');
  const entry = (slug, status, proof) => ({ data: { slug, status, language: 'en', publishedAt: '2026-01-01', featured: true, evidence: proof } });
  const inputs = [entry('draft-record', 'draft', evidence), entry('archived-record', 'archived', evidence), entry('unsupported-record', 'published'), entry('supported-record', 'published', evidence)];
  assert.deepEqual(selectAboutExperience(inputs).map(entry => entry.data.slug), ['supported-record']);
  const contributions = { data: { slug: 'contribution-only', status: 'published', language: 'zh-TW', publishedAt: '2026-01-01', verifiedContributions: [{ evidence }] } };
  assert.deepEqual(selectAboutExperience([entry('contribution-only', 'published'), contributions]).map(entry => entry.data.language), ['zh-TW']);
});

test('localized public evidence links preserve query and fragment without rewriting external URLs', async () => {
  const { localizeProfileLink } = await import('../src/lib/about.ts');
  assert.ok(localizeProfileLink, 'About evidence-link localizer must exist');
  assert.equal(localizeProfileLink('https://nagi.tw/projects/example/?view=proof#evidence', 'zh-TW'), '/zh/projects/example/?view=proof#evidence');
  assert.equal(localizeProfileLink('https://example.org/reference?view=proof#evidence', 'zh-TW'), 'https://example.org/reference?view=proof#evidence');
});

test('current Profile remains concise without removed interest or tool categories', async () => {
  const { publicProfile } = await import('../src/lib/sections.ts');
  const { prepareAboutProfile } = await import('../src/lib/about.ts');
  const profile = prepareAboutProfile(publicProfile);
  assert.equal(profile.publicName, 'Nagi');
  assert.equal(publicProfile.technicalInterests, undefined);
  assert.equal(publicProfile.skillGroups, undefined);
  assert.deepEqual(profile.technicalInterests, []);
  assert.ok(profile.biography.en && profile.biography['zh-TW']);
  assert.deepEqual(profile.skillGroups, []);
  assert.deepEqual(profile.honors, []);
  assert.deepEqual(profile.talks, []);
  assert.deepEqual(profile.education, []);
  assert.equal(profile.links, undefined);
});
