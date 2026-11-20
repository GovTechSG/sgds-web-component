import { type Page, expect } from "@playwright/test";

/**
 * Visits the given URL, waits for hydration to complete, then listens for
 * console errors during a steady-state observation window.
 *
 * This avoids catching transient errors emitted during SSR hydration
 * (e.g. Lit dev-mode diagnostics) that resolve once hydration finishes.
 */
export async function expectNoConsoleErrors(
  page: Page,
  url: string,
  opts: { waitMs?: number; observeMs?: number; ignorePatterns?: RegExp[] } = {}
) {
  const defaultIgnore = [
    /favicon\.ico/,
    /logo.*\.svg/,    // Logo assets from Storybook templates not present in E2E apps
  ];
  const { waitMs = 3000, observeMs = 2000, ignorePatterns = defaultIgnore } = opts;

  // Navigate and wait for hydration to complete
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(waitMs);

  // Start collecting errors AFTER hydration
  const errors: string[] = [];

  page.on("console", msg => {
    if (msg.type() === "error") {
      const text = msg.text();
      const location = msg.location();
      const fullText = location?.url ? `${text} [${location.url}]` : text;
      const ignored = ignorePatterns.some(p => p.test(fullText));
      if (!ignored) {
        errors.push(fullText);
      }
    }
  });

  page.on("pageerror", err => {
    const text = err.message;
    const ignored = ignorePatterns.some(p => p.test(text));
    if (!ignored) {
      errors.push(`[pageerror] ${text}`);
    }
  });

  // Observe for errors in steady state
  await page.waitForTimeout(observeMs);

  expect(errors, `Console errors found on ${url} (post-hydration):\n${errors.join("\n")}`).toEqual([]);
}
