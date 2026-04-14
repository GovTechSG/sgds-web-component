# Action Components

Components that trigger operations: buttons, links, dropdowns, and overflow menus.

---

## `<sgds-button>` — Primary Action Element

Use `<sgds-button>` for all interactive buttons — never a plain `<button>` with utility classes.

**Never set explicit widths on `<sgds-button>` directly.** Control width via the parent layout.

### When to use

- Primary, secondary, or tertiary actions that trigger an immediate operation (submit, open modal, confirm)
- For navigation between pages — set `href` instead of an `onclick`

### When NOT to use

- Inline text actions within paragraphs — use `<sgds-link>` instead
- Passive information display — avoid decorative buttons

### Variant Decision

| Action type | `variant` |
|---|---|
| Main action on the page | `primary` (default) |
| Secondary / alternative | `outline` |
| Tertiary / low emphasis | `ghost` |

### Tone Decision

| Context | `tone` |
|---|---|
| Standard brand colour | `brand` (default) |
| Destructive / irreversible (delete, remove) | `danger` |
| No brand colour (toolbar, filter) | `neutral` |
| On a dark background | `fixed-light` |

### Size Decision

| Context | `size` |
|---|---|
| Default | `md` |
| Compact (table rows, toolbars) | `sm` or `xs` |
| Prominent CTA | `lg` |

### Button vs Link

- Triggers an action / submits a form → omit `href` (renders `<button>`)
- Navigates to a URL → set `href` (renders `<a role="button">`)

### Action Hierarchy in Groups

Always place the primary action on the right in a horizontal group:

```jsx
<div className="sgds:flex sgds:gap-2 sgds:justify-end">
  <sgds-button variant="outline">Cancel</sgds-button>
  <sgds-button variant="primary">Confirm</sgds-button>
</div>
```

### Common Patterns

```jsx
{/* Primary action */}
<sgds-button>Save</sgds-button>

{/* Secondary action */}
<sgds-button variant="outline">Cancel</sgds-button>

{/* Destructive action */}
<sgds-button tone="danger">Delete Account</sgds-button>

{/* Form submit */}
<sgds-button type="submit">Submit Form</sgds-button>

{/* Form reset */}
<sgds-button type="reset" variant="ghost">Reset</sgds-button>

{/* Navigation link */}
<sgds-button href="/dashboard">Go to Dashboard</sgds-button>

{/* External link */}
<sgds-button href="https://www.gov.sg" target="_blank">Visit Gov.sg</sgds-button>

{/* Loading state (async actions) */}
<sgds-button loading>Saving…</sgds-button>

{/* Full width (mobile, stacked layouts) */}
<sgds-button fullWidth>Sign In</sgds-button>

{/* Icon left */}
<sgds-button>
  <sgds-icon slot="leftIcon" name="arrow-left"></sgds-icon>
  Back
</sgds-button>

{/* Icon right */}
<sgds-button>
  Continue
  <sgds-icon slot="rightIcon" name="arrow-right"></sgds-icon>
</sgds-button>
```

### Key Attributes

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `variant` | `primary \| outline \| ghost` | `primary` | Visual style |
| `tone` | `brand \| danger \| neutral \| fixed-light` | `brand` | Semantic tone |
| `size` | `xs \| sm \| md \| lg` | `md` | Size |
| `type` | `button \| submit \| reset` | `button` | Form behaviour |
| `disabled` | boolean | `false` | Disables interaction |
| `loading` | boolean | `false` | Shows spinner, blocks interaction |
| `fullWidth` | boolean | `false` | Stretches to container width |
| `href` | string | — | Renders as `<a>`, navigates to URL |

---

## `<sgds-icon-button>` — Icon-Only Button

Use for buttons with no visible text label. Manages `aria-label` and sizing automatically.

```jsx
{/* Prefer this over sgds-button with an icon slot and no text */}
<sgds-icon-button name="x-lg" ariaLabel="Close"></sgds-icon-button>
<sgds-icon-button name="pencil" ariaLabel="Edit"></sgds-icon-button>
<sgds-icon-button name="trash" ariaLabel="Delete" tone="danger"></sgds-icon-button>
```

---

## `<sgds-link>` — Inline Text Link

Use for inline text navigation within paragraphs or prose content.

```jsx
<p>
  Read the <sgds-link href="/terms">terms and conditions</sgds-link> before proceeding.
</p>
```

---

## `<sgds-dropdown>` — Dropdown Menu

Use when a button triggers a menu of options. Composed of a trigger button and menu items.

```jsx
<sgds-dropdown>
  <sgds-button slot="toggle" variant="outline">
    Actions
    <sgds-icon slot="rightIcon" name="chevron-down"></sgds-icon>
  </sgds-button>
  <sgds-dropdown-item href="/edit">Edit</sgds-dropdown-item>
  <sgds-dropdown-item href="/duplicate">Duplicate</sgds-dropdown-item>
  <sgds-dropdown-item>Delete</sgds-dropdown-item>
</sgds-dropdown>
```

---

## `<sgds-overflow-menu>` — Compact Action Menu

Use in table rows or card footers where space is limited. Renders as a three-dot (⋯) icon button that reveals a menu.

```jsx
<sgds-overflow-menu>
  <sgds-dropdown-item>View details</sgds-dropdown-item>
  <sgds-dropdown-item>Edit</sgds-dropdown-item>
  <sgds-dropdown-item>Delete</sgds-dropdown-item>
</sgds-overflow-menu>
```
