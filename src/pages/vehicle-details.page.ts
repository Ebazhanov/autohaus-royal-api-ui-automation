import { Page, Locator } from '@playwright/test';

export class VehicleDetailsPage {
  readonly acceptCookiesButton: Locator;

  constructor(private readonly page: Page) {
    this.acceptCookiesButton = page.locator('#cb-dialog button.cb-button', {
      hasText: 'Alle Akzeptieren',
    });
  }

  async navigateTo(id: string): Promise<void> {
    await this.page.goto(`/detail/${id}`);
  }

  async acceptCookiesIfPresent(): Promise<void> {
    if (await this.acceptCookiesButton.isVisible({ timeout: 4000 }).catch(() => false)) {
      await this.acceptCookiesButton.click();
      // Wait for modal backdrop to detach
      await this.page.locator('#cb-dialog').waitFor({ state: 'detached', timeout: 5000 });
    }
  }
}
