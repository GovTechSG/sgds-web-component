---
name: "sgds-components"
description: "Complete reference for all SGDS web components including installation. Use when users ask about any <sgds-*> component — accordion, alert, badge, breadcrumb, button, card, checkbox, close-button, combo-box, data-table, datepicker, description-list, divider, drawer, dropdown, file-upload, footer, icon, icon-button, icon-card, icon-list, image-card, input, link, mainnav, masthead, modal, overflow-menu, pagination, progress-bar, quantity-toggle, radio, select, sidebar, sidenav, skeleton, spinner, stepper, subnav, switch, system-banner, tab, table, table-of-contents, textarea, thumbnail-card, toast, or tooltip. For framework integration (React, Next.js, Vue, Angular), see sgds-getting-started."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: components
---

# SGDS Components Setup Skill

Prerequisites and framework integration for using `<sgds-*>` web components.

## Installation

```bash
npm install @govtechsg/sgds-web-component
# or
pnpm add @govtechsg/sgds-web-component
```

Import the library once at your app entry point:

```js
import "@govtechsg/sgds-web-component";
```

## Framework Integration

For React, Next.js, Vue, and Angular integration, see **[sgds-getting-started](../sgds-getting-started/SKILL.md)** Step 3.

---

## Troubleshooting Component Behaviour

When a component behaves unexpectedly — wrong event fired, property not reflected, slot not rendering — read the compiled source directly. It contains full method bodies, event logic, internal defaults, and edge-case handling that no documentation captures.

Read from `node_modules/@govtechsg/sgds-web-component` — this directory is present once the package is installed:

```
node_modules/@govtechsg/sgds-web-component/components/Accordion/sgds-accordion.js
node_modules/@govtechsg/sgds-web-component/components/Accordion/sgds-accordion-item.js
node_modules/@govtechsg/sgds-web-component/components/Accordion/sgds-accordion.d.ts
```

Replace `Accordion/sgds-accordion` with the relevant component folder and file name. The `.js` file contains the full implementation; the `.d.ts` file lists all properties, types, events, slots, and JSDoc descriptions.

**If `node_modules` is absent** — the package has not been installed. Ask the user to run their normal install step (`npm install` / `pnpm install`) before inspecting source files.

---

**For AI agents**: For framework-specific setup (React, Next.js, Vue, Angular), see the reference files in **[sgds-getting-started](../sgds-getting-started/SKILL.md)**.

When a user reports unexpected component behaviour (wrong event, property not reflecting, slot not rendering), direct them to read the compiled source before trying anything else — see the **Troubleshooting Component Behaviour** section above.

**Global rule — never set explicit widths on SGDS components.** Do not add `width`, `style="width: ..."`, or fixed-width utility classes (e.g. `sgds:w-40`) directly on any `<sgds-*>` element. Width is controlled by the parent layout — use flex, grid, or wrapper divs to constrain it. The only exception is when a user explicitly requests a fixed width.

---

## Available Components

| Category | Component | Reference |
|---|---|---|
| **Actions** | Button | [→ reference/button.md](reference/button.md) |
| **Actions** | Icon Button | [→ reference/icon-button.md](reference/icon-button.md) |
| **Actions** | Close Button | [→ reference/close-button.md](reference/close-button.md) |
| **Actions** | Link | [→ reference/link.md](reference/link.md) |
| **Actions** | Dropdown | [→ reference/dropdown.md](reference/dropdown.md) |
| **Actions** | Overflow Menu | [→ reference/overflow-menu.md](reference/overflow-menu.md) |
| **Navigation** | Masthead | [→ reference/masthead.md](reference/masthead.md) |
| **Navigation** | Main Nav | [→ reference/mainnav.md](reference/mainnav.md) |
| **Navigation** | Footer | [→ reference/footer.md](reference/footer.md) |
| **Navigation** | Breadcrumb | [→ reference/breadcrumb.md](reference/breadcrumb.md) |
| **Navigation** | Pagination | [→ reference/pagination.md](reference/pagination.md) |
| **Navigation** | Sidenav | [→ reference/sidenav.md](reference/sidenav.md) |
| **Navigation** | Sidebar | [→ reference/sidebar.md](reference/sidebar.md) |
| **Navigation** | Subnav | [→ reference/subnav.md](reference/subnav.md) |
| **Navigation** | Tab | [→ reference/tab.md](reference/tab.md) |
| **Navigation** | Table of Contents | [→ reference/table-of-contents.md](reference/table-of-contents.md) |
| **Layout** | Accordion | [→ reference/accordion.md](reference/accordion.md) |
| **Layout** | Divider | [→ reference/divider.md](reference/divider.md) |
| **Layout** | Drawer | [→ reference/drawer.md](reference/drawer.md) |
| **Layout** | Modal | [→ reference/modal.md](reference/modal.md) |
| **Content** | Badge | [→ reference/badge.md](reference/badge.md) |
| **Content** | Card | [→ reference/card.md](reference/card.md) |
| **Content** | Icon Card | [→ reference/icon-card.md](reference/icon-card.md) |
| **Content** | Image Card | [→ reference/image-card.md](reference/image-card.md) |
| **Content** | Thumbnail Card | [→ reference/thumbnail-card.md](reference/thumbnail-card.md) |
| **Content** | Description List | [→ reference/description-list.md](reference/description-list.md) |
| **Content** | Data Table | [→ reference/data-table.md](reference/data-table.md) |
| **Content** | Icon | [→ reference/icon.md](reference/icon.md) |
| **Content** | Icon List | [→ reference/icon-list.md](reference/icon-list.md) |
| **Content** | Table | [→ reference/table.md](reference/table.md) |
| **Content** | Tooltip | [→ reference/tooltip.md](reference/tooltip.md) |
| **Forms** | Input | [→ reference/input.md](reference/input.md) |
| **Forms** | Textarea | [→ reference/textarea.md](reference/textarea.md) |
| **Forms** | Select | [→ reference/select.md](reference/select.md) |
| **Forms** | Checkbox | [→ reference/checkbox.md](reference/checkbox.md) |
| **Forms** | Radio | [→ reference/radio.md](reference/radio.md) |
| **Forms** | Combo Box | [→ reference/combo-box.md](reference/combo-box.md) |
| **Forms** | Datepicker | [→ reference/datepicker.md](reference/datepicker.md) |
| **Forms** | File Upload | [→ reference/file-upload.md](reference/file-upload.md) |
| **Forms** | Quantity Toggle | [→ reference/quantity-toggle.md](reference/quantity-toggle.md) |
| **Feedback** | Switch | [→ reference/switch.md](reference/switch.md) |
| **Workflow** | Stepper | [→ reference/stepper.md](reference/stepper.md) |

---

## Form Input Components

When building forms, use these 9 form input components to capture user data:
1. `<sgds-input>` — text fields
2. `<sgds-textarea>` — multi-line text
3. `<sgds-select>` — dropdown selection
4. `<sgds-checkbox>` / `<sgds-checkbox-group>` — multiple choice
5. `<sgds-radio>` / `<sgds-radio-group>` — single choice
6. `<sgds-combo-box>` — searchable select
7. `<sgds-datepicker>` — date input
8. `<sgds-file-upload>` — file picker
9. `<sgds-quantity-toggle>` — numeric counter

**DO NOT use in forms (these are feedback/state, not input):**
- `<sgds-switch>` — This is a **feedback component** (displays toggle state), not a form input. Use `<sgds-checkbox>` or `<sgds-radio-group>` to collect user choice instead.
- Other non-input components (Alert, Badge, Button, Card, etc.) — These are layout/feedback, not form controls.

For form layout patterns (field pairing, spacing, width constraints, multi-step forms with `<sgds-stepper>`, header hierarchy), see the [sgds-blocks form layout skill](../sgds-blocks/reference/form-layout.md).
| **Feedback** | Alert | [→ reference/alert.md](reference/alert.md) |
| **Feedback** | Spinner | [→ reference/spinner.md](reference/spinner.md) |
| **Feedback** | Skeleton | [→ reference/skeleton.md](reference/skeleton.md) |
| **Feedback** | Progress Bar | [→ reference/progress-bar.md](reference/progress-bar.md) |
| **Feedback** | Toast | [→ reference/toast.md](reference/toast.md) |
| **Feedback** | System Banner | [→ reference/system-banner.md](reference/system-banner.md) |
