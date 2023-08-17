import { html } from "lit";
import { customElement, queryAsync } from "lit/decorators.js";
import { ref } from "lit/directives/ref.js";
import { DropdownElement } from "../src/base/dropdown-element";
import genId from "../src/utils/generateId";
@customElement("mock-dropdown")
export class MockDropdown extends DropdownElement {
  // Reset menu for keyboard interaction when menu is hide. Should use this for dropdown components that required scrolling of menu using arrow down or up key
  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("sgds-hide", this._resetMenu);
  }
  // To wait for the dropdownRef to update finish before toggling show when menuIsOpen is true
  @queryAsync("button")
  button: Promise<HTMLButtonElement>;

  async firstUpdated() {
    super.firstUpdated();
    if (this.menuIsOpen) {
      await this.button;
      this.bsDropdown.show();
    }
  }
  render() {
    return html`
      <div>
        <button
          ?disabled=${this.disabled}
          aria-expanded="${this.menuIsOpen}"
          ${ref(this.myDropdown)}
          @click=${() => this._onClickButton()}
          id=${genId("dropdown", "button")}
        >
          Mock Dropdown
        </button>
        <ul class="dropdown-menu" role="menu" part="menu">
          <slot id="default" @click=${this._handleSelectSlot}></slot>
        </ul>
      </div>
    `;
  }
}
