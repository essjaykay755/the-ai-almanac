import { test, expect } from '@playwright/test';

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
