# SSR-First Component Design Principles

All SGDS components must follow these four principles to ensure server-rendered Declarative Shadow DOM (DSD) and client-side hydration work correctly. Any mismatch between server-rendered DSD and the client's first render causes Lit's hydration to fail, resulting in broken UI or duplicated content.

---

## 1. Single-template rendering

**Rule:** A component's `render()` must return the same DOM structure regardless of viewport size or runtime state that is unavailable on the server.

**Why:** The server cannot know the viewport width. If `render()` uses a JS-computed breakpoint to choose between a mobile template and a desktop template, the server will guess wrong. Lit hydration walks the existing DOM and expects the client's `render()` to produce an identical structure. A structural mismatch breaks hydration.

**Pattern:**

```typescript
// BAD — dual templates based on JS breakpoint
render() {
  return this.breakpointReached
    ? this._renderMobile()   // server can't compute this
    : this._renderDesktop();
}

// GOOD — single template, all elements always rendered
render() {
  return html`
    <sgds-icon class="icon-down" name="chevron-down"></sgds-icon>
    <sgds-icon class="icon-right" name="chevron-right"></sgds-icon>
    <div class="mobile-header">...</div>
    <div class="dropdown-menu">
      <slot></slot>
    </div>
  `;
}
```

**ADR:** `contributing/architecture-decision-record/ssr-single-template-responsive-components.md`

---

## 2. CSS-first visibility

**Rule:** Instead of conditionally rendering elements with JavaScript, always render the full DOM and use CSS media queries to show or hide elements based on viewport.

**Why:** This ensures the server and client HTML always match structurally. CSS media queries apply immediately on the client based on the actual viewport, so there is no flash of wrong layout and no JS computation needed before first paint.

**Pattern:**

```css
/* Mobile-first: hide desktop icon by default */
.icon-down { display: none; }

/* Desktop at breakpoint: show desktop icon, hide mobile icon */
@media (min-width: 1024px) {
  :host([expand="lg"]) .icon-down { display: inline-flex; }
  :host([expand="lg"]) .icon-right { display: none; }
  :host([expand="lg"]) .mobile-header { display: none; }
}
```

JS breakpoint detection (`matchMedia` in `connectedCallback()`) is used only for **behavioral** differences (click handler dispatching, Floating UI setup) — never for template selection.

**ADR:** `contributing/architecture-decision-record/ssr-single-template-responsive-components.md`

---

## 3. Deferred slot detection

**Rule:** Slot-based layout decisions (e.g. checking whether a component has a title slot) must not rely on browser APIs during SSR. Use dedicated SSR indicator properties and defer `HasSlotController` checks until after hydration.

**Why:** `HasSlotController` uses `this.host.childNodes` and `querySelector`, which are unavailable during SSR. If slot detection runs on the server, it produces inconsistent or incorrect results, causing hydration mismatches.

**Pattern:**

```typescript
// Declare SSR-safe properties
@property({ type: Boolean }) hasProfileSlot = false;

private readonly hasSlotController = new HasSlotController(this, "profile");

// Defer real slot check to updated() — runs only on client after hydration
updated() {
  if (!this.hasProfileSlot) {
    this.hasProfileSlot = this.hasSlotController.test("profile");
  }
}

// Use the property in render() — works on both server and client
render() {
  return html`
    <div class="${this.hasProfileSlot ? 'has-profile' : ''}">
      <slot name="profile"></slot>
    </div>
  `;
}
```

The SSR pipeline sets `hasProfileSlot` as an attribute when rendering. On the client, `updated()` runs the real slot check and corrects the value if needed.

**ADR:** `contributing/architecture-decision-record/ssr-prop-slot-detection.md`

---

## 4. Client API guards

**Rule:** All browser-specific logic (`window`, `document`, DOM measurement, DOM traversal) must be restricted to client-only lifecycle hooks (`connectedCallback()`, `firstUpdated()`, event handlers). Any browser API usage in `render()` or methods called from `render()` must be guarded.

**Why:** Lit SSR executes `render()` and `willUpdate()` on the server where `window`, `document`, `this.closest()`, and other browser APIs do not exist. Unguarded access crashes the SSR process.

**Pattern — choosing the right guard:**

| Guard purpose | Use | Why |
|---|---|---|
| Browser API doesn't exist on the server (`window`, `getBoundingClientRect`, etc.) | `this.ssr` / `isServer` | The API is absent only on the server; available immediately on the client |
| Querying child custom elements that must be upgraded | `this.hasUpdated` | Children are not upgraded during the hydration window between bundle load and first `updated()` |

```typescript
// Guard for browser API in render() path
private _measure() {
  if (this.ssr) return 0;
  return this.getBoundingClientRect().width;
}

// Guard for querying child custom elements
private _getCells() {
  if (this.ssr && !this.hasUpdated) return [];
  return Array.from(this.children).filter(
    child => child instanceof SgdsDataTableCell
  );
}

// Safe: browser APIs in client-only lifecycle
connectedCallback() {
  super.connectedCallback();
  window.addEventListener("resize", this._handleResize);
}

firstUpdated() {
  // DOM queries safe here — component is hydrated
  this._setupFloatingUI();
}
```

**ADR:** `contributing/architecture-decision-record/ssr-client-api-guards.md`
