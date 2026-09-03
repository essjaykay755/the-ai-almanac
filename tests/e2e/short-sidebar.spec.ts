import { test, expect } from '@playwright/test';

test.describe('short sidebar guard rails', () => {
  test.use({ viewport: { width: 562, height: 482 } });

  test('keeps sound controls fixed while the navigation list scrolls', async ({ page }) => {
    await page.goto('/');
    await page.locator('#mobileMenu').click();

    const sidebar = page.locator('#mobileSidebar');
    const nav = sidebar.locator('#coverNav');
    const soundPanel = sidebar.locator('.cover-sound-panel');

    await expect(sidebar).toBeVisible();
    await expect(soundPanel).toBeVisible();

    const before = await page.evaluate(() => {
      const sidebarEl = document.querySelector<HTMLElement>('#mobileSidebar');
      const navEl = sidebarEl?.querySelector<HTMLElement>('#coverNav');
      const soundEl = sidebarEl?.querySelector<HTMLElement>('.cover-sound-panel');
      if (!sidebarEl || !navEl || !soundEl) return null;

      const sidebarRect = sidebarEl.getBoundingClientRect();
      const navRect = navEl.getBoundingClientRect();
      const soundRect = soundEl.getBoundingClientRect();

      return {
        sidebarOverflowY: getComputedStyle(sidebarEl).overflowY,
        navOverflowY: getComputedStyle(navEl).overflowY,
        navScrollHeight: navEl.scrollHeight,
        navClientHeight: navEl.clientHeight,
        navBottom: navRect.bottom,
        soundTop: soundRect.top,
        soundBottom: soundRect.bottom,
        sidebarBottom: sidebarRect.bottom
      };
    });

    expect(before).not.toBeNull();
    expect(before!.sidebarOverflowY).toBe('hidden');
    expect(before!.navOverflowY).toBe('auto');
    expect(before!.navScrollHeight).toBeGreaterThan(before!.navClientHeight);
    expect(before!.soundTop).toBeGreaterThanOrEqual(before!.navBottom - 1);
    expect(before!.soundBottom).toBeLessThanOrEqual(before!.sidebarBottom + 1);

    const soundTopBeforeScroll = before!.soundTop;
    await nav.evaluate((node) => {
      (node as HTMLElement).scrollTop = (node as HTMLElement).scrollHeight;
    });

    await expect(sidebar.locator('#navAbout')).toBeVisible();

    const after = await page.evaluate(() => {
      const sidebarEl = document.querySelector<HTMLElement>('#mobileSidebar');
      const navEl = sidebarEl?.querySelector<HTMLElement>('#coverNav');
      const soundEl = sidebarEl?.querySelector<HTMLElement>('.cover-sound-panel');
      if (!sidebarEl || !navEl || !soundEl) return null;

      return {
        navScrollTop: navEl.scrollTop,
        soundTop: soundEl.getBoundingClientRect().top,
        soundVisible: soundEl.getBoundingClientRect().bottom <= sidebarEl.getBoundingClientRect().bottom + 1
      };
    });

    expect(after).not.toBeNull();
    expect(after!.navScrollTop).toBeGreaterThan(0);
    expect(Math.abs(after!.soundTop - soundTopBeforeScroll)).toBeLessThanOrEqual(1);
    expect(after!.soundVisible).toBe(true);
  });
});