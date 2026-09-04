import { test, expect } from '@playwright/test';

const expectBengaliText = async (locator: ReturnType<Parameters<typeof test>[0]> extends never ? never : any) => {
  const text = (await locator.textContent()) || '';
  expect(text).toMatch(/[\u0980-\u09FF]/);
};

test('Bengali entry stays Bengali across every explanation mode', async ({ page }) => {
  await page.goto('/bn/term/artificial-intelligence/');

  await expect(page.locator('.word')).toHaveText('Artificial Intelligence');
  await expect(page.locator('#mode-tab-dictionary')).toHaveText('অভিধান');
  await expect(page.locator('#mode-tab-plain')).toHaveText('সহজ ভাষা');
  await expect(page.locator('#mode-tab-technical')).toHaveText('প্রযুক্তিগত');
  await expect(page.locator('#mode-tab-vibe')).toHaveText('ভাইব কোডার');

  await expectBengaliText(page.locator('.definition'));
  await expectBengaliText(page.locator('.example'));
  await expectBengaliText(page.locator('.lower-grid p').nth(0));
  await expectBengaliText(page.locator('.lower-grid p').nth(1));

  await page.locator('#mode-tab-plain').click();
  await expect(page.locator('.definition-mode')).toHaveText('সহজ ভাষা');
  await expectBengaliText(page.locator('.definition'));
  await expect(page.locator('.definition')).not.toContainText('Simply put');

  await page.locator('#mode-tab-technical').click();
  await expect(page.locator('.definition-mode')).toHaveText('প্রযুক্তিগত');
  await expectBengaliText(page.locator('.definition'));
  await expect(page.locator('.definition')).not.toContainText('Technical lens');

  await page.locator('#mode-tab-vibe').click();
  await expect(page.locator('.definition-mode')).toHaveText('ভাইব কোডার');
  await expectBengaliText(page.locator('.definition'));
});

test('Bengali interface localizes visible navigation microcopy', async ({ page }) => {
  await page.goto('/bn/term/artificial-intelligence/');

  await expect(page.locator('#navSearch span')).toHaveText('জিজ্ঞেস করুন / খুঁজুন');
  await expect(page.locator('#navTutorial span')).toHaveText('টিউটোরিয়াল দেখুন');
  await expect(page.locator('#navTutorial small')).toHaveText('গাইড');
  await expect(page.locator('#navTimeline small')).toHaveText('দেখুন');
  await expect(page.locator('#navSurprise small')).toHaveText('এলোমেলো');
  await expect(page.locator('#navClip small')).toHaveText('শেয়ার');
  await expect(page.locator('#navAbout small')).toHaveText('পরিচিতি');
});
