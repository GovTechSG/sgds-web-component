import { test } from "@playwright/test";
import { expectNoConsoleErrors } from "../utils/console-checker";
import { expectHealthyShadowDom, expectDsdInPageSource, expectDsdStylesHaveNonce } from "../utils/shadow-dom-checker";

test.describe("Next.js SSR app", () => {
  test("prod: no console errors", async ({ page }) => {
    await expectNoConsoleErrors(page, "http://127.0.0.1:4002/");
  });

  test("prod: healthy shadow DOM", async ({ page }) => {
    await expectHealthyShadowDom(page, "http://127.0.0.1:4002/", "inlineStyles");
  });

  test("prod: DSD templates in page source", async ({ page }) => {
    await expectDsdInPageSource(page, "http://127.0.0.1:4002/");
  });

  test("prod: DSD styles have nonce", async ({ page }) => {
    await expectDsdStylesHaveNonce(page, "http://127.0.0.1:4002/");
  });
});
