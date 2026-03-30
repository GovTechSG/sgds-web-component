# Stylings 

## Global Styles and Theming

Customize the styles at the `:root` level by overriding the values of css tokens defined in file 
`@govtechsg/sgds-web-component/themes/day.css` file. This file contains the primitive and semantic css tokens. For system level UI changes, we encourage you to make primitive and semantic level style changes at the `:root` rather than component specific changes. 

```css
// yourCustomCss.css
:root {
  --sgds-product-primary-100: #F5B6DA;
  --sgds-product-primary-200: #F186C0;
  --sgds-product-primary-300: #EE4FA6;
  --sgds-product-primary-400: #EE0290;
  --sgds-product-primary-500: #EF0078;
  --sgds-product-primary-600: #DD0074;
  --sgds-product-primary-700: #C6006E;
  --sgds-product-primary-800: #B0006A;
  --sgds-product-primary-900: #880061;
}
``` 
``` jsx
import "@govtechsg/sgds-web-component/themes/day.css";
//import your custom css after the themes/day.css .
import "./yourCustomCss.css"
```

### GovTech Brand Colours

GovTech products should use one of the pre-approved colour palettes shipped with SGDS instead of defining custom hex values. Each product must pick **exactly one** colour — do not import multiple GT palettes.

The available palettes are:

| Import path | Colour |
|-------------|--------|
| `@govtechsg/sgds-web-component/themes/gt/blue.css` | Blue |
| `@govtechsg/sgds-web-component/themes/gt/cyan.css` | Cyan |
| `@govtechsg/sgds-web-component/themes/gt/magenta.css` | Magenta |
| `@govtechsg/sgds-web-component/themes/gt/pink.css` | Pink |
| `@govtechsg/sgds-web-component/themes/gt/purple.css` | Purple |
| `@govtechsg/sgds-web-component/themes/gt/red.css` | Red |

Each GT file defines `--gt-color-100` through `--gt-color-900`. Map these onto the SGDS product primary scale in your custom CSS:

```css
/* yourCustomCss.css */
:root {
  --sgds-product-primary-100: var(--gt-color-100);
  --sgds-product-primary-200: var(--gt-color-200);
  --sgds-product-primary-300: var(--gt-color-300);
  --sgds-product-primary-400: var(--gt-color-400);
  --sgds-product-primary-500: var(--gt-color-500);
  --sgds-product-primary-600: var(--gt-color-600);
  --sgds-product-primary-700: var(--gt-color-700);
  --sgds-product-primary-800: var(--gt-color-800);
  --sgds-product-primary-900: var(--gt-color-900);
}
```

Import order matters — the GT palette file must come after `themes/day.css` and before your custom mapping CSS:

```css
@import "@govtechsg/sgds-web-component/themes/day.css";
@import "@govtechsg/sgds-web-component/themes/gt/blue.css"; /* pick one colour only */
@import "./yourCustomCss.css";
```

### root.css

Primitives and semantic values are defined here. These tokens can also be found in `@govtechsg/sgds-web-component/themes` folder.

<iframe
  src='https://gist.github.com/clukhei/425e29332ec837d9ea4bbe90ff8d4a37.pibb?file=root.css'
  style="width: 100%; height: 300px; border: 0;"
>
</iframe>

### day.css

<iframe
  src='https://gist.github.com/clukhei/425e29332ec837d9ea4bbe90ff8d4a37.pibb?file=day.css'
  style="width: 100%; height: 300px; border: 0;"
>
</iframe>

### night.css

<iframe
  src='https://gist.github.com/clukhei/425e29332ec837d9ea4bbe90ff8d4a37.pibb?file=night.css'
  style="width: 100%; height: 300px; border: 0;"
>
</iframe>



## Component specific styles <sgds-badge show>work in progress</sgds-badge>

<!-- The styles of components are built in and can be modified via cssparts or css custom properties whenever we specify for such styling modificiations. This information will be specified under API section for each component

You will require some knowledge of web components and css to do so and the information can be readily available online like mdn web docs for [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) and [css](https://developer.mozilla.org/en-US/docs/Web/CSS)

### css custom variable <sgds-badge show>work in progress</sgds-badge>

Some components have defined css custom variable for styling of selected aspects of the element in the shadow DOM. See the API table for the available css custom variables

```css
sgds-sidenav {
  --sidenav-theme-color: pink;
}
```

### cssparts <sgds-badge show>work in progress</sgds-badge>

Some components expose cssparts on selected elements of the shadow DOM. See the API table for each component on the css parts exposed.

```css
sgds-footer::part(footer-bottom) {
  background-color: grey;
  font-family: "Times New Roman", Times, serif;
  border: 10px dotted red;
}
``` -->


