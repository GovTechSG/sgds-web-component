import { type Page, expect } from "@playwright/test";

const HYDRATION_WAIT_MS = 3000;

type StyleMode = "adoptedStyleSheets" | "inlineStyles";

/**
 * Navigates to the URL, waits for hydration, then asserts that all sgds-* elements
 * with shadow roots have:
 * 1. Styles via the expected mechanism (adoptedStyleSheets for CSR, inline <style> for SSR/DSD)
 * 2. No duplicated shadow DOM content (catches DSD hydration failure)
 *
 * @param styleMode - "adoptedStyleSheets" for CSR apps (React, Vue, Angular),
 *                    "inlineStyles" for SSR/DSD apps (Next.js, Nuxt)
 */
export async function expectHealthyShadowDom(page: Page, url: string, styleMode: StyleMode) {
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(HYDRATION_WAIT_MS);

  const issues = await page.evaluate((mode) => {
    const issues: string[] = [];
    const elements = document.querySelectorAll("*");

    for (const el of elements) {
      const tag = el.tagName.toLowerCase();
      if (!tag.startsWith("sgds-") || !el.shadowRoot) continue;

      // Check 1: styles present via the expected mechanism
      if (mode === "adoptedStyleSheets") {
        if (el.shadowRoot.adoptedStyleSheets.length === 0) {
          issues.push(`${tag}: adoptedStyleSheets is empty (styles missing)`);
        }
      } else {
        if (el.shadowRoot.querySelectorAll("style").length === 0) {
          issues.push(`${tag}: no inline <style> tags in shadow root (DSD styles missing)`);
        }
      }

      // Check 2: no duplicate top-level lit-part markers (DSD duplication)
      const walker = document.createTreeWalker(
        el.shadowRoot,
        NodeFilter.SHOW_COMMENT,
        {
          acceptNode: (n) =>
            n.nodeValue?.trim() === "lit-part"
              ? NodeFilter.FILTER_ACCEPT
              : NodeFilter.FILTER_SKIP,
        }
      );
      let topLevelLitParts = 0;
      while (walker.nextNode()) {
        if (walker.currentNode.parentNode === el.shadowRoot) {
          topLevelLitParts++;
        }
      }
      if (topLevelLitParts > 1) {
        issues.push(
          `${tag}: ${topLevelLitParts} top-level lit-part markers (expected 1 — likely DSD duplication)`
        );
      }
    }

    return issues;
  }, styleMode);

  expect(
    issues,
    `Shadow DOM health issues on ${url}:\n${issues.join("\n")}`
  ).toEqual([]);
}

/**
 * Asserts that the raw page source contains DSD templates.
 * Only meaningful for SSR production builds (Next.js, Nuxt).
 */
export async function expectDsdInPageSource(page: Page, url: string) {
  const response = await page.request.get(url);
  const html = await response.text();
  expect(
    html,
    `Page source for ${url} does not contain DSD templates — SSR may not be generating Declarative Shadow DOM`
  ).toContain('shadowrootmode="open"');
}

/**
 * Asserts that DSD <style> tags in the page source have a nonce attribute.
 * Verifies that the ssr-nonce-patch is working — LitElementRenderer.renderShadow()
 * should output <style nonce="..."> inside DSD templates.
 * Only meaningful for Next.js SSR production builds with setCSPNonce() configured.
 */
export async function expectDsdStylesHaveNonce(page: Page, url: string) {
  const response = await page.request.get(url);
  const html = await response.text();

  // Find all <style> tags inside DSD templates (after <template shadowrootmode="open">)
  const dsdStyleRegex = /<template[^>]*shadowrootmode="open"[^>]*>[\s\S]*?<style([^>]*)>/g;
  const matches = [...html.matchAll(dsdStyleRegex)];

  expect(
    matches.length,
    `No DSD <style> tags found in page source for ${url}`
  ).toBeGreaterThan(0);

  const stylesWithoutNonce = matches.filter(m => !m[1].includes("nonce="));
  expect(
    stylesWithoutNonce,
    `DSD <style> tags missing nonce attribute — ssr-nonce-patch may not be working`
  ).toEqual([]);
}
