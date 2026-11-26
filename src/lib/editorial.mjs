import policy from './editorial-policy.json' with { type: 'json' };

export function editorialVisible(collection, slug) {
  return !(policy.hidden[collection] ?? []).includes(slug);
}

/** @template {{slug:string,language?:string,publishedAt?:string,startedAt?:string,endedAt?:string,description:string,role?:string,tags?:string[]}} T
 * @param {string} collection @param {T} data @returns {T} */
export function editorialData(collection, data) {
  const result = { ...data };
  const correction = policy.dateCorrections[`${collection}/${data.slug}`];
  if (correction) result.publishedAt = correction.publishedAt;
  if (collection === 'experience' && policy.eventDates?.[data.slug]) {
    result.startedAt = policy.eventDates[data.slug].value;
    result.endedAt =
      policy.eventDates[data.slug].end ?? policy.eventDates[data.slug].value;
  }
  if (
    collection === 'experience' &&
    data.tags?.includes('competitions') &&
    !policy.competitionResultsConfirmed &&
    !policy.preserveHistoricalCompetitionResults
  ) {
    // Preserve the source result in Markdown, but do not present it as confirmed.
    result.description = '';
    result.role = data.language === 'zh-TW' ? '參賽者' : 'Competitor';
  }
  if (collection === 'experience' && policy.eventResults?.[data.slug]) {
    result.description =
      policy.eventResults[data.slug][
        data.language === 'zh-TW' ? 'zh-TW' : 'en'
      ];
  }
  return result;
}

export function showEditorialCover(image) {
  return (
    policy.conferenceImageRightsConfirmed &&
    !!image?.src &&
    /cybersec-2026/.test(image.src)
  );
}
