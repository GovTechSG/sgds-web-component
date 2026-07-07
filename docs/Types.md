# TypeScript Types

SGDS web component exports TypeScript type aliases for all component property enumerations. These types let you annotate your own code with the exact values each property accepts.

## Importing Types

```ts
import type { InputType, SgdsSize, ButtonVariant } from "@govtechsg/sgds-web-component";
```

All types are available from the package root. No deep imports required.

## Shared Types

These types are reused across multiple components.

| Type | Values | Used By |
|------|--------|---------|
| `SgdsSize` | `"sm"` \| `"md"` \| `"lg"` | Drawer, Switch, IconList |
| `SgdsExtendedSize` | `"xs"` \| `"sm"` \| `"md"` \| `"lg"` \| `"xl"` | Spinner |
| `SgdsCompactSize` | `"sm"` \| `"md"` | CloseButton, OverflowMenu, Pagination |
| `SgdsOrientation` | `"horizontal"` \| `"vertical"` | Divider, Tab |
| `SgdsHasFeedback` | `"style"` \| `"text"` \| `"both"` | Input, Checkbox, QuantityToggle |
| `SgdsTarget` | `"_blank"` \| `"_parent"` \| `"_self"` \| `"_top"` | Button, AlertLink |
| `SgdsFooterTone` | `"fixed-dark"` \| `"neutral"` | Footer, FooterItem |

## Component Types

### Accordion

| Type | Values | Property |
|------|--------|----------|
| `AccordionVariant` | `"default"` \| `"border"` | `variant` |
| `AccordionDensity` | `"default"` \| `"compact"` \| `"spacious"` | `density` |

### Alert

| Type | Values | Property |
|------|--------|----------|
| `AlertVariant` | `"info"` \| `"success"` \| `"danger"` \| `"warning"` \| `"neutral"` | `variant` |

### Badge

| Type | Values | Property |
|------|--------|----------|
| `BadgeVariant` | `"primary"` \| `"accent"` \| `"success"` \| `"danger"` \| `"warning"` \| `"cyan"` \| `"purple"` \| `"neutral"` \| `"white"` \| `"info"` | `variant` |

### Button

| Type | Values | Property |
|------|--------|----------|
| `ButtonVariant` | `"primary"` \| `"outline"` \| `"ghost"` \| `"danger"` | `variant` |
| `ButtonTone` | `"brand"` \| `"danger"` \| `"fixed-light"` \| `"neutral"` | `tone` |
| `ButtonSize` | `"xs"` \| `"sm"` \| `"md"` \| `"lg"` | `size` |
| `ButtonType` | `"button"` \| `"submit"` \| `"reset"` | `type` |
| `ButtonFormMethod` | `"post"` \| `"get"` | `formMethod` |

### Card

| Type | Values | Property |
|------|--------|----------|
| `CardOrientation` | `"vertical"` \| `"horizontal"` | `orientation` |
| `CardImagePosition` | `"before"` \| `"after"` | `imagePosition` |
| `CardImageAdjustment` | `"default"` \| `"padding around"` \| `"aspect ratio"` | `imageAdjustment` |

### CloseButton

| Type | Values | Property |
|------|--------|----------|
| `CloseButtonTone` | `"default"` \| `"fixed-dark"` \| `"fixed-light"` | `tone` |

### Datepicker

| Type | Values | Property |
|------|--------|----------|
| `DatepickerMode` | `"single"` \| `"range"` | `mode` |
| `DatepickerView` | `"days"` \| `"months"` \| `"years"` | `view` |

### Divider

| Type | Values | Property |
|------|--------|----------|
| `DividerThickness` | `"thin"` \| `"thick"` \| `"thicker"` | `thickness` |

### Drawer

| Type | Values | Property |
|------|--------|----------|
| `DrawerPlacement` | `"top"` \| `"end"` \| `"bottom"` \| `"start"` | `placement` |

### FileUpload

| Type | Values | Property |
|------|--------|----------|
| `FileUploadVariant` | `"default"` \| `"drag-and-drop"` | `variant` |

### Footer

| Type | Values | Property |
|------|--------|----------|
| `FooterLayout` | `"default"` \| `"sidebar"` | `layout` |

### Icon

| Type | Values | Property |
|------|--------|----------|
| `IconSize` | `"xs"` \| `"sm"` \| `"md"` \| `"lg"` \| `"xl"` \| `"2-xl"` \| `"3-xl"` | `size` |

### Input

| Type | Values | Property |
|------|--------|----------|
| `InputType` | `"email"` \| `"number"` \| `"password"` \| `"search"` \| `"tel"` \| `"text"` \| `"time"` \| `"url"` \| `"datetime-local"` | `type` |

### Mainnav

| Type | Values | Property |
|------|--------|----------|
| `MainnavExpandSize` | `"sm"` \| `"md"` \| `"lg"` \| `"xl"` \| `"xxl"` \| `"always"` \| `"never"` | `expand` |

### Modal

| Type | Values | Property |
|------|--------|----------|
| `ModalSize` | `"sm"` \| `"md"` \| `"lg"` \| `"xl"` \| `"fullscreen"` | `size` |

### Pagination

| Type | Values | Property |
|------|--------|----------|
| `PaginationVariant` | `"default"` \| `"number"` \| `"button"` \| `"description"` | `variant` |

### ProgressBar

| Type | Values | Property |
|------|--------|----------|
| `ProgressBarVariant` | `"primary"` \| `"neutral"` | `variant` |

### Spinner

| Type | Values | Property |
|------|--------|----------|
| `SpinnerVariant` | `"primary"` \| `"neutral"` | `variant` |
| `SpinnerTone` | `"brand"` \| `"neutral"` \| `"inverse"` \| `"fixed-light"` \| `"fixed-dark"` | `tone` |

### Tab

| Type | Values | Property |
|------|--------|----------|
| `TabVariant` | `"underlined"` \| `"solid"` | `variant` |
| `TabDensity` | `"compact"` \| `"default"` | `density` |

### Table

| Type | Values | Property |
|------|--------|----------|
| `TableLayout` | `"auto"` \| `"fixed"` | `layout` |
| `TableResponsive` | `"sm"` \| `"md"` \| `"lg"` \| `"xl"` \| `"always"` | `responsive` |

### Textarea

| Type | Values | Property |
|------|--------|----------|
| `TextareaResize` | `"none"` \| `"vertical"` \| `"auto"` | `resize` |

### Toast

| Type | Values | Property |
|------|--------|----------|
| `ToastVariant` | `"success"` \| `"warning"` \| `"danger"` \| `"info"` | `variant` |

### Tooltip

| Type | Values | Property |
|------|--------|----------|
| `TooltipPlacement` | `"top"` \| `"bottom"` \| `"left"` \| `"right"` | `placement` |
| `TooltipTrigger` | `"click"` \| `"hover"` \| `"focus"` \| `"hover focus"` | `trigger` |
