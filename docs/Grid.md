# Grid System

The **SGDS Grid System** is a mobile-first, fully responsive layout system based on CSS Grid. It provides structured layouts with different column spans based on breakpoints.

## How It Works

1. **Container (`.sgds-container`)**:

   - Defines the maximum width of the grid at different breakpoints.
   - Adds horizontal margins for proper alignment.
   - Adjusts width based on screen size.

2. **Container with Sidebar (`.sgds-container-sidebar`)**:

   - Use for layouts where a sidebar exists alongside the main content area.
   - Narrower maximum width compared to `.sgds-container` to accommodate sidebar layouts.
   - Responsive max-widths:
     - **Medium (768px+)**: `calc(100% - 96px)` with 48px side margins
     - **Large (1024px+)**: 840px max-width
     - **Extra Large (1280px+)**: 888px max-width
     - **Extra Extra Large (1440px+)**: 1024px max-width
     - **3-XL (1680px+)**: 1296px max-width
   - Centers content horizontally with `margin-left: auto; margin-right: auto;`

3. **Grid (`.sgds-grid`)**:

   - A flexibly structured layout that adapts using CSS Grid.
   - Uses `grid-template-columns` to define the number of columns per breakpoint.

4. **Columns (`.sgds-col-*`)**:

   - Define how many columns an element should span.
   - Uses `.sgds-col-*` to define column span.
   - Adjusts per breakpoint using `.sgds-col-sm-*`, `.sgds-col-md-*`, etc.

5. **Responsive Visibility (`.sgds-col-*-none`)**:

   - Controls element visibility at different screen sizes.
   - Example: `.sgds-col-md-none` hides an element on medium screens.

6. **Centered Columns (`.sgds-col-*-center-*`)**:
   - Horizontally centers grid items by calculating the appropriate starting column (grid-column) based on the number of columns the item spans.
   - Only available for even-numbered column spans (e.g., 2, 4, 6, 8, 10) within a 12-column grid.
   - Example: `.sgds-col-lg-center-4` centres a 4-column-wide item by starting it at column 5. This is calculated as `(12 - 4) / 2 = 4`, so it starts at the 5th grid line.
   - Enables centered layout alignment without manually adding offset classes or wrappers.
   - Defined per breakpoint (e.g., `-sm-center-*`, `-md-center-*`, etc.) to support responsive designs.

## Grid Breakpoints

### Standard (`.sgds-container`)

The gutter uses `var(--sgds-gap-layout-md)` across all breakpoints.

| Breakpoint        | Screen Size      | Class Prefix       | Columns | Container Width | Gutters                    | Outer Margins |
| ----------------- | ---------------- | ------------------ | ------- | --------------- | -------------------------- | ------------- |
| Extra Small       | 511px and below  | `.sgds-col-*`      | 4       | auto            | `var(--sgds-gap-layout-md)` | 20            |
| Small             | 512px - 767px    | `.sgds-col-sm-*`   | 8       | auto            | `var(--sgds-gap-layout-md)` | 24            |
| Medium            | 768px - 1023px   | `.sgds-col-md-*`   | 8       | auto            | `var(--sgds-gap-layout-md)` | 28            |
| Large             | 1024px - 1279px  | `.sgds-col-lg-*`   | 12      | 888px           | `var(--sgds-gap-layout-md)` | auto          |
| Extra Large       | 1280px - 1439px  | `.sgds-col-xl-*`   | 12      | 1168px          | `var(--sgds-gap-layout-md)` | auto          |
| Extra Extra Large | 1440px and above | `.sgds-col-2-xl-*` | 12      | 1312px          | `var(--sgds-gap-layout-md)` | auto          |

### With Sticky Sidebar (`.sgds-container-sidebar`)

Use for layouts where a sidebar exists alongside the main content area. The gutter is 16px (`--sgds-gap-md`) at smaller breakpoints and 24px (`--sgds-gap-xl`) from medium (768px) onwards.

| Breakpoint        | Screen Size      | Class Prefix       | Columns | Container Width | Gutters | Outer Margins |
| ----------------- | ---------------- | ------------------ | ------- | --------------- | ------- | ------------- |
| Extra Small       | 511px and below  | `.sgds-col-*`      | 4       | auto            | 16      | 20            |
| Small             | 512px - 767px    | `.sgds-col-sm-*`   | 8       | auto            | 16      | 24            |
| Medium            | 768px - 1023px   | `.sgds-col-md-*`   | 8       | auto            | 24      | 48            |
| Large             | 1024px - 1279px  | `.sgds-col-lg-*`   | 12      | auto            | 24      | 48            |
| Extra Large       | 1280px - 1439px  | `.sgds-col-xl-*`   | 12      | auto            | 24      | 48            |
| Extra Extra Large | 1440px - 1679px  | `.sgds-col-2-xl-*` | 12      | auto            | 24      | 48            |
| 3-XL              | 1680px and above | `.sgds-col-3-xl-*` | 12      | 1296px          | 24      | auto          |
