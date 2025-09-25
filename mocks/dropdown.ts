import { html } from "lit";
import { customElement, queryAsync } from "lit/decorators.js";
import { ref } from "lit/directives/ref.js";
import genId from "../src/utils/generateId";
import { DropdownListElement } from "../src/base/dropdown-list-element";
@customElement("mock-dropdown")
export class MockDropdown extends DropdownListElement {
  // To wait for the dropdownRef to update finish before toggling show when menuIsOpen is true
  @queryAsync("button")
  button: Promise<HTMLButtonElement>;

  async firstUpdated() {
    super.firstUpdated();
    if (this.menuIsOpen) {
      await this.button;
      this.showMenu();
    }
  }

  render() {
    return html`
      <div>
        <button
          ?disabled=${this.disabled}
          aria-expanded="${this.menuIsOpen}"
          ${ref(this.myDropdown)}
          @click=${() => this.toggleMenu()}
          id=${genId("dropdown", "button")}
        >
          Mock Dropdown
        </button>
        <div class="dropdown-menu" role="menu" part="menu" ${ref(this.menuRef)}>
          <slot id="default" @click=${this.handleSelectSlot}></slot>
        </div>
      </div>
    `;
  }
}
