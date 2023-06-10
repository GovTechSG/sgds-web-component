import { html } from "lit";
import { customElement, queryAsync } from "lit/decorators.js";
import { ref } from "lit/directives/ref.js";
import { DropdownElement } from "../src/base/dropdown-element";
import genId from "../src/utils/generateId";
@customElement("mock-dropdown")
export class MockDropdown extends DropdownElement {
  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("sgds-hide", this._resetMenu);
  }

  @queryAsync("button")
  button: Promise<HTMLButtonElement>;

  async firstUpdated() {
    super.firstUpdated();
    if (this.menuIsOpen) {
      const button = await this.button;
      button.click();
    }
  }
  render() {
    return html`
      <div>
        <button
          variant="outline-${this.variant}"
          ?disabled=${this.disabled}
          aria-expanded="${this.menuIsOpen}"
          ${ref(this.myDropdown)}
          @click=${() => this._onClickButton()}
          id=${genId("dropdown", "button")}
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
