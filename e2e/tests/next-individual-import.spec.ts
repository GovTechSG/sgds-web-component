import { test } from "@playwright/test";
import { expectNoConsoleErrors } from "../utils/console-checker";
import { expectHealthyShadowDom, expectDsdInPageSource, expectDsdStylesHaveNonce } from "../utils/shadow-dom-checker";

test.describe("Next.js SSR app — individual imports, webpack", () => {
  test("prod: no console errors", async ({ page }) => {
    await expectNoConsoleErrors(page, "http://127.0.0.1:4015/");
  });

  test("prod: healthy shadow DOM", async ({ page }) => {
    await expectHealthyShadowDom(page, "http://127.0.0.1:4015/", "inlineStyles");
  });

  test("prod: DSD templates in page source", async ({ page }) => {
    await expectDsdInPageSource(page, "http://127.0.0.1:4015/");
  });

  test("prod: DSD styles have nonce", async ({ page }) => {
    await expectDsdStylesHaveNonce(page, "http://127.0.0.1:4015/");
  });
});

test.describe("Next.js SSR app — individual imports, turbopack", () => {
  test("prod: no console errors", async ({ page }) => {
    await expectNoConsoleErrors(page, "http://127.0.0.1:4017/");
  });

  test("prod: healthy shadow DOM", async ({ page }) => {
    await expectHealthyShadowDom(page, "http://127.0.0.1:4017/", "inlineStyles");
  });

  test("prod: DSD templates in page source", async ({ page }) => {
    await expectDsdInPageSource(page, "http://127.0.0.1:4017/");
  });

  test("prod: DSD styles have nonce", async ({ page }) => {
    await expectDsdStylesHaveNonce(page, "http://127.0.0.1:4017/");
  });
});
