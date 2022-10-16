import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { ref } from "lit/directives/ref.js";
import { DropdownElement } from "../src/utils/dropdown-element";

@customElement("mock-dropdown")
export class MockDropdown extends DropdownElement {
  render() {
    return html`
      <div>
        <button
          variant="outline-${this.variant}"
          ?disabled=${this.disabled}
          aria-expanded="${this.menuIsOpen}"
          ${ref(this.myDropdown)}
          @click=${() => this._onClickButton()}
          id=${this.togglerId}
        >
          Mock Dropdown
        </button>
        <ul class="dropdown-menu" role="menu" part="menu">
          <slot @click=${this._handleSelectSlot}></slot>
        </ul>
      </div>
    `;
  }
}
