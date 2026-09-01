import { test as base } from '@playwright/test';
import { VehicleApiClient } from '../api/vehicleClient';

type MyFixtures = {
  vehicleApiClient: VehicleApiClient;
};

export const test = base.extend<MyFixtures>({
  vehicleApiClient: async ({ request }, use) => {
    const client = new VehicleApiClient(request);
    await use(client);
  },
});

export { expect } from '@playwright/test';
