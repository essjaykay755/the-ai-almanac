import { test, expect, type Page } from '@playwright/test';

async function expectTutorialCardClearOf(page: Page, targetSelector: string) {
  const card = page.locator('.tutorial-card');
  const target = page.locator(targetSelector);

  await expect(card).toBeVisible();
  await expect(target).toBeVisible();

  await expect.poll(async () => {
    return page.evaluate(({ targetSelector }) => {
      const cardElement = document.querySelector<HTMLElement>('.tutorial-card');
      const targetElement = document.querySelector<HTMLElement>(targetSelector);
      if (!cardElement || !targetElement) return null;

      const cardRect = cardElement.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();
      const overlapWidth = Math.max(
        0,
        Math.min(cardRect.right, targetRect.right) - Math.max(cardRect.left, targetRect.left)
      );
      const overlapHeight = Math.max(
        0,
        Math.min(cardRect.bottom, targetRect.bottom) - Math.max(cardRect.top, targetRect.top)
      );

      return overlapWidth * overlapHeight;
    }, { targetSelector });
  }).toBe(0);
}

test.describe('mobile tutorial', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('keeps tutorial copy off highlighted controls and includes Language', async ({ page }) => {
    await page.goto('/');

    await page.locator('#mobileMenu').click();
    const mobileSidebar = page.locator('#mobileSidebar');
    await expect(mobileSidebar).toBeVisible();
    await mobileSidebar.locator('#navTutorial').click();

    const tutorial = page.getByRole('dialog');
    await expect(tutorial).toBeVisible();
    await expect(tutorial.getByRole('heading', { name: 'A guide you can replay' })).toBeVisible();

    const next = tutorial.getByRole('button', { name: /Next/ });
    await next.click();

    await expect(tutorial.getByRole('heading', { name: 'Choose your language' })).toBeVisible();
    const languageControl = '#mobileSidebar .site-language-switcher summary';
    await expect(page.locator(languageControl)).toContainText('Language');
    await expectTutorialCardClearOf(page, languageControl);

    const cardMaxHeight = await page.locator('.tutorial-card').evaluate((element) =>
      parseFloat(getComputedStyle(element).maxHeight)
    );
    expect(cardMaxHeight).toBeLessThanOrEqual(300);

    await next.click();
    await expect(tutorial.getByRole('heading', { name: 'Your navigation shelf' })).toBeVisible();
    await expectTutorialCardClearOf(page, '#mobileSidebar #navIndex');

    await next.click();
    await expect(tutorial.getByRole('heading', { name: 'Ask or search' })).toBeVisible();
    await expectTutorialCardClearOf(page, '#mobileSearch');
  });
});
