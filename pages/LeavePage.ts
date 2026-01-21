import { Page, Locator } from "@playwright/test";

export class LeavePage {
  readonly page: Page;
 // readonly leaveListHeader: Locator;
  readonly applyLeaveButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.applyLeaveButton = page.locator('a:has-text("Apply")');
  }

  async clickApplyLeave() {
    await this.applyLeaveButton.click();
    await this.page.waitForURL('**/leave/applyLeave');
  }

  
}