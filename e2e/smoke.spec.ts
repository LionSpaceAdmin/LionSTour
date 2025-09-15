import { test, expect } from '@playwright/test';

test('homepage visual audit', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await page.screenshot({ path: 'e2e/screenshots/homepage.png', fullPage: true });
});
