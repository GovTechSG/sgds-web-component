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

4. **Responsive Visibility (`.sgds-col-none`)**:
   - Controls element visibility at different screen sizes.
   - Example: `.sgds-col-md-none` hides an element on medium screens.

## Grid Breakpoints

| Breakpoint  | Screen Size      | Class Prefix     | Columns | Container Width |
| ----------- | ---------------- | ---------------- | ------- | --------------- |
| Extra Small | 511px and below  | `.sgds-col-*`    | 4       | auto            |
| Small       | 512px - 1023px   | `.sgds-col-sm-*` | 8       | auto            |
| Medium      | 1024px - 1279px  | `.sgds-col-md-*` | 12      | 896px           |
| Large       | 1280px - 1439px  | `.sgds-col-lg-*` | 12      | 1176px          |
| Extra Large | 1440px and above | `.sgds-col-xl-*` | 12      | 1320px          |
