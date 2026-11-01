import { test } from "@playwright/test";
import { expectNoConsoleErrors } from "../utils/console-checker";

test.describe("React 19 + Vite CSR app", () => {
  test("renders all SGDS React wrapper components without console errors", async ({ page }) => {
    await expectNoConsoleErrors(page, "http://127.0.0.1:4004/");
  });
});
