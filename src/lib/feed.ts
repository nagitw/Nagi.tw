import { getPublished, contentHref } from './content';
import { localizePath, type Locale } from './i18n';
const escape = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
export async function journalFeed(site: URL, locale: Locale) {
  const entries = (await getPublished('journal')).filter(
    (entry) => entry.data.language === locale,
  );
  const items = entries.map((entry) => {
    const link = new URL(contentHref(entry), site).href;
    return `<item><title>${escape(entry.data.title)}</title><link>${escape(link)}</link><guid isPermaLink="true">${escape(link)}</guid><description>${escape(entry.data.description)}</description>${entry.data.publishedAt ? `<pubDate>${new Date(entry.data.publishedAt).toUTCString()}</pubDate>` : ''}${entry.data.tags.map((tag) => `<category>${escape(tag)}</category>`).join('')}</item>`;
  });
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Nagi.tw — ${locale === 'en' ? 'Journal' : '札記'}</title><link>${new URL(localizePath('/journal/', locale), site).href}</link><description>${locale === 'en' ? 'Research, engineering and observations.' : '研究、工程與觀察。'}</description><language>${locale}</language>${items.join('')}</channel></rss>`,
    { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } },
  );
}
