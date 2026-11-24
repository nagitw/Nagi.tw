import policy from './editorial-policy.json' with { type: 'json' };

export function editorialVisible(collection, slug) {
  return !(policy.hidden[collection] ?? []).includes(slug);
}

/** @template {{slug:string,language?:string,publishedAt?:string,description:string,role?:string,tags?:string[]}} T
 * @param {string} collection @param {T} data @returns {T} */
export function editorialData(collection, data) {
  const result = { ...data };
  const correction = policy.dateCorrections[`${collection}/${data.slug}`];
  if (correction) result.publishedAt = correction.publishedAt;
  if (collection === 'experience' && data.tags?.includes('competitions') && !policy.competitionResultsConfirmed) {
    // Preserve the source result in Markdown, but do not present it as confirmed.
    result.description = data.language === 'zh-TW' ? '參賽紀錄；成果待確認。' : 'Competition participation; result awaiting confirmation.';
    result.role = data.language === 'zh-TW' ? '參賽者' : 'Competitor';
  }
  return result;
}

export function showEditorialCover(image) {
  return policy.conferenceImageRightsConfirmed && !!image?.src && /cybersec-2026/.test(image.src);
}
