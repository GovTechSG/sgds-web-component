# Switch

**Purpose**: Toggle switch for binary on/off or enabled/disabled state. Equivalent to a checkbox but with a switch UI. Not a form field — does not participate in form data.

**Component**: `<sgds-switch>`

---

## Usage

```html
<!-- Basic switch -->
<sgds-switch>Dark mode</sgds-switch>

<!-- Checked by default -->
<sgds-switch checked>Notifications enabled</sgds-switch>

<!-- Disabled -->
<sgds-switch disabled>Cannot toggle</sgds-switch>

<!-- Checked and disabled -->
<sgds-switch checked disabled>Always on</sgds-switch>

<!-- Sizes -->
<sgds-switch size="sm">Small switch</sgds-switch>
<sgds-switch size="md">Medium switch (default)</sgds-switch>
<sgds-switch size="lg">Large switch</sgds-switch>

<!-- With icon in thumb -->
<sgds-switch icon>Mute notifications</sgds-switch>

<!-- Listen to toggle -->
<sgds-switch id="theme-toggle" checked>Dark mode</sgds-switch>
<script>
  document.getElementById("theme-toggle").addEventListener("sgds-change", (e) => {
    const isOn = e.detail.checked; // boolean
    document.body.classList.toggle("dark-theme", isOn);
    console.log("Dark mode:", isOn);
  });
</script>

<!-- Read current state -->
<sgds-switch id="my-switch">Feature flag</sgds-switch>
<script>
  const sw = document.getElementById("my-switch");
  console.log(sw.checked); // false
</script>
```

---

## Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `checked` | boolean | `false` | Whether the switch is on |
| `disabled` | boolean | `false` | Disables the switch |
| `size` | `sm \| md \| lg` | `md` | Switch size |
| `icon` | boolean | `false` | Shows an icon in the switch thumb |

## Slots

| Slot | Content |
|---|---|
| *(default)* | Label text next to the switch |

## Events

| Event | Description |
|---|---|
| `sgds-change` | Fires on toggle. `event.detail.checked` is a boolean indicating the new state. |

---

## Notes

- `<sgds-switch>` does **not** submit values in form data. To include it in a form, read its `checked` property manually.
- For form-integrated boolean fields, use `<sgds-checkbox>` instead.
- Always include label text for accessibility.
