import { test, expect } from '@playwright/test';

test('localized cover stays translated after language navigation settles', async ({ page }) => {
  await page.goto('/term/context-window/');
  await page.locator('.site-language-switcher summary').click();
  await page.locator('[data-language-code="pt"]').click();

  await expect(page).toHaveURL(/\/pt\/term\/janela-de-contexto\/(?:#.*)?$/);
  await expect(page.locator('#navIndex')).toContainText('Índice completo');
  await expect(page.locator('.brand p').first()).toContainText('Um livro de referência em evolução');

  await page.waitForTimeout(1_200);

  await expect(page).toHaveURL(/\/pt\/term\/janela-de-contexto\/(?:#.*)?$/);
  await expect(page.locator('#navIndex')).toContainText('Índice completo');
  expect(await page.evaluate(() => window.location.pathname.startsWith('/pt/'))).toBe(true);
});

test('remembered language restoration still offers Use English', async ({ page }) => {
  let localeRequests = 0;

  await page.addInitScript(() => {
    if (window.location.pathname === '/') {
      localStorage.setItem('aiAlmanacLanguage', 'pt');
    }
  });

  await page.route('**/api/locale', (route) => {
    localeRequests += 1;
    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ country: 'BR' })
    });
  });

  await page.goto('/');

  await expect(page).toHaveURL(/\/pt\/term\/inteligencia-artificial\/(?:#.*)?$/);

  const notice = page.locator('[data-language-suggestion="pt"]');
  await expect(notice).toBeVisible();
  await expect(notice).toContainText('saved language preference');
  await expect(page.getByRole('button', { name: 'Keep Português' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Use English' })).toBeVisible();
  expect(localeRequests).toBe(0);

  await page.getByRole('button', { name: 'Use English' }).click();

  await expect(page).toHaveURL(/\/term\/artificial-intelligence\/(?:#.*)?$/);
  await expect.poll(() => page.evaluate(() => localStorage.getItem('aiAlmanacLanguage'))).toBe('en');
  await page.waitForTimeout(750);
  await expect(page).toHaveURL(/\/term\/artificial-intelligence\/(?:#.*)?$/);
  await expect(page.locator('[data-language-suggestion]')).toHaveCount(0);
});

test('tutorial includes the language selector', async ({ page }) => {
  await page.goto('/');
  await page.locator('#navTutorial').click();
  await page.locator('.tutorial-primary').click();

  await expect(page.getByRole('heading', { name: 'Choose your language' })).toBeVisible();
  await expect(page.locator('#tutorial-body-language')).toContainText('IP country');
});
