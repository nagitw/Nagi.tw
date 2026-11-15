import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const prefix = (process.env.SITE_BASE || '/').replace(/\/$/, '');

for(const locale of ['en','zh']) {
  for(const route of ['/','/projects/','/research/','/journal/','/experience/','/about/']) {
    test(`${locale} ${route} WCAG automated dark/light`,async ({page})=>{
      await page.goto(`${prefix}${locale==='zh'?'/zh':''}${route}`);
      for(const theme of ['dark','light']) {
        await page.evaluate(theme=>document.documentElement.dataset.theme=theme,theme);
        const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
        expect(result.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)})),`${theme} accessibility`).toEqual([]);
      }
    });
  }
}
