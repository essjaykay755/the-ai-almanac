import { test, expect } from '@playwright/test';

test.describe('mobile top spacing', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('keeps the term visually close to the fixed masthead', async ({ page }) => {
    await page.goto('/');

    const gap = await page.evaluate(() => {
      const bar = document.querySelector<HTMLElement>('.mobile-bar');
      const word = document.querySelector<HTMLElement>('.headword-line');
      if (!bar || !word) return null;
      return word.getBoundingClientRect().top - bar.getBoundingClientRect().bottom;
    });

    expect(gap).not.toBeNull();
    expect(gap!).toBeGreaterThanOrEqual(16);
    expect(gap!).toBeLessThanOrEqual(72);
  });

  test('keeps the expanded search close to the masthead without overlap', async ({ page }) => {
    await page.goto('/');
    await page.locator('#mobileSearch').click();

    const search = page.locator('#search');
    await expect(search).toBeVisible();

    const geometry = await page.evaluate(() => {
      const bar = document.querySelector<HTMLElement>('.mobile-bar');
      const input = document.querySelector<HTMLElement>('#search');
      const word = document.querySelector<HTMLElement>('.headword-line');
      if (!bar || !input || !word) return null;

      const barRect = bar.getBoundingClientRect();
      const inputRect = input.getBoundingClientRect();
      const wordRect = word.getBoundingClientRect();
      return {
        searchGap: inputRect.top - barRect.bottom,
        termGapAfterSearch: wordRect.top - inputRect.bottom
      };
    });

    expect(geometry).not.toBeNull();
    expect(geometry!.searchGap).toBeGreaterThanOrEqual(8);
    expect(geometry!.searchGap).toBeLessThanOrEqual(40);
    expect(geometry!.termGapAfterSearch).toBeGreaterThanOrEqual(6);
    expect(geometry!.termGapAfterSearch).toBeLessThanOrEqual(32);
  });
});
