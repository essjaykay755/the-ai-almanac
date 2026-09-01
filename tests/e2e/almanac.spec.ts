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
    await expect(page).toHaveTitle('context window - The AI Almanac');
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

  test('manual language switching keeps the same translated term and remembers the choice', async ({ page }) => {
    await page.goto('/term/context-window/');
    await page.locator('.site-language-switcher summary').click();
    await page.locator('[data-language-code="pt"]').click();

    await expect(page).toHaveURL(/\/pt\/term\/janela-de-contexto\/(?:#.*)?$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await expect(page.locator('#entry h1.word')).toHaveText('janela de contexto');
    await expect(page.locator('#page')).toBeVisible();
    await expect(page.locator('#search')).toBeVisible();
    await expect.poll(() => page.evaluate(() => localStorage.getItem('aiAlmanacLanguage'))).toBe('pt');
  });

  test('direct localized term routes use the full Almanac interface', async ({ page }) => {
    await page.goto('/hi/term/kritrim-buddhimatta/');

    await expect(page.locator('html')).toHaveAttribute('lang', 'hi');
    await expect(page.locator('#entry h1.word')).toHaveText('कृत्रिम बुद्धिमत्ता');
    await expect(page.locator('#page')).toBeVisible();
    await expect(page.locator('#bookmarkBtn')).toBeVisible();
    await expect(page.locator('.site-language-switcher summary')).toContainText('HI');
  });

  test('language menu clears remembered choices and returns to automatic mode', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('aiAlmanacLanguage', 'hi');
      localStorage.setItem('aiAlmanacLanguageSuggestionDismissed', 'hi');
    });

    await page.goto('/hi/');
    await page.locator('.site-language-switcher summary').click();

    const automatic = page.locator('[data-language-auto]');
    const hindi = page.locator('[data-language-code="hi"]');
    await expect(automatic).toBeVisible();
    await expect(automatic).not.toHaveAttribute('aria-current', 'true');
    await expect(hindi).toHaveAttribute('data-language-remembered', 'true');

    await automatic.click();
    await expect.poll(() => page.evaluate(() => localStorage.getItem('aiAlmanacLanguage'))).toBeNull();
    await expect.poll(() => page.evaluate(() => localStorage.getItem('aiAlmanacLanguageSuggestionDismissed'))).toBeNull();

    await page.locator('.site-language-switcher summary').click();
    await expect(automatic).toHaveAttribute('aria-current', 'true');
    await expect(hindi).not.toHaveAttribute('data-language-remembered', 'true');
  });
});

test.describe('language suggestions', () => {
  test.describe('Brazil', () => {
    test.use({ locale: 'pt-BR', timezoneId: 'America/Sao_Paulo' });

    test('suggests Portuguese without changing the page until confirmed', async ({ page }) => {
      await page.route('**/api/locale', (route) => route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ country: 'BR' })
      }));

      const localeResponse = page.waitForResponse((response) => response.url().endsWith('/api/locale'));
      await page.goto('/term/context-window/');
      await localeResponse;

      await expect(page).toHaveURL(/\/term\/context-window\/(?:#.*)?$/);
      await expect(page.locator('#entry h1.word')).toHaveText('context window');

      const suggestion = page.locator('[data-language-suggestion]');
      await expect(suggestion).toBeVisible();
      await expect(suggestion).toContainText('Brazil');
      await expect(suggestion).toContainText('Português');

      await suggestion.getByRole('button', { name: 'Switch to Português' }).click();
      await expect(page).toHaveURL(/\/pt\/term\/janela-de-contexto\/(?:#.*)?$/);
      await expect(page.locator('#entry h1.word')).toHaveText('janela de contexto');
    });
  });

  test.describe('India with English browser', () => {
    test.use({ locale: 'en-IN', timezoneId: 'Asia/Kolkata' });

    test('keeps English without suggesting Hindi from country alone', async ({ page }) => {
      await page.route('**/api/locale', (route) => route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ country: 'IN' })
      }));

      const localeResponse = page.waitForResponse((response) => response.url().endsWith('/api/locale'));
      await page.goto('/');
      await localeResponse;

      await expect(page).toHaveURL(/\/$/);
      await expect(page.locator('#entry h1.word')).toHaveText('artificial intelligence');
      await expect(page.locator('[data-language-suggestion]')).toHaveCount(0);
    });
  });

  test.describe('India with Hindi browser', () => {
    test.use({ locale: 'hi-IN', timezoneId: 'Asia/Kolkata' });

    test('offers Hindi but stays English until the user chooses it', async ({ page }) => {
      await page.route('**/api/locale', (route) => route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ country: 'IN' })
      }));

      const localeResponse = page.waitForResponse((response) => response.url().endsWith('/api/locale'));
      await page.goto('/');
      await localeResponse;

      await expect(page).toHaveURL(/\/$/);
      await expect(page.locator('#entry h1.word')).toHaveText('artificial intelligence');

      const suggestion = page.locator('[data-language-suggestion]');
      await expect(suggestion).toBeVisible();
      await expect(suggestion).toContainText('India');
      await expect(suggestion).toContainText('हिन्दी');

      await suggestion.getByRole('button', { name: 'Stay in English' }).click();
      await expect(suggestion).toHaveCount(0);
      await expect(page).toHaveURL(/\/$/);
      await expect.poll(() => page.evaluate(() => localStorage.getItem('aiAlmanacLanguage'))).toBe('en');
    });
  });

  test('a saved locale offers continuity without redirecting', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('aiAlmanacLanguage', 'pt');
    });
    await page.route('**/api/locale', (route) => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ country: 'US' })
    }));

    await page.goto('/');

    await expect(page).toHaveURL(/\/$/);
    const suggestion = page.locator('[data-language-suggestion]');
    await expect(suggestion).toBeVisible();
    await expect(suggestion).toContainText('Continue in Português?');
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

  test('keeps the headword outside any mid-page clipping scrollport', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#entry h1.word')).toBeVisible();

    const geometry = await page.evaluate(() => {
      const inner = document.querySelector<HTMLElement>('.page-inner');
      const layout = document.querySelector<HTMLElement>('.page-layout');
      const word = document.querySelector<HTMLElement>('#entry h1.word');
      if (!inner || !layout || !word) return null;

      return {
        innerTop: inner.getBoundingClientRect().top,
        layoutTop: layout.getBoundingClientRect().top,
        wordTop: word.getBoundingClientRect().top,
        innerOverflowY: getComputedStyle(inner).overflowY,
        layoutOverflowY: getComputedStyle(layout).overflowY
      };
    });

    expect(geometry).not.toBeNull();
    expect(geometry!.innerOverflowY).toBe('auto');
    expect(geometry!.layoutOverflowY).toBe('visible');
    expect(geometry!.wordTop).toBeGreaterThan(geometry!.layoutTop);
    expect(geometry!.layoutTop).toBeGreaterThan(geometry!.innerTop);
  });

  test('uses an iOS-safe search font size', async ({ page }) => {
    await page.goto('/');
    await page.locator('#mobileSearch').click();
    const search = page.getByRole('combobox', { name: 'Search The AI Almanac' });
    await expect(search).toBeVisible();
    await search.focus();

    const fontSize = await search.evaluate((input) => parseFloat(getComputedStyle(input).fontSize));
    expect(fontSize).toBeGreaterThanOrEqual(16);
  });

  test('clears a restored outer paper scroll offset on page restore', async ({ page }) => {
    await page.goto('/');

    const inner = page.locator('.page-inner');
    await inner.evaluate((node) => {
      (node as HTMLElement).scrollTop = 36;
    });
    await expect.poll(() => inner.evaluate((node) => (node as HTMLElement).scrollTop)).toBeGreaterThan(0);

    await page.evaluate(() => window.dispatchEvent(new Event('pageshow')));
    await expect.poll(() => inner.evaluate((node) => (node as HTMLElement).scrollTop)).toBe(0);
  });
});
