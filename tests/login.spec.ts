import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config(); // učitaj .env varijable

import { LoginPage } from "../pages/LoginPage";

test.describe('OrangeHRM Login Tests', () => {

  test('Should login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    
    // Perform login with valid credentials
    await loginPage.login(
      process.env.APP_USERNAME!,
      process.env.APP_PASSWORD!
    );

    // Verify successful login - Dashboard is visible
    await expect(
      page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();

    // Verify URL contains dashboard
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('Should not login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    
    // Try login with invalid credentials
    await loginPage.login(
      'invalidUser123',
      'wrongPassword123'
    );

    // Verify error message is displayed
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(/Invalid credentials/i);
    
    // Verify we are still on login page
    await expect(page).toHaveURL(/\/login/);
  });

});