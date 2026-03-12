# SGDS Components Overview

Always prefer components from the `@govtechsg/sgds-web-component` package if they exist. Each component has a guidelines file in `components/` — read it before writing any code.

IMPORTANT: Do not use plain HTML `<button>`, `<input>`, `<select>`, `<a>`, or `<ul>/<li>` when an SGDS component covers that use case.

---

## Component Table

| Component | Purpose | Guidelines File |
|---|---|---|
| Accordion | Collapsible content sections, FAQ layouts | `components/accordion.md` |
| Alert | Contextual feedback banners (info, success, danger, warning) | `components/alert.md` |
| Badge | Labels, status chips, tags, notification indicators | `components/badge.md` |
| Breadcrumb | Navigation trail showing page hierarchy | `components/breadcrumb.md` |
| Button | Primary interactive buttons, CTAs, form submission | `components/button.md` |
| Card | General content card with image, icon, title, description | `components/card.md` |
| Checkbox | Single checkbox or grouped multi-select checkboxes | `components/checkbox.md` |
| Close Button | Dismiss/close action button (× icon) | `components/close-button.md` |
| Combo Box | Searchable filterable dropdown, multi-select, async | `components/combo-box.md` |
| Datepicker | Date or date range selection via calendar input | `components/datepicker.md` |
| Description List | Key-value pairs, definition lists, metadata display | `components/description-list.md` |
| Divider | Horizontal or vertical separator line | `components/divider.md` |
| Drawer | Slide-in side panel overlay | `components/drawer.md` |
| Dropdown | Toggleable menu of navigation links or actions | `components/dropdown.md` |
| File Upload | File input with selected file list | `components/file-upload.md` |
| Footer | Singapore Government site footer | `components/footer.md` |
| Icon | Render icons from the SGDS icon registry | `components/icon.md` |
| Icon Button | Icon-only interactive button | `components/icon-button.md` |
| Icon Card | Card with prominent icon, title, description | `components/icon-card.md` |
| Icon List | List items each prefixed by an icon | `components/icon-list.md` |
| Image Card | Photo-first card with badge and action overlays | `components/image-card.md` |
| Input | Text input with label, validation, prefix/suffix | `components/input.md` |
| Link | Styled navigation anchor | `components/link.md` |
| Main Nav | Primary site navigation bar with hamburger collapse | `components/mainnav.md` |
| Masthead | Mandatory Singapore Government banner | `components/masthead.md` |
| Modal | Dialog overlay for confirmations and focused tasks | `components/modal.md` |
| Overflow Menu | Three-dot icon button that opens an action menu | `components/overflow-menu.md` |
| Pagination | Paged navigation control | `components/pagination.md` |
| Progress Bar | Visual progress indicator | `components/progress-bar.md` |
| Quantity Toggle | Number input with increment/decrement buttons | `components/quantity-toggle.md` |
| Radio | Mutually exclusive radio button group | `components/radio.md` |
| Select | Searchable dropdown selection for forms | `components/select.md` |
| Sidenav | Vertical sidebar navigation with multi-level nesting | `components/sidenav.md` |
| Skeleton | Loading placeholder with shimmer animation | `components/skeleton.md` |
| Spinner | Loading/processing state indicator | `components/spinner.md` |
| Stepper | Multi-step workflow navigation | `components/stepper.md` |
| Subnav | Horizontal secondary navigation bar | `components/subnav.md` |
| Switch | Binary on/off toggle switch | `components/switch.md` |
| System Banner | Rotating site-wide announcement banner | `components/system-banner.md` |
| Tab Group | Tabbed content areas (horizontal or vertical) | `components/tab.md` |
| Table | Structured data table | `components/table.md` |
| Table of Contents | In-page anchor link navigation list | `components/table-of-contents.md` |
| Textarea | Multi-line text input with character count | `components/textarea.md` |
| Thumbnail Card | Compact card with small thumbnail image | `components/thumbnail-card.md` |
| Toast | Brief auto-dismissing notification | `components/toast.md` |
| Tooltip | Contextual help text on hover or focus | `components/tooltip.md` |

---

## Common Patterns

### Events

All SGDS components fire custom events prefixed with `sgds-`. Listen via `addEventListener`:

```js
element.addEventListener("sgds-change", (e) => console.log(e.detail));
```

In React 19+, prefix with `on` lowercase: `onsgds-change`.
In React ≤18 wrappers, camelCase: `onSgdsChange`.

### Form Components

Form components (`sgds-input`, `sgds-select`, `sgds-checkbox`, `sgds-radio-group`, `sgds-datepicker`, `sgds-textarea`, `sgds-combo-box`, `sgds-quantity-toggle`, `sgds-file-upload`) integrate with the browser's ElementInternals API and participate in native `<form>` submission. See `patterns/form-validation.md`.

### Mandatory Government Components

- `<sgds-masthead>` — **required** on all `.gov.sg` digital service pages
- `<sgds-footer>` — **required** on all Singapore Government digital service pages

### Card Variants — Which to Use

| Need | Component |
|---|---|
| General content with image or icon | `<sgds-card>` |
| Photo-first with overlay actions | `<sgds-image-card>` |
| Icon-led vertically centered layout | `<sgds-icon-card>` |
| Compact card with small thumbnail | `<sgds-thumbnail-card>` |
