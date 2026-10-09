# Font Family

SGDS ships seven semantic font-family tokens that control typography across the entire design system. All tokens inherit from `--sgds-font-family-brand` by default (except `--sgds-font-family-code` which uses the mono stack).

| Token | Default value | Description |
|-------|---------------|-------------|
| `--sgds-font-family-brand` | `var(--sgds-font-family-sans)` | Master brand font. All other semantic tokens inherit from this unless individually overridden. |
| `--sgds-font-family-display` | `var(--sgds-font-family-brand)` | Large hero and display headings. |
| `--sgds-font-family-heading` | `var(--sgds-font-family-brand)` | Section headings. |
| `--sgds-font-family-subtitle` | `var(--sgds-font-family-brand)` | Subtitles and secondary headings. |
| `--sgds-font-family-body` | `var(--sgds-font-family-brand)` | Paragraph and body text. |
| `--sgds-font-family-label` | `var(--sgds-font-family-brand)` | Form labels, buttons, badges, and UI controls. |
| `--sgds-font-family-code` | `var(--sgds-font-family-mono)` | Code blocks and inline code. |

## Changing the brand font

To use a custom font, first load it via Google Fonts (or any font provider) in your HTML `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;600;700&display=swap">
```

Then override the brand token in your CSS:

```css
:root {
  --sgds-font-family-brand: "Noto Sans", system-ui, sans-serif;
}
```

## Mixing fonts per role

You can assign a different font stack to each typographic role. Each semantic token can reference a primitive token or a custom font-family value:

```css
:root {
  --sgds-font-family-display: var(--sgds-font-family-serif);
  --sgds-font-family-heading: var(--sgds-font-family-serif);
  --sgds-font-family-subtitle: var(--sgds-font-family-sans);
  --sgds-font-family-body: var(--sgds-font-family-sans);
  --sgds-font-family-label: var(--sgds-font-family-sans);
  --sgds-font-family-code: var(--sgds-font-family-mono);
}
```

## Import order

Custom font overrides must come **after** the theme file:

```css
@import "@govtechsg/sgds-web-component/themes/day.css";

:root {
  --sgds-font-family-display: var(--sgds-font-family-serif);
  --sgds-font-family-heading: var(--sgds-font-family-serif);
  --sgds-font-family-subtitle: var(--sgds-font-family-sans);
  --sgds-font-family-body: var(--sgds-font-family-sans);
  --sgds-font-family-label: var(--sgds-font-family-sans);
  --sgds-font-family-code: var(--sgds-font-family-mono);
}
```

## Interactive demos

Use the stories below to see how changing each font-family token affects typography. Select a different font from the **Controls** panel.
