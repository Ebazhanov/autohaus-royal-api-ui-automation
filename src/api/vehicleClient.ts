import { APIRequestContext } from '@playwright/test';
import { VehicleResponse } from '../types/vehicle';

export class VehicleApiClient {
  constructor(private request: APIRequestContext) {}

  async getVehicleById(id: string): Promise<{ status: number; data: VehicleResponse }> {
    const response = await this.request.get(`/detail/data/vehicle.php?Id=${id}`, {
      headers: {
        Referer: `/detail/${id}`,
      },
    });

    return {
      status: response.status(),
      data: (await response.json()) as VehicleResponse,
    };
  }
}
