---
name: "sgds-pattern-block-templates"
description: "Reusable UI blocks built with SGDS components and utilities that can be mixed and matched inside any page template. Use this skill whenever a user asks about app layout, application shell, page structure, sticky header, masthead placement, mainnav placement, footer placement, sgds-container, sgds-container-sidebar, simple app layout, sidebar app layout, dashboard layout, filter panel, sidebar filter, category filter, checkbox filter, or any self-contained UI section — even if they don't name it a 'block'. These are drop-in sections and shell structures, not full pages. Compose them with sgds-pattern-page-templates to build complete pages."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: pattern
---

# SGDS Block Templates

Reusable UI blocks that slot into any page layout. Each block is a self-contained section — drop it into a page template from **[sgds-pattern-page-templates](../sgds-pattern-page-templates/SKILL.md)** to assemble complete pages without writing layout code from scratch.

## What is a block?

A block is a chunk of UI that:

- Has a single, focused responsibility (filter content, display a stat, show a form section)
- Works standalone inside any container
- Can appear multiple times on a page or alongside other blocks

The **Application Shell** is a special mandatory block — it is the page chrome (`<sgds-masthead>`, `<sgds-mainnav>`, `<sgds-footer>`) that every SGDS page must include. All other blocks are content blocks that slot inside the shell.

Blocks are the ingredients. Page templates are the recipes.

## Prerequisites

```javascript
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component/css/sgds.css";
import "@govtechsg/sgds-web-component/css/utility.css";
```

See **[sgds-components](../sgds-components/SKILL.md)** for full installation details.

---

## Quick Decision Guide

| What you need | Block to use |
|---|---|
| Mandatory page chrome (masthead, mainnav, footer, container) for any SGDS page | [Application Shell](#→-read-referenceapplication-shellmd) |
| Page-level header with breadcrumb, icon + title, description, and primary CTA | [Page Header](#→-read-referencepage-headermd) |
| Read-only entity summary card with key-value fields and an edit action | [Basic Details Card](#→-read-referencebasic-detailsmd) |
| Sidebar panel that filters content by category using checkboxes | [Filter Sidebar — Checkbox](#→-read-referencefilter-sidebar-checkboxmd) |
| Full detail view of a single event session: time, title, speaker, badges, description, profile | [Session Detail](#→-read-referencesession-detailmd) |
| Search input + filter button + results count + data table for list and admin pages | [Table Filter](#→-read-referencetable-filtermd) |
| Multi-field form with proper component sizing, grouping, and layout rules | [Form Layout](#→-read-referenceform-layoutmd) |

---

## → Read [reference/application-shell.md](reference/application-shell.md)

**Required for every page.** The application shell wraps all page content with the mandatory Singapore Government chrome: `<sgds-masthead>`, `<sgds-mainnav>`, and `<sgds-footer>`. Provides two layout variants — Simple App (`.sgds-container`, public-facing) and Sidebar App (`.sgds-container-sidebar`, dashboards and internal tools) — with full breakpoint tables and sticky-header patterns.

---

## → Read [reference/page-header.md](reference/page-header.md)

Breadcrumb trail + icon-tinted container + h1 heading + description + primary CTA button. Use at the top of any content page to orient the user and surface the primary action.

---

## → Read [reference/basic-details.md](reference/basic-details.md)

Bordered card with a subtitle heading, stacked key-value field pairs, and an optional edit button. Use to display read-only entity metadata (IDs, names, descriptions, contact info) on detail or profile pages.

---

## → Read [reference/filter-sidebar-checkbox.md](reference/filter-sidebar-checkbox.md)

Vertical filter panel with grouped `sgds-checkbox-group` sections and a "Clear all" link. Use when content (cards, table rows, event listings) needs to be narrowed by one or more categorical dimensions.

---

## → Read [reference/session-detail.md](reference/session-detail.md)

Full session detail block for event and conference websites. Shows time slot, session title with expand/collapse, speaker attribution, outlined classification badges, description, circular speaker photo with name and role, and a divider. Repeat for each session in a programme listing.

---

## → Read [reference/table-filter.md](reference/table-filter.md)

Page header + search input + outline filter button + results count + data table. Use on list and admin pages where users search or filter tabular records. Table cells support `sgds-link`, `sgds-badge`, and `sgds-button` for rich row content.

---

## → Read [reference/form-layout.md](reference/form-layout.md)

Responsive form grid with SGDS-specific component sizing rules. Forms live in the 8-column content area. Most form inputs take 4 columns (max 2 per row for relational fields like first/last name), while full-width components like textarea, checkbox-group, radio-group, and combobox must always span all 8 columns.

---

## Composing blocks with page templates

Blocks live inside the content area of a page template. The typical pattern:

```html
<!-- Page template provides the chrome -->
<sgds-masthead></sgds-masthead>
<sgds-mainnav>...</sgds-mainnav>

<div class="sgds:bg-surface-default sgds:min-h-screen">
  <div class="sgds:w-container sgds:mx-auto sgds:py-layout-md">

    <!-- Two-column layout: block on the left, content on the right -->
    <div class="sgds:flex sgds:gap-layout-md sgds:items-start">

      <!-- Drop the block here -->
      <aside class="sgds:shrink-0 sgds:w-64">
        <!-- Filter Sidebar block -->
      </aside>

      <!-- Content area -->
      <div class="sgds:flex-1">
        <!-- Cards, table, results, etc. -->
      </div>

    </div>
  </div>
</div>

<sgds-footer></sgds-footer>
```

---

## Before Writing Form Code

Forms are complex because SGDS components have specific constraints. Prevent mistakes by checking these before writing:

### Component API Verification
Read the component reference for every `<sgds-*>` element you use. Mistakes happen when this step is skipped:

- **Child element naming**: Each component has specific child element names. `<sgds-select>` uses `<sgds-select-option>` (not `<sgds-option>`). `<sgds-combo-box>` uses `<sgds-combobox-option>`. Always verify in the [sgds-components skill](../sgds-components/SKILL.md) reference.
- **Slot requirements**: `<sgds-file-upload>` slots require text labels (not just icons). Check if the component expects child elements, slot content, or JS properties.
- **Optional properties**: `<sgds-stepper>` uses a JS property (`steps` array), not HTML child elements like `<sgds-stepper-item>`. Verify which components accept attributes vs. JS properties.

### Grid Math
Forms are sized precisely, and grid math errors cause content to wrap unexpectedly:

- Forms take exactly **8 columns** within `.sgds-container`
- Field pairs (Input + Select, Email + Phone) are each **4 columns**
- If sidebar (4 cols) + form + TOC (4 cols) is planned: form is constrained to 4–6 columns. **All fields must be full-width** at 4–6 columns; never use 4-col pairs.
- Calculate before writing: `sidebar_cols + form_cols + toc_cols ≤ 12`. Common mistake: 4 + 8 + 4 = 16 → TOC wraps below.

### Component Height & Alignment
Mixed-height components need alignment:

- **Button + Link combination** (in form actions): Links are shorter than buttons. Use `sgds:items-center` on the flex container to vertically center them.
- **Multi-select combo-box**: Must be full-width, never paired with other fields. Place in its own `<div>` wrapper.

### Navigation Components
- Use `<sgds-sidenav>` component for sidebar navigation, not plain `<nav>` + `<sgds-link>`. See [sgds-components skill](../sgds-components/SKILL.md) for API.

### Stepper Specifics
- `steps` is a JS property, not HTML children: `stepper.steps = [{ stepHeader: "...", component: "..." }, ...]`
- `activeStep` is 0-indexed (step 0 = first step)
- Listen to `sgds-arrived` event to update displayed step content
- Call `.nextStep()`, `.previousStep()` methods from button handlers

**Always cross-check** against the component reference before coding. Mistakes in these areas are hard to debug after the fact.

---

## Building Custom Blocks

Users are free to design their own blocks with full creative latitude — layout, composition, and visual hierarchy are all open. The only constraint is that every block must stay within the SGDS system rails:

| Requirement | How |
|---|---|
| **UI components** | Use `<sgds-*>` web components. Do not reach for plain HTML equivalents when an SGDS component exists (e.g. use `<sgds-badge>`, not a hand-rolled `<span>` chip). |
| **Styling** | Use `sgds:` Tailwind utilities exclusively for colours, spacing, typography, and layout. Do not write arbitrary CSS values that duplicate what the design token system already expresses. |
| **Typography** | Use semantic role tokens (`sgds:text-heading-md`, `sgds:text-body-md`, `sgds:text-overline-md`, etc.) paired with matching weight, line-height, and tracking tokens. Do not use raw scale tokens (`sgds:text-base`, `sgds:text-sm`) which are not part of the public API. |
| **Icons** | Use `<sgds-icon name="...">` exclusively. Do not embed raw SVG or third-party icon libraries. |
| **External inspiration** | Fine to reference sites like [shadcnblocks.com](https://www.shadcnblocks.com/blocks/about), Tailwind UI, or any other design gallery for layout ideas — but always re-implement using SGDS components and tokens, not the source site's CSS or component library. |

→ Read **[reference/custom-block-rules.md](reference/custom-block-rules.md)** for the full token reference, anti-patterns, and annotated examples.

---

## For AI agents

1. **Every page must have the Application Shell** — `<sgds-masthead>`, `<sgds-mainnav>`, and `<sgds-footer>` are mandatory on every SGDS page. Read **[reference/application-shell.md](reference/application-shell.md)** for layout patterns and container classes.
2. When a user asks for a filtered list page, combine the Filter Sidebar block with the List Page template from **[sgds-pattern-page-templates](../sgds-pattern-page-templates/SKILL.md)**.
3. Adapt category labels, values, and counts to the user's actual data domain — do not copy the conference example verbatim.
4. When a user says "I want to build a custom block" or references an external design (shadcnblocks, Figma, screenshot), read **[reference/custom-block-rules.md](reference/custom-block-rules.md)** before generating any output.
