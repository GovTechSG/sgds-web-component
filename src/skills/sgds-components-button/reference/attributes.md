# Button Component — Attributes Reference

## `variant`

Controls the visual style of the button.

```html
<sgds-button variant="primary">Primary</sgds-button>
<sgds-button variant="outline">Outline</sgds-button>
<sgds-button variant="ghost">Ghost</sgds-button>
```

- `primary` — filled background, highest visual weight. Use for the main action on a page or in a dialog.
- `outline` — bordered, transparent background. Use for secondary actions alongside a primary button.
- `ghost` — no border or background. Use for tertiary actions or in toolbars where visual noise should be minimal.

> `danger` variant is **deprecated since v3.5.6**. Use `tone="danger"` instead.

## `tone`

Controls the semantic color palette applied across all variants.

```html
<sgds-button variant="primary" tone="brand">Brand Primary</sgds-button>
<sgds-button variant="primary" tone="danger">Danger Primary</sgds-button>
<sgds-button variant="outline" tone="danger">Danger Outline</sgds-button>
```

- `brand` (default) — uses the SGDS primary brand color
- `danger` — uses red across all variants; suitable for irreversible actions like delete or remove

## `size`

```html
<sgds-button size="xs">Extra Small</sgds-button>
<sgds-button size="sm">Small</sgds-button>
<sgds-button size="md">Medium</sgds-button>
<sgds-button size="lg">Large</sgds-button>
```

Use `xs` / `sm` for compact contexts (tables, inline toolbars), `lg` for prominent hero CTAs.

## `disabled`

```html
<sgds-button disabled>Cannot Click</sgds-button>
```

Sets `aria-disabled="true"` and `tabindex="-1"`. The button remains in the DOM and focusable via mouse but unreachable via keyboard.

## `loading`

```html
<sgds-button loading>Saving…</sgds-button>
```

Replaces content with a `<sgds-spinner>` and blocks all click/keyboard interaction. `aria-label` is automatically set to `"Loading"` while `loading` is active.

## `active`

```html
<sgds-button active>Active State</sgds-button>
```

Forces the pressed/active visual state. Use for toggle buttons or to indicate the currently selected option in a button group.

## `fullWidth`

```html
<sgds-button fullWidth>Full Width</sgds-button>
```

Stretches the button to 100% of its containing element. Typical use: mobile layouts, stacked action lists.

## `type`

```html
<sgds-button type="submit">Submit Form</sgds-button>
<sgds-button type="reset">Reset Form</sgds-button>
<sgds-button type="button">Standalone Action</sgds-button>
```

Defaults to `"button"` (no form association). Set `"submit"` for form submission or `"reset"` to clear a form. See [patterns.md](patterns.md) for form examples.

## `href`, `target`, `download`

When `href` is set, the element renders as `<a role="button">` instead of `<button>`.

```html
<sgds-button href="/dashboard">Go to Dashboard</sgds-button>
<sgds-button href="https://example.com" target="_blank">Open in New Tab</sgds-button>
<sgds-button href="/report.pdf" download="report.pdf">Download PDF</sgds-button>
```

`target="_blank"` automatically adds `rel="noreferrer noopener"`.

## Form Override Attributes

These mirror the native HTML equivalents and override the associated form's settings:

| Attribute | Overrides | Example use case |
|---|---|---|
| `form` | Associates with form by id | Button outside the `<form>` element |
| `formaction` | `<form action>` | Different endpoint for this specific submit button |
| `formmethod` | `<form method>` | POST vs GET per button |
| `formnovalidate` | `<form novalidate>` | "Save draft" button that bypasses validation |
| `formtarget` | `<form target>` | Submit to a different frame/window |

```html
<form id="my-form" action="/submit">
  <input name="email" type="email">
</form>

<!-- Button is outside the form element but still submits it -->
<sgds-button type="submit" form="my-form">Submit</sgds-button>
```

## `ariaLabel`

```html
<sgds-button ariaLabel="Close dialog">✕</sgds-button>
```

Supply when the button has no visible text label (icon-only). For icon-only buttons, strongly prefer `<sgds-icon-button>` which handles accessibility automatically.
