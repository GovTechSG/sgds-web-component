# Close Button

**Purpose**: A standalone dismiss/close button. Use inside custom dismissible UI elements like alerts, banners, modals, or sidebars.

**Component**: `<sgds-close-button>`

---

## Usage

```html
<!-- Default close button -->
<sgds-close-button></sgds-close-button>

<!-- With aria-label for accessibility -->
<sgds-close-button aria-label="Dismiss notification"></sgds-close-button>

<!-- Sizes -->
<sgds-close-button size="sm"></sgds-close-button>
<sgds-close-button size="md"></sgds-close-button>

<!-- Tone variants (for different background contexts) -->
<div style="background: #000; padding: 1rem;">
  <sgds-close-button tone="fixed-light"></sgds-close-button>
</div>

<div style="background: #fff; padding: 1rem;">
  <sgds-close-button tone="fixed-dark"></sgds-close-button>
</div>

<!-- Listen to click -->
<sgds-close-button id="close-btn" aria-label="Close panel"></sgds-close-button>
<script>
  document.getElementById("close-btn").addEventListener("click", () => {
    document.getElementById("my-panel").hidden = true;
  });
</script>
```

---

## Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `size` | `sm \| md` | `md` | Button size |
| `tone` | `default \| fixed-light \| fixed-dark` | `default` | Color tone for the surface it sits on |
| `disabled` | boolean | `false` | Disables the button |

## Events

Only the native `click` event. No custom events.

---

## Notes

- Always add `aria-label` describing what is being closed/dismissed.
- Use `tone="fixed-light"` on dark backgrounds; `tone="fixed-dark"` on light backgrounds.
