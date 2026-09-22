# Deprecate component-owned `href` properties in favour of consumer-slotted `<a>` elements

## Status

Proposed

## Context

An Asgard security scan (2026-09-18) identified that components rendering internal `<a>` elements from `href` properties are vulnerable to `javascript:` URL XSS (asgard-0002, asgard-0003). We mitigated this with a `sanitizeHref()` utility, but the underlying design — the component owning the `<a>` — creates a persistent XSS surface that must be maintained.

Several SGDS components already follow a safer pattern where the **consumer** provides the `<a>` element via a slot, and the component only styles and manages accessibility. This is also the approach used by NVIDIA Elements. Frameworks like React 19 and Angular handle `javascript:` URL blocking automatically, but Lit does not — meaning Lit-based design systems must either sanitize at every render site or push anchor ownership to the consumer.

### Current state of href handling across all components

**Component owns the `<a>` (href property) — needs migration:**

| Component | Property | Notes |
|-----------|----------|-------|
| `sgds-button` | `href` | Renders `<a>` or `<button>` conditionally |
| `sgds-icon-button` | `href` | Same pattern as sgds-button |
| `sgds-mainnav` | `brandHref` (via NavElement) | Wraps `brand` slot in `<a>` |
| `sgds-appnav` | `brandHref` (via NavElement) | Same as mainnav |
| `sgds-footer` | `contactHref`, `feedbackHref`, `faqHref`, `sitemapHref`, `privacyHref`, `termsOfUseHref` | 6 internal `<a>` elements |
| `sgds-alert-link` | `href` | Already deprecated (v3.21.0) in favour of slotted `<a>` |

**Consumer owns the `<a>` (slot-based) — already aligned:**

| Component | How it works |
|-----------|-------------|
| `sgds-link` | Consumer slots `<a>`, component styles it and manages disabled state |
| `sgds-breadcrumb-item` | Delegates to `sgds-link` |
| `sgds-mainnav-item` | Consumer slots `<a>`, component processes via `slotchange` |
| `sgds-subnav-item` | Same pattern as mainnav-item |
| `sgds-sidenav-link` | Consumer slots `<a>`, component manages disabled state |
| Card components | Consumer slots `<a>` in `footer` slot; `stretchedLink` forwards attributes |

The slot-based pattern is already the majority approach. The components in the first table are the exceptions that should be aligned.

## Decision

Progressively deprecate component-owned `href` properties across all affected components and migrate to consumer-slotted `<a>` elements, using the existing `sgds-link` / `sgds-mainnav-item` pattern as the model.

### Migration per component

**1. `brandHref` on sgds-mainnav / sgds-appnav**

```html
<!-- New -->
<sgds-mainnav>
  <a slot="brand" href="/">
    <img src="/logo.svg" alt="logo" />
  </a>
</sgds-mainnav>

<!-- Old (deprecated, still works) -->
<sgds-mainnav brandHref="/">
  <img slot="brand" src="/logo.svg" alt="logo" />
</sgds-mainnav>
```

Detect slotted `<a>` on `slotchange`; if present, skip internal wrapper. Otherwise, fall back to `brandHref`.

**2. `href` on sgds-button / sgds-icon-button**

```html
<!-- New -->
<sgds-button>
  <a href="/page">Go</a>
</sgds-button>

<!-- Old (deprecated, still works) -->
<sgds-button href="/page">Go</sgds-button>
```

Detect slotted `<a>` on `slotchange`; if present, render as styled anchor. Otherwise, fall back to internal `<a>` from `href` property. Note: button-as-link is a common pattern — this needs careful consideration for form submission behaviour and `target`/`rel`/`download` attributes.

**3. `*Href` properties on sgds-footer**

```html
<!-- New -->
<sgds-footer>
  <sgds-link slot="contact" size="sm"><a href="/contact">Contact</a></sgds-link>
  <sgds-link slot="feedback" size="sm"><a href="/feedback">Feedback</a></sgds-link>
  <!-- ... -->
</sgds-footer>

<!-- Old (deprecated, still works) -->
<sgds-footer contactHref="/contact" feedbackHref="/feedback"></sgds-footer>
```

Footer has 6 href properties. Migration to slots gives consumers full control over link text, href, and attributes. This is the largest change and may warrant its own named slots for each mandatory link.

**4. `sgds-alert-link` — already deprecated (v3.21.0)**

No further action needed. Already directs consumers to use native `<a>` inside `sgds-alert`.

### Implementation approach (shared across components)

1. Mark `href` / `brandHref` / `*Href` properties as `@deprecated` in JSDoc with version number.
2. On `slotchange`, detect if the slotted element is an `<a>`. If so, apply the component's styling classes and skip internal `<a>` rendering.
3. If no slotted `<a>` is detected, fall back to the existing internal `<a>` rendering (backward compatibility).
4. `sanitizeHref()` remains on the legacy code path as a safety net until the deprecated properties are removed.
5. Remove deprecated properties in the next major version.

### Rollout order

1. `brandHref` (mainnav/appnav) — smallest surface, clearest migration path
2. `href` on sgds-button/sgds-icon-button — moderate complexity, needs form interaction review
3. `*Href` on sgds-footer — largest surface, may need new named slots

## Consequences

**Easier:**
- Eliminates the XSS surface for `href` at the component boundary — consumers own their own `<a>` elements.
- Consumers gain full control over link attributes (`target`, `rel`, `download`, `aria-*`).
- Aligns all components with the pattern already used by the majority of SGDS components.
- Reduces the need to maintain and audit `sanitizeHref()` across render sites.

**More difficult:**
- Consumers write slightly more markup for each link.
- Two code paths per component during the deprecation period.
- Footer migration is non-trivial due to 6 separate href properties and the mandatory government links pattern.
- sgds-button's dual `<a>`/`<button>` rendering adds complexity — slotted `<a>` must not break form submission or button styling.

## Date of proposal

18/09/2026
