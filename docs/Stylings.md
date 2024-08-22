# Stylings

## Global Styles and Theming

Customize the styles at the :root level by overriding the values of css tokens defined in file 
`@govtechsg/sgds-web-component/themes/day.css file. 

See all tokens in [github](https://github.com/GovTechSG/sgds-web-component/blob/restructure-v2/src/themes/day.css) 

```css
// yourCustomCss.css
:root {
  --sgds-body-font-family: "Inter";
  --sgds-body-font-size: 5rem;
  --sgds-secondary: #1f69ff;
  --sgds-success-500: #3bb346;
  --sgds-gray-500: #667085;
}
``` 
``` jsx
import "@govtechsg/sgds-web-component/themes/day.css";
//import your custom css after the themes/day.css .
import "./yourCustomCss.css"
```

## Component Styles

SGDS web component library is shipped with SGDS v2 stylings and does not require you to configure or install any other styling files.
The styles of components are built in and can be modified via props, cssparts and css custom properties whenever we specify for such styling modificiations. This information will be specified under API section for each component

You will require some knowledge of web components and css to do so and the information can be readily available online like mdn web docs for [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) and [css](https://developer.mozilla.org/en-US/docs/Web/CSS)

### css custom variable

Some components have defined css custom variable for styling of selected aspects of the element in the shadow DOM. See the API table for the available css custom variables

```css
sgds-sidenav {
  --sidenav-theme-color: pink;
}
```


### cssparts

Some components expose cssparts on selected elements of the shadow DOM. See the API table for each component on the css parts exposed.

```css
sgds-footer::part(footer-bottom) {
  background-color: grey;
  font-family: "Times New Roman", Times, serif;
  border: 10px dotted red;
}
```


## External stylings

Any external stylings done on our web components like positioning needs to be done on your end. You can use [SGDS v2 library](https://designsystem.tech.gov.sg/get-started/)to leverage on the position stylings we provide e.g. ms-auto, flexbox, grids
