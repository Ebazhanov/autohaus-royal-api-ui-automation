import { Page, test } from '@playwright/test';

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
      return await this.page.evaluate(async (vehicleId) => {
        const origin = location.origin;
        // Try several absolute paths that the site may expose the API under.
        // Try the canonical API path observed in site JS first, with a lowercase fallback.
        const candidates = [
          `${origin}/detail/data/vehicle.php?Id=${vehicleId}`,
          `${origin}/detail/data/vehicle.php?id=${vehicleId}`,
        ];

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
            statuses[url] = e && typeof e === 'object' && 'message' in (e as any) ? (e as any).message : String(e);
          }
        }

        throw new Error(`API fetch failed for all candidates; statuses: ${JSON.stringify(statuses)}`);
      }, id);
    });
  }
}
