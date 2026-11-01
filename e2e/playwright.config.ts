import { defineConfig } from "@playwright/test";

const CI = !!process.env.CI;

// Copy fixtures to each app's public/assets dir before starting
const copyFixtures = (appDir: string, dest = "public") =>
  `mkdir -p apps/${appDir}/${dest} && cp fixtures/component-html.json fixtures/component-list.json fixtures/component-args.json apps/${appDir}/${dest}/`;

export default defineConfig({
  testDir: "./tests",
  timeout: 120_000,
  retries: CI ? 1 : 0,
  reporter: CI ? "github" : "list",
  globalSetup: "./utils/global-setup.ts",
  use: {
    trace: "on-first-retry"
  },
  webServer: [
    // SSR apps: build + start production server
    {
      command: `${copyFixtures("next-app")} && cd apps/next-app && pnpm install && pnpm build && pnpm start`,
      port: 4002,
      timeout: 180_000,
      reuseExistingServer: !CI,
      stdout: "pipe",
      stderr: "pipe"
    },
    {
      command: `${copyFixtures("nuxt-app")} && cd apps/nuxt-app && pnpm install && pnpm build && pnpm preview`,
      port: 4003,
      timeout: 180_000,
      reuseExistingServer: !CI,
      stdout: "pipe",
      stderr: "pipe"
    },
    // CSR apps: dev server
    {
      command: `${copyFixtures("react-app")} && cd apps/react-app && pnpm install && pnpm dev`,
      port: 4004,
      timeout: 120_000,
      reuseExistingServer: !CI,
      stdout: "pipe",
      stderr: "pipe"
    },
    {
      command: `${copyFixtures("vue-app")} && cd apps/vue-app && pnpm install && pnpm dev`,
      port: 4001,
      timeout: 120_000,
      reuseExistingServer: !CI,
      stdout: "pipe",
      stderr: "pipe"
    },
    {
      command: `${copyFixtures("angular-app", "src/assets")} && cd apps/angular-app && pnpm install && pnpm start`,
      port: 4200,
      timeout: 120_000,
      reuseExistingServer: !CI,
      stdout: "pipe",
      stderr: "pipe"
    }
  ]
});
