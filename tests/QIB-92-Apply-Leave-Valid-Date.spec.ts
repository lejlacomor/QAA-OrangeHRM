import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import {DashboardPage} from '../pages/DashboardPage';
import { ApplyLeavePage } from '../pages/ApplyLeavePage';
import{LeavePage} from '../pages/LeavePage';
import testdata from '../testdata.json';

import * as dotenv from 'dotenv';
dotenv.config(); // učitaj .env varijable

//Login and using page object model for login
test("User can apply for leave", async({page})=>
{
    const loginPage=new LoginPage(page);
    await loginPage.open();
    await loginPage.login(
        process.env.APP_USERNAME!,
        process.env.APP_PASSWORD!
        );

    await page.waitForTimeout(5000);
    //Dashboard
    const dashboardPage= new DashboardPage(page);
    await expect(dashboardPage.dashboardHeader).toBeVisible();

    //When we click on the Leave it redirect us to Leave List 
    await dashboardPage.navigateToLeavePage();

    const leavePage=new LeavePage(page);
    //await expect(leavePage.leaveListHeader).toBeVisible();

    //Apply Leave
    await leavePage.clickApplyLeave();

    const applyLeavePage=new ApplyLeavePage(page);
    await expect(applyLeavePage.applyLeaveHeader).toBeVisible();

    await applyLeavePage.applyLeave(
    testdata.LEAVE_FROM_DATE,
    testdata.LEAVE_TO_DATE,
    testdata.LEAVE_COMMENT
  );

  await expect(applyLeavePage.successToast).toBeVisible();

})