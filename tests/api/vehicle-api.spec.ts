import { test, expect } from '@playwright/test';

interface VehicleResponse {
  Id: string;
  Manufacturer: string;
  Model: string;
  Price: number;
  Km: number;
  Fuel: string;
}

test.describe('Vehicle Backend API', () => {
  const VEHICLE_ID = '002-451';

  test('should return valid vehicle details payload', async ({ request }) => {
    const response = await request.get(`/detail/data/vehicle.php?Id=${VEHICLE_ID}`, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json, text/javascript, */*; q=0.01',
        Referer: `https://www.autohaus-royal.de/detail/${VEHICLE_ID}`,
      },
    });

    const data = (await response.json()) as VehicleResponse;

    expect(data.Id).toBe(VEHICLE_ID);
    expect(data.Manufacturer).toBeTruthy();
    expect(typeof data.Price).toBe('number');
  });
});
