import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config(); // učitaj .env varijable

import { LoginPage } from "../pages/LeavePage/LoginPage";

test.describe('Orange HRM Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open(); // otvori stranicu
  });

  test('Login with valid credentials', async ({ page }) => {
  await loginPage.login(
    process.env.APP_USERNAME!,
    process.env.APP_PASSWORD!
  );

  await expect(
    page.getByRole('heading', { name: 'Dashboard' })
  ).toBeVisible();

  await expect(page).toHaveURL(/dashboard/);
});

  test('Login with invalid credentials', async ({ page }) => {
    await loginPage.login('wronguser', 'wrongpass');
    const error = await page.locator('.oxd-alert-content-text').textContent();
    expect(error).toContain('Invalid credentials');
  });
});
