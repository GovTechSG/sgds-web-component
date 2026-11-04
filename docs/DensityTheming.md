# Density

Customise the spacing density of components by importing a density theme file. Density controls the internal padding and gap of components, making them more compact or spacious.

## Density modes

| Mode | File | Effect |
|------|------|--------|
| Default | (none — built into `root.css`, which is included by `day.css` / `night.css`) | Base spacing values |
| Compact | `@govtechsg/sgds-web-component/themes/density/compact.css` | Shifts all density tokens down by 1 spacer step |
| Spacious | `@govtechsg/sgds-web-component/themes/density/spacious.css` | Shifts all density tokens up by 1 spacer step |

## How to use

Import the desired density theme file **after** the colour theme:

```css
@import "@govtechsg/sgds-web-component/themes/day.css";
@import "@govtechsg/sgds-web-component/themes/density/compact.css";
```

Only import **one** density file at a time. To switch back to default density, remove the density import.

## Affected components

- Accordion
- Card
- Icon Card
- Image Card
- Thumbnail Card
- Modal
- Drawer
- Description List
- Data Table
- Table
- Select
- Dropdown (items)
- Overflow Menu
- Combo Box (options)
- System Banner
- Table of Contents
- Footer
