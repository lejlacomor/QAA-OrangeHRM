import { test, expect } from '@playwright/test';
import { ApplyLeavePage } from '../pages/ApplyLeavePage';
import { DashboardPage } from '../pages/DashboardPage';
import { LeavePage } from '../pages/LeavePage';
import { LoginPage } from '../pages/LoginPage';

import testdata from '../testdata.json';

import * as dotenv from 'dotenv';
dotenv.config(); // loading .env variables

test("User want to Apply for Leave with empty fields - Negative Test", async ({ page }) => {
  // Login
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(
    process.env.APP_USERNAME!,
    process.env.APP_PASSWORD!
  );

  // Verify Dashboard is loaded
  await page.waitForURL('**/dashboard**');
  const dashboardPage = new DashboardPage(page);
  await expect(dashboardPage.dashboardHeader).toBeVisible();

  // Navigate to Leave page
  await dashboardPage.navigateToLeavePage();

  // Click on Apply Leave button
  const leavePage = new LeavePage(page);
  await leavePage.clickApplyLeave();

  // Verify Apply Leave page is loaded
  await page.waitForURL('**/leave/applyLeave**');
  const applyLeavePage = new ApplyLeavePage(page);
  
  // Try to submit the form with empty fields
  await applyLeavePage.clickApplyButton();

  // Verify validation error messages are displayed
  await expect(applyLeavePage.leaveTypeRequiredError).toBeVisible();
  await expect(applyLeavePage.fromDateRequiredError).toBeVisible();
  await expect(applyLeavePage.toDateRequiredError).toBeVisible();


  // Verify that we are still on the Apply Leave page (form was not submitted)
  await expect(page).toHaveURL(/.*leave\/applyLeave/);
});