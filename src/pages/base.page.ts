import { Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
  }
}
