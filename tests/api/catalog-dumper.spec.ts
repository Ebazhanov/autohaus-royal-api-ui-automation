import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test('Dump comprehensive API catalog and metadata', async ({ page }) => {
  const capturedPayloads: Record<string, any[]> = {};

  page.on('response', async response => {
    const url = response.url();
    if (
      (url.includes('.php') || response.headers()['content-type']?.includes('application/json')) &&
      response.status() === 200
    ) {
      try {
        const data = await response.json();
        const endpointKey = new URL(url).pathname;

        if (!capturedPayloads[endpointKey]) {
          capturedPayloads[endpointKey] = [];
        }

        capturedPayloads[endpointKey].push(data);
        console.log(`Captured JSON response from: ${endpointKey}`);
      } catch (e) {
        // Ignored for non-JSON responses
      }
    }
  });

  await page.goto('https://www.autohaus-royal.de/fahrzeuge', { waitUntil: 'networkidle' });

  // Dismiss cookie banner if overlay exists
  const cookieAcceptBtn = page.locator('#cb-cookie-banner button, text=/akzeptieren|accept/i');
  if (await cookieAcceptBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
    await cookieAcceptBtn.click();
  }

  // Scroll to bring load button into viewport
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  // Click 'zeige weitere' using force: true to bypass any lingering overlay intersections
  const loadMoreBtn = page.locator('#btn-show-more, text=/zeige.*weitere/i');
  if (await loadMoreBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
    await loadMoreBtn.click({ force: true });
    await page.waitForTimeout(2000);
  }

  expect(Object.keys(capturedPayloads).length).toBeGreaterThan(0);

  const outputDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filePath = path.join(outputDir, 'autohaus_full_db.json');
  fs.writeFileSync(filePath, JSON.stringify(capturedPayloads, null, 2));
  console.log(`Saved captured backend payloads to ${filePath}`);
});
