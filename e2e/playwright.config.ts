import { defineConfig } from "@playwright/test";

const CI = !!process.env.CI;

export default defineConfig({
  testDir: "./tests",
  timeout: 120_000,
  retries: CI ? 1 : 0,
  reporter: CI ? "github" : "list",
  globalSetup: "./utils/global-setup.ts",
  workers: 1,
  use: {
    trace: "on-first-retry"
  },
  webServer: [
    // Next.js — production start (build done in globalSetup)
    {
      command: "cd apps/next-app && pnpm start",
      port: 4002,
      timeout: 300_000,
      reuseExistingServer: !CI,
      stdout: "pipe",
      stderr: "pipe"
    },
    // Nuxt — production build + dev server
    {
      command: "cd apps/nuxt-app && NUXT_BUILD_DIR=.nuxt-prod pnpm build && NUXT_BUILD_DIR=.nuxt-prod pnpm preview",
      port: 4003,
      timeout: 300_000,
      reuseExistingServer: !CI,
      stdout: "pipe",
      stderr: "pipe"
    },
    // React — dev server + production build
    {
      command: "cd apps/react-app && pnpm dev",
      port: 4004,
      timeout: 120_000,
      reuseExistingServer: !CI,
      stdout: "pipe",
      stderr: "pipe"
    },
    {
      command: "cd apps/react-app && pnpm build && pnpm preview",
      port: 4014,
      timeout: 180_000,
      reuseExistingServer: !CI,
      stdout: "pipe",
      stderr: "pipe"
    },
    // Vue — dev server + production build
    {
      command: "cd apps/vue-app && pnpm dev",
      port: 4001,
      timeout: 120_000,
      reuseExistingServer: !CI,
      stdout: "pipe",
      stderr: "pipe"
    },
    {
      command: "cd apps/vue-app && pnpm build && pnpm preview",
      port: 4011,
      timeout: 180_000,
      reuseExistingServer: !CI,
      stdout: "pipe",
      stderr: "pipe"
    },
    // Angular — dev server only
    {
      command: "cd apps/angular-app && pnpm start",
      port: 4200,
      timeout: 120_000,
      reuseExistingServer: !CI,
      stdout: "pipe",
      stderr: "pipe"
    }
  ]
});
