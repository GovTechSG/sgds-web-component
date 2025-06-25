# Grid System

The **SGDS Grid System** is a mobile-first, fully responsive layout system based on CSS Grid. It provides structured layouts with different column spans based on breakpoints.

## How It Works

1. **Container (`.sgds-container`)**:

   - Defines the maximum width of the grid at different breakpoints.
   - Adds horizontal margins for proper alignment.
   - Adjusts width based on screen size.

2. **Grid (`.sgds-grid`)**:

   - A flexibly structured layout that adapts using CSS Grid.
   - Uses `grid-template-columns` to define the number of columns per breakpoint.

3. **Columns (`.sgds-col-*`)**:

   - Define how many columns an element should span.
   - Uses `.sgds-col-*` to define column span.
   - Adjusts per breakpoint using `.sgds-col-sm-*`, `.sgds-col-md-*`, etc.

4. **Responsive Visibility (`.sgds-col-*-none`)**:

   - Controls element visibility at different screen sizes.
   - Example: `.sgds-col-md-none` hides an element on medium screens.

5. **Centered Columns (`.sgds-col-*-center-*`)**:
   - Horizontally centers grid items by calculating the appropriate starting column (grid-column) based on the number of columns the item spans.
   - Only available for even-numbered column spans (e.g., 2, 4, 6, 8, 10) within a 12-column grid.
   - Example: `.sgds-col-lg-center-4` centers a 4-column-wide item by starting it at column 5 — calculated as `(12 - 4) / 2 = 4`, so it starts at the 5th grid line.
   - Enables centered layout alignment without manually adding offset classes or wrappers.
   - Defined per breakpoint (e.g., `-sm-center-*`, `-md-center-*`, etc.) to support responsive designs.

## Grid Breakpoints

| Breakpoint        | Screen Size      | Class Prefix       | Columns | Container Width | Gutters | Outer Margins |
| ----------------- | ---------------- | ------------------ | ------- | --------------- | ------- | ------------- |
| Extra Small       | 511px and below  | `.sgds-col-*`      | 4       | auto            | 16      | 20            |
| Small             | 512px - 767px    | `.sgds-col-sm-*`   | 8       | auto            | 16      | 24            |
| Medium            | 768px - 1023px   | `.sgds-col-md-*`   | 8       | auto            | 16      | 32            |
| Large             | 1024px - 1279px  | `.sgds-col-lg-*`   | 12      | 896px           | 16      | auto          |
| Extra Large       | 1280px - 1439px  | `.sgds-col-xl-*`   | 12      | 1176px          | 24      | auto          |
| Extra Extra Large | 1440px and above | `.sgds-col-2-xl-*` | 12      | 1320px          | 24      | auto          |
