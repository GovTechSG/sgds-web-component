import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { ref } from "lit/directives/ref.js";
import styles from "./sgds-mainnav-dropdown.scss";
import { DropdownElement } from "../../base/dropdown-element";

@customElement("sgds-mainnav-dropdown")
export class SgdsMainnavDropdown extends DropdownElement {
  static styles = styles;

  render() {
    return html`
      <li class="nav-item">
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
          <slot @click=${this._handleSelectSlot}></slot>
        </ul>
      </li>
    `;
  }
}

export default SgdsMainnavDropdown;
