import { test, expect } from '@playwright/test';

async function footerGeometry(page: import('@playwright/test').Page) {
  return page.evaluate(() => {
    const inner = document.querySelector<HTMLElement>('.page-inner');
    const footer = document.querySelector<HTMLElement>('#pageNavigation');
    const previous = document.querySelector<HTMLElement>('#prevDefBtn');
    const center = document.querySelector<HTMLElement>('#pageNumber');
    const next = document.querySelector<HTMLElement>('#nextDefBtn');
    if (!inner || !footer || !previous || !center || !next) return null;

    const footerRect = footer.getBoundingClientRect();
    const footerCenter = (footerRect.top + footerRect.bottom) / 2;
    const childCenter = (node: HTMLElement) => {
      const rect = node.getBoundingClientRect();
      return (rect.top + rect.bottom) / 2;
    };
    const style = getComputedStyle(footer);

    return {
      innerPaddingBottom: parseFloat(getComputedStyle(inner).paddingBottom),
      footerHeight: footerRect.height,
      paddingTop: parseFloat(style.paddingTop),
      paddingBottom: parseFloat(style.paddingBottom),
      previousOffset: childCenter(previous) - footerCenter,
      centerOffset: childCenter(center) - footerCenter,
      nextOffset: childCenter(next) - footerCenter
    };
  });
}

test.describe('bottom page navigation vertical alignment', () => {
  test.describe('desktop', () => {
    test.use({ viewport: { width: 1562, height: 900 } });

    test('centers previous, page number, and next in the full visible footer strip', async ({ page }) => {
      await page.goto('/term/context-window/');
      await expect(page.locator('#pageNavigation')).toBeVisible();

      const geometry = await footerGeometry(page);
      expect(geometry).not.toBeNull();
      expect(geometry!.innerPaddingBottom).toBe(0);
      expect(geometry!.paddingTop).toBeGreaterThan(10);
      expect(Math.abs(geometry!.paddingTop - geometry!.paddingBottom)).toBeLessThanOrEqual(0.5);
      expect(geometry!.footerHeight).toBeGreaterThan(35);
      expect(Math.abs(geometry!.previousOffset)).toBeLessThanOrEqual(1.5);
      expect(Math.abs(geometry!.centerOffset)).toBeLessThanOrEqual(1.5);
      expect(Math.abs(geometry!.nextOffset)).toBeLessThanOrEqual(1.5);
    });
  });

  test.describe('mobile', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test('keeps the fixed mobile footer centered', async ({ page }) => {
      await page.goto('/term/context-window/');
      await expect(page.locator('#pageNavigation')).toBeVisible();

      const geometry = await footerGeometry(page);
      expect(geometry).not.toBeNull();
      expect(Math.abs(geometry!.previousOffset)).toBeLessThanOrEqual(1.5);
      expect(Math.abs(geometry!.centerOffset)).toBeLessThanOrEqual(1.5);
      expect(Math.abs(geometry!.nextOffset)).toBeLessThanOrEqual(1.5);
    });
  });
});
