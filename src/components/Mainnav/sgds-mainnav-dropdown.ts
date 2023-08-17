import { html } from "lit";
import { queryAsync } from "lit/decorators.js";
import { ref } from "lit/directives/ref.js";
import { DropdownElement } from "../../base/dropdown-element";
import styles from "./sgds-mainnav-dropdown.scss";

export class SgdsMainnavDropdown extends DropdownElement {
  static styles = [DropdownElement.styles, styles];

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("sgds-hide", this._resetMenu);
  }
  /**@internal */
  @queryAsync("a")
  dropdownRef: Promise<HTMLAnchorElement>;

  async firstUpdated() {
    super.firstUpdated();
    if (this.menuIsOpen) {
      await this.dropdownRef;
      this.bsDropdown.show();
    }
  }

  render() {
    return html`
      <li class="nav-item dropdown">
        <a
          class="nav-link"
          ?disabled=${this.disabled}
          aria-expanded="${this.menuIsOpen}"
          ${ref(this.myDropdown)}
          @click=${() => this._onClickButton()}
          id=${this.togglerId}
          tabindex=${this.disabled ? "-1" : "0"}
          role="button"
        >
          ${this.togglerText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-down"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </a>
        <ul class="dropdown-menu" role="menu" part="menu">
          <slot id="default" @click=${this._handleSelectSlot}></slot>
        </ul>
      </li>
    `;
  }
}

export default SgdsMainnavDropdown;
