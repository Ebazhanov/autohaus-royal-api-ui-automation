import { test, expect } from '@playwright/test';
import { VehicleApiClient } from '../../src/api/vehicleClient';

test.describe('Vehicle Backend API', () => {
  const VEHICLE_ID = '002-451';

  test('should return valid vehicle details payload', async ({ request }) => {
    const vehicleApi = new VehicleApiClient(request);
    const { status, data } = await vehicleApi.getVehicleById(VEHICLE_ID);

    expect(status).toBe(200);
    expect(data.Id).toBe(VEHICLE_ID);
    expect(data.Manufacturer).toBeTruthy();
    expect(data.Price).toBeGreaterThan(0);
  });
});
