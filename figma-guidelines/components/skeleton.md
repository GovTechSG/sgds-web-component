# Skeleton

**Purpose**: Loading placeholder UI for when content is being fetched. Prevents layout shift and gives users a visual sense of the structure prior to data loading.

**Component**: `<sgds-skeleton>`

---

## Usage

```html
<!-- Single line skeleton (default) -->
<sgds-skeleton></sgds-skeleton>

<!-- Multiple rows -->
<sgds-skeleton rows="3"></sgds-skeleton>

<!-- Different shapes -->
<sgds-skeleton shape="line"></sgds-skeleton>
<sgds-skeleton shape="circle"></sgds-skeleton>
<sgds-skeleton shape="square"></sgds-skeleton>

<!-- Circle avatar placeholder -->
<sgds-skeleton shape="circle" style="width: 48px; height: 48px;"></sgds-skeleton>

<!-- Card skeleton pattern (compose manually) -->
<div style="display: flex; gap: 1rem; align-items: center;">
  <sgds-skeleton shape="circle" style="width: 48px; height: 48px; flex-shrink: 0;"></sgds-skeleton>
  <div style="flex: 1;">
    <sgds-skeleton rows="2"></sgds-skeleton>
  </div>
</div>

<!-- Without sheen (static) -->
<sgds-skeleton rows="4" noAnimation></sgds-skeleton>

<!-- Control width and height with inline styles -->
<sgds-skeleton style="width: 200px; height: 16px;"></sgds-skeleton>
<sgds-skeleton style="width: 60%; height: 16px;"></sgds-skeleton>
```

---

## Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `shape` | `line \| circle \| square` | `line` | Shape of the skeleton block |
| `rows` | number | `1` | Number of line rows to render |
| `noAnimation` | boolean | `false` | Disables the shimmer animation |

## Slots

None.

## Events

None.

---

## Notes

- Control size with CSS `width` / `height` on the element or via inline styles.
- For complex loading states, compose multiple `<sgds-skeleton>` elements to mirror the target layout.
- Replace skeleton elements once data loads — hide with a boolean flag or conditional rendering.
