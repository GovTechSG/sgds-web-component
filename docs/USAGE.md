# Usage Guide

## Cherry Picking

We recommend cherry picking your web components whenever to limit the number of files that the browser has to load. Note that the component folder should start with capital letter

```js 

import "@govtechsg/sgds-web-component/Button";
//cdn way
<script type="module" src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component/Button/index.js"></script>


```

## Component dependency

Complex components depends on one or more other components under its hood. E.g. Dropdown and Modal component uses Button component
For such components, you will have to import all of its dependency. The component's dependency will be specified in the Component documentation under Dependency section

```js
// When using Dropdown component, import both Dropdown and Button
import "@govtechsg/sgds-web-component/Dropdown";
import "@govtechsg/sgds-web-component/Button";

```

<!-- ## Shoelace Icons

SGDS depends on 3rd party library [Shoelace](https://shoelace.style/components/icon) for our icons. We recommend using Shoelace's default icon library which are Bootstrap icons

````js
// data-shoelace attribute points to the assets folder, where the bootstrap icons are located. If you are copying out the assets folder to your own directory, change the value of data-shoelace to your assets folder
 <script type="module" data-shoelace="node_modules/@shoelace-style/shoelace/dist">
            import '@shoelace-style/shoelace/dist/components/icon/icon.js';
        //<sl-icon> is ready to use!
 </script>

````

You can also use the utility `setBasePath` from Shoelace to set the based path of the asset folder 

```js

import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
// Set the base path to the folder you copied Shoelace's assets
setBasePath('/path/to/shoelace/dist');

import '@shoelace-style/shoelace/dist/components/icon/icon.js'
    //<sl-icon> is ready to use!

```

Please refer to [Shoelace documentation](https://shoelace.style/getting-started/installation?id=setting-the-base-path) for more information -->

## Stylings

### Component Styles

SGDS web component library is shipped with SGDS v2 stylings and does not require you to configure or install any other styling files. 
The styles of components are built in and can be modified via props, cssparts and css custom properties whenever we specify for such styling modificiations. This information will be specified under API section for each component

You will require some knowledge of web components and css to do so and the information can be readily available online like mdn web docs for [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) and [css](https://developer.mozilla.org/en-US/docs/Web/CSS)

### External stylings

Any external stylings done on our web components like positioning needs to be done on your end. You can use [SGDS v2 library](https://designsystem.tech.gov.sg/get-started/)to leverage on the position stylings we provide e.g. ms-auto, flexbox, grids