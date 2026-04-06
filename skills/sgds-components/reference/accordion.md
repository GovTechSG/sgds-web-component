# SGDS Accordion Component Skill

`<sgds-accordion>` is a container for one or more `<sgds-accordion-item>` elements. Items can be opened and closed individually; setting `allowMultiple` lets multiple items stay open at once.

## Overview

The Accordion is a vertically stacked set of interactive headers that reveal or hide associated content. Use it to organise dense information into digestible sections, reduce cognitive load through progressive disclosure, and improve scannability.

## When to Use

**Use Accordion when:**
- Content can be logically grouped into sections
- Users do not need to view all content at once
- Space is limited (especially on mobile)
- Supporting secondary or optional information

**Avoid Accordion when:**
- All content is critical and must always be visible
- Users need all sections visible at once without any expand/collapse interaction (use a flat layout instead)
- There are fewer than 2 sections — use simple content instead

## Quick Decision Guide

**Multiple items open at once?** → Add `allowMultiple` on `<sgds-accordion>`

**Outlined border style?** → `variant="border"` on `<sgds-accordion>`

**Compact spacing?** → `density="compact"` on `<sgds-accordion>`

**Start an item open?** → Add `open` on `<sgds-accordion-item>`

```html
<!-- Basic accordion -->
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
    <div slot="content">This item cannot be toggled.</div>
  </sgds-accordion-item>
</sgds-accordion>

<!-- Border variant -->
<sgds-accordion variant="border">
  <sgds-accordion-item>
    <div slot="header">Bordered section</div>
    <div slot="content">Content here.</div>
  </sgds-accordion-item>
</sgds-accordion>

<!-- Allow multiple open at once, compact density -->
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
```

## API Summary

### `<sgds-accordion>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `allowMultiple` | boolean | `false` | Allows multiple items to be open simultaneously |
| `variant` | `default \| border` | `default` | Visual style of the accordion |
| `density` | `default \| compact` | `default` | Spacing density of accordion items |

### `<sgds-accordion-item>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `open` | boolean | `false` | Controls whether the item is expanded |
| `disabled` | boolean | `false` | Prevents the item from being toggled |

## Slots (`<sgds-accordion-item>`)

| Slot | Purpose |
|---|---|
| `header` | The clickable header / title of the accordion item |
| `content` | The body content shown when the item is expanded |
| `caret` | Custom caret/icon replacing the default chevron |

## Events (`<sgds-accordion-item>`)

| Event | Cancelable | Detail | When |
|---|---|---|---|
| `sgds-show` | Yes | — | Item begins expanding |
| `sgds-after-show` | No | — | Item fully expanded (animation complete) |
| `sgds-hide` | Yes | — | Item begins collapsing |
| `sgds-after-hide` | No | — | Item fully collapsed (animation complete) |

## Public Methods (`<sgds-accordion-item>`)

| Method | Description |
|---|---|
| `show()` | Expands the accordion item |
| `hide()` | Collapses the accordion item |

---

**For AI agents**:
1. `variant` and `density` are set on `<sgds-accordion>` (the parent), not on individual items.
2. `sgds-show` and `sgds-hide` are cancelable on `<sgds-accordion-item>` — call `event.preventDefault()` to stop the transition.
3. To start an item expanded on load, add the `open` attribute to `<sgds-accordion-item>`.
4. Without `allowMultiple`, opening one item automatically closes others.
5. Default to the first item open (`open` on first `<sgds-accordion-item>`) only when that section contains key information users need immediately.
6. Use `allowMultiple` when users need to compare sections; use single-expand for guided or sequential reading.
7. Never nest accordions more than one level deep.
8. If a form section inside an accordion item has validation errors, auto-expand that item so the user can see and fix the error.
9. There are no events or public methods on the `<sgds-accordion>` parent element.

## Content Guidelines

**Header labels:**
- Keep concise and scannable (1–2 lines max)
- Use sentence case
- Clearly describe the content inside

✅ Good: "Eligibility criteria", "Payment details"
❌ Avoid: Vague labels like "More info", long paragraphs as headers

**Content panels:**
- Use structured content (lists, paragraphs, subheadings)
- Avoid overly long sections — break into multiple items instead
- Maintain consistent formatting across all items

## Do & Don't

**Do**
- Use for progressive disclosure of logically grouped content
- Keep labels clear, structured, and specific
- Lazy load heavy content inside panels if needed

**Don't**
- Overload a single item with excessive content
- Use as primary navigation
- Hide critical information that users must not miss
- Mix unrelated content in one accordion group

## Common Use Cases

- FAQs
- Form sections (e.g., personal info, payment, shipping)
- Policy or legal content
- Settings panels
- Step-based or sequential disclosures

## Component Composition

**Accordion items can contain:**
- Form fields
- Lists
- Alerts (for contextual information)
- Cards (use sparingly)

**Avoid placing inside accordion items:**
- Heavy nested interactive components that compete for attention

## Edge Cases

- **Very long content** — consider a "View more" pattern instead of a single massive accordion item
- **Dynamic content** — ensure layout stability when content loads asynchronously
- **Error states inside accordion** — auto-expand the affected item so users are not confused
