# Border Radius

Customise the border radius of components by overriding the semantic border radius tokens. Each token controls the roundness of a specific group of components.

## Semantic border radius tokens

| Token | Default | Components |
|-------|---------|------------|
| `--sgds-indicator-border-radius` | sm (4px) | Badge, Skeleton |
| `--sgds-interactive-border-radius` | md (8px) | Button, Icon Button, Tab, Pagination, Close Button, Sidebar, Sidenav, Overflow Menu, Datepicker (calendar) |
| `--sgds-form-border-radius` | md (8px) | Input, Select, Combo Box, Textarea, Quantity Toggle, File Upload, Datepicker (input) |
| `--sgds-form-border-radius-dense` | md (8px) | Checkbox |
| `--sgds-surface-border-radius` | lg (12px) | Card, Icon Card, Image Card, Thumbnail Card, Accordion, Alert, Description List |
| `--sgds-overlay-border-radius` | lg (12px) | Modal, Dropdown, Toast, Tooltip, Datepicker (calendar panel), Mainnav Dropdown |

## How to customise

Override the semantic tokens in your CSS:

```css
:root {
  --sgds-interactive-border-radius: var(--sgds-border-radius-lg);
  --sgds-surface-border-radius: var(--sgds-border-radius-xl);
  --sgds-overlay-border-radius: var(--sgds-border-radius-xl);
}
```

## Import order

Custom overrides must come **after** the theme file:

```css
@import "@govtechsg/sgds-web-component/themes/day.css";

:root {
  --sgds-interactive-border-radius: var(--sgds-border-radius-lg);
  --sgds-surface-border-radius: var(--sgds-border-radius-xl);
  --sgds-overlay-border-radius: var(--sgds-border-radius-xl);
}
```

## Interactive demos

Use the stories below to see how changing each semantic token affects the components that use it. Select a different radius value from the **Controls** panel.
