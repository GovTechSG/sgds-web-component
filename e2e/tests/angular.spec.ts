import { test } from "@playwright/test";
import { expectNoConsoleErrors } from "../utils/console-checker";
import { expectHealthyShadowDom } from "../utils/shadow-dom-checker";

test.describe("Angular 21 CSR app", () => {
  test("no console errors", async ({ page }) => {
    await expectNoConsoleErrors(page, "http://127.0.0.1:4200/");
  });

  test("healthy shadow DOM", async ({ page }) => {
    await expectHealthyShadowDom(page, "http://127.0.0.1:4200/", "adoptedStyleSheets");
  });
});
