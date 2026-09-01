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

  test('language switching from the cover stays on the almanac instead of 404', async ({ page }) => {
    await page.goto('/');
    await page.locator('.site-language-switcher summary').click();
    await page.locator('[data-language-code="es"]').click();

    await expect(page).toHaveURL(/\/es\/(?:term\/[^/]+\/)?(?:#.*)?$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.locator('#page')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Page not found' })).toHaveCount(0);
    await expect(page.locator('.site-language-switcher summary')).toContainText('ES');
  });

  test('manual language switching keeps the English AI term and localizes its explanation', async ({ page }) => {
    await page.goto('/term/context-window/');
    await page.locator('.site-language-switcher summary').click();
    await page.locator('[data-language-code="pt"]').click();

    await expect(page).toHaveURL(/\/pt\/term\/janela-de-contexto\/(?:#.*)?$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await expect(page.locator('#entry h1.word')).toHaveText('context window');
    await expect(page.locator('#entry .definition')).toContainText('Quantidade máxima de informação');
    await expect(page.locator('#page')).toBeVisible();
    await expect(page.locator('#search')).toBeVisible();
    await expect.poll(() => page.evaluate(() => localStorage.getItem('aiAlmanacLanguage'))).toBe('pt');
  });

  test('manual language selection wins over a pending automatic detection', async ({ page }) => {
    let releaseLocale = () => {};
    const localeGate = new Promise<void>((resolve) => {
      releaseLocale = resolve;
    });
    let releaseGerman = () => {};
    const germanGate = new Promise<void>((resolve) => {
      releaseGerman = resolve;
    });

    await page.route('**/api/locale', async (route) => {
      await localeGate;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ country: 'BR' })
      });
    });
    await page.route('**/de/term/kuenstliche-intelligenz/', async (route) => {
      await germanGate;
      await route.continue();
    });

    const localeRequest = page.waitForRequest((request) => request.url().endsWith('/api/locale'));
    await page.goto('/');
    await localeRequest;

    await page.locator('.site-language-switcher summary').click();
    const germanRequest = page.waitForRequest((request) => request.url().includes('/de/term/kuenstliche-intelligenz/'));
    const clickNavigation = page.locator('[data-language-code="de"]').click({ noWaitAfter: true });
    await germanRequest;
    releaseLocale();

    const automaticRedirect = page.waitForRequest(
      (request) => request.url().includes('/pt/term/inteligencia-artificial/'),
      { timeout: 2_000 }
    ).then(() => true).catch(() => false);
    expect(await automaticRedirect).toBe(false);

    releaseGerman();
    await clickNavigation;

    await expect(page).toHaveURL(/\/de\/term\/kuenstliche-intelligenz\/(?:#.*)?$/);
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(/\/de\/term\/kuenstliche-intelligenz\/(?:#.*)?$/);
  });

  test('direct localized term routes keep the English headword with a native definition', async ({ page }) => {
    await page.goto('/hi/term/kritrim-buddhimatta/');

    await expect(page.locator('html')).toHaveAttribute('lang', 'hi');
    await expect(page.locator('#entry h1.word')).toHaveText('artificial intelligence');
    await expect(page.locator('#entry .definition')).toContainText('मशीनों या सॉफ्टवेयर');
    await expect(page).toHaveTitle('artificial intelligence - The AI Almanac');
    await expect(page.locator('#page')).toBeVisible();
    await expect(page.locator('#bookmarkBtn')).toBeVisible();
    await expect(page.locator('.site-language-switcher summary')).toContainText('HI');
  });

  test('language menu clears remembered choices and returns to automatic mode', async ({ page }) => {
    await page.addInitScript(() => {
      if (window.location.pathname === '/hi/') {
        localStorage.setItem('aiAlmanacLanguage', 'hi');
        localStorage.setItem('aiAlmanacLanguageSuggestionDismissed', 'hi');
      }
    });

    await page.goto('/hi/');
    await page.locator('.site-language-switcher summary').click();

    const automatic = page.locator('[data-language-auto]');
    const hindi = page.locator('[data-language-code="hi"]');
    await expect(automatic).toBeVisible();
    await expect(automatic).not.toHaveAttribute('aria-current', 'true');
    await expect(hindi).toHaveAttribute('data-language-remembered', 'true');

    await automatic.click();
    await expect(page).toHaveURL(/\/term\/artificial-intelligence\/(?:#.*)?$/);
    await expect.poll(() => page.evaluate(() => localStorage.getItem('aiAlmanacLanguage'))).toBeNull();
    await expect.poll(() => page.evaluate(() => localStorage.getItem('aiAlmanacLanguageSuggestionDismissed'))).toBeNull();

    await page.locator('.site-language-switcher summary').click();
    await expect(page.locator('[data-language-auto]')).toHaveAttribute('aria-current', 'true');
    await expect(page.locator('[data-language-code="hi"]')).not.toHaveAttribute('data-language-remembered', 'true');
  });

  test('automatic selection settles after leaving a localized edition', async ({ page }) => {
    let localeRequests = 0;
    const navigationPaths: string[] = [];
    page.on('framenavigated', (frame) => {
      if (!frame.parentFrame()) navigationPaths.push(new URL(frame.url()).pathname);
    });

    await page.route('**/api/locale', (route) => {
      localeRequests += 1;
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ country: 'BR' })
      });
    });

    await page.goto('/de/term/kuenstliche-intelligenz/');
    await page.locator('.site-language-switcher summary').click();
    await page.locator('[data-language-auto]').click({ noWaitAfter: true });

    await expect(page).toHaveURL(/\/pt\/term\/inteligencia-artificial\/(?:#.*)?$/);
    await page.waitForTimeout(1500);

    await expect(page).toHaveURL(/\/pt\/term\/inteligencia-artificial\/(?:#.*)?$/);
    expect(localeRequests).toBe(1);
    expect(navigationPaths).not.toContain('/term/artificial-intelligence/');
  });
});

test.describe('automatic language selection', () => {
  test.describe('Brazil', () => {
    test.use({ locale: 'fr-FR', timezoneId: 'America/Sao_Paulo' });

    test('uses IP country before browser language and preserves the current term', async ({ page }) => {
      await page.route('**/api/locale', (route) => route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ country: 'BR' })
      }));

      const localeResponse = page.waitForResponse((response) => response.url().endsWith('/api/locale'));
      await page.goto('/term/context-window/');
      await localeResponse;

      await expect(page).toHaveURL(/\/pt\/term\/janela-de-contexto\/(?:#.*)?$/);
      await expect(page.locator('#entry h1.word')).toHaveText('context window');
      await expect(page.locator('#entry .definition')).toContainText('Quantidade máxima de informação');
    });
  });

  test.describe('India with English browser', () => {
    test.use({ locale: 'en-IN', timezoneId: 'Asia/Kolkata' });

    test('keeps English when the browser does not prefer Hindi', async ({ page }) => {
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
    });
  });

  test.describe('India with Hindi browser', () => {
    test.use({ locale: 'hi-IN', timezoneId: 'Asia/Kolkata' });

    test('automatically switches to Hindi when the browser prefers Hindi', async ({ page }) => {
      await page.route('**/api/locale', (route) => route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ country: 'IN' })
      }));

      const localeResponse = page.waitForResponse((response) => response.url().endsWith('/api/locale'));
      await page.goto('/');
      await localeResponse;

      await expect(page).toHaveURL(/\/hi\/term\/kritrim-buddhimatta\/(?:#.*)?$/);
      await expect(page.locator('#entry h1.word')).toHaveText('artificial intelligence');
      await expect(page.locator('#entry .definition')).toContainText('मशीनों या सॉफ्टवेयर');
    });
  });

  test('a saved locale automatically restores the remembered edition', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('aiAlmanacLanguage', 'pt');
    });

    await page.goto('/');

    await expect(page).toHaveURL(/\/pt\/term\/inteligencia-artificial\/(?:#.*)?$/);
    await expect(page.locator('#entry h1.word')).toHaveText('artificial intelligence');
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

  test('syncs remembered language state when the mobile menu mounts later', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('aiAlmanacLanguage', 'hi');
    });

    await page.goto('/hi/');
    await page.locator('#mobileMenu').click();

    const mobileSidebar = page.locator('#mobileSidebar');
    await expect(mobileSidebar).toBeVisible();
    await expect(mobileSidebar.locator('[data-language-code="hi"]')).toHaveAttribute('data-language-remembered', 'true');
    await expect(mobileSidebar.locator('[data-language-auto]')).not.toHaveAttribute('aria-current', 'true');
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
    await expect(page.locator('#entry h1.word')).toBeVisible();
    await page.evaluate(async () => {
      await document.fonts.ready;
      await new Promise<void>((resolve) => requestAnimationFrame(() => {
        requestAnimationFrame(() => resolve());
      }));
    });

    const inner = page.locator('.page-inner');
    await inner.evaluate((node) => {
      (node as HTMLElement).scrollTop = 36;
    });
    await expect.poll(() => inner.evaluate((node) => (node as HTMLElement).scrollTop)).toBeGreaterThan(0);

    await page.evaluate(() => window.dispatchEvent(new Event('pageshow')));
    await expect.poll(() => inner.evaluate((node) => (node as HTMLElement).scrollTop)).toBe(0);
  });
});
