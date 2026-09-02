import { test, expect } from '@playwright/test';

test.describe('Security Audit - Unrestricted API Data Exposure', () => {
  test('Backend should NOT leak raw database dictionaries on public page load @security', async ({
    page,
  }) => {
    const exposedDataEndpoints: string[] = [];

    // Intercept responses for internal database dump endpoints
    page.on('response', response => {
      const url = response.url();
      if (
        response.status() === 200 &&
        (url.includes('/data/group.php') || url.includes('/data/filter.php'))
      ) {
        exposedDataEndpoints.push(new URL(url).pathname);
      }
    });

    // Navigate to catalog
    await page.goto('https://www.autohaus-royal.de/fahrzeuge', {
      waitUntil: 'domcontentloaded',
    });

    // Dismiss cookie banner cleanly if present
    const cookieBtn = page.locator('#cb-cookie-banner button, text=/akzeptieren|accept/i').first();
    if (await cookieBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await cookieBtn.click();
    }

    // Wait for the specific leaked endpoint response or network idle to capture XHR/fetch calls
    await page
      .waitForResponse(
        resp =>
          (resp.url().includes('/data/group.php') || resp.url().includes('/data/filter.php')) &&
          resp.status() === 200,
        { timeout: 7000 }
      )
      .catch(() => null);

    /**
     * SECURITY ASSERTION:
     * Unrestricted exposure of dictionary payloads (/data/group.php) poses a High-severity
     * data leakage vulnerability. This assertion fails the build to flag the exposure in CI.
     */
    expect(
      exposedDataEndpoints,
      `[SECURITY VULNERABILITY] Unrestricted API Data Exposure detected! Unauthenticated endpoints exposed: ${exposedDataEndpoints.join(', ')}`
    ).toHaveLength(0);
  });
});
