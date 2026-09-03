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

async function getRect(page: Page, selector: string) {
  return page.locator(selector).evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return { top: rect.top, left: rect.left, right: rect.right, bottom: rect.bottom };
  });
}

test.describe('mobile tutorial', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('keeps sidebar navigation uncovered, includes Language, and stabilizes page navigation', async ({ page }) => {
    await page.goto('/');

    await page.locator('#mobileMenu').click();
    const mobileSidebar = page.locator('#mobileSidebar');
    await expect(mobileSidebar).toBeVisible();
    await mobileSidebar.locator('#navTutorial').click();

    const tutorial = page.getByRole('dialog');
    await expect(tutorial).toBeVisible();
    await expect(tutorial.getByRole('heading', { name: 'A guide you can replay' })).toBeVisible();
    await expectTutorialCardClearOf(page, '#mobileSidebar #coverNav');

    const next = tutorial.getByRole('button', { name: /Next/ });
    await next.click();

    await expect(tutorial.getByRole('heading', { name: 'Choose your language' })).toBeVisible();
    const languageControl = '#mobileSidebar .site-language-switcher summary';
    await expect(page.locator(languageControl)).toContainText('Language');
    await expectTutorialCardClearOf(page, languageControl);
    await expectTutorialCardClearOf(page, '#mobileSidebar #coverNav');

    const cardMaxHeight = await page.locator('.tutorial-card').evaluate((element) =>
      parseFloat(getComputedStyle(element).maxHeight)
    );
    expect(cardMaxHeight).toBeLessThanOrEqual(300);

    await next.click();
    await expect(tutorial.getByRole('heading', { name: 'Your navigation shelf' })).toBeVisible();
    await expectTutorialCardClearOf(page, '#mobileSidebar #navIndex');
    await expectTutorialCardClearOf(page, '#mobileSidebar #coverNav');

    await next.click();
    await expect(tutorial.getByRole('heading', { name: 'Ask or search' })).toBeVisible();
    await expectTutorialCardClearOf(page, '#mobileSearch');

    const remainingStepTitles = [
      'Read the current entry',
      'Change the explanation mode',
      'Keep useful entries close',
      'Save, collect and share',
      'Follow the references',
      'Pick up your reading trail',
      'Jump by letter',
      'Turn the pages'
    ];

    for (const title of remainingStepTitles) {
      await next.click();
      await expect(tutorial.getByRole('heading', { name: title })).toBeVisible();
    }

    await expectTutorialCardClearOf(page, '#pageNavigation');

    const cardBefore = await getRect(page, '.tutorial-card');
    const navigationBefore = await getRect(page, '#pageNavigation');
    await page.waitForTimeout(420);
    const cardAfter = await getRect(page, '.tutorial-card');
    const navigationAfter = await getRect(page, '#pageNavigation');

    expect(Math.abs(cardAfter.top - cardBefore.top)).toBeLessThan(1);
    expect(Math.abs(cardAfter.left - cardBefore.left)).toBeLessThan(1);
    expect(Math.abs(navigationAfter.top - navigationBefore.top)).toBeLessThan(1);
    expect(Math.abs(navigationAfter.bottom - navigationBefore.bottom)).toBeLessThan(1);
  });
});