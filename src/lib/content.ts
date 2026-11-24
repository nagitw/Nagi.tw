import { getCollection, type CollectionEntry } from 'astro:content';
import { selectPublished } from './content-schema';
import { localizePath, type Locale } from './i18n';

export const collectionNames = ['projects', 'research', 'journal', 'photography', 'experience'] as const;
export type ContentCollection = typeof collectionNames[number];
export type PublicEntry = CollectionEntry<ContentCollection>;
export type DetailCollection = Exclude<ContentCollection, 'experience'>;
export const detailCollections = ['projects', 'research', 'journal', 'photography'] as const;

export async function getPublished<C extends ContentCollection>(collection: C) {
  return selectPublished(await getCollection(collection));
}

export function preferLocale<T extends PublicEntry>(entries: T[], locale: Locale) {
  const localized = new Set(entries.filter(entry => entry.data.language === locale)
    .map(entry => `${entry.collection}/${entry.data.slug}`));
  return entries.filter(entry => entry.data.language === locale
    || !localized.has(`${entry.collection}/${entry.data.slug}`));
}

export function contentHref(entry: PublicEntry) {
  return entry.collection === 'experience'
    ? `${localizePath('/experience/', entry.data.language)}#${entry.data.slug}`
    : localizePath(`/${entry.collection}/${entry.data.slug}/`, entry.data.language);
}

export async function getFeatured() {
  const groups = await Promise.all(collectionNames.map(name => getPublished(name)));
  return groups.flat().filter(entry => entry.data.featured)
    .sort((a, b) => b.data.publishedAt.localeCompare(a.data.publishedAt)
      || a.collection.localeCompare(b.collection) || a.data.slug.localeCompare(b.data.slug));
}
