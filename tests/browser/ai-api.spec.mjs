import {test, expect} from '@playwright/test';

const prefix = (process.env.SITE_BASE || '/').replace(/\/$/, '');

// Explicit transport fixture only. Production artifacts are built offline, never mock.
test('API mode bilingual response, retry and unavailable UI', async ({page}) => {
  await page.route(`http://127.0.0.1:4399${prefix}/zh/`, async route => {
    const response=await route.fetch();
    const body=(await response.text()).replace('data-mode="offline"','data-mode="api"').replace(/data-endpoint(?:="")?(?=\s|>)/,'data-endpoint="https://api.nagi.tw/chat"');
    await route.fulfill({response,body});
  });
  let calls=0;
  await page.route('https://api.nagi.tw/chat',async route=>{
    const body=route.request().postDataJSON();
    expect(body.locale).toBe('zh');
    calls++;
    if(calls===1) return route.fulfill({status:503,body:'unavailable',headers:{'access-control-allow-origin':'*'}});
    return route.fulfill({contentType:'application/x-ndjson',body:'{"type":"delta","text":"公開回答"}\n{"type":"done"}\n',headers:{'access-control-allow-origin':'*'}});
  });
  await page.goto(`${prefix}/zh/`);
  await page.locator('.chat-launcher').click();
  await page.locator('[data-question]').first().click();
  await expect(page.locator('.chat-status')).toContainText('回答完成');
  expect(calls).toBe(2);
  await expect(page.locator('.chat-message:not(.chat-message--user)')).toHaveText('公開回答');
  await page.unroute('https://api.nagi.tw/chat');
  await page.route('https://api.nagi.tw/chat',route=>route.abort('failed'));
  await page.locator('#chat-question').fill('retry me');
  await page.locator('.chat-form').evaluate(form=>form.requestSubmit());
  await expect(page.locator('.chat-status')).toContainText('無法連線');
  await expect(page.locator('#chat-question')).toHaveValue('retry me');
});
