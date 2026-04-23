# Form Layout Pattern

A responsive form grid that positions SGDS form components according to their type and layout needs. Use this pattern whenever building forms in SGDS apps to maintain consistent spacing and component sizing across all screen sizes.

## When to use

- Creating contact forms, registration forms, and multi-step forms
- Building admin dashboards and internal tools with data entry sections
- Any form that contains multiple fields requiring organized, predictable layout

## Layout rules

Forms must always occupy exactly **8 columns** of the `.sgds-grid` within `.sgds-container` or `.sgds-container-sidebar`:

- **Without side content**: Form can be left-aligned, center, or right-aligned (see [form-positioning.md](form-positioning.md))
- **With side navigation/aside**: Side components take 4 columns; form takes remaining 8 columns
- **With both sides** (side navigation + right TOC): Side components each take 4 columns; form takes center 8 columns (see [form-positioning.md](form-positioning.md) for multi-component grid layouts)

All form components are sized according to their type. **For component-specific API details (attributes, child elements, validation), always refer to the [sgds-components skill](../sgds-components/SKILL.md).**

### Form input components (collect data)

These capture individual form fields:

These components can share a row for **relational field groups** (first name + last name, area code + phone number, etc.):

| Component | Can share row? | Notes |
|---|---|---|
| `<sgds-input>` | Yes | All input types (text, email, password, number, tel, url, search) |
| `<sgds-select>` | Yes | Single-select dropdown |
| `<sgds-combo-box>` single-select | Yes | Only when `multiSelect` is omitted (see sgds-components skill) |
| `<sgds-datepicker>` | Yes | Includes calendar toggle button |
| `<sgds-quantity-toggle>` | Yes | Includes built-in +/− buttons |
| `<sgds-checkbox>` / `<sgds-checkbox-group>` | No | See full-width section below |
| `<sgds-radio>` / `<sgds-radio-group>` | No | See full-width section below |
| `<sgds-textarea>` | No | See full-width section below |
| `<sgds-file-upload>` | No | See full-width section below |

#### 4-column components (can share rows)

#### Full-width (8-column) components

These components must **always** take the full width and cannot share a row:

| Component | Must be full-width | Notes |
|---|---|---|
| `<sgds-checkbox-group>` | Yes | Multiple choice options |
| `<sgds-radio-group>` | Yes | Single choice options |
| `<sgds-textarea>` | Yes | Multi-line text input |
| `<sgds-combo-box>` multi-select | Yes | **⚠️ CRITICAL: Never pair with any other component** |
| `<sgds-file-upload>` | Yes | File picker button |

### Form container/workflow components (organize form steps)

Use these to structure multi-step forms:
- `<sgds-stepper>` — Multi-step form wizard; organizes related input fields into sequential steps. For API details, see the [sgds-components skill](../sgds-components/SKILL.md).

### ⚠️ Critical Rule: Multi-Select Combo-Box

When `multiSelect="true"` on `<sgds-combo-box>`:
- **MUST take full width** — do not wrap in a 4-col grid
- **MUST NOT share a row** with any other component, including other form fields
- Always place in its own `<div>` wrapper (see [Full-Width Components](#full-width-components-textarea-checkbox-radio) example below)

## Form Anatomy

Within the 8-column form container:

```
Form wrapper (flex flex-col gap-layout-lg)
├── Form section (flex flex-col gap-layout-md)
│   ├── Section title (h5, subtitle/lg-semibold)
│   └── Field rows (.sgds-grid, gap-layout-md)
│       ├── 4-col field (.sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6) [for side-by-side pairs]
│       └── 4-col field (.sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6) [optional]
│       or
│       └── Full-width field (block in flex) [full-width: textarea, checkbox-group, radio-group, combo-box multiSelect, file-upload]
└── Form actions (flex gap-layout-sm)
    ├── Primary action (sgds-button type="submit")
    ├── Secondary actions (sgds-button type="reset" or variant="ghost")
    └── Cancel/back link (sgds-link)
```

## Examples

See the playground implementation in `playground/blocks/form/form-basic.html` for complete working examples of all form layout patterns.

## Form Positioning

Forms can be positioned in three ways: **left** (default), **center**, or **right**. See [form-positioning.md](form-positioning.md) for positioning variants, responsive column classes, and playground examples.

## Responsive Form Wrapper Pattern

The form wrapper (and all internal elements) must use **explicit responsive column classes at every breakpoint** to adapt correctly across screen sizes. See [form-positioning.md](form-positioning.md) for the complete column class patterns.

**Key principle:** Do not rely on implicit defaults. Without specifying each breakpoint, the form collapses to 1 column on smaller screens, causing fields to overlap and squeeze.

## Two-Column Field Pairs

For side-by-side fields (first name + last name, email + phone), use:

```html
<div class="sgds-grid sgds:gap-layout-md">
  <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
    <sgds-input label="First name" name="firstName"></sgds-input>
  </div>
  <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
    <sgds-input label="Last name" name="lastName"></sgds-input>
  </div>
</div>
```

**Maintains 50% width at all breakpoints:**
- **Mobile**: 4 of 4-col = 50% per field
- **Small/Medium**: 4 of 8-col = 50% per field
- **Large+**: 6 of 12-col = 50% per field

Wrap pairs in `.sgds-grid` with `sgds:gap-layout-md` to maintain consistent spacing between fields.

## Full-Width Components (Textarea, Checkbox, Radio)

Full-width components do **not** need grid classes. Place them in a plain `<div>` wrapper:

```html
<div>
  <sgds-textarea label="Comments" name="comments"></sgds-textarea>
</div>
```

The flex container automatically stretches them to 100% of the parent form width.

## Spacing Hierarchy

Use semantic spacing utilities to create visual grouping:

- **Between form sections**: `sgds:gap-layout-lg` (largest, clear visual break between Personal Information and Preferences)
- **Within form sections**: `sgds:gap-layout-md` (medium, separation between fields and groups)
- **Between field pairs**: Inherit from parent grid gap

Example:
```html
<form>
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
    <!-- Section 1 with internal gap-layout-md -->
    <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
      <h5>Personal Information</h5>
      <div class="sgds-grid sgds:gap-layout-md">
        <!-- First name + Last name fields -->
      </div>
      <!-- More fields -->
    </div>

    <!-- Section 2 with internal gap-layout-md -->
    <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
      <h5>Preferences</h5>
      <!-- Radio group, checkbox group, etc. -->
    </div>
  </div>
</form>
```

## Nested Layout Structure

Forms use **mixed grid + flex layout** strategically:

- **Outer grid** (`.sgds-grid`): Positions form as 8-column block within `.sgds-container`
- **Inner flex** (`.sgds:flex sgds:flex-col`): Stacks form sections vertically
- **Field rows** (nested `.sgds-grid`): Lays out side-by-side input pairs (first name + last name)
- **Full-width components**: Block display within flex, no grid needed

This combination ensures responsive behavior without over-specifying CSS classes.

## When Form Width is Constrained

When a form shares its container with sidebars or table of contents, the available form width decreases. Adjust field layout accordingly:

### 8-column form (normal)
- Use 4-col field pairs (50% width each)
- Full-width components take entire form width

### 6-column form (e.g., 3-col sidebar + 6-col form + 3-col TOC)
- **Make all fields full-width** — even normally pairable components (Input, Select, etc.)
- Do not use 4-col pairs; the constrained width causes crowding
- Only full-width layout works well at 6 columns

### 4-column form or narrower
- Same rule: all fields full-width
- Field pairs would be too cramped

**Example:** When using `<sgds-sidenav>` (3 columns) + form (6 columns) + `<sgds-table-of-contents>` (3 columns), the form's width is effectively 6 columns in a 12-column grid. Use full-width layout for all form fields, including normally pairable components.

## Header Hierarchy

Form section headers should reflect the visual hierarchy of your page. Use these guidelines:

### Page without a title
- Form section headers: `<h4>` (primary content)
- Table of contents header: `<h5>` (supplementary navigation)

### Page with an `<h1>` title
- Form section headers: `<h5>` (secondary to page title)
- Table of contents header: `<h6>` (supplementary)

### Page with an `<h2>` title
- Form section headers: `<h5>` or `<h6>` (depending on content depth)
- Adjust TOC header accordingly

**Principle:** Form section headers should always be visually higher in hierarchy than TOC headers, since the form is primary content and TOC is navigation aid.

## Customisation notes

- **Wrap form sections** in `sgds:flex sgds:flex-col` with `sgds:gap-layout-lg` between them to create visual separation
- **Wrap field rows** in `.sgds-grid` with `sgds:gap-layout-md` between field pairs
- **Apply validation attributes and feedback** — see [sgds-components skill](../sgds-components/SKILL.md) for component-specific validation API
- **Use custom validation** — see [sgds-forms skill](../sgds-forms/SKILL.md) for ElementInternals and constraint validation patterns
- **Never place full-width components** beside another component in a row
- **Components with built-in action buttons** (datepicker calendar toggle, quantity-toggle +/− buttons, input with action button) should be paired as 50% width (sgds-col-4 sgds-col-sm-4 sgds-col-lg-6) to prevent action buttons from expanding inappropriately
- **Wrap text content** (descriptions, labels, helper text) in a plain `<div>` to maintain alignment with form fields
- **Form sections use `.sgds-col-8` only when inside a parent `.sgds-grid`** (e.g., multi-column page layout). Inside the form's flex wrapper, sections do not need column classes
- **For component-specific details** (child element names, attributes, events, placeholder text) — refer to [sgds-components skill](../sgds-components/SKILL.md)
