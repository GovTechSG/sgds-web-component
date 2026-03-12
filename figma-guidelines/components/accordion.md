# Accordion

**Purpose**: Display collapsible content sections. Use for FAQs, expandable details, or show/hide content panels.

**Components**: `<sgds-accordion>` (container) + `<sgds-accordion-item>` (each panel)

---

## Usage

```html
<!-- Basic accordion — one item open at a time -->
<sgds-accordion>
  <sgds-accordion-item>
    <div slot="header">Section 1</div>
    <div slot="content">Content for section 1.</div>
  </sgds-accordion-item>
  <sgds-accordion-item open>
    <div slot="header">Section 2 (starts open)</div>
    <div slot="content">Content for section 2.</div>
  </sgds-accordion-item>
  <sgds-accordion-item disabled>
    <div slot="header">Section 3 (disabled)</div>
    <div slot="content">Cannot be toggled.</div>
  </sgds-accordion-item>
</sgds-accordion>

<!-- Allow multiple items open at once, compact spacing -->
<sgds-accordion allowMultiple density="compact">
  <sgds-accordion-item open>
    <div slot="header">Item A</div>
    <div slot="content">Content A.</div>
  </sgds-accordion-item>
  <sgds-accordion-item open>
    <div slot="header">Item B</div>
    <div slot="content">Content B.</div>
  </sgds-accordion-item>
</sgds-accordion>

<!-- Border variant -->
<sgds-accordion variant="border">
  <sgds-accordion-item>
    <div slot="header">Bordered section</div>
    <div slot="content">Content here.</div>
  </sgds-accordion-item>
</sgds-accordion>
```

---

## `<sgds-accordion>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `allowMultiple` | boolean | `false` | Allow multiple items open simultaneously |
| `variant` | `default \| border` | `default` | Visual style |
| `density` | `default \| compact` | `default` | Spacing density |

## `<sgds-accordion-item>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `open` | boolean | `false` | Starts the item expanded |
| `disabled` | boolean | `false` | Prevents toggling |

## Slots (`<sgds-accordion-item>`)

| Slot | Content |
|---|---|
| `header` | Clickable header / title |
| `content` | Body content shown when expanded |
| `caret` | Custom caret icon (replaces default chevron) |

## Events (`<sgds-accordion-item>`)

| Event | Cancelable | When |
|---|---|---|
| `sgds-show` | Yes | Item begins expanding |
| `sgds-after-show` | No | Item fully expanded |
| `sgds-hide` | Yes | Item begins collapsing |
| `sgds-after-hide` | No | Item fully collapsed |

## Methods (`<sgds-accordion-item>`)

| Method | Description |
|---|---|
| `show()` | Expands the item |
| `hide()` | Collapses the item |

---

## Notes

- `variant` and `density` are set on `<sgds-accordion>`, not on individual items.
- Without `allowMultiple`, opening one item automatically closes others.
- `sgds-show` and `sgds-hide` are cancelable — call `event.preventDefault()` to stop the transition.
