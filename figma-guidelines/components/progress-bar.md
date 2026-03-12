# Progress Bar

**Purpose**: A horizontal bar showing task completion or loading progress. Supports labelled accessibility text and two visual variants.

**Component**: `<sgds-progress-bar>`

---

## Usage

```html
<!-- Basic progress bar -->
<sgds-progress-bar value="60"></sgds-progress-bar>

<!-- With visible percentage label -->
<sgds-progress-bar value="75" showLabel></sgds-progress-bar>

<!-- Variants -->
<sgds-progress-bar value="50" variant="primary"></sgds-progress-bar>
<sgds-progress-bar value="50" variant="neutral"></sgds-progress-bar>

<!-- Custom accessible label -->
<sgds-progress-bar
  value="40"
  label="Upload progress"
  showLabel>
</sgds-progress-bar>

<!-- Indeterminate (unknown progress) -->
<sgds-progress-bar indeterminate></sgds-progress-bar>

<!-- Programmatic update -->
<sgds-progress-bar id="progress" value="0" showLabel></sgds-progress-bar>
<script>
  let progress = 0;
  const bar = document.getElementById("progress");
  const interval = setInterval(() => {
    progress += 10;
    bar.value = progress;
    if (progress >= 100) clearInterval(interval);
  }, 500);
</script>
```

---

## Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `value` | number | `0` | Progress percentage (0–100) |
| `variant` | `primary \| neutral` | `primary` | Color variant |
| `label` | string | — | Accessible label for screen readers |
| `showLabel` | boolean | `false` | Shows the percentage label visually |
| `indeterminate` | boolean | `false` | Shows an animated indeterminate bar (unknown progress) |

## Slots

None.

## Events

None.
