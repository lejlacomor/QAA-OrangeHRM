import { Page, Locator } from "@playwright/test";

export class DashboardPage
{
    readonly page:Page;
    readonly dashboardHeader: Locator;
    readonly userDropdown: Locator;
    readonly logoutButton: Locator;
    readonly leaveMenu: Locator;



constructor(page: Page) {
    this.page = page;
    this.dashboardHeader = page.locator('h6.oxd-text--h6');
    this.userDropdown = page.locator('.oxd-userdropdown-tab');
    this.logoutButton = page.locator('a:has-text("Logout")');
    this.leaveMenu = page.locator('a[href*="viewLeaveModule"]');
}
async isDashboardVisible(): Promise<boolean> {
    return await this.dashboardHeader.isVisible();
  }

  async navigateToLeavePage() {
    await this.leaveMenu.click();
  }

  async logout() {
    await this.userDropdown.click();
    await this.logoutButton.click();
  }
}
