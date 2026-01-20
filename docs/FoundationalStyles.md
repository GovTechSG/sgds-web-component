# Foundation

The library also provides styles for SGDS foundation to help users style your application wholistically with SGDS.
The styles help to override the default browser's native styles with SGDS.

These files are distributed as CSS files and are optional to import. These styles do not affect the web components and are not required in the web component.
However, do note that the CSS styles the light dom and may causes clash of styles if there are other styling libraries (for example, tailwind, bootstrap, sgds v1 and v2 css, etc.) used in your app.

Foundation aspects of SGDS includes:

- typography,
- body `<body>`
- paragraphs `<p>`
- labels `<label>`
- anchor `<a>`
- captions `<caption>`
- headers `<h1>, <h2>, <h3>, <h4>, <h5>, <h6>`
- list `<ol>, <ul>, <li>`
- [grid system](?path=/docs/style-grid-system--docs)

## Import

The CSS styles are dependent on the css variable tokens. Import the `themes/day.css` file first before importing the css files. If you required night mode, import `themes/night.css` as well.
The colors assigned to elements and class selectors will switch depending on day or night mode.

<strong>JS imports</strong>

```js
import "@govtechsg/sgds-web-component/themes/day.css";
//optional: if you are doing night mode
import "@govtechsg/sgds-web-component/themes/night.css";
import "@govtechsg/sgds-web-component/css/sgds.css";
```

<strong>CSS imports</strong>

```css
@import "@govtechsg/sgds-web-component/themes/day.css";
/** optional: if you are doing night mode */
@import "@govtechsg/sgds-web-component/themes/night.css";
@import "@govtechsg/sgds-web-component/css/sgds.css";
```

## Responsive Typography and Layout

SGDS foundation styles include a comprehensive responsive design system that automatically adapts typography sizes, line heights, and spacing across different screen sizes. All HTML elements (headings, paragraphs, labels, etc.) use CSS custom properties that scale at three primary breakpoints:

- **Mobile**: 0px and above (default)
- **Tablet**: 1024px and above
- **Desktop**: 1440px and above

### Key Features

**Automatic Responsive Scaling**: All foundation elements automatically scale their typography and spacing based on the viewport size. No additional media queries needed—just import and use.

**Consistent Typography Hierarchy**: Headings (h1–h6) maintain visual hierarchy across all screen sizes with responsive font sizes and line heights:

- h1: 32px (mobile) → 36px (tablet) → 40px (desktop)
- h2: 28px (mobile) → 30px (tablet) → 32px (desktop)
- And so on for h3–h6

**Body Text Handling**:

- Small and regular body text (`body-sm`, `body-md`) remain consistent at 14px and 16px across all viewports
- Large body text (`body-lg`) scales from 18px (mobile) to 20px (tablet/desktop)

**Responsive Spacing**: Layout gaps, padding, and component spacing adapt at each breakpoint to maintain optimal spacing hierarchy and visual rhythm across devices.

**Mobile-First Approach**: The system uses progressive enhancement—mobile styles are the default, then enhanced at larger breakpoints via CSS media queries.

<!-- ### Cherry pick the styles

`css/sgds.css` contains all the stylings found in the folder `css`. You can also choose to cherry pick the styles you required. For example, `label.css`

<strong>JS imports</strong>

```js
import "@govtechsg/sgds-web-component/themes/day.css"
//optional: if you are doing night mode
import "@govtechsg/sgds-web-component/themes/night.css"
import "@govtechsg/sgds-web-component/css/label.css" -->

<!-- ```

<strong>CSS imports</strong>

```css
@import "@govtechsg/sgds-web-component/themes/day.css";
/** optional: if you are doing night mode */
@import "@govtechsg/sgds-web-component/themes/night.css";
@import "@govtechsg/sgds-web-component/css/label.css";
``` -->
