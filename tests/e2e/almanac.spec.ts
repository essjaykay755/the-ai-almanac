import { test, expect } from '@playwright/test';

test.describe('desktop regression flows', () => {
  test('recovers from a no-match search with semantic suggestions', async ({ page }) => {
    await page.goto('/');

    const search = page.getByRole('combobox', { name: 'Search The AI Almanac' });
    await search.fill('xylophone marsupial');
    await expect(page.getByRole('status')).toContainText('No exact match');

    await page.getByRole('button', { name: 'What makes AI invent answers?', exact: true }).click();
    await expect(page.getByRole('listbox')).toContainText('hallucination');
    await page.getByRole('option', { name: /hallucination/ }).click();

    await expect(page.locator('#entry h1.word')).toHaveText('hallucination');
    await expect(search).toHaveValue('');
  });

  test('serves a deep-linked term and updates metadata', async ({ page }) => {
    await page.goto('/term/context-window/');

    await expect(page.locator('h1.word')).toHaveText('context window');
    await expect(page).toHaveTitle('context window — The AI Almanac');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /term\/context-window\//);
  });

  test('persists a bookmark across a reload', async ({ page }) => {
    await page.goto('/');

    const bookmark = page.locator('#bookmarkBtn');
    await bookmark.click();
    await expect(bookmark).toHaveAttribute('aria-label', /Remove bookmark/);

    await page.reload();
    await expect(page.locator('#bookmarkBtn')).toHaveAttribute('aria-label', /Remove bookmark/);
  });

  test('filters the complete index and restores focus on close', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /^Complete index/ }).click();
    const dialog = page.getByRole('dialog', { name: 'Every filed term' });
    await expect(dialog).toBeVisible();

    const indexSearch = page.getByLabel('Filter the complete index');
    await indexSearch.fill('retrieval');
    await expect(page.locator('#indexSummary')).toContainText(/45 of 791 entries/i);
    await expect(page.locator('.index-term')).toHaveCount(45);

    const categoryFilter = page.getByLabel('Filter by category');
    await expect(categoryFilter).toBeVisible();
    await indexSearch.fill('');
    await categoryFilter.selectOption({ label: 'Retrieval & Knowledge' });
    const categoryCount = await page.locator('.index-term').count();
    expect(categoryCount).toBeGreaterThan(0);
    expect(categoryCount).toBeLessThan(791);

    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page.locator('#navIndex')).toBeFocused();
  });

  test('opens an accessible side-by-side comparison', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /Compare artificial intelligence with/ }).first().click();
    const dialog = page.getByRole('dialog', { name: 'Compare terms' });
    await expect(dialog).toBeVisible();
    await expect(page.locator('.compare-card')).toHaveCount(2);
    await expect(page.getByRole('button', { name: 'Close comparison' })).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });

  test('does not load html2canvas before a PNG export request', async ({ page }) => {
    await page.goto('/');
    const resources = await page.evaluate(() => performance.getEntriesByType('resource').map((entry) => entry.name));
    expect(resources.some((resource) => resource.includes('html2canvas'))).toBe(false);
  });

  test('surfaces an export failure instead of silently downloading', async ({ page }) => {
    await page.goto('/');
    await page.route('**/*html2canvas*.js*', (route) => route.abort());

    await page.getByRole('button', { name: /Save this entry/ }).first().click();
    await page.getByRole('dialog', { name: 'Save this entry' }).getByRole('button', { name: 'Download PNG' }).click();
    await expect(page.locator('#stamp')).toHaveText('ENTRY SAVE FAILED');
  });
});

test.describe('reduced motion', () => {
  test('navigates without waiting for the page-turn animation', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.getByRole('button', { name: 'Next definition' }).click();
    await expect(page.locator('#entry h1.word')).not.toHaveText('artificial intelligence');
  });
});

test.describe('mobile navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('opens and fully unmounts the sidebar, then exposes mobile search', async ({ page }) => {
    await page.goto('/');

    await page.locator('#mobileMenu').click();
    await expect(page.locator('#mobileSidebar')).toBeVisible();
    await page.locator('#mobileSidebar .mobile-sidebar-close').click();
    await expect(page.locator('#mobileSidebar')).toHaveCount(0);

    await page.locator('#mobileSearch').click();
    await expect(page.getByRole('combobox', { name: 'Search The AI Almanac' })).toBeVisible();
  });

  test('keeps the headword clear and uses an iOS-safe search font size', async ({ page }) => {
    await page.goto('/');

    const positions = await page.evaluate(() => {
      const layout = document.querySelector<HTMLElement>('.page-layout');
      const word = document.querySelector<HTMLElement>('#entry h1.word');
      if (!layout || !word) return null;
      return {
        layoutTop: layout.getBoundingClientRect().top,
        wordTop: word.getBoundingClientRect().top
      };
    });

    expect(positions).not.toBeNull();
    expect(positions!.wordTop).toBeGreaterThan(positions!.layoutTop);

    await page.locator('#mobileSearch').click();
    const search = page.getByRole('combobox', { name: 'Search The AI Almanac' });
    await expect(search).toBeVisible();
    await search.focus();

    const fontSize = await search.evaluate((input) => parseFloat(getComputedStyle(input).fontSize));
    expect(fontSize).toBeGreaterThanOrEqual(16);
  });
});
