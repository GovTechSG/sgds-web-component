# Extending sgds-web-component

For users who are leveraging on sgds-web-component as a building block to build and export your own web component library with Lit, you will have to adopt the scoped elements approach to prevent any foreseeable clash of registries between sgds-web-component and your web component library in the case where your users are importing both libraries.

## Scoped Elements

The CustomElementRegistry is a global registry that provides methods for registering custom elements. One of the limitations of working with this global registry is that multiple versions of the same element cannot co-exist. This causes bottlenecks in software delivery that should be managed by the teams and complex build systems. Scoped Custom Element Registries is a proposal that will solve the problem. Since this functionality won't be available (especially not cross browser) anytime soon, we've adopted [OpenWC's Scoped Elements](https://open-wc.org/docs/development/scoped-elements/).

From version 3.0.0 onwards, our library has stopped the use of Scoped Elements mixin to dedupe our component registration when reusing components.

For users who are building component libraries on top of sgds-web-component and facing clashing registration issues, you can adopt [OpenWC's scoped elements](https://open-wc.org/docs/development/scoped-elements/) to prevent exporting our registered custom elements. Please read up about OpenWC's scoped elements for more updated information.

Things to note:

1. Import component class from `@govtechsg/sgds-web-component/components`. Here the components are not registered in the custom element registry
2. Define the tagName you want to assign to the component's class

Example below

```jsx
import { SgdsMasthead, SgdsMainnav, SgdsMainnavDropdown, SgdsMainnavItem } from "@govtechsg/sgds-web-component/components";
import { ScopedElementsMixin } from '@open-wc/scoped-elements';

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
                <sgds-mainnav-dropdown slot="end">
                  <span slot="toggler">Home</span>
                  <sgds-dropdown-item>Logout</sgds-dropdown-item>
                </sgds-mainnav-dropdown>
                <sgds-mainnav-item href="#">Content</sgds-mainnav-item>
                <sgds-mainnav-item href="#">Biography</sgds-mainnav-item>
            </sgds-mainnav>
          `
      }
}
```
