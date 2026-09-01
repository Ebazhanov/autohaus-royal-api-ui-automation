import { test, expect } from '@fixtures/test.fixture.ts';
import { VehicleDetailsPage } from '@pages/vehicle-details.page.ts';

test.describe('Vehicle Data Consistency', () => {
  const VEHICLE_ID = '002-451';

  test('should match API details with UI elements', async ({ vehicleApiClient, page }) => {
    const vehicleDetailsPage = new VehicleDetailsPage(page);

    await test.step('Navigate to vehicle details page', async () => {
      await vehicleDetailsPage.navigateTo(VEHICLE_ID);
      await vehicleDetailsPage.acceptCookiesIfPresent();
    });

    const { status, data: apiData } = await vehicleApiClient.getVehicleById(VEHICLE_ID);

    await test.step('Verify UI renders correct vehicle details matching API payload', async () => {
      expect(status).toBe(200);
      expect(apiData.Id).toBe(VEHICLE_ID);

      await expect(page.locator('body')).toContainText(apiData.Manufacturer);

      const formattedPriceFromApi =
        apiData.Price.toLocaleString('de-DE', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + ' €';

      await expect(page.locator('body')).toContainText(formattedPriceFromApi);
    });
  });
});
