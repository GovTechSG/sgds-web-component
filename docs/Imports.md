# Imports

## Using the custom elements

Once imported, the custom elements can be used throughout the project.

```js
// import all custom elements at once
import "@govtechsg/sgds-web-component";
// or import individual custom elements 
import "@govtechsg/sgds-web-component/components/Button";

//usage
// <sgds-button>Hello World</sgds-button>
```

## Using the component's class object

When writing with Typescript, you might be required to type the components in certain cases. Import the component class like so. 
Each component's Class is exported via named exports, prefixed with `Sgds`.

```js

import { SgdsButton, SgdsMainnav } from "@govtechsg/sgds-web-component/components";
// or
import { SgdsButton } from "@govtechsg/sgds-web-component/components/Button/sgds-button";
import { SgdsMainnav } from "@govtechsg/sgds-web-component/components/Mainnav/sgds-mainnav";

```