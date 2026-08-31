import { Page } from '@playwright/test';

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
   * Listens for the background XHR request triggered by page scripts
   */
  async waitForVehicleData(): Promise<VehicleResponse> {
    const response = await this.page.waitForResponse(
      (res) => res.url().includes('vehicle.php') && res.status() === 200,
    );
    return (await response.json()) as VehicleResponse;
  }
}
