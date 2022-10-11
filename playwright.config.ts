import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // Give failing tests 3 retry attempts
  retries: 3,
};
export default config;