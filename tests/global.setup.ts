import { test as setup } from '@playwright/test';

setup('Set global consent cookies', async ({ context }) => {
  await context.addCookies([
    {
      name: 'CookieDecision_bitMap',
      value: '3',
      domain: '.autohaus-royal.de',
      path: '/',
    },
  ]);
  // Save state to a file
  await context.storageState({ path: 'playwright/.auth/state.json' });
});
