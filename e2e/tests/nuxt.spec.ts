import { test } from "@playwright/test";
import { expectNoConsoleErrors } from "../utils/console-checker";
import { expectHealthyShadowDom, expectDsdInPageSource } from "../utils/shadow-dom-checker";

test.describe("Nuxt SSR app (nuxt-ssr-lit)", () => {
  test("prod: no console errors", async ({ page }) => {
    await expectNoConsoleErrors(page, "http://127.0.0.1:4003/", {
      ignorePatterns: [
        /favicon\.ico/,
        /logo.*\.svg/,
        /There should be exactly one root part in a render container/,
      ],
    });
  });

  test("prod: healthy shadow DOM", async ({ page }) => {
    await expectHealthyShadowDom(page, "http://127.0.0.1:4003/", "inlineStyles");
  });

  test("prod: DSD templates in page source", async ({ page }) => {
    await expectDsdInPageSource(page, "http://127.0.0.1:4003/");
  });
});
