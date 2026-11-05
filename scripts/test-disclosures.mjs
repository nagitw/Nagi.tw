import assert from 'node:assert/strict';
import { getPublicDisclosures } from '../src/lib/disclosures.ts';

// Synthetic records exist only in this test; they are not publication examples.
const record = {
  id: 'ZD-2026-99999', year: '2026', category: 'Web', severity: 'Low',
  workflow: 'Published', status: 'Public Disclosure', verified: true, publicAuthorization: true,
  publishedAt: '2026-01-01', title: { en: 'Test', zh: '測試' },
  summary: { en: 'Test summary', zh: '測試摘要' }, details: { en: ['Test detail'], zh: ['測試內容'] },
  references: [{ kind: 'PR', url: 'https://github.com/test-only/fixture/pull/1' }],
};
assert.deepEqual(getPublicDisclosures([record]), [record]);
for (const change of [
  { workflow: 'Draft' }, { workflow: 'Merged' }, { verified: false }, { publicAuthorization: false },
  { publicAuthorization: undefined }, { status: 'Invalid' },
  { id: 'ZD-2026-1' }, { year: '2025' }, { category: 'Other' }, { severity: 'Critical' },
  { publishedAt: '2026-02-30' }, { references: [] },
  { references: [{ kind: 'PR', url: 'https://github.com.evil.test/a/b/pull/1' }] },
  { references: [{ kind: 'PR', url: 'javascript:alert(1)' }] },
  { references: [{ kind: 'PR', url: 'https://github.com/a/b/issues/1' }] },
  { references: [{ kind: 'Commit', url: 'https://github.com/a/b/commit/not-a-hash' }] },
]) assert.deepEqual(getPublicDisclosures([{ ...record, ...change }]), [], JSON.stringify(change));
const commit = { ...record, references: [{ kind: 'Commit', url: 'https://github.com/test-only/fixture/commit/abcdef1234567' }] };
assert.deepEqual(getPublicDisclosures([commit]), [commit]);
assert.deepEqual(getPublicDisclosures([null, {}, record]), [record]);
console.log('Disclosure publication gates: PASS');

for (const status of ['Verified', 'Remediated']) assert.equal(getPublicDisclosures([{ ...record, status }]).length, 1);
