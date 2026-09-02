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

test('tutorial includes the language selector', async ({ page }) => {
  await page.goto('/');
  await page.locator('#navTutorial').click();
  await page.locator('.tutorial-primary').click();

  await expect(page.getByRole('heading', { name: 'Choose your language' })).toBeVisible();
  await expect(page.locator('#tutorial-body-language')).toContainText('IP country');
});
