# Drawer

**Purpose**: A slide-in panel overlay anchored to any edge of the screen. Use for contextual sidebars, detail panels, filters, or secondary navigation.

**Component**: `<sgds-drawer>`

---

## Usage

```html
<!-- Basic drawer from the end (right) side -->
<sgds-button id="open-drawer" variant="primary">Open Drawer</sgds-button>

<sgds-drawer id="my-drawer" label="Settings">
  <p>Drawer content goes here.</p>
  <sgds-button slot="footer" variant="primary">Save</sgds-button>
  <sgds-button slot="footer" variant="ghost">Cancel</sgds-button>
</sgds-drawer>

<script>
  const drawer = document.getElementById("my-drawer");
  document.getElementById("open-drawer").addEventListener("click", () => drawer.show());

  drawer.addEventListener("sgds-request-close", (e) => {
    if (!confirm("Close without saving?")) {
      e.preventDefault(); // Prevent the drawer from closing
    }
  });
</script>

<!-- Different placements -->
<sgds-drawer label="Left Panel" placement="start">Content</sgds-drawer>
<sgds-drawer label="Bottom Sheet" placement="bottom">Content</sgds-drawer>
<sgds-drawer label="Top Bar" placement="top">Content</sgds-drawer>

<!-- Different sizes -->
<sgds-drawer label="Small" size="sm">Content</sgds-drawer>
<sgds-drawer label="Large" size="lg">Content</sgds-drawer>

<!-- Contained drawer (scoped to nearest positioned ancestor) -->
<div style="position: relative; height: 400px; overflow: hidden;">
  <sgds-drawer id="contained-drawer" label="Panel" contained placement="end">
    Contained within parent
  </sgds-drawer>
  <sgds-button onclick="document.getElementById('contained-drawer').show()">Open</sgds-button>
</div>

<!-- Open by default -->
<sgds-drawer label="Pre-opened" open>Content</sgds-drawer>
```

---

## Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `open` | boolean | `false` | Whether the drawer is visible |
| `label` | string | — | Accessible header title for the drawer |
| `placement` | `top \| end \| bottom \| start` | `end` | Which edge the drawer slides in from |
| `size` | `sm \| md \| lg` | `md` | Drawer width (or height for top/bottom) |
| `contained` | boolean | `false` | Scopes the drawer to its nearest positioned ancestor |
| `noHeader` | boolean | `false` | Hides the header area |

## Slots

| Slot | Content |
|---|---|
| *(default)* | Drawer body content |
| `header` | Custom header (replaces `label`) |
| `footer` | Footer area (action buttons) |

## Methods

| Method | Description |
|---|---|
| `show()` | Opens the drawer |
| `hide()` | Closes the drawer |

## Events

| Event | Cancelable | Description |
|---|---|---|
| `sgds-show` | No | Drawer begins opening |
| `sgds-after-show` | No | Drawer fully open |
| `sgds-hide` | No | Drawer begins closing |
| `sgds-after-hide` | No | Drawer fully closed |
| `sgds-request-close` | Yes | User requests close (click X, backdrop, Esc). `event.detail.source` indicates trigger. Cancel to prevent close. |

---

## Notes

- Call `event.preventDefault()` on `sgds-request-close` to prevent the drawer from closing (e.g., unsaved changes warning).
- `event.detail.source` values: `"close-button"`, `"overlay"`, `"keyboard"`.
- For contained drawers, the parent must have `position: relative` and `overflow: hidden`.
