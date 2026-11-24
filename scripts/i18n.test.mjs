import assert from 'node:assert/strict';
import { localeFromPath, localizePath, sourcePath, languageSwitchPath, translate } from '../src/lib/i18n.ts';
assert.equal(localeFromPath('/zh/projects/'), 'zh-TW');
assert.equal(localeFromPath('/zhang/'), 'en');
assert.equal(localizePath('/projects/', 'zh-TW'), '/zh/projects/');
assert.equal(localizePath('/zh/projects/', 'en'), '/projects/');
assert.equal(localizePath('/', 'zh-TW'), '/zh/');
assert.equal(sourcePath('/zh/journal/example/'), '/journal/example/');
assert.equal(languageSwitchPath('/journal/example/', 'zh-TW', true), '/zh/journal/');
assert.equal(languageSwitchPath('/zh/journal/example/', 'en', true), '/journal/');
assert.equal(languageSwitchPath('/journal/example/', 'en', true), '/journal/example/');
assert.equal(languageSwitchPath('/zh/research/', 'en'), '/research/');
assert.equal(languageSwitchPath('/404', 'zh-TW', false, true), '/zh/');
assert.equal(translate('en', 'Home', '首頁'), 'Home');
assert.equal(translate('zh-TW', 'Home', '首頁'), '首頁');
for (const section of ['', 'projects', 'research', 'journal', 'photography', 'experience', 'about']) {
  const en = `/${section ? section + '/' : ''}`;
  const zh = `/zh/${section ? section + '/' : ''}`;
  assert.equal(languageSwitchPath(en, 'zh-TW'), zh);
  assert.equal(languageSwitchPath(zh, 'en'), en);
}
console.log('PASS: language detection and equivalent route mapping');
