## Scoped Elements

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

Loading the polyfill is only required for components that uses the ScopeElementsMixin as shown in the code snipper above.

However, in lieu of the major changes in version 3 of `@open-wc/scoped-elements`, it is now required to load the polyfill. While our library is still on version 2, it is <strong>recommended to load the polyfill even it is technically not required to</strong>. 
