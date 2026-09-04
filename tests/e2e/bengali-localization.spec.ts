import { test, expect, type Locator } from '@playwright/test';

const expectBengaliText = async (locator: Locator) => {
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

test('Activation Patching has complete Bengali content', async ({ page }) => {
  await page.goto('/bn/term/activation-patching/');

  await expect(page.locator('.word')).toHaveText('Activation Patching');
  await expectBengaliText(page.locator('.definition'));
  await expectBengaliText(page.locator('.example'));
  await expectBengaliText(page.locator('.lower-grid p').nth(0));
  await expectBengaliText(page.locator('.lower-grid p').nth(1));
  await expect(page.locator('.definition')).not.toContainText('Replacing internal activations');
  await expect(page.locator('.example')).not.toContainText('The team used activation patching');
  await expect(page.locator('.margin-section').filter({ hasText: 'শ্রেণি' })).toContainText('ইন্টারপ্রিটেবিলিটি');
  await expect(page.getByText('activation steering', { exact: true })).toHaveCount(0);

  for (const mode of ['plain', 'technical', 'vibe'] as const) {
    await page.locator(`#mode-tab-${mode}`).click();
    await expectBengaliText(page.locator('.definition'));
  }
});

test('Bengali edition exposes only entries that are actually translated', async ({ page }) => {
  await page.goto('/bn/term/artificial-intelligence/');

  await expect(page.locator('#termCount')).toHaveText('11');
  await expect(page.locator('.edition')).toContainText('11');
  await expect(page.locator('.tab[data-letter="B"]')).toBeDisabled();

  await page.locator('#navIndex').click();
  await expect(page.locator('#indexOverlay')).toBeVisible();
  await expect(page.locator('#indexOverlay')).toContainText('Activation Patching');
  await expect(page.locator('#indexOverlay')).not.toContainText('gated recurrent unit');
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
