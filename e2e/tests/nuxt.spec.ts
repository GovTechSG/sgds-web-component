import { test } from "@playwright/test";
import { expectNoConsoleErrors } from "../utils/console-checker";

test.describe("Nuxt SSR app (nuxt-ssr-lit)", () => {
  test("renders all SGDS web components without console errors", async ({ page }) => {
    await expectNoConsoleErrors(page, "http://127.0.0.1:4003/", {
      ignorePatterns: [
        /favicon\.ico/,
        /logo.*\.svg/,
        /There should be exactly one root part in a render container/,
      ],
    });
  });
});
