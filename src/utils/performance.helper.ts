import { Page, expect } from '@playwright/test';

export interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstPaint?: number;
  firstContentfulPaint?: number;
}

/**
 * Collects Navigation Timing and Core Web Vitals metrics from the current browser page.
 */
export async function getPagePerformanceMetrics(page: Page): Promise<PerformanceMetrics> {
  // Extract standard timing metrics from the browser
  const metrics = await page.evaluate(() => {
    const timing = performance.timing;
    const paintEntries = performance.getEntriesByType('paint');

    const fp = paintEntries.find(entry => entry.name === 'first-paint');
    const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');

    return {
      loadTime: timing.loadEventEnd - timing.navigationStart,
      domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
      firstPaint: fp ? fp.startTime : 0,
      firstContentfulPaint: fcp ? fcp.startTime : 0,
    };
  });

  return metrics;
}

/**
 * Validates page load time against SLA thresholds.
 */
export async function assertPageLoadTime(page: Page, maxThresholdMs: number = 3000): Promise<void> {
  const metrics = await getPagePerformanceMetrics(page);
  console.log(
    `[PERF LOG] DOMContentLoaded: ${metrics.domContentLoaded}ms | LoadTime: ${metrics.loadTime}ms`
  );

  expect(metrics.loadTime).toBeLessThan(maxThresholdMs);
}
