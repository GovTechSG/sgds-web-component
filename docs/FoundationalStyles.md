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
 - grid system <sgds-badge show>work in progress</sgds-badge>

## Import 

The CSS styles are dependent on the css variable tokens. Import the `themes/day.css` file first before importing the css files. If you required night mode, import `themes/night.css` as well. 
The colors assigned to elements and class selectors will switch depending on day or night mode.

<strong>JS imports</strong>

```js
import "@govtechsg/sgds-web-component/themes/day.css"
//optional: if you are doing night mode 
import "@govtechsg/sgds-web-component/themes/night.css"
import "@govtechsg/sgds-web-component/css/sgds.css"

```

<strong>CSS imports</strong>

```css
@import "@govtechsg/sgds-web-component/themes/day.css";
/** optional: if you are doing night mode */
@import "@govtechsg/sgds-web-component/themes/night.css";
@import "@govtechsg/sgds-web-component/css/sgds.css";
```

### Cherry pick the styles

`css/sgds.css` contains all the stylings found in the folder `css`. You can also choose to cherry pick the styles you required. For example, `label.css`

<strong>JS imports</strong>

```js
import "@govtechsg/sgds-web-component/themes/day.css"
//optional: if you are doing night mode 
import "@govtechsg/sgds-web-component/themes/night.css"
import "@govtechsg/sgds-web-component/css/label.css"

```

<strong>CSS imports</strong>

```css
@import "@govtechsg/sgds-web-component/themes/day.css";
/** optional: if you are doing night mode */
@import "@govtechsg/sgds-web-component/themes/night.css";
@import "@govtechsg/sgds-web-component/css/label.css";
```

## Source files

<iframe
  src='https://gist.github.com/clukhei/a31bfc0ea0c2b87d950b125f92835a76.pibb'
  style="width: 100%; height: 1000px; border: 0;"
>
</iframe>