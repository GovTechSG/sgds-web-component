# Layout Components

Components that control content structure and overlays: accordion, divider, drawer, and modal.

---

## `<sgds-accordion>` — Collapsible Sections

Use to progressively disclose content — hide non-critical sections by default and let users expand what they need.

```jsx
{/* Single open at a time (default) */}
<sgds-accordion>
  <sgds-accordion-item summary="Section One">
    Content for section one.
  </sgds-accordion-item>
  <sgds-accordion-item summary="Section Two">
    Content for section two.
  </sgds-accordion-item>
</sgds-accordion>

{/* Allow multiple items open simultaneously */}
<sgds-accordion allowMultiple>
  <sgds-accordion-item summary="Terms" open>
    Always visible on load.
  </sgds-accordion-item>
  <sgds-accordion-item summary="Privacy">
    Privacy details.
  </sgds-accordion-item>
</sgds-accordion>
```

**Key attributes:**
| Attribute | Purpose |
|---|---|
| `allowMultiple` | Allow multiple items open at once |
| `summary` | The clickable heading text for the item |
| `open` | Item is expanded on initial render |

**Events fired by `<sgds-accordion-item>`:** `sgds-show`, `sgds-after-show`, `sgds-hide`, `sgds-after-hide` — all cancelable.

---

## `<sgds-divider>` — Visual Separator

Use to create visual separation between content sections. Supports horizontal and vertical orientations.

```jsx
{/* Horizontal divider (default) */}
<sgds-divider></sgds-divider>

{/* Vertical divider */}
<sgds-divider vertical></sgds-divider>

{/* With label */}
<sgds-divider>OR</sgds-divider>
```

---

## `<sgds-modal>` — Blocking Dialog Overlay

Use for confirmations, alerts, or focused tasks that require user attention before continuing. Traps keyboard focus until dismissed.

**When to use:**
- Destructive confirmations (delete, cancel, submit)
- Short focused tasks that interrupt the main flow
- Critical alerts that must be acknowledged

**When NOT to use:**
- For large, complex forms → use a dedicated page instead
- For non-blocking side content → use `<sgds-drawer>`
- For feedback messages → use `<sgds-alert>` or `<sgds-toast>`

```jsx
{/* Trigger */}
<sgds-button onclick={() => document.querySelector('#confirm-modal').show()}>
  Delete Record
</sgds-button>

{/* Modal */}
<sgds-modal id="confirm-modal">
  <div slot="title">Confirm Deletion</div>
  <div slot="body">
    Are you sure you want to delete this record? This action cannot be undone.
  </div>
  <div slot="footer" class="sgds:flex sgds:gap-2 sgds:justify-end">
    <sgds-button variant="outline" onclick={() => document.querySelector('#confirm-modal').hide()}>
      Cancel
    </sgds-button>
    <sgds-button tone="danger" onclick={handleDelete}>Delete</sgds-button>
  </div>
</sgds-modal>
```

**Sizes:** `sm`, `md` (default), `lg`, `xl` via the `size` attribute.

**Methods:** `show()` / `hide()` for programmatic control.

**Events:** `sgds-show`, `sgds-after-show`, `sgds-hide`, `sgds-after-hide`, `sgds-request-close` (cancelable to prevent dismiss).

---

## `<sgds-drawer>` — Sliding Side Panel

Use for secondary navigation, contextual filters, or form-heavy side flows. Slides in from a screen edge and overlays the page without blocking access to the background.

**When to use:**
- Contextual detail view alongside a list
- Filter configuration that takes multiple inputs
- Step-by-step flows that don't warrant a full page

**When NOT to use:**
- Blocking decisions → use `<sgds-modal>` instead

```jsx
{/* Trigger */}
<sgds-button onclick={() => document.querySelector('#filter-drawer').show()}>
  Filters
</sgds-button>

{/* Drawer */}
<sgds-drawer id="filter-drawer" label="Filter Options" placement="end">
  <div class="sgds:flex sgds:flex-col sgds:gap-component-sm sgds:p-component-md">
    <sgds-select label="Status">
      <sgds-select-option value="active">Active</sgds-select-option>
      <sgds-select-option value="inactive">Inactive</sgds-select-option>
    </sgds-select>
    <sgds-button type="button" fullWidth>Apply Filters</sgds-button>
  </div>
</sgds-drawer>
```

**Placement:** `start` (left), `end` (right, default), `top`, `bottom`.

**Methods:** `show()` / `hide()`.
