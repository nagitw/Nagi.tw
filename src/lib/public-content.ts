import { sortExperienceBody } from './experience.ts';
/** Build-only projection. Original drafts/sections stay in migrated.json, never client payloads. */
export function publicBody(record: { body: string; kind: string; locale: string }): string {
  let body = record.body;
  const privateHeadings = /^(?:Next Step|Next, I Want to Build My Own Malware Lab|接下來想建立自己的 Malware Lab|18\. How This Affected My Future Direction|十八、對我未來方向的影響)$/;
  const lines = body.split(/\r?\n/);
  let hiddenDepth = 0;
  body = lines.filter(line => {
    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      if (hiddenDepth && heading[1]!.length <= hiddenDepth) hiddenDepth = 0;
      if (privateHeadings.test(heading[2]!)) hiddenDepth = heading[1]!.length;
    }
    // Explicit personal-plan sentences outside their dedicated sections.
    // General industry outlook and historical reflections are not future plans.
    const personalPlan = /^(?:If I work on a medical cybersecurity project in the future|This also reminded me that when I (?:deploy websites|build websites, backends, AI APIs, or cloud deployments) in the future|If I have the chance to continue working on Medical Cybersecurity research in the future|如果未來我還有機會繼續做醫療資安相關研究|In the future, I hope|I hope my future projects|未來如果我要做醫療資安專題|未來我希望自己)/;
    return !hiddenDepth && !personalPlan.test(line);
  }).join('\n');
  return record.kind === 'experience' ? sortExperienceBody(body, record.locale) : body;
}
