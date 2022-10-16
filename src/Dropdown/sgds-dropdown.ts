import { html } from "lit";
import { customElement } from "lit/decorators.js";
import {  ref } from "lit/directives/ref.js";
import styles from "./sgds-dropdown.scss";
import { DropdownElement } from "./dropdown";

export type DropDirection = "left" | "right" | "up" | "down";
@customElement("sgds-dropdown")
export class SgdsDropdown extends DropdownElement {
  static styles = styles;
  constructor(){
    super()
    this.modifierOpt = [
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
    ];
  }
  render() {
    return html`
      <div>
        <sgds-button
          variant="outline-${this.variant}"
          ?disabled=${this.disabled}
          aria-expanded="${this.menuIsOpen}"
          ${ref(this.myDropdown)}
          @click=${() => this._onClickButton()}
          id=${this.togglerId}
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
        </sgds-button>
        <ul class="dropdown-menu" role="menu" part="menu">
          <slot @click=${this._handleSelectSlot}></slot>
        </ul>
      </div>
    `;
  }
}
