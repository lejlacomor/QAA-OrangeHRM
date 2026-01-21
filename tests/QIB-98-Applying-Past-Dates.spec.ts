import{test,expect} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import {ApplyLeavePage} from "../pages/ApplyLeavePage";
import{DashboardPage} from "../pages/DashboardPage";
import{LeavePage} from "../pages/LeavePage";
import testdata from "../testdata.json";

import * as dotenv from "dotenv";
dotenv.config();

test("Applying for leave with past dates", async({page})=>
{
    const loginPage=new LoginPage(page);
    loginPage.open();
    loginPage.login(
        process.env.APP_USERNAME!,
        process.env.APP_PASSWORD!
    );

    await page.waitForURL('**/dashboard**');

   const dashboardPage=new DashboardPage(page);
   await expect(dashboardPage.dashboardHeader).toBeVisible();

   await dashboardPage.navigateToLeavePage();

   const leavePage=new LeavePage(page);

   const applyLeavePage=new ApplyLeavePage(page);

   await leavePage.clickApplyLeave();

    await applyLeavePage.applyForLeaveWithPastDates(
    testdata.LEAVE_TYPE,
    testdata.LEAVE_COMMENT
  );

  await expect(applyLeavePage.successToast).not.toBeVisible();
  await expect(page).toHaveURL(/.*applyLeave/);

});
