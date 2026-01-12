import { test, expect } from '@playwright/test';

// test('ENV works', async ({ page }) => {
//   console.log('BASE_URL:', process.env.BASE_URL);
//   await page.goto(process.env.BASE_URL!);
//   await expect(page).toHaveURL(/orangehrm/);
// });

test('OrangeHRM page has correct title', async ({ page }) => {
  await page.goto(process.env.BASE_URL!);
  await expect(page).toHaveTitle('OrangeHRM');
});
