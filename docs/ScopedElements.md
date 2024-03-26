# Scoped Elements

As a global registry, the [CustomElementRegistry](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry) cannot have multiple version of the same custom element. This is the limitation of the CustomElementRegistry. [Scoped Custom Element Registries](https://github.com/w3c/webcomponents/issues/716) is a proposal that will solve the problem. Since this functionality won't be available (especially not cross browser) anytime soon, we've adopted [OpenWC's Scoped Elements](https://open-wc.org/docs/development/scoped-elements/).

Whenever a sgds web component uses composition (meaning it uses another sgds component inside), we
apply ScopedElementsMixin to make sure it uses the right version of this internal component.

```jsx
export class SgdsDropdown extends ScopedElementsMixin(DropdownListElement) {
  static get scopedElements() {
    return {
      "sgds-button": SgdsButton
    };
  }

  render() {
    return html`
      <div>
        <sgds-button>
          ${this.togglerText}
        </sgds-button>
        <ul class="dropdown-menu" role="menu" part="menu">
          <slot id="default" @click=${this.handleSelectSlot}></slot>
        </ul>
      </div>
    `;
  }

```

## Scoped Custom Element Registry Polyfill 

### When to load the polyfill

Loading the polyfill is only required for components that uses the ScopeElementsMixin as shown in the code snippet above.
As a rule of thumb, start by not loading the polyfill. If you encounter an error like so, it means you need to load the polyfill.


>`Uncaught DOMException: Failed to execute 'define' on 'CustomElementRegistry': the name "sgds-<component-name>" has already been used with this registry at`


### How to load the polyfill 

#### Local installation

```js

npm install @webcomponents/scoped-custom-element-registry@0.0.9

```

```js

// Polyfill has to be loaded at the top of the application before the web components
import "@webcomponents/scoped-custom-element-registry"
import "@govtechsg/sgds-web-component";

```

#### CDN usage

Load the polyfill CDN before the web component CDN 

```js

// load scoped custom element registry polyfill first
<script src="https://cdn.jsdelivr.net/npm/@webcomponents/scoped-custom-element-registry@0.0.9"></script>

<script src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@<version>"></script>

```
