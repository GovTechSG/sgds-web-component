# SGDS Accordion Component Skill

`<sgds-accordion>` is a container for one or more `<sgds-accordion-item>` elements. Items can be opened and closed individually; setting `allowMultiple` lets multiple items stay open at once.

## Component Definition

The Accordion is a vertically stacked interactive component that allows users to expand and collapse sections of content. Each section consists of a header (trigger) and a content panel (expandable region).

## Purpose

- Enable progressive disclosure of information
- Reduce cognitive load by hiding non-essential content
- Improve scannability for long or structured content
- Optimise space usage, especially on smaller screens

## Usage Guideline

**When to use:**
- Content can be grouped into clear, independent sections
- Users do not need to see all content at once
- Supporting secondary or optional information
- Space is constrained (e.g. mobile, side panels)

**When NOT to use:**
- All content is critical and must be visible
- Users need to compare multiple sections simultaneously without any expand/collapse interaction
- Content is short or minimal — fewer than 2 sections
- Used as a primary navigation pattern

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

## Behaviour

Accordion items support two expand modes:
- **Single-expand (default)** — only one item open at a time; opening another closes the previous
- **Multi-expand** — multiple sections can be open simultaneously; set `allowMultiple` on `<sgds-accordion>`

**Default state:** All items collapsed, or optionally the first item expanded (context-dependent).

**System behaviour:**
- Preserve expanded state where possible — avoid unexpected auto-collapse after user interaction
- Clicking the header toggles visibility; expanded state is indicated via chevron rotation

## Content Guidelines

**Header labels:**
- Keep concise and scannable (1–2 lines max)
- Use sentence case
- Reflect the content inside accurately

✅ Good: "Eligibility criteria", "Payment details"

❌ Avoid: Vague labels like "More info", long descriptive sentences

**Content panels:**
- Structure content using lists, subheadings, and short paragraphs
- Break long content into multiple items instead of one overloaded section
- Maintain consistent formatting across all items

## Interaction Guidelines

- Entire header area must be clickable — not just the label text
- Provide strong visual affordance: chevron rotation, visible hover and focus states
- Animate expand/collapse smoothly — avoid abrupt layout shifts; keep motion subtle
- Maintain the user's reading position when expanding — avoid unexpected scroll jumps
- Ensure a minimum 44px tap target height for touch accessibility

## Best Practices

**Do**
- Use for progressive disclosure of logically grouped content
- Group related content logically and keep structure consistent across items
- Lazy load heavy content inside panels if needed

**Don't**
- Nest more than one level of accordions
- Use as primary navigation
- Hide critical information that users must not miss
- Mix unrelated content in one accordion group
- Use inconsistent interaction patterns within the same accordion

## Common Use Cases

- **FAQ list** — multiple questions with expandable answers
- **Form sections** — personal details, address, payment
- **Settings panels** — grouped configurations
- **Policy / legal content** — terms, disclaimers, guidelines
- **Step-based disclosure** — progressive reveal of instructions

## Accessibility

- Header elements use `<button>` role with `aria-expanded` indicating open/closed state
- Panel uses `aria-controls` linking to the header button
- Keyboard support: `Tab` to navigate, `Enter` / `Space` to toggle
- Ensure visible focus states on all interactive header elements

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
- **Nested interactive elements** — avoid interaction conflicts with components inside accordion panels
