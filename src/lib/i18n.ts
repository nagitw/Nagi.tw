export type Locale = 'en' | 'zh-TW';
const base = (import.meta.env?.BASE_URL ?? '/').replace(/\/$/, '');
export function withoutBase(path: string) {
  return base && (path === base || path.startsWith(base + '/')) ? path.slice(base.length) || '/' : path;
}
export function withBase(path: string) {
  return base + withoutBase(path);
}
export function localeFromPath(path: string): Locale {
  return /^\/zh(?:\/|$)/.test(withoutBase(path)) ? 'zh-TW' : 'en';
}
export function sourcePath(path: string) {
  const result = withoutBase(path).replace(/^\/zh(?=\/|$)/, '') || '/';
  return result.endsWith('/') ? result : `${result}/`;
}
export function localizePath(path: string, locale: Locale) {
  return withBase(`${locale === 'zh-TW' ? '/zh' : ''}${sourcePath(path)}`);
}
export function translate(locale: Locale, en: string, zh: string) {
  return locale === 'zh-TW' ? zh : en;
}
// Only published source-language articles have detail routes. An unavailable
// translation returns to the target collection rather than creating a duplicate.
export function languageSwitchPath(path: string, target: Locale, article = false, notFound = false) {
  if (notFound) return localizePath('/', target);
  const fallback = article && target !== localeFromPath(path)
    ? sourcePath(path).replace(/\/[^/]+\/$/, '/') : path;
  return localizePath(fallback, target);
}
