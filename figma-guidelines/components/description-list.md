# Description List

**Purpose**: Display key-value pairs (label + data) in a structured list. Supports stacked and bordered styles.

**Components**: `<sgds-description-list-group>` (container) + `<sgds-description-list>` (each row)

---

## Usage

```html
<!-- Basic description list -->
<sgds-description-list-group>
  <sgds-description-list>
    <span slot="label">Full Name</span>
    <span slot="data">John Tan</span>
  </sgds-description-list>
  <sgds-description-list>
    <span slot="label">NRIC</span>
    <span slot="data">S1234567A</span>
  </sgds-description-list>
  <sgds-description-list>
    <span slot="label">Email</span>
    <span slot="data">john@example.com</span>
  </sgds-description-list>
</sgds-description-list-group>

<!-- Stacked layout (label above data) — propagates to all children -->
<sgds-description-list-group stacked>
  <sgds-description-list>
    <span slot="label">Date of Birth</span>
    <span slot="data">01/01/1990</span>
  </sgds-description-list>
  <sgds-description-list>
    <span slot="label">Nationality</span>
    <span slot="data">Singaporean</span>
  </sgds-description-list>
</sgds-description-list-group>

<!-- Bordered rows — propagates to all children -->
<sgds-description-list-group bordered>
  <sgds-description-list>
    <span slot="label">Category</span>
    <span slot="data">Premium</span>
  </sgds-description-list>
  <sgds-description-list>
    <span slot="label">Status</span>
    <span slot="data">Active</span>
  </sgds-description-list>
</sgds-description-list-group>

<!-- With title and description at group level -->
<sgds-description-list-group>
  <span slot="title">Personal Information</span>
  <span slot="description">Details as per identification document</span>
  <sgds-description-list>
    <span slot="label">Name</span>
    <span slot="data">Jane Lim</span>
  </sgds-description-list>
</sgds-description-list-group>
```

---

## `<sgds-description-list-group>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `stacked` | boolean | `false` | Label stacks above data (propagates to all child rows) |
| `bordered` | boolean | `false` | Adds border between rows (propagates to all child rows) |

## Slots (`<sgds-description-list-group>`)

| Slot | Content |
|---|---|
| `title` | Group heading |
| `description` | Supporting text below title |
| *(default)* | `<sgds-description-list>` items |

## Slots (`<sgds-description-list>`)

| Slot | Content |
|---|---|
| `label` | The field name / label |
| `data` | The field value / content |

## Events

None.

---

## Notes

- `stacked` and `bordered` are set on `<sgds-description-list-group>` and automatically apply to all child `<sgds-description-list>` items.
- You can override on individual children if needed.
