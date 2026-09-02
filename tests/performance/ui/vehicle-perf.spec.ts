import { test, expect } from '@fixtures/test.fixture.ts';
import { assertPageLoadTime, getPagePerformanceMetrics } from '@utils/performance.helper.ts';

test.describe('Vehicle UI Performance Tests', () => {
  test('Vehicle Details page meets web performance SLA @performance', async ({ page }) => {
    // Navigate and capture response object
    const response = await page.goto('/fahrzeuge');

    // Ensure page loaded successfully (HTTP 200-299)
    expect(response?.ok(), `Expected HTTP 200-299, but received ${response?.status()}`).toBe(true);

    // Validate overall page load SLA
    await assertPageLoadTime(page, 3000);

    /**
     * First Contentful Paint (FCP) Threshold Alignment:
     * According to Google Web Vitals, an FCP score of 1.8 seconds (1800 ms) or less
     * is categorized as "Good".
     * @see https://web.dev/articles/fcp#what_is_a_good_fcp_score
     *
     * In CI environments (e.g., GitHub Actions runners with shared vCPU resources),
     * a slight buffer (2000 ms) prevents flakiness caused by resource contention.
     */
    const FCP_THRESHOLD = process.env.CI ? 2000 : 1800;

    // Validate Core Web Vitals (FCP)
    const metrics = await getPagePerformanceMetrics(page);
    expect(metrics.firstContentfulPaint).toBeLessThan(FCP_THRESHOLD);
  });
});
