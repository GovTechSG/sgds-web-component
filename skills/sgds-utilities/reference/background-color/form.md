# Form Background Colors Reference

**Level**: Component level
**Usage**: Input fields, textareas, select backgrounds

## Available Tokens

### `sgds:bg-surface-default`
**Default form input background.**

**When to use:**
- Text inputs
- Textareas
- Select dropdowns
- Any standard editable form field

```html
<input class="sgds:bg-surface-default" type="text" placeholder="Enter your name" />
```

---

### `sgds:bg-surface-raised`
**Elevated input background.**

**When to use:**
- Floating label inputs
- Inputs that sit above a surface
- Form fields that need visual lift

```html
<input class="sgds:bg-surface-raised" type="text" placeholder="Floating label input" />
```

---

### `sgds:bg-surface-emphasis`
**Highlighted or active input state.**

**When to use:**
- Active or focused form field
- Selected state within a form group

```html
<input class="sgds:bg-surface-emphasis" type="text" placeholder="Active input" />
```

---

### `sgds:bg-surface-subtle`
**Subtle input background.**

**When to use:**
- De-emphasised form fields
- Secondary inputs in a form group

```html
<input class="sgds:bg-surface-subtle" type="text" placeholder="Subtle input" />
```

---

### `sgds:bg-surface-muted`
**Muted background for read-only inputs.**

**When to use:**
- Read-only fields
- Pre-filled fields the user cannot edit
- Visually distinguish from editable inputs

```html
<input class="sgds:bg-surface-muted" type="text" value="Read-only value" readonly />
```

---

### `sgds:bg-surface-inverse`
**Inverted background — adapts to theme.**

**When to use:**
- Form fields placed on a dark surface in day mode
- Form fields placed on a light surface in night mode

```html
<input class="sgds:bg-surface-inverse" type="text" placeholder="Inverted input" />
```

---

### `sgds:bg-surface-fixed-light` / `sgds:bg-surface-fixed-dark`
**Never changes with theme mode.**

**When to use:**
- Form fields on branded or image backgrounds
- Guaranteed contrast regardless of theme

```html
<input class="sgds:bg-surface-fixed-light" type="text" placeholder="Always light input" />
<input class="sgds:bg-surface-fixed-dark" type="text" placeholder="Always dark input" />
```

---

## Common Patterns

> **Note**: Use library components like `<sgds-input>`, `<sgds-select>`, `<sgds-textarea>` when available. Form background tokens are for custom form elements when library components don't meet your needs.

### Standard Form

```html
<form>
  <div>
    <label>First Name</label>
    <input class="sgds:bg-surface-default" type="text" />
  </div>
  <div>
    <label>Last Name</label>
    <input class="sgds:bg-surface-default" type="text" />
  </div>
  <div>
    <label>Email</label>
    <input class="sgds:bg-surface-default" type="email" />
  </div>
</form>
```

### Read-only Field alongside Editable Field

```html
<div>
  <label>Username (locked)</label>
  <input class="sgds:bg-surface-muted" type="text" value="john.doe" readonly />
</div>
<div>
  <label>Display Name</label>
  <input class="sgds:bg-surface-default" type="text" placeholder="Enter display name" />
</div>
```

### Form on Dark Background

```html
<section class="sgds:bg-fixed-dark">
  <input class="sgds:bg-surface-fixed-light" type="text" placeholder="Input on dark section" />
</section>
```

## See Also

- **[base.md](base.md)** — Page-level background tokens
- **[surface.md](surface.md)** — Component surface tokens
- **[border-color](../border-color.md)** — Border colors for form validation states
