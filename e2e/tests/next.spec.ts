import { expect, test } from "@playwright/test";
import { expectNoConsoleErrors } from "../utils/console-checker";

test.describe("Next.js SSR app", () => {
  test("renders all SGDS React wrapper components without console errors", async ({ page }) => {
    await expectNoConsoleErrors(page, "http://127.0.0.1:4002/");
    await expect(page.locator("sgds-icon svg").first()).toBeVisible();
  });
});
