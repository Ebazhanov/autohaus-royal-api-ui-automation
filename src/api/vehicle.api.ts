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
   * Fetches vehicle data using relative or absolute candidate endpoints
   */
  async getVehicleData(id: string): Promise<VehicleResponse> {
    return await test.step(`Fetch vehicle API data for ID ${id}`, async () => {
      // Resolve current origin and generate candidate URLs
      const origin = await this.page.evaluate(() => window.location.origin);
      const candidates = vehicleCandidates(origin, id);
      const statuses: Record<string, number | string> = {};

      for (const url of candidates) {
        try {
          const response = await this.page.request.get(url, {
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              Accept: 'application/json, text/javascript, */*; q=0.01',
            },
          });

          statuses[url] = response.status();

          if (response.ok()) {
            return (await response.json()) as VehicleResponse;
          }
        } catch (error: unknown) {
          statuses[url] = error instanceof Error ? error.message : String(error);
        }
      }

      throw new Error(
        `API fetch failed for all candidate URLs; execution details: ${JSON.stringify(
          statuses,
          null,
          2
        )}`
      );
    });
  }
}
