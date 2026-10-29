# SSR-safe single-template approach for responsive nav components

## Status

Accepted

## Context

Components like `sgds-mainnav-dropdown`, `sgds-mainnav-profile`, and `sgds-mainnav` itself used a JS-computed `breakpointReached` flag (via `window.innerWidth` in `willUpdate()`) to switch between completely different mobile and desktop templates. This broke SSR in three interconnected ways:

### Why the original approach failed on SSR

1. **`window.innerWidth` in `willUpdate()` crashes on the server.** Lit SSR executes `willUpdate()` and `render()` on the server, but `window` does not exist in Node.js, producing a `window is not defined` error.

2. **Guarding `willUpdate()` causes hydration mismatch.** When we guard with `if (isServer) return` or `typeof window !== "undefined"`, the SSR render succeeds — but with wrong values. `breakpointReached` defaults to `false` (desktop), so the server produces desktop DSD (Declarative Shadow DOM). On a mobile device, the client's first render wants a different template → Lit's hydration cannot reconcile the structural mismatch → broken UI.

3. **Letting the error propagate accidentally worked.** Without a guard, the `window` error caused Lit SSR to skip the component's DSD entirely. The client then rendered fresh with no server HTML to mismatch against — everything worked. But this produced a console error and relied on an accidental failure mode, not a deliberate design.

### Why Lit context (`@consume`) was also problematic

Child components (`sgds-mainnav-dropdown`, `sgds-mainnav-profile`) consumed `breakpointReached` from the parent via Lit's `@consume` context decorator. During SSR:

- `connectedCallback()` does not run on the server, so context subscriptions never connect.
- Consumers fall back to their default value (`true` = mobile), while the parent's `willUpdate()` either crashes or produces `false` (desktop).
- This parent-child mismatch in the DSD causes hydration failures.

### Approaches tried and rejected

| Approach | Result |
|---|---|
| Guard `willUpdate()` with `typeof window` | SSR succeeds but produces wrong DSD → hydration mismatch → broken UI |
| Guard with `isServer` from Lit | Same as above |
| `try/catch` in `willUpdate()` | Same — error is caught, render proceeds with wrong defaults |
| Move breakpoint calc to `firstUpdated()` | First render uses wrong defaults → same mismatch |
| Move breakpoint calc to `connectedCallback()` | Sets correct value before first render, but mismatches server DSD |
| Defer to `firstUpdated()` after hydration | Server and client first render match, but brief flash; `updated()` crashes on null slots |
| Remove `@consume`, manual sync via `firstUpdated()` | Slots not ready → `_copyTextToMenu()` throws → component breaks |

**Key insight:** Any approach that computes the breakpoint in JS and uses it to choose between different template structures is fundamentally incompatible with SSR, because the server cannot know the viewport width.

## Decision

### Single-template with CSS media queries for visual switching

Replace dual mobile/desktop templates with a **single unified template** that renders the same HTML on both server and client. CSS media queries (keyed on the `expand` host attribute, already set by the parent `sgds-mainnav`) handle all visual differences between mobile and desktop.

JS breakpoint detection (`matchMedia` in `connectedCallback()`) is used only for **behavioral** differences (click handler dispatching, Floating UI setup) — never for template selection.

### Pattern applied

**Template:** Render all elements for both mobile and desktop in one template. Use CSS classes to mark elements that are mobile-only or desktop-only.

```html
<!-- Both icons rendered; CSS shows the right one -->
<sgds-icon class="icon-down" name="chevron-down"></sgds-icon>
<sgds-icon class="icon-right" name="chevron-right"></sgds-icon>

<!-- Mobile header always rendered; CSS hides on desktop -->
<div class="mobile-header">...</div>

<!-- Single dropdown-menu; CSS styles it as floating (desktop) or slide-in panel (mobile) -->
<div class="dropdown-menu">
  <slot></slot>
</div>
```

**CSS (mobile-first, per expand breakpoint):**

```css
/* Mobile default */
.icon-down { display: none; }
.dropdown-menu { position: absolute; left: 100%; /* slide-in panel */ }

/* Desktop at breakpoint */
@media (min-width: 1024px) {
  :host([expand="lg"]) .icon-down { display: inline-flex; }
  :host([expand="lg"]) .icon-right { display: none; }
  :host([expand="lg"]) .mobile-header { display: none; }
  :host([expand="lg"]) .dropdown-menu {
    position: fixed; /* Floating UI positions via inline styles */
    /* floating menu token styles */
  }
}
```

**JS behavior (SSR-safe):**

```typescript
connectedCallback() {
  super.connectedCallback();
  if (typeof window !== "undefined") {
    const expand = this.closest("sgds-mainnav")?.getAttribute("expand") || "lg";
    this._mediaQuery = window.matchMedia(`(max-width: ${SIZES[expand] - 1}px)`);
    this._isMobile = this._mediaQuery.matches;
    this._mediaQuery.addEventListener("change", this._handleMediaChange);
  }
}
```

`_isMobile` is a plain boolean (not `@state()`). It does not affect the template — only the click handler behavior (mobile slide-in vs desktop floating menu).

### Additional changes to parent `sgds-mainnav`

The parent's render template also used `breakpointReached` for CSS class bindings:

- `navbar-end--empty`: Hid the toggler container on desktop when no profile/non-collapsible slots. **Moved to CSS media queries per expand breakpoint.**
- `slot-end`: Applied desktop flex layout to the end slot. **Now always applied as a class; styles scoped to expand media queries.**

This removed all `breakpointReached` references from `sgds-mainnav`'s template.

### `willUpdate()` guard with `isServer`

With the template no longer dependent on `breakpointReached`, the `isServer` guard in `nav-element.ts` `willUpdate()` is safe. The guard prevents the console error. The DSD produced by SSR now has the correct structure (same template regardless of breakpoint), so hydration succeeds cleanly.

### Removal of `sgds-dropdown` wrapper

Both `sgds-mainnav-dropdown` and `nav-profile-element` previously wrapped their desktop view in `<sgds-dropdown>` for floating UI behavior. Since `sgds-dropdown` exposes no `::part()` selectors, its internal `.dropdown-menu` visibility cannot be overridden from CSS for mobile mode.

The solution was to remove the `sgds-dropdown` dependency and implement Floating UI positioning directly using `computePosition`, `autoUpdate`, `offset`, `flip`, and `shift` from `@floating-ui/dom` (already a project dependency).

### Removal of Lit `@consume` context for breakpoint

`sgds-mainnav-dropdown` and `sgds-mainnav-profile` no longer consume `MainnavBreakpointContext`. Each component detects its own breakpoint via `matchMedia` in `connectedCallback()`. This eliminates the parent-child context propagation timing issues during SSR hydration.

## Consequences

### What becomes easier

- **SSR works correctly** — no console errors, no hydration mismatches, no accidental error-based fallbacks.
- **No flash of wrong layout** — CSS media queries apply immediately based on viewport, no JS computation needed before first paint.
- **Breakpoint changes are handled by CSS** — resizing the browser switches visual state without JS re-rendering.
- **Components are self-contained** — no dependency on parent context for breakpoint state.

### What becomes more difficult

- **CSS is more verbose** — the same desktop override block is repeated for each expand breakpoint (sm, md, lg, xl, xxl, always). This is the trade-off for CSS-only responsive switching with attribute-based breakpoints.
- **Floating UI reimplemented per component** — without `sgds-dropdown`, each component manages its own `computePosition`/`autoUpdate` lifecycle. This is ~30 lines per component.
- **Behavioral differences still require JS** — `matchMedia` in `connectedCallback()` is needed for mobile vs desktop click handling. This is SSR-safe but means JS must run before interactions work.
- **`sgds-appnav` needs the same treatment** — `sgds-appnav` has the same `breakpointReached` template switching pattern. It should be migrated using this same approach.

### Components migrated

- `sgds-mainnav-dropdown` (`src/components/Mainnav/sgds-mainnav-dropdown.ts`)
- `nav-profile-element` (`src/base/nav-profile-element.ts`) — base class for both `sgds-mainnav-profile` and `sgds-appnav-profile`
- `sgds-mainnav` (`src/components/Mainnav/sgds-mainnav.ts`) — `navbar-end--empty` and `slot-end` class bindings
- `nav-element` (`src/base/nav-element.ts`) — `isServer` guard on `willUpdate()`

### Appnav migration plan

`sgds-appnav` (`src/components/Appnav/sgds-appnav.ts`) has 4 remaining `breakpointReached` usages in its render template:

1. `slot-desktop-only` class — conditionally applied based on `breakpointReached`
2. Conditional rendering of toggler (`this.breakpointReached ? this._renderAppnavToggler() : nothing`)
3. `navbar-end` class binding using `breakpointReached`
4. Conditional toggler rendering based on `_hasDefaultSlotItems && breakpointReached`

The same approach applies:
- Move `slot-desktop-only` to CSS media queries per expand breakpoint in `appnav.css`
- Always render the toggler in the template; use CSS `.navbar-expand-{bp} .navbar-toggler { display: none; }` (already exists) to hide on desktop
- Move `navbar-end` conditional classes to CSS media queries
- `sgds-appnav-profile` already extends `NavProfileElement` which is now migrated — just remove the `@consume` override (same as `sgds-mainnav-profile`)

## Date of proposal

29/10/2026
