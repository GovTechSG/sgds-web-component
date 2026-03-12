# Masthead

**Purpose**: The mandatory Singapore Government identification banner. Must appear at the top of every government website to identify official `.gov.sg` pages.

**Component**: `<sgds-masthead>`

---

## Usage

```html
<!-- Required masthead — place at the very top of the page -->
<sgds-masthead></sgds-masthead>

<!-- Inside an app container (fluid) -->
<sgds-masthead fluid></sgds-masthead>

<!-- Sticky header pattern: masthead + mainnav -->
<header>
  <sgds-masthead></sgds-masthead>
  <sgds-mainnav>
    <a slot="brand" href="/"><img src="/logo.svg" alt="Agency" /></a>
    <sgds-mainnav-item href="/">Home</sgds-mainnav-item>
  </sgds-mainnav>
</header>
```

---

## Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `fluid` | boolean | `false` | Stretches masthead to full viewport width |

## Slots

None.

## Events

None.

---

## Placement Rules

- **Always** place `<sgds-masthead>` as the **first element** inside `<body>` or at the very top of the page layout.
- If the `<sgds-system-banner>` is also used, place `<sgds-system-banner>` **above** `<sgds-masthead>`.
- Do **not** place anything above the masthead except `<sgds-system-banner>`.

```html
<!-- Correct order -->
<body>
  <sgds-system-banner>...</sgds-system-banner>  <!-- if used -->
  <sgds-masthead></sgds-masthead>
  <sgds-mainnav>...</sgds-mainnav>
  <main>...</main>
  <sgds-footer>...</sgds-footer>
</body>
```

---

## Notes

- This component is required on all Singapore Government websites by IM8 policy.
- It renders the "A Singapore Government Agency Website" identifier with an expandable explanation panel.
