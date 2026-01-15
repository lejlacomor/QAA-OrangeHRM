import{test, expect} from "@playwright/test";
import {LoginPage} from '../pages/LoginPage';
import { DashboardPage } from "../pages/DashboardPage";

    test("User should see Dashboard after successful login", async({page})=>
    {
        const loginPage= new LoginPage(page);
        const dashboardPage= new DashboardPage(page);

        await loginPage.open();
        await loginPage.login(
            process.env.APP_USERNAME!,
            process.env.APP_PASSWORD!
        );

        await expect(dashboardPage.dashboardHeader).toBeVisible();
    })
