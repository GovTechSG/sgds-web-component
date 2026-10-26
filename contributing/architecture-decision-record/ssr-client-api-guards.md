# Guard client-side APIs in render() for SSR compatibility

## Status

Accepted

## Context

When SGDS web components are server-side rendered (e.g. in Next.js), the `render()` method executes on the server where browser-only APIs do not exist. This causes runtime errors such as:

- `this.closest is not a function` (DOM traversal)
- `this.host.childNodes is not iterable` (DOM node lists)
- `window is not defined` (browser globals)
- `this.children` being `undefined` (DOM collections)

These errors only surface in `render()` and any methods called from `render()`. Lifecycle methods like `connectedCallback()`, `firstUpdated()`, and event handlers do not run during SSR and are safe.

## Decision

Any component code that runs during `render()` and touches a client-side API must be guarded using the `this.ssr` property from `SgdsElement`. This property is `true` during server-side rendering and `false` in the browser.

### Pattern

```typescript
// In render() or methods called from render():
if (this.ssr) return fallbackValue;
// ... browser-only code
```

### Client-side APIs that require guards

- `window`, `document`, `navigator` and other browser globals
- `this.closest()`, `this.querySelector()`, `this.children`, `this.childNodes`
- `this.shadowRoot` queries (when not using Lit's `@query` decorators)
- Any DOM traversal or measurement APIs (`getBoundingClientRect`, `offsetWidth`, etc.)

### Appropriate fallback values

- Boolean checks (e.g. breakpoint reached): `false`
- Collections (e.g. child elements): `[]`
- Validation checks (e.g. should skip): `true` (skip validation during SSR)
- Slot detection: `false` (no slots detected)

### For ReactiveControllers

Controllers that hold a reference to the host element should access `this.host.ssr`. If the host type is `ReactiveControllerHost & Element`, narrow it to `ReactiveControllerHost & SgdsElement` for type-safe access.

## Consequences

- Component authors must check for client-side API usage in `render()` paths when adding new features.
- SSR produces a safe initial render that may differ from the hydrated client render (e.g. collapsed nav, no slots detected). This is acceptable because Lit's hydration reconciles the DOM after `connectedCallback()` and `firstUpdated()` run in the browser.
- Code reviewers should flag any new `window`, `document`, `this.closest`, `this.children`, or `this.querySelector` usage in `render()` methods as needing an SSR guard.

## Date of proposal

26/10/2026
