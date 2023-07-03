# Stylings

## Global Styles

The following css custom variable are exposed to enable users to make modifications across all web components in our library

| css custom variable name      | description                               |
| ------------------------      | ----------------------------------------- |
| --sgds-body-font-family       | Set the font family of the web components |
| --sgds-body-font-size         | Set the font size of the web components   |
| --sgds-body-font-weight       | Set the font weight of the web components |
| --sgds-body-line-height       | Set the line height of the web components |
| --sgds-{stateColor}-rgb       | State colors in red,green,blue value                 |
| --sgds-{stateColor}           | State colors in hexadecimal value         |
| --sgds-{stateColor}           | State colors in hexadecimal value         |
| --sgds-{stateColor}-{weight} | State colors with different weightage in hexadecimal value |
| --sgds-gray-{weight}         | Gray colors with different weightage in hexadecimal value  |

> `{stateColor}` consists of `primary`,`secondary`,`success`,`warning`,`danger`,`info`,`light`,`dark`
>
> `{weight}` are color weightage in hundreds starting from `100` up to `900`

```css

:root {
  --sgds-body-font-family: Helvetica;
  --sgds-body-font-size: 5rem;
  --sgds-primary-rgb : 89,37,220;
  --sgds-secondary : #1f69ff;
  --sgds-success-500 : #3bb346;
  --sgds-gray-500 : #667085;
}

```

## Component Styles

SGDS web component library is shipped with SGDS v2 stylings and does not require you to configure or install any other styling files.
The styles of components are built in and can be modified via props, cssparts and css custom properties whenever we specify for such styling modificiations. This information will be specified under API section for each component

You will require some knowledge of web components and css to do so and the information can be readily available online like mdn web docs for [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) and [css](https://developer.mozilla.org/en-US/docs/Web/CSS)

### classes prop

Some components exposes a class-like attribute, usually named "classes" prefix with the element's name e.g. buttonClasses.
SGDS web component library is shipped with our v2 design library, a spin-off from Bootstrap v5. As such, the css tokens are applicable to use and exposed to the shadow DOM.

For example, you can pass "btn-lg" and "me-2" to `buttonClasses` prop as another way to customise the stylings of your button.

```html
<sgds-button buttonClasses="btn-lg me-2">Hello world</sgds-button>
```

**NOTE** Do not use `class` attribute to attempt to style the shadow tree of the host. We did not the forward of `class` attribute to the shadow DOM so that users are able to style the light dom with it. Use `class` attribute when you need to style the light DOM.

### cssparts

Some components expose cssparts on selected elements of the shadow DOM. See the API table for each component on the css parts exposed.

```css
sgds-footer::part(footer-bottom) {
  background-color: grey;
  font-family: "Times New Roman", Times, serif;
  border: 10px dotted red;
}
```

### css custom variable

Some components have defined css custom variable for styling of selected aspects of the element in the shadow DOM. See the API table for the available css custom variables

```css
sgds-sidenav {
  --sidenav-theme-color: pink;
}
```

## External stylings

Any external stylings done on our web components like positioning needs to be done on your end. You can use [SGDS v2 library](https://designsystem.tech.gov.sg/get-started/)to leverage on the position stylings we provide e.g. ms-auto, flexbox, grids
