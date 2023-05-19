# Usage Guide

# Imports

Each component is exported via named exports, prefixed with `Sgds`

```js
import { SgdsButton } from "@govtechsg/sgds-web-component"
import { SgdsMainnav } from "@govtechsg/sgds-web-component"
```

## Stylings

### Component Styles

SGDS web component library is shipped with SGDS v2 stylings and does not require you to configure or install any other styling files. 
The styles of components are built in and can be modified via props, cssparts and css custom properties whenever we specify for such styling modificiations. This information will be specified under API section for each component

You will require some knowledge of web components and css to do so and the information can be readily available online like mdn web docs for [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) and [css](https://developer.mozilla.org/en-US/docs/Web/CSS)

### External stylings

Any external stylings done on our web components like positioning needs to be done on your end. You can use [SGDS v2 library](https://designsystem.tech.gov.sg/get-started/)to leverage on the position stylings we provide e.g. ms-auto, flexbox, grids