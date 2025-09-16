import { test, expect } from '@playwright/test';

test('experiences page visual audit', async ({ page }) => {
  await page.goto('/experiences');
  const h1 = page.locator('h1');
  await expect(h1).toBeVisible();
  const text = await h1.textContent();
  expect(text?.trim()).toMatch(/^(Experience Windows|חלונות חוויה)$/);

  // Category header text in either locale
  const allCategory = page.getByText(/^(All Experiences|כל החוויות)$/);
  await expect(allCategory).toBeVisible();

  await page.screenshot({ path: 'e2e/screenshots/experiences.png', fullPage: true });
});
