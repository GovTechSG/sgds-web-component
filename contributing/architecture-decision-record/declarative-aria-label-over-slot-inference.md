# Declarative ariaLabel over slot text inference

## Status

Accepted

## Context

Components like `<sgds-accordion-item>` render an internal `<button>` in their shadow DOM that requires an accessible label. One approach is to infer the label at runtime by listening for `slotchange` events, reading the assigned nodes' `textContent`, and forwarding it to `aria-label` on the button.

This JS-based inference introduces timing issues:
- The `slotchange` event fires asynchronously after the element connects to the DOM.
- In SSR/hydration scenarios (e.g. Next.js, Astro), the slot content may not be available when the component first renders, causing the button to momentarily lack an accessible label.
- Accessibility scanners (axe-core, Oobee) that run before hydration completes will flag the button as inaccessible.

The `ariaLabel` property pattern already exists across the component library (`sgds-button`, `sgds-icon-button`, `sgds-progress-bar`, `sgds-drawer`, `sgds-sidebar`, `sgds-breadcrumb`), so adopting it is consistent.

## Decision

Use a declarative `ariaLabel` property on components whose internal interactive elements need an accessible label. The consumer explicitly sets the label value matching their header/title text:

```html
<sgds-accordion-item ariaLabel="Section title">
  <div slot="header">Section title</div>
  <div slot="content">...</div>
</sgds-accordion-item>
```

Do not infer the label from slot content via JavaScript.

### Exception: host element `aria-label` from `textContent`

This ADR applies specifically to **internal shadow DOM elements** (e.g. a `<button>` inside the shadow root) that depend on slotted content for their accessible name. When the `aria-label` is needed on the **host element itself** — such as `<sgds-combo-box-option>` or `<sgds-select-option>` which carry `role="menuitem"` on the host — it is acceptable to programmatically set `aria-label` from `this.textContent` in `connectedCallback()`.

This does not suffer from the timing issues described above because:
- The host element's `textContent` is the light DOM text content, which is available synchronously at `connectedCallback` time (no slot projection or async rendering involved).
- There is no dependency on `slotchange` events or shadow DOM rendering completing.

```typescript
connectedCallback(): void {
  super.connectedCallback();
  this.setAttribute("role", "menuitem");
  const label = this.textContent?.trim();
  if (label) {
    this.setAttribute("aria-label", label);
  }
}
```

## Consequences

**Easier:**
- No timing issues — the label is available on first render, including during SSR hydration.
- Passes accessibility scanners (axe-core, Oobee) without needing to wait for `updateComplete` or `slotchange`.
- Simpler implementation — no `@state`, no `slotchange` handler, no `ifDefined` guarding against empty strings.
- Consistent with the existing `ariaLabel` convention used across the library.

**More difficult:**
- Consumers must remember to set `ariaLabel` and keep it in sync with the header text — there is no automatic derivation.
- If the header text changes dynamically, the consumer must also update `ariaLabel`.

## Future direction

Once all components have been converted to use declarative `ariaLabel` and the Oobee a11y scanner has been validated in the CI pipeline, Oobee can replace axe-core as the primary accessibility testing tool. Oobee scans the full rendered DOM including shadow DOM, eliminating the need for the `@open-wc/testing` fixture + `.to.be.accessible()` pattern. The axe-core tests in `test/a11y/axe-core/` can be removed once the corresponding Oobee HTML tests in `test/a11y/oobee/` are proven stable in the pipeline.

## Date of proposal

02/06/2026
