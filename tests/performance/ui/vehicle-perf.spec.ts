import { test, expect } from '@fixtures/test.fixture.ts';
import { assertPageLoadTime, getPagePerformanceMetrics } from '@utils/performance.helper.ts';

test.describe('Vehicle UI Performance Tests', () => {
  test('Vehicle Details page meets web performance SLA @performance', async ({ page }) => {
    // Navigate and capture response object
    const response = await page.goto('/fahrzeuge'); // Replace '/fahrzeuge' with your actual UI details route

    // Ensure page loaded successfully (HTTP 200-299)
    expect(response?.ok(), `Expected HTTP 200-299, but received ${response?.status()}`).toBe(true);

    // Validate page load SLA
    await assertPageLoadTime(page, 3000);

    // Validate Core Web Vitals (FCP)
    const metrics = await getPagePerformanceMetrics(page);
    expect(metrics.firstContentfulPaint).toBeLessThan(1500);
  });
});
