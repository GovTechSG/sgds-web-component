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

## Scoped Elements

The CustomElementRegistry is a global registry that provides methods for registering custom elements. One of the limitations of working with this global registry is that multiple versions of the same element cannot co-exist. This causes bottlenecks in software delivery that should be managed by the teams and complex build systems. Scoped Custom Element Registries is a proposal that will solve the problem. Since this functionality won't be available (especially not cross browser) anytime soon, we've adopted [OpenWC's Scoped Elements](https://open-wc.org/docs/development/scoped-elements/).

Whenever a sgds component uses composition (meaning it uses another sgds component inside), we apply ScopedElementsMixin to make sure it uses the right version of this internal component.

For users who are using sgds component directly for builing application, use the custom elements directly by [importing the custom elements](#using-the-custom-elements)

For users who are building component libraries on top of sgds-web-component, please adopt OpenWC's scoped elements to prevent exporting our registered custom elements. 

Things to note: 
1. Import component class from `@govtechsg/sgds-web-component/components`. Here the components are not registered in the custom element registry 
2. Define the tagName you want to assign to the component's class

Example below

```jsx
import { SgdsMasthead, SgdsMainnav, SgdsMainnavDropdown, SgdsMainnavItem } from "@govtechsg/sgds-web-component/components";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";

// Lit element
@customElement('my-navbar')
export class MyNavbar extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      'sgds-mainnav': SgdsMainnav,
      'sgds-mainnav-dropdown': SgdsMainnavDropdown,
      'sgds-mainnav-item': SgdsMainnavItem,
      'sgds-masthead': SgdsMasthead
    };
  }
    ...

 render() {
    return html`
        <sgds-masthead fluid="false"></sgds-masthead>
            <sgds-mainnav>
              <img width="240" src="https://dev.assets.developer.tech.gov.sg/svg/logo.svg" slot="brand">
                <sgds-mainnav-dropdown togglertext="Home" slot="end">
                    <sgds-dropdown-item>Logout</sgds-dropdown-item>
                </sgds-mainnav-dropdown>
                <sgds-mainnav-item href="#">Content</sgds-mainnav-item>
                <sgds-mainnav-item href="#}">Biography</sgds-mainnav-item>
            </sgds-mainnav>
          `
      }
}
```
