import {Page, Locator} from "@playwright/test";

export class ApplyLeavePage
{
  readonly page:Page;
  readonly applyLeaveHeader: Locator;
  readonly leaveTypeDropdown: Locator;
  readonly fromDateInput: Locator;
  readonly toDateInput: Locator;
  readonly commentInput: Locator;
  readonly applyButton: Locator;
  readonly successToast: Locator;

  constructor(page: Page) {
    this.page = page;

    this.applyLeaveHeader=page.getByRole('heading', { name: 'Apply Leave' });
    this.leaveTypeDropdown = page.locator('.oxd-select-text');
    this.fromDateInput = page.locator('input[placeholder="yyyy-dd-mm"]').first();
    this.toDateInput = page.locator('input[placeholder="yyyy-dd-mm"]').nth(1);
    this.commentInput = page.locator('textarea');
    this.applyButton = page.locator('button:has-text("Apply")');
    this.successToast = page.locator('.oxd-toast--success');

    
  }
  async isApplyLeavePageVisible(): Promise<boolean> {
    return await this.applyLeaveHeader.isVisible();
  }

 async applyLeave(from: string, to: string, comment: string) {
  await this.leaveTypeDropdown.click();
  await this.page.locator('span:has-text("CAN - FMLA")').click();

  // From Date
  await this.fromDateInput.click();
  await this.fromDateInput.fill(from);

  // To Date
  await this.toDateInput.click();
  await this.toDateInput.fill(to);
  await this.toDateInput.press('Enter'); 

  // Comment
  await this.commentInput.fill(comment);

  await this.applyButton.click();
}

}

