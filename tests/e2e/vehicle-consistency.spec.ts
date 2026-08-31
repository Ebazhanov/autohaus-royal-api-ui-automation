import { test, expect } from '@fixtures/test.fixture';

test.describe('Vehicle Data Consistency', () => {
  const VEHICLE_ID = '002-451';

  test('should match API details with UI elements', async ({
    vehicleDetailsPage,
    vehicleApi,
    page,
  }) => {
    await test.step('Navigate to vehicle details page', async () => {
      await vehicleDetailsPage.navigateTo(VEHICLE_ID);
      await vehicleDetailsPage.acceptCookiesIfPresent();
    });

    // Call the live Vehicle API via the vehicleApi helper. Let errors bubble so test fails on real issues.
    const apiData = await vehicleApi.getVehicleData(VEHICLE_ID);

    await test.step('Verify UI renders correct vehicle details', async () => {
      expect(apiData.Id).toBe(VEHICLE_ID);
      await expect(page.locator('body')).toContainText(apiData.Manufacturer);

      const formattedPriceFromApi = apiData.Price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
      await expect(page.locator('body')).toContainText(formattedPriceFromApi);
    });
  });
});
