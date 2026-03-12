# System Banner

**Purpose**: Rotating site-wide announcement banner for system alerts, maintenance notices, or important news. Place **above** `<sgds-masthead>` — the topmost element on the page.

**Components**: `<sgds-system-banner>` + `<sgds-system-banner-item>`

---

## Usage

```html
<!-- Single announcement -->
<sgds-system-banner show>
  <sgds-system-banner-item>
    System maintenance scheduled on 25 Dec 2024 from 2am–4am.
    <sgds-link slot="action" href="/status" tone="fixed-light">Check status</sgds-link>
  </sgds-system-banner-item>
</sgds-system-banner>

<sgds-masthead></sgds-masthead>
<sgds-mainnav>...</sgds-mainnav>

<!-- Multiple rotating announcements with dismiss -->
<sgds-system-banner show dismissible>
  <sgds-system-banner-item>
    Announcement 1 — items rotate every 5 seconds
    <sgds-button slot="action" size="sm" tone="fixed-light" variant="ghost">
      Learn More
    </sgds-button>
  </sgds-system-banner-item>
  <sgds-system-banner-item>
    Announcement 2 — scheduled downtime
    <sgds-link slot="action" href="/info" tone="fixed-light">Details</sgds-link>
  </sgds-system-banner-item>
  <sgds-system-banner-item>
    Announcement 3 — new features available
  </sgds-system-banner-item>
</sgds-system-banner>

<!-- Fluid (full-width) -->
<sgds-system-banner show fluid>
  <sgds-system-banner-item>
    Important notice for all users
  </sgds-system-banner-item>
</sgds-system-banner>

<!-- No clamp on action slot -->
<sgds-system-banner show noClampAction>
  <sgds-system-banner-item>
    Long announcement text that doesn't restrict the action area
    <sgds-link slot="action" href="/action" tone="fixed-light">Take Action Now</sgds-link>
  </sgds-system-banner-item>
</sgds-system-banner>
```

---

## `<sgds-system-banner>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `show` | boolean | `false` | Displays the banner |
| `dismissible` | boolean | `false` | Shows a close button that hides the banner |
| `fluid` | boolean | `false` | Full viewport-width layout |
| `noClampAction` | boolean | `false` | Removes width constraint from the `action` slot |

## `<sgds-system-banner-item>` Slots

| Slot | Content |
|---|---|
| *(default)* | Announcement text |
| `action` | CTA link or button. Use `<sgds-link tone="fixed-light">` or `<sgds-button tone="fixed-light">`. |

## Behaviour

- Multiple items rotate automatically every **5 seconds**.
- The component is dark-background — always use `tone="fixed-light"` on links and buttons inside it.

---

## Notes

- Place `<sgds-system-banner>` as the **first element on the page**, before `<sgds-masthead>`.
- When using `dismissible`, the banner state persists only until page reload unless you store it (e.g., in `sessionStorage`).
