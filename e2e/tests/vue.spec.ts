import { test } from "@playwright/test";
import { expectNoConsoleErrors } from "../utils/console-checker";

test.describe("Vue 3 + Vite CSR app", () => {
  test("renders all SGDS web components without console errors", async ({ page }) => {
    await expectNoConsoleErrors(page, "http://127.0.0.1:4001/");
  });
});
