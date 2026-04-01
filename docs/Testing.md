# Testing with SGDS Web Components

This guide explains how to unit-test application code that uses SGDS web
components. The short answer: **replace JSDOM with a real browser**. Everything
else follows from that.

---

## Why Jest + JSDOM does not work

Jest and React Testing Library use [JSDOM](https://github.com/jsdom/jsdom) as
the test environment by default. JSDOM is a JavaScript implementation of browser
APIs, but it does not implement:

- **Shadow DOM** — `element.shadowRoot` is always `null`
- **Custom element lifecycles** — `connectedCallback`, `attributeChangedCallback`, and `updated()` never fire
- **`ElementInternals`** — form association used by SGDS form elements breaks silently
- **CSS** — no layout engine, so `getBoundingClientRect` returns zeros

When you render `<sgds-input>` in JSDOM, you get a plain `HTMLElement` with no
shadow root, no properties, and no custom events. There is nothing to test.

**Happy DOM** (`jest-environment-happy-dom`) has partial Shadow DOM support but
still fails on `ElementInternals`, custom event propagation across shadow
boundaries, and layout-dependent behaviour. It is not a reliable substitute.

The only correct fix is to run your tests in a real browser.

---

## Recommended approaches

| Approach | Best for | API style |
|---|---|---|
| **Vitest + browser mode** | Teams migrating from Jest | `describe` / `it` / `expect` (Jest-compatible) |
| **Playwright Component Testing** | Teams already using Playwright | `test` / `expect` (Playwright) |

Both run your components in a real Chromium (or Firefox/WebKit) process. Shadow
DOM, custom elements, `ElementInternals`, and CSS all work exactly as in a
production browser.

---

## Option A — Vitest + browser mode

### Installation

```bash
pnpm add -D vitest @vitest/browser playwright
# also add your framework plugin
pnpm add -D @vitejs/plugin-react        # React
pnpm add -D @vitejs/plugin-vue          # Vue
```

Install the Chromium binary once:

```bash
pnpm exec playwright install chromium
```

### Configuration

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    browser: {
      enabled: true,
      name: "chromium",
      provider: "playwright",
      headless: true,            // set false to watch tests run visually
    },
  },
});
```

### Writing tests

```tsx
// SearchForm.test.tsx
import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SearchForm } from "./SearchForm";

afterEach(() => cleanup()); // no automatic DOM cleanup in browser mode

describe("SearchForm", () => {
  it("upgrades sgds-input as a real custom element", async () => {
    render(<SearchForm onSearch={vi.fn()} />);

    // Wait for the custom element registry — always do this before
    // accessing shadowRoot or element-specific properties.
    await customElements.whenDefined("sgds-input");

    const sgdsInput = document.querySelector("sgds-input")!;

    // This would be null in JSDOM — proof we are in a real browser.
    expect(sgdsInput.shadowRoot).not.toBeNull();
  });

  it("calls onSearch with the typed query", async () => {
    const onSearch = vi.fn();
    render(<SearchForm onSearch={onSearch} />);

    await customElements.whenDefined("sgds-input");

    // Pierce the shadow root to reach the native <input>.
    const nativeInput = document
      .querySelector("sgds-input")!
      .shadowRoot!.querySelector("input")!;

    await userEvent.type(nativeInput, "govtech");

    // See the "sgds-button click" gotcha below before using userEvent.click.
    const sgdsButton = document.querySelector("sgds-button") as HTMLElement;
    sgdsButton.click(); // programmatic .click() delegates to the shadow button

    expect(onSearch).toHaveBeenCalledWith("govtech");
  });
});
```

### Migrating from Jest

Vitest is intentionally Jest-compatible. In most projects you can:

1. Replace `jest` with `vitest` in `package.json`
2. Replace `jest.fn()` with `vi.fn()`, `jest.spyOn` with `vi.spyOn`, etc.
3. Remove `@jest/globals` imports — globals are injected automatically
4. Add the `browser` block to `vitest.config.ts`

---

## Option B — Playwright Component Testing

### Installation

```bash
pnpm add -D @playwright/experimental-ct-react  # React
# or @playwright/experimental-ct-vue, @playwright/experimental-ct-svelte
```

Install the Chromium binary once:

```bash
pnpm exec playwright install chromium
```

### Configuration

```ts
// playwright-ct.config.ts
import { defineConfig, devices } from "@playwright/experimental-ct-react";

export default defineConfig({
  testDir: "./src",
  testMatch: "**/*.spec.tsx",
  use: {
    ctPort: 3100,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
});
```

### Setup file

Create `playwright/index.html` and `playwright/index.tsx`. The `index.tsx` file
runs in the browser before every test — import SGDS here so all custom elements
are registered globally:

```tsx
// playwright/index.tsx
import "@govtechsg/sgds-web-component";
import { beforeMount } from "@playwright/experimental-ct-react/hooks";

beforeMount(async ({ App }) => {
  // Wrap with providers if needed:
  // return <ThemeProvider><App /></ThemeProvider>
});
```

```html
<!-- playwright/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head><meta charset="UTF-8" /></head>
  <body>
    <script type="module" src="./index.tsx"></script>
  </body>
</html>
```

### Writing tests

```tsx
// SearchForm.spec.tsx
import { expect, test } from "@playwright/experimental-ct-react";
import { SearchForm } from "./SearchForm";

test("upgrades sgds-input as a real custom element", async ({ mount, page }) => {
  await mount(<SearchForm onSearch={() => {}} />);

  const isDefined = await page.evaluate(() => !!customElements.get("sgds-input"));
  expect(isDefined).toBe(true);
});

test("calls onSearch with the typed query", async ({ mount, page }) => {
  let captured = "";
  await mount(<SearchForm onSearch={(q) => { captured = q; }} />);

  // Playwright locators pierce one shadow boundary per .locator() chain step.
  await page.locator("sgds-input").locator("input").fill("govtech");
  await page.locator("sgds-button").click();

  expect(captured).toBe("govtech");
});
```

---

## SGDS-specific gotchas

### Clicking `sgds-button` to submit a form

`sgds-button` uses a custom `click()` override that delegates to its internal
shadow `<button>`, which is what triggers form submission via `FormSubmitController`.

`userEvent.click(hostElement)` dispatches pointer and click events on the **host
element** directly. These events do not travel into the shadow DOM, so the shadow
button's click handler never fires and the form is never submitted.

**In Vitest tests**, use one of these two patterns:

```ts
// ✓ Pattern A — programmatic .click() uses the overridden method
const sgdsButton = document.querySelector("sgds-button") as HTMLElement;
sgdsButton.click();

// ✓ Pattern B — target the shadow <button> directly with userEvent
const shadowButton = sgdsButton.shadowRoot!.querySelector("button")!;
await userEvent.click(shadowButton);

// ✗ Do NOT do this — skips the shadow button's click handler
await userEvent.click(document.querySelector("sgds-button")!);
```

**In Playwright tests**, `page.locator("sgds-button").click()` works correctly
because Playwright locates the interactable element automatically.

---

### Always `await customElements.whenDefined()` before querying shadow DOM (Vitest)

Custom elements upgrade asynchronously after the component renders. Accessing
`shadowRoot` before the element upgrades returns `null`.

```ts
// ✓ Wait for upgrade first
await customElements.whenDefined("sgds-input");
const nativeInput = el.shadowRoot!.querySelector("input");

// ✗ Race condition — shadowRoot may be null if called immediately after render
const nativeInput = el.shadowRoot!.querySelector("input");
```

In Playwright CT, `mount()` awaits the component before returning, so this is
not necessary.

---

### Listen to `sgds-*` events, not native ones

SGDS components emit custom events on the host element in addition to (or
instead of) native events. Always listen for the SGDS event.

```ts
el.addEventListener("sgds-input", handler);  // ✓ SGDS custom event on host
el.addEventListener("input", handler);        // ✗ native event — may not fire on host
```

Common SGDS events: `sgds-input`, `sgds-change`, `sgds-focus`, `sgds-blur`,
`sgds-select`, `sgds-show`, `sgds-hide`.

---

### Shadow DOM querying patterns

```ts
// ─── Vitest (manual DOM) ──────────────────────────────────────────────────

// One level deep
const nativeInput = el.shadowRoot!.querySelector("input");

// Read the current value
nativeInput!.value; // "govtech"

// Check host element attributes (label, name, etc.)
expect(el).toHaveAttribute("label", "Search");

// ─── Playwright (locator API) ─────────────────────────────────────────────

// Chain locators — each .locator() call pierces one shadow boundary
const nativeInput = page.locator("sgds-input").locator("input");
await expect(nativeInput).toHaveValue("govtech");

// Visibility check through shadow DOM
await expect(page.locator("sgds-button").locator("button")).toBeVisible();
```

---

### Awaiting Lit re-renders after property changes

When you change a property on an SGDS element, Lit schedules an async re-render.
Await `updateComplete` before asserting on the updated DOM:

```ts
const el = document.querySelector("sgds-button") as SgdsButton;
el.loading = true;
await el.updateComplete;

expect(el.shadowRoot!.querySelector("sgds-spinner")).not.toBeNull();
```

---

### Testing form integration via `FormData`

For form-associated components (`sgds-input`, `sgds-checkbox`, `sgds-select`,
etc.), the most robust assertion is to read the submitted `FormData` directly
rather than querying shadow DOM internals:

```ts
const form = document.querySelector("form")!;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target as HTMLFormElement);
  expect(data.get("query")).toBe("govtech");
});
```

---

## Cleanup in Vitest browser mode

Unlike JSDOM environments, Vitest browser mode does not automatically clean up
the DOM between tests. Call `cleanup()` from `@testing-library/react` (or
equivalent) in `afterEach`:

```ts
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => cleanup());
```

---

## TypeScript: JSX types for SGDS elements

React's JSX types don't know about custom elements. Add a declaration file to
suppress TypeScript errors:

```ts
// src/custom-elements.d.ts
import type { HTMLAttributes } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "sgds-input": HTMLAttributes<HTMLElement> & {
        label?: string;
        name?: string;
        type?: string;
        value?: string;
        placeholder?: string;
        disabled?: boolean;
        required?: boolean;
      };
      "sgds-button": HTMLAttributes<HTMLElement> & {
        type?: "button" | "submit" | "reset";
        variant?: string;
        disabled?: boolean;
        loading?: boolean;
      };
    }
  }
}
```

Add the rest of the SGDS elements you use as needed, or install the official
SGDS types from the package.

---

## Comparison summary

| | Vitest + browser mode | Playwright CT |
|---|---|---|
| **API** | Jest-compatible (`describe`/`it`) | Playwright (`test`) |
| **Migration from Jest** | Low friction | Requires new API |
| **Shadow DOM querying** | Manual `shadowRoot.querySelector()` | `locator().locator()` chaining |
| **`@testing-library/react`** | ✓ Works unchanged | ✗ Use Playwright locators |
| **`customElements.whenDefined()`** | Required before shadow DOM access | Not needed — `mount()` awaits |
| **DOM cleanup** | Manual `afterEach(() => cleanup())` | Automatic per test |
| **CI setup** | `playwright install chromium` | `playwright install chromium` |
| **`sgds-button.click()`** | Use `.click()` or shadow button | `page.locator().click()` works |
| **Best for** | Jest users, Testing Library fans | Playwright E2E + CT unified |

---

## Reference project

A working demo project with both setups side by side is available in
[`sgds-testing-demo/`](../../sgds-testing-demo/README.md):

```
sgds-testing-demo/
├── vitest-browser/    # Vitest + browser mode
└── playwright-ct/     # Playwright Component Testing
```

Each sub-project contains a `SearchForm` component that uses `sgds-input` and
`sgds-button`, with tests that cover rendering, typing, and form submission.
