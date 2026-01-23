import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { LeavePage } from "../pages/LeavePage";
import { ApplyLeavePage } from "../pages/ApplyLeavePage";

import * as dotenv from 'dotenv';
dotenv.config();

test("Verify that all components are loaded", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();  // Dodaj await
    await loginPage.login(   // Dodaj await
        process.env.APP_USERNAME!,
        process.env.APP_PASSWORD!
    );

    await page.waitForURL("**/dashboard**");
    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.dashboardHeader).toBeVisible();

    await dashboardPage.navigateToLeavePage();

    const leavePage = new LeavePage(page);
    await leavePage.clickApplyLeave(); 

    const applyLeavePage = new ApplyLeavePage(page);
    await applyLeavePage.verifyAllElementsVisible();  // Dodaj () i await
    page.close();
});