# Form Patterns Reference

Complete guide to SGDS form layouts, component sizing, positioning, validation patterns, and 4 canonical patterns covering all permutations.

## Table of Contents

1. [When to Use](#when-to-use)
2. [Pattern Template Examples](#pattern-template-examples)
3. [Core Concepts](#core-concepts)
   - [Grid Math & Form Container Width](#grid-math--form-container-width)
   - [Component Pairing Rules](#component-pairing-rules)
   - [Spacing Hierarchy](#spacing-hierarchy)
   - [Form Anatomy](#form-anatomy)
4. [Positioning Variants](#positioning-variants)
   - [Left Positioning (Default)](#left-positioning-default)
   - [Center Positioning](#center-positioning)
   - [Right Positioning](#right-positioning)
5. [Canonical Layout Patterns](#canonical-layout-patterns)
   - [Pattern 1: Full-Width Fields Only](#pattern-1-full-width-fields-only)
   - [Pattern 2: Two-Column Paired Fields](#pattern-2-two-column-paired-fields)
   - [Pattern 3: Mixed Layout (Pairs + Full-Width)](#pattern-3-mixed-layout-pairs--full-width)
   - [Pattern 4: Multiple Sections](#pattern-4-multiple-sections)
6. [Form Actions (Submit/Reset)](#form-actions-submitreset)
7. [Common Permutations](#common-permutations)
8. [Validation & Help Text (Default)](#validation--help-text-default)
9. [Customization Notes](#customization-notes)
10. [Common Mistakes (Anti-Patterns)](#common-mistakes-anti-patterns)
    - [Mistake 1: Pairing a Single Checkbox](#mistake-1-pairing-a-single-checkbox-with-another-component)

For select/combobox option formatting, see [sgds-components skill](../sgds-components/SKILL.md) or the [sgds-components reference](../sgds-components/reference).

---

## When to Use

- Creating contact forms, registration forms, and multi-step forms
- Building admin dashboards and internal tools with data entry sections
- Any form that contains multiple fields requiring organized, predictable layout

---

## Pattern Template Examples

Production-ready form section examples are available in the Storybook repository:

**[Form Sections block](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/refs/heads/master/stories/blocks/form.stories.js)** — Reusable form layout patterns including single section, multi-section, with sidebar, and with sidebar + TOC variants. Extract `Template` functions and adapt them to your data model.

---

## Core Concepts

### Grid Math & Form Container Width

All SGDS forms use `.sgds-grid` with 12-column layout. Forms always occupy exactly **8 columns** of the grid.

**Form wrapper column classes:**

```html
<!-- Left-aligned (default) -->
<form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-8 sgds-col-xl-8 sgds-col-2-xl-8">

<!-- Center-aligned -->
<form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-center-8 sgds-col-xl-center-8 sgds-col-2-xl-center-8">

<!-- Right-aligned (requires custom CSS) -->
<style>
  @media (min-width: 1024px) {
    form.form-right { grid-column: 5 / span 8; }
  }
</style>
<form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 form-right">
```

**Breakpoint encoding:** `sgds-col-{value}` for each breakpoint (4/sm/md/lg/xl/2-xl)

**Responsive behavior (all positioning variants):**
- **Mobile** (default, 4-col grid): Form = full width
- **Small** (512px+, 8-col grid): Form = full width
- **Medium** (768px+, 8-col grid): Form = full width
- **Large+** (1024px+, 12-col grid): Form = 8 of 12 columns at specified position

---

### Component Pairing Rules

| Component | Pairable? | Default Layout | Notes |
|-----------|-----------|-----------------|-------|
| **Input** | ✅ Yes | col-6 pair (4-col at sm) | Text, email, tel, password, number, url, search |
| **Select** | ✅ Yes | col-6 pair (4-col at sm) | Single-select dropdown only |
| **Combo-box (single)** | ✅ Yes | col-6 pair (4-col at sm) | Only when `multiSelect` is omitted |
| **Datepicker** | ✅ Yes | col-6 pair (4-col at sm) | Includes calendar toggle button |
| **Quantity-toggle** | ✅ Yes | col-6 pair (4-col at sm) | Includes built-in +/− buttons |
| **Checkbox-group** | ❌ No | col-12 full-width | Multiple choice; never pair |
| **Radio-group** | ❌ No | col-12 full-width | Single choice; never pair |
| **Textarea** | ❌ No | col-12 full-width | Multi-line; always full-width |
| **Combo-box (multi)** | ❌ No | col-12 full-width | **⚠️ CRITICAL: Never pair with any component** |
| **File-upload** | ❌ No | col-12 full-width | File picker; always full-width |

**Key principle:** Pairing logic = inputs/selects work at 50% width (responsive). Lists/text areas must be full-width.

---

### Spacing Hierarchy

- **Between form sections**: `sgds:gap-layout-lg` (largest, clear visual break)
- **Within form sections**: `sgds:gap-layout-md` (medium, between fields)
- **Between field pairs**: Inherit from parent grid gap

---

### Form Anatomy

```
Form wrapper (flex flex-col gap-layout-lg)
├── Form section (flex flex-col gap-layout-md)
│   ├── Section title (h5, subtitle/lg-semibold)
│   └── Field rows (.sgds-grid, gap-layout-md)
│       ├── 4-col field (.sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6) [pair 1]
│       ├── 4-col field (.sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6) [pair 2]
│       or
│       └── Full-width field (block in flex) [textarea, checkbox-group, radio-group, etc.]
└── Form actions (flex gap-layout-sm items-center)
    ├── Primary action (sgds-button type="submit")
    ├── Secondary actions (sgds-button type="reset" or variant="ghost")
    └── Cancel/back link (sgds-link)
```

---

## Positioning Variants

All forms maintain the same **internal structure**. The only difference is the **column positioning** on the form wrapper.

### Left Positioning (Default)

```html
<div class="sgds-container sgds:py-layout-md">
  <div class="sgds-grid sgds:gap-layout-md">
    <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-8 sgds-col-xl-8 sgds-col-2-xl-8">
      <!-- Form content -->
    </form>
  </div>
</div>
```

**Use case:** Standard form layout, default choice. Occupies columns 1-8 at lg+.

### Center Positioning

```html
<div class="sgds-container sgds:py-layout-md">
  <div class="sgds-grid sgds:gap-layout-md">
    <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-center-8 sgds-col-xl-center-8 sgds-col-2-xl-center-8">
      <!-- Form content -->
    </form>
  </div>
</div>
```

**Use case:** Centered forms with balanced whitespace. Uses SGDS `center-8` tokens. Occupies columns 3-10 at lg+.

### Right Positioning

```html
<style>
  @media (min-width: 1024px) {
    form.form-right { grid-column: 5 / span 8; }
  }
</style>

<div class="sgds-container sgds:py-layout-md">
  <div class="sgds-grid sgds:gap-layout-md">
    <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 form-right">
      <!-- Form content -->
    </form>
  </div>
</div>
```

**Use case:** Forms paired with left sidebar. Requires custom CSS. Occupies columns 5-12 at lg+.

---

## Canonical Layout Patterns

### Pattern 1: Full-Width Fields Only

Use when all fields span the entire form width (textarea, radio groups, checkbox groups, file upload).

```html
<form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-8 sgds-col-xl-8 sgds-col-2-xl-8">
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
    <!-- Section 1 -->
    <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
      <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:text-heading-default sgds:mb-0">
        Section Title
      </h5>

      <!-- Full-width field (no grid wrapper) -->
      <div>
        <sgds-textarea label="Description" name="description" required hasFeedback="both"></sgds-textarea>
      </div>

      <!-- Another full-width field -->
      <div>
        <sgds-radio-group label="Category" name="category" required hasFeedback="both">
          <sgds-radio value="a">Option A</sgds-radio>
          <sgds-radio value="b">Option B</sgds-radio>
        </sgds-radio-group>
      </div>
    </div>

    <!-- Form actions: Secondary (Reset) left, Primary (Submit) right -->
    <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
      <sgds-button type="reset" variant="ghost">Reset</sgds-button>
      <sgds-button type="submit">Submit</sgds-button>
    </div>
  </div>
</form>
```

---

### Pattern 2: Two-Column Paired Fields

Use when combining two input fields (email + phone, first name + last name, etc.). Each field takes **6 columns** at lg+ (50% width), 4 columns at sm (50% of 8-col grid).

```html
<!-- Pair row -->
<div class="sgds-grid sgds:gap-layout-md">
  <!-- Left field (50% width) -->
  <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
    <sgds-input label="First name" name="firstName" type="text" required hasFeedback="both"></sgds-input>
  </div>

  <!-- Right field (50% width) -->
  <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
    <sgds-input label="Last name" name="lastName" type="text" required hasFeedback="both"></sgds-input>
  </div>
</div>
```

**Grid math:**
- Mobile (4-col grid): 4 + 4 = 8 (full width) → 50% each ✅
- Small/Medium (8-col grid): 4 + 4 = 8 (full width) → 50% each ✅
- Large+ (12-col grid): 6 + 6 = 12 (full form width) → 50% each ✅

**Always:**
- Wrap pair in `<div class="sgds-grid sgds:gap-layout-md">`
- Each field gets `sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6`
- Use `.sgds:gap-layout-md` for horizontal spacing
- **Maximum 2 fields per row.** Never pair 3+ fields.

---

### Pattern 3: Mixed Layout (Pairs + Full-Width)

Combine paired fields with full-width fields in the same section.

```html
<div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
  <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:text-heading-default sgds:mb-0">
    Mixed Section
  </h5>

  <!-- Pair row -->
  <div class="sgds-grid sgds:gap-layout-md">
    <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
      <sgds-input label="Email" name="email" type="email" required hasFeedback="both"></sgds-input>
    </div>
    <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
      <sgds-select label="Country" name="country" required hasFeedback="both">
        <sgds-select-option value="sg">Singapore</sgds-select-option>
      </sgds-select>
    </div>
  </div>

  <!-- Full-width field (no grid wrapper) -->
  <div>
    <sgds-textarea label="Comments" name="comments" hasFeedback="both"></sgds-textarea>
  </div>

  <!-- Another pair -->
  <div class="sgds-grid sgds:gap-layout-md">
    <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
      <sgds-datepicker label="Date" name="date" required hasFeedback="both"></sgds-datepicker>
    </div>
    <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
      <sgds-combo-box label="Event" name="event" required hasFeedback="both">
        <sgds-combobox-option value="e1">Event 1</sgds-combobox-option>
      </sgds-combo-box>
    </div>
  </div>
</div>
```

---

### Pattern 4: Multiple Sections

Organize logically related fields into separate sections with headings. Use `gap-layout-lg` between sections for visual breathing room.

```html
<form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-8 sgds-col-xl-8 sgds-col-2-xl-8">
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">

    <!-- SECTION 1 -->
    <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
      <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:text-heading-default sgds:mb-0">
        Personal Info
      </h5>
      <div class="sgds-grid sgds:gap-layout-md">
        <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
          <sgds-input label="Name" name="name" type="text" required hasFeedback="both"></sgds-input>
        </div>
        <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
          <sgds-input label="Email" name="email" type="email" required hasFeedback="both"></sgds-input>
        </div>
      </div>
    </div>

    <!-- SECTION 2 (gap-layout-lg creates visual break) -->
    <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
      <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:text-heading-default sgds:mb-0">
        Preferences
      </h5>
      <div>
        <sgds-radio-group label="Delivery" name="delivery" required hasFeedback="both">
          <sgds-radio value="pickup">Pickup</sgds-radio>
          <sgds-radio value="delivery">Delivery</sgds-radio>
        </sgds-radio-group>
      </div>
    </div>

    <!-- Form actions: Secondary (Cancel) left, Primary (Save) right -->
    <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
      <sgds-button type="reset" variant="ghost">Cancel</sgds-button>
      <sgds-button type="submit">Save</sgds-button>
    </div>
  </div>
</form>
```

**Spacing hierarchy:**
- Between sections: `gap-layout-lg` (outer flex)
- Within section: `gap-layout-md` (fields)
- Between form actions and content: `gap-layout-lg` creates visual separation

---

---

## Form Actions (Submit/Reset)

Always place at the bottom of form:

```html
<div class="sgds:flex sgds:gap-layout-sm sgds:items-center">
  <sgds-button type="submit">Submit</sgds-button>
  <sgds-button type="reset" variant="ghost">Cancel</sgds-button>
</div>
```

Or with link:

```html
<div class="sgds:flex sgds:gap-layout-sm sgds:items-center">
  <sgds-button type="submit">Save</sgds-button>
  <sgds-link><a href="/">Back</a></sgds-link>
</div>
```

---

## Common Permutations

All forms use the **default validation pattern** by default:

```html
<!-- Default: Full feedback (text + styling) -->
<sgds-input
  label="Email"
  name="email"
  type="email"
  required
  hasFeedback="both"
  invalidFeedback="Please enter a valid email address"
></sgds-input>
```

**Default rules:**
- **`hasFeedback="both"`** on all required fields + fields with patterns (shows text + invalid styling)
- **`invalidFeedback`** always provided with custom message (replaces browser default)
- **`hintText`** used for guidance (appears when no error)
- **No `hasFeedback`** on optional, truly optional fields only

**To customize validation**, request an alternative approach explicitly (e.g., "silent validation", "style-only feedback"). Do not vary validation styles within a single form.

---

## Common Permutations

| Use Case | Patterns | Notes |
|----------|----------|-------|
| **Single-Column Form** | 1 (Full-width only) | All fields: textarea, radio, checkbox, file-upload |
| **Registration Form** | 2 (Paired) | Pair: first/last, email/phone, etc. |
| **Multi-Step Form** | 5 (Sidebar nav) | Organize steps in sidebar, form content changes per step |
| **Feedback Form** | 3 (Mixed) | Mix paired inputs with radio/checkbox groups |
| **Settings Form** | 4 (Sections) | Group settings by category (notifications, privacy, appearance) |

---

## Customization Notes

- **Wrap form sections** in `sgds:flex sgds:flex-col` with `sgds:gap-layout-lg` between them
- **Wrap field rows** in `.sgds-grid` with `sgds:gap-layout-md` between field pairs
- **Apply validation attributes** — refer to the [sgds-forms SKILL](../sgds-forms/SKILL.md) for constraint validation
- **Use custom validation** — see the [sgds-forms SKILL](../sgds-forms/SKILL.md) for ElementInternals patterns
- **Never place full-width components** beside another component in a row
- **Components with action buttons** (datepicker, quantity-toggle) should be paired as 50% width to prevent buttons from expanding
- **Wrap text content** in a plain `<div>` to maintain alignment with form fields
- **For component-specific details** (child element names, attributes, events) — refer to the [sgds-components reference](../sgds-components/reference)

---

## Common Mistakes (Anti-Patterns)

These reproducible examples show **what NOT to do**:

### ❌ Mistake 1: Pairing a Single Checkbox with Another Component

**WRONG** — Checkbox paired in grid (50% width):
```html
<!-- INCORRECT: Checkbox must NEVER be paired -->
<div class="sgds-grid sgds:gap-layout-md">
  <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
    <sgds-quantity-toggle label="Tickets" name="tickets" value="1"></sgds-quantity-toggle>
  </div>
  <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
    <sgds-checkbox name="newsletter" value="subscribe">Newsletter</sgds-checkbox>
  </div>
</div>
```

**CORRECT** — Checkbox at full-width (8 cols):
```html
<!-- CORRECT: Checkbox is full-width, never paired -->
<!-- Quantity-toggle in its own row (still 50% width is OK) -->
<div class="sgds-grid sgds:gap-layout-md">
  <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
    <sgds-quantity-toggle label="Tickets" name="tickets" value="1"></sgds-quantity-toggle>
  </div>
</div>

<!-- Full-width: Checkbox on its own -->
<div>
  <sgds-checkbox name="newsletter" value="subscribe">Subscribe to newsletter</sgds-checkbox>
</div>
```

**Rule**: Single checkboxes (`<sgds-checkbox>`) are never pairable. They always span full-width (one per `<div>` with no grid wrapping). Checkbox **groups** (`<sgds-checkbox-group>`) are also full-width.

---

