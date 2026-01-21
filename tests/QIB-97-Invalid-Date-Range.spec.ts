import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ApplyLeavePage } from '../pages/ApplyLeavePage';
import { LeavePage } from '../pages/LeavePage';
import testdata from '../testdata.json';

import * as dotenv from 'dotenv';
dotenv.config(); // učitaj .env varijable

test("User cannot apply for leave with invalid date range - From Date after To Date", async ({ page }) => {
  // Login
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(
    process.env.APP_USERNAME!,
    process.env.APP_PASSWORD!
  );

  // Wait for Dashboard to load
  await page.waitForURL('**/dashboard**');
  
  // Dashboard
  const dashboardPage = new DashboardPage(page);
  await expect(dashboardPage.dashboardHeader).toBeVisible();

  // Navigate to Leave page
  await dashboardPage.navigateToLeavePage();

  // Leave List Page
  const leavePage = new LeavePage(page);

  // Click Apply Leave button
  await leavePage.clickApplyLeave();

  // Wait for Apply Leave page to load
  await page.waitForURL('**/leave/applyLeave**');

  // Apply Leave Page
  const applyLeavePage = new ApplyLeavePage(page);
  //await expect(applyLeavePage.applyLeaveHeader).toBeVisible();

  // Fill form with invalid date range (From Date is after To Date)
  await applyLeavePage.selectLeaveType(testdata.LEAVE_TYPE);
  await applyLeavePage.fillFromDate(testdata.INVALID_LEAVE_FROM_DATE); // npr. "2026-01-25"
  await applyLeavePage.fillToDate(testdata.INVALID_LEAVE_TO_DATE);     // npr. "2026-01-20"
  
  // Optional: Add comment
  if (testdata.LEAVE_COMMENT) {
    await applyLeavePage.fillComments(testdata.LEAVE_COMMENT);
  }

  // Try to submit the form
  await applyLeavePage.clickApplyButton();

  // Verify error message is displayed
  await expect(applyLeavePage.dateRangeError).toBeVisible();

  // Verify that we are still on the Apply Leave page (form was not submitted)
  await expect(page).toHaveURL(/.*leave\/applyLeave/);
  
  // Verify success toast is NOT visible
  await expect(applyLeavePage.successToast).not.toBeVisible();
  await page.waitForTimeout(3000);
});