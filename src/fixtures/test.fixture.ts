import { test as base } from '@playwright/test';
import { VehicleApiClient } from '../api/vehicle.api.js';
import { VehicleDetailsPage } from '../pages/vehicle-details.page.js';

type TestFixtures = {
  vehicleApi: VehicleApiClient;
  vehicleDetailsPage: VehicleDetailsPage;
};

export const test = base.extend<TestFixtures>({
  vehicleApi: async ({ page }, use) => {
    await use(new VehicleApiClient(page));
  },
  vehicleDetailsPage: async ({ page }, use) => {
    await use(new VehicleDetailsPage(page));
  },
});

export { expect } from '@playwright/test';
