# Use slotchange Event for All DOM Mutations on Slotted Children

## Status

Accepted

## Context

Several components (`SgdsAccordion`, `SgdsMainnav`) need to perform initialisation work on their slotted child elements. Examples include:

- `SgdsAccordion` setting `variant`, `density`, `first-of-type`, `nth-of-type`, and `last-of-type` attributes on each `sgds-accordion-item`.
- `SgdsMainnav` setting the `expand` attribute on every slotted `sgds-mainnav-item` and `sgds-mainnav-dropdown`.
- `SgdsMainnavItem` adding click event listeners to anchor elements found inside its slot.

The original implementation performed these mutations (attributes, event listeners, property assignments, style changes) inside Lit's `firstUpdated` lifecycle hook, iterating over slot-assigned elements retrieved via `@queryAssignedElements`.

`firstUpdated` fires after Lit's first render completes — meaning the component's own shadow DOM (including the `<slot>` element) exists. However, **browser slot assignment is a separate step** that the browser performs when it distributes light DOM children into a shadow DOM slot. The timing of this step relative to the Lit update cycle is not guaranteed. `@queryAssignedElements` calls `slot.assignedElements()` under the hood, which returns an empty array if the browser has not yet completed slot distribution at that point.

Whether `firstUpdated` wins or loses this race depends on:

- **How the component was upgraded**: if the element was already in the parsed HTML before the custom element was defined (e.g. CDN-loaded script, or any deferred `<script type="module">`), the upgrade happens after HTML parsing, and slot distribution may not be complete when `firstUpdated` fires.
- **Browser-internal scheduling**: slot assignment and `slotchange` dispatch are not part of the Lit lifecycle contract and can be deferred to a separate microtask or task.

The result is that `@queryAssignedElements` inside `firstUpdated` is unreliable across loading strategies. All mutations silently no-op, leaving slotted children without correct attributes, event listeners, or styles.

## Decision

All DOM mutations targeting slotted child elements — including `setAttribute`, `addEventListener`, direct property assignment, and style changes — must be moved out of `firstUpdated` and into a `slotchange` event handler wired directly to the slot element in the render template:

```html
<slot @slotchange=${this._handleSlotChange}></slot>
```

The `slotchange` event fires once the browser has assigned elements to the slot, regardless of whether the script was loaded synchronously (local module) or asynchronously (CDN). This makes all slot-dependent initialisation reliable across all loading strategies.

`firstUpdated` must not be used to read or mutate slotted children.

## Consequences

Easier:

- All slot-dependent initialisation (attributes, event listeners, property sets, style mutations) works consistently whether the library is loaded via CDN or as a local module.
- The fix aligns with how the codebase already handles the SSR `slotchange` gap (see `force-slotchange-event-ssr.md`), so the two patches are complementary.
- No additional lifecycle hooks or flags are needed.

More difficult:

- Developers must remember that `@queryAssignedElements` is unreliable inside `firstUpdated` when the component may be loaded via CDN. Any future slot-dependent initialisation — whether it is an attribute, event listener, or any other DOM mutation — must go into a `slotchange` handler instead.
- If a parent property changes after initial render (e.g. `variant` is updated at runtime), the `slotchange` handler alone will not re-propagate the new value. A `@watch` or `updated` hook targeting those specific properties must also call the same propagation logic.
- Event listeners added inside a `slotchange` handler may be registered multiple times if slotted elements change dynamically. Handlers should guard against duplicate registration (e.g. by removing the listener before re-adding it).

## Date of proposal

17/03/2026
