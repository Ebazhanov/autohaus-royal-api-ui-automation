import { Page, test } from '@playwright/test';
import { vehicleCandidates } from './vehicleEndpoint.js';

export interface VehicleResponse {
  Id: string;
  Manufacturer: string;
  Model: string;
  Price: number;
  Km: number;
  Fuel: string;
}

export class VehicleApiClient {
  constructor(private readonly page: Page) {}

  /**
   * Fetches vehicle data directly via browser context using relative API endpoint
   */
  async getVehicleData(id: string): Promise<VehicleResponse> {
    return await test.step(`Fetch vehicle API data for ID ${id}`, async () => {
      // Determine origin in node context (via page) then build candidates here and pass into page.evaluate
      const origin = await this.page.evaluate(() => location.origin);
      const candidates = vehicleCandidates(origin, id);

      return await this.page.evaluate(
        async ([, candidates]) => {
          const statuses: Record<string, number | string> = {};

          for (const url of candidates) {
            try {
              const response = await fetch(url, {
                headers: {
                  'X-Requested-With': 'XMLHttpRequest',
                  Accept: 'application/json, text/javascript, */*; q=0.01',
                },
                credentials: 'same-origin',
              });
              statuses[url] = response.status;
              if (response.ok) {
                return (await response.json()) as VehicleResponse;
              }
            } catch (e) {
              statuses[url] =
                e && typeof e === 'object' && 'message' in (e as any)
                  ? (e as any).message
                  : String(e);
            }
          }

          throw new Error(
            `API fetch failed for all candidates; statuses: ${JSON.stringify(statuses)}`
          );
        },
        [, candidates]
      );
    });
  }
}
