import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { publicRecords, publicationStatus, publicRedirects } from '../src/lib/publication.ts';

const approved = { publicationStatus: 'published', route: '/projects/example/', title: 'Example', locale: 'en' };
assert.equal(publicationStatus({}), 'draft', 'New records default to draft');
assert.deepEqual(publicRecords([
  approved,
  { ...approved, publicationStatus: 'draft', developmentStatus: 'active-development' },
  { ...approved, publicationStatus: 'review', developmentStatus: 'completed' },
  { ...approved, publicationStatus: undefined },
  { ...approved, publicationStatus: 'Published' },
  { ...approved, route: '/research/from-ctf-to-oscp/example/' },
  { ...approved, title: 'OSCP notes' },
  { ...approved, body: 'Private OSCP learning material' },
]), [approved], 'Only explicit approval; neither active development nor completion grants publication');
assert.deepEqual(publicRecords([approved, { ...approved, route: '/zh/projects/example/', locale: 'zh', publicationStatus: 'review' }]), [approved], 'A translation has its own publication decision');
const leads = JSON.parse(readFileSync('src/data/project-leads.json', 'utf8'));
assert.equal(leads.find(p => p.slug === 'nagi-cli').developmentStatus, 'active-development');
assert.equal(leads.find(p => p.slug === 'bugtraceai').developmentStatus, 'maintained');
assert.equal(publicRecords(leads).length, 0, 'Draft leads never become public cards or routes');
assert.deepEqual(publicRedirects([
  { ...approved, aliases: ['/old-example/', '/private/'] },
  { ...approved, route: '/private/', publicationStatus: 'draft', aliases: ['/old-private/'] },
]), { '/old-example/': '/projects/example/' }, 'Draft routes and withdrawn paths cannot be recreated as aliases');
assert.deepEqual(publicRedirects([{ ...approved, aliases: ['/research/from-ctf-to-oscp/'] }]), {}, 'Withdrawn aliases cannot resurrect private routes');
console.log('Fail-closed publication, independent editions and draft CLI projects: PASS');
