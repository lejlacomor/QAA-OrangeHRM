import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ApplyLeavePage } from '../pages/ApplyLeavePage';
import { LeavePage } from '../pages/LeavePage';
import testdata from '../testdata.json';

import * as dotenv from 'dotenv';
dotenv.config(); // učitaj .env varijable


test("User can apply for leave", async ({ page }) => {
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

  // When we click on the Leave it redirects us to Leave List 
  await dashboardPage.navigateToLeavePage();

  // Leave List Page
  const leavePage = new LeavePage(page);
 

  // Click Apply Leave button
  await leavePage.clickApplyLeave();

  
  await page.waitForURL('**/leave/applyLeave**');

  // Apply Leave Page
  const applyLeavePage = new ApplyLeavePage(page);
  await expect(applyLeavePage.applyLeaveHeader).toBeVisible();

  
  await applyLeavePage.applyForLeave(
    testdata.LEAVE_TYPE,         
    testdata.LEAVE_FROM_DATE,
    testdata.LEAVE_TO_DATE,                   
    testdata.LEAVE_COMMENT
  );

  // Verify success message
  await expect(applyLeavePage.successToast).toBeVisible();
  await expect(applyLeavePage.successToast).toHaveText(/Success/i);
});