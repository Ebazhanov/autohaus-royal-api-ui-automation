import { test, expect } from '@fixtures/test.fixture';

test.describe('Vehicle Data Consistency', () => {
  const VEHICLE_ID = '465-259';

  test('should match API details with UI elements', async ({
    vehicleDetailsPage,
    vehicleApi,
    page,
  }) => {
    let apiDataPromise: ReturnType<typeof vehicleApi.waitForVehicleData>;

    await test.step('Listen for vehicle API response', async () => {
      apiDataPromise = vehicleApi.waitForVehicleData(VEHICLE_ID);
    });

    await test.step('Navigate to vehicle details page', async () => {
      await vehicleDetailsPage.navigateTo(VEHICLE_ID);
    });

    const apiData = await test.step('Get vehicle API response data', async () => {
      return await apiDataPromise;
    });

    await test.step('Verify UI renders correct vehicle details', async () => {
      expect(apiData.Id).toBe(VEHICLE_ID);
      await expect(page.locator('body')).toContainText('MERCEDES-BENZ');

      const formattedPrice = apiData.Price.toLocaleString('de-DE');
      await expect(page.locator('body')).toContainText(formattedPrice);
    });
  });
});
