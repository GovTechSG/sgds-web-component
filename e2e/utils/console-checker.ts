import { type Page, expect } from "@playwright/test";

/**
 * Visits the given URL and asserts that no console errors are emitted.
 * Waits for network idle + extra delay for web component hydration.
 */
export async function expectNoConsoleErrors(
  page: Page,
  url: string,
  opts: { waitMs?: number; ignorePatterns?: RegExp[] } = {}
) {
  const defaultIgnore = [
    /favicon\.ico/,
    /logo.*\.svg/,    // Logo assets from Storybook templates not present in E2E apps
  ];
  const { waitMs = 3000, ignorePatterns = defaultIgnore } = opts;
  const errors: string[] = [];

  page.on("console", msg => {
    if (msg.type() === "error") {
      const text = msg.text();
      // Include URL context for 404 errors
      const location = msg.location();
      const fullText = location?.url ? `${text} [${location.url}]` : text;
      const ignored = ignorePatterns.some(p => p.test(fullText));
      if (!ignored) {
        errors.push(fullText);
      }
    }
  });

  // Also catch uncaught exceptions
  page.on("pageerror", err => {
    const text = err.message;
    const ignored = ignorePatterns.some(p => p.test(text));
    if (!ignored) {
      errors.push(`[pageerror] ${text}`);
    }
  });

  await page.goto(url, { waitUntil: "networkidle" });

  // Give web components time to upgrade and hydrate
  await page.waitForTimeout(waitMs);

  expect(errors, `Console errors found on ${url}:\n${errors.join("\n")}`).toEqual([]);
}
