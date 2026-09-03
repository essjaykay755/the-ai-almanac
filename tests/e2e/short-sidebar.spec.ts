import { test, expect } from '@playwright/test';

async function readSidebarGeometry(page: import('@playwright/test').Page, selector: string) {
  return page.evaluate((coverSelector) => {
    const cover = document.querySelector<HTMLElement>(coverSelector);
    const nav = cover?.querySelector<HTMLElement>('#coverNav');
    const sound = cover?.querySelector<HTMLElement>('.cover-sound-panel');
    if (!cover || !nav || !sound) return null;

    const coverRect = cover.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    const soundRect = sound.getBoundingClientRect();

    return {
      coverOverflowY: getComputedStyle(cover).overflowY,
      navOverflowY: getComputedStyle(nav).overflowY,
      navScrollHeight: nav.scrollHeight,
      navClientHeight: nav.clientHeight,
      navScrollTop: nav.scrollTop,
      navBottom: navRect.bottom,
      soundTop: soundRect.top,
      soundBottom: soundRect.bottom,
      coverBottom: coverRect.bottom
    };
  }, selector);
}

test.describe('mobile cover and search regression', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('keeps the in-book desktop cover hidden when search opens', async ({ page }) => {
    await page.goto('/');

    const regularCover = page.locator('.book > .cover:not(.mobile-sidebar)').first();
    const mobileBar = page.locator('.mobile-bar');
    const search = page.locator('#search');

    await expect(mobileBar).toBeVisible();
    await expect(regularCover).toBeHidden();

    await page.locator('#mobileSearch').click();

    await expect(search).toBeVisible();
    await expect(search).toBeFocused();
    await expect(regularCover).toBeHidden();
    await expect(page.locator('#mobileSidebar')).toHaveCount(0);
  });

  test('hides the persistent mobile bar while the drawer is mounted', async ({ page }) => {
    await page.goto('/');
    await page.locator('#mobileMenu').click();

    const sidebar = page.locator('#mobileSidebar');
    const mobileBar = page.locator('.mobile-bar');
    const close = sidebar.locator('.mobile-sidebar-close');

    await expect(sidebar).toBeVisible();
    await expect(close).toBeVisible();
    await expect(mobileBar).toBeHidden();

    await close.click();
    await expect(sidebar).toHaveCount(0);
    await expect(mobileBar).toBeVisible();
  });
});

test.describe('short sidebar guard rails', () => {
  test.describe('mobile drawer', () => {
    test.use({ viewport: { width: 562, height: 482 } });

    test('keeps sound controls fixed while the navigation list scrolls', async ({ page }) => {
      await page.goto('/');
      await page.locator('#mobileMenu').click();

      const sidebar = page.locator('#mobileSidebar');
      const nav = sidebar.locator('#coverNav');
      const soundPanel = sidebar.locator('.cover-sound-panel');

      await expect(sidebar).toBeVisible();
      await expect(soundPanel).toBeVisible();

      const before = await readSidebarGeometry(page, '#mobileSidebar');
      expect(before).not.toBeNull();
      expect(before!.coverOverflowY).toBe('hidden');
      expect(before!.navOverflowY).toBe('auto');
      expect(before!.navScrollHeight).toBeGreaterThan(before!.navClientHeight);
      expect(before!.soundTop).toBeGreaterThanOrEqual(before!.navBottom - 1);
      expect(before!.soundBottom).toBeLessThanOrEqual(before!.coverBottom + 1);

      const soundTopBeforeScroll = before!.soundTop;
      await nav.evaluate((node) => {
        (node as HTMLElement).scrollTop = (node as HTMLElement).scrollHeight;
      });

      await expect(sidebar.locator('#navAbout')).toBeVisible();

      const after = await readSidebarGeometry(page, '#mobileSidebar');
      expect(after).not.toBeNull();
      expect(after!.navScrollTop).toBeGreaterThan(0);
      expect(Math.abs(after!.soundTop - soundTopBeforeScroll)).toBeLessThanOrEqual(1);
      expect(after!.soundBottom).toBeLessThanOrEqual(after!.coverBottom + 1);

      await sidebar.locator('.site-language-switcher summary').click();
      await expect.poll(async () => (await readSidebarGeometry(page, '#mobileSidebar'))?.navOverflowY).toBe('auto');
    });
  });

  test.describe('very short mobile drawer', () => {
    test.use({ viewport: { width: 390, height: 340 } });

    test('covers persistent chrome and keeps the close button as the topmost hit target', async ({ page }) => {
      await page.goto('/');
      await page.locator('#mobileMenu').click();

      const sidebar = page.locator('#mobileSidebar');
      const close = sidebar.locator('.mobile-sidebar-close');
      await expect(sidebar).toBeVisible();
      await expect(close).toBeVisible();

      const stacking = await page.evaluate(() => {
        const sidebarEl = document.querySelector<HTMLElement>('#mobileSidebar');
        const closeEl = sidebarEl?.querySelector<HTMLElement>('.mobile-sidebar-close');
        const mobileBar = document.querySelector<HTMLElement>('.mobile-bar');
        const pageFooter = document.querySelector<HTMLElement>('.page-footer');
        if (!sidebarEl || !closeEl || !mobileBar || !pageFooter) return null;

        const sidebarRect = sidebarEl.getBoundingClientRect();
        const closeRect = closeEl.getBoundingClientRect();
        const hit = document.elementFromPoint(
          closeRect.left + closeRect.width / 2,
          closeRect.top + closeRect.height / 2
        );

        return {
          sidebarTop: sidebarRect.top,
          mobileBarVisibility: getComputedStyle(mobileBar).visibility,
          hitIsClose: hit === closeEl || Boolean(hit && closeEl.contains(hit))
        };
      });

      expect(stacking).not.toBeNull();
      expect(Math.abs(stacking!.sidebarTop)).toBeLessThanOrEqual(1);
      expect(stacking!.mobileBarVisibility).toBe('hidden');
      expect(stacking!.hitIsClose).toBe(true);

      await close.click();
      await expect(sidebar).toHaveCount(0);
    });
  });

  test.describe('short desktop cover', () => {
    test.use({ viewport: { width: 900, height: 482 } });

    test('keeps navigation physically above the sound footer', async ({ page }) => {
      await page.goto('/');

      const cover = page.locator('.cover:not(.mobile-sidebar)').first();
      const nav = cover.locator('#coverNav');
      const soundPanel = cover.locator('.cover-sound-panel');

      await expect(cover).toBeVisible();
      await expect(soundPanel).toBeVisible();

      const before = await readSidebarGeometry(page, '.cover:not(.mobile-sidebar)');
      expect(before).not.toBeNull();
      expect(before!.coverOverflowY).toBe('hidden');
      expect(before!.navOverflowY).toBe('auto');
      expect(before!.navScrollHeight).toBeGreaterThan(before!.navClientHeight);
      expect(before!.soundTop).toBeGreaterThanOrEqual(before!.navBottom - 1);
      expect(before!.soundBottom).toBeLessThanOrEqual(before!.coverBottom + 1);

      const soundTopBeforeScroll = before!.soundTop;
      await nav.evaluate((node) => {
        (node as HTMLElement).scrollTop = (node as HTMLElement).scrollHeight;
      });

      await expect(cover.locator('#navAbout')).toBeVisible();

      const after = await readSidebarGeometry(page, '.cover:not(.mobile-sidebar)');
      expect(after).not.toBeNull();
      expect(after!.navScrollTop).toBeGreaterThan(0);
      expect(Math.abs(after!.soundTop - soundTopBeforeScroll)).toBeLessThanOrEqual(1);
      expect(after!.soundBottom).toBeLessThanOrEqual(after!.coverBottom + 1);

      await cover.locator('.site-language-switcher summary').click();
      await expect.poll(async () => (await readSidebarGeometry(page, '.cover:not(.mobile-sidebar)'))?.navOverflowY).toBe('auto');
    });
  });
});
