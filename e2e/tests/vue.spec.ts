import { test } from "@playwright/test";
import { expectNoConsoleErrors } from "../utils/console-checker";
import { expectHealthyShadowDom } from "../utils/shadow-dom-checker";

test.describe("Vue 3 + Vite CSR app", () => {
  test("dev: no console errors", async ({ page }) => {
    await expectNoConsoleErrors(page, "http://127.0.0.1:4001/");
  });

  test("dev: healthy shadow DOM", async ({ page }) => {
    await expectHealthyShadowDom(page, "http://127.0.0.1:4001/", "adoptedStyleSheets");
  });

  test("prod: no console errors", async ({ page }) => {
    await expectNoConsoleErrors(page, "http://127.0.0.1:4011/");
  });

  test("prod: healthy shadow DOM", async ({ page }) => {
    await expectHealthyShadowDom(page, "http://127.0.0.1:4011/", "adoptedStyleSheets");
  });
});
