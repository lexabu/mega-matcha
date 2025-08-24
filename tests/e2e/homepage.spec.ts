import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Mega Matcha/);

  // Check if main heading is visible
  await expect(page.locator('h1')).toBeVisible();
});

test('navigation works', async ({ page }) => {
  await page.goto('/');

  // Test that we can navigate around the site
  await expect(page.locator('body')).toBeVisible();
});
