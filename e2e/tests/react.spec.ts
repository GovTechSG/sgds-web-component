import { test } from "@playwright/test";
import { expectNoConsoleErrors } from "../utils/console-checker";
import { expectHealthyShadowDom } from "../utils/shadow-dom-checker";

test.describe("React 19 + Vite CSR app", () => {
  test("dev: no console errors", async ({ page }) => {
    await expectNoConsoleErrors(page, "http://127.0.0.1:4004/");
  });

  test("dev: healthy shadow DOM", async ({ page }) => {
    await expectHealthyShadowDom(page, "http://127.0.0.1:4004/", "adoptedStyleSheets");
  });

  test("prod: no console errors", async ({ page }) => {
    await expectNoConsoleErrors(page, "http://127.0.0.1:4014/");
  });

  test("prod: healthy shadow DOM", async ({ page }) => {
    await expectHealthyShadowDom(page, "http://127.0.0.1:4014/", "adoptedStyleSheets");
  });
});
