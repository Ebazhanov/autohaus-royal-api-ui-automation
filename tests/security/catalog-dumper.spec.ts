import { test, expect } from '@playwright/test';
import * as fs from 'fs/promises';
import * as path from 'path';

test('Dump comprehensive API catalog and metadata', async ({ page }) => {
  const capturedPayloads: Record<string, any[]> = {};

  // Intercept responses
  page.on('response', async response => {
    const url = response.url();
    const contentType = response.headers()['content-type'] || '';

    if (
      response.status() === 200 &&
      (url.includes('.php') || contentType.includes('application/json'))
    ) {
      try {
        const data = await response.json();
        const endpointKey = new URL(url).pathname;

        if (!capturedPayloads[endpointKey]) {
          capturedPayloads[endpointKey] = [];
        }

        capturedPayloads[endpointKey].push(data);
        console.log(`Captured JSON response from: ${endpointKey}`);
      } catch {
        // Safe catch for empty or non-JSON response bodies
      }
    }
  });

  // Navigate to catalog
  await page.goto('https://www.autohaus-royal.de/fahrzeuge', { waitUntil: 'networkidle' });

  // Dismiss cookie banner cleanly if present
  const cookieAcceptBtn = page.locator('#cb-cookie-banner button, text=/akzeptieren|accept/i');
  if (await cookieAcceptBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
    await cookieAcceptBtn.click();
  }

  // Scroll into view
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // Trigger next page and wait explicitly for network response instead of hardcoded timeout
  const loadMoreBtn = page.locator('#btn-show-more, text=/zeige.*weitere/i');
  if (await loadMoreBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
    const responsePromise = page
      .waitForResponse(resp => resp.url().includes('group.php') && resp.status() === 200, {
        timeout: 5000,
      })
      .catch(() => null);

    await loadMoreBtn.click({ force: true });
    await responsePromise;
  }

  expect(Object.keys(capturedPayloads).length).toBeGreaterThan(0);

  // Write output asynchronously
  const outputDir = path.join(process.cwd(), 'data');
  await fs.mkdir(outputDir, { recursive: true });

  const filePath = path.join(outputDir, 'autohaus_full_db.json');
  await fs.writeFile(filePath, JSON.stringify(capturedPayloads, null, 2), 'utf-8');
  console.log(`Saved captured backend payloads to ${filePath}`);
});
