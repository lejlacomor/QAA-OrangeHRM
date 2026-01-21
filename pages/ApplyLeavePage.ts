// pages/ApplyLeavePage.ts
import { Page, Locator } from '@playwright/test';

export class ApplyLeavePage {
  readonly page: Page;
  
  // Form fields
  readonly leaveTypeDropdown: Locator;
  readonly fromDateInput: Locator;
  readonly toDateInput: Locator;
  readonly durationDropdown: Locator;
  readonly commentsTextarea: Locator;
  readonly applyButton: Locator;
  readonly cancelButton: Locator;
  
  // Error messages
  readonly leaveTypeRequiredError: Locator;
  readonly fromDateRequiredError: Locator;
  readonly toDateRequiredError: Locator;
  readonly dateRangeError: Locator;
  
  // Success message
  readonly successToast: Locator;
  
  // Page header
  readonly applyLeaveHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Form fields
    this.leaveTypeDropdown = page.locator('.oxd-select-text').nth(0);
    this.fromDateInput = page.locator('.oxd-date-input input').nth(0);
    this.toDateInput = page.locator('.oxd-date-input input').nth(1);
    this.durationDropdown = page.locator('.oxd-select-text').nth(1);
    this.commentsTextarea = page.locator('.oxd-textarea');
    this.applyButton = page.locator('button[type="submit"]');
    this.cancelButton = page.locator('button.oxd-button--ghost');
    
    // Error messages
    this.leaveTypeRequiredError = page.locator('.oxd-input-field-error-message').nth(0);
    this.fromDateRequiredError = page.locator('.oxd-input-field-error-message').nth(1);
    this.toDateRequiredError = page.locator('.oxd-input-field-error-message').nth(2);
    this.dateRangeError = page.locator('.oxd-input-field-error-message', { 
      hasText: /To date should be after from date/i 
    });
    
    // Success toast notification
    this.successToast = page.locator('#oxd-toaster_1');
    
    // Header
    this.applyLeaveHeader = page.locator('.oxd-text--h6', { hasText: 'Apply Leave' });
  }

  // Actions
  async selectLeaveType(leaveType: string) {
    await this.leaveTypeDropdown.click();
    await this.page.locator(`.oxd-select-dropdown div:has-text("${leaveType}")`).click();
  }

  async fillFromDate(date: string) {
    await this.fromDateInput.clear();
    await this.fromDateInput.fill(date);
    await this.page.keyboard.press('Tab');
  }

  async fillToDate(date: string) {
    await this.toDateInput.clear();
    await this.toDateInput.fill(date);
    await this.page.keyboard.press('Tab');
  }

  async selectDuration(duration: 'Full Day' | 'Half Day - Morning' | 'Half Day - Afternoon' | 'Specify Time') {
    await this.durationDropdown.click();
    await this.page.locator(`.oxd-select-dropdown div:has-text("${duration}")`).click();
  }

  async fillComments(comments: string) {
    await this.commentsTextarea.fill(comments);
  }

  async clickApplyButton() {
    await this.applyButton.click();
  }

  async clickCancelButton() {
    await this.cancelButton.click();
  }

  // Combined action
  async applyForLeave(
    leaveType: string, 
    fromDate: string, 
    toDate: string, 
    duration: string = 'Full Day',
    comments?: string
  ) {
    await this.selectLeaveType(leaveType);
    await this.fillFromDate(fromDate);
    await this.fillToDate(toDate);
    await this.selectDuration(duration as any);
    
    if (comments) {
      await this.fillComments(comments);
    }
    
    await this.clickApplyButton();
  }

  // PAST DATES METHOD
async applyForLeaveWithPastDates(
  leaveType: string, 
  comment: string
): Promise<void> {
  // Generate past dates
  const today = new Date();
  
  const pastFromDate = new Date(today);
  pastFromDate.setDate(today.getDate() - 10); 
  
  const pastToDate = new Date(today);
  pastToDate.setDate(today.getDate() - 5); 

  // Format dates to YYYY-MM-DD
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fromDate = formatDate(pastFromDate);
  const toDate = formatDate(pastToDate);

  // Za negativan test - popuni samo osnovne podatke bez duration-a
  await this.selectLeaveType(leaveType);
  await this.fillFromDate(fromDate);
  await this.fillToDate(toDate);
  
  if (comment) {
    await this.fillComments(comment);
  }
  
  // Pokušaj submit-a (očekujemo da neće proći)
  await this.clickApplyButton();
}
}