import { html, nothing } from "lit";
import { query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import LinkElement from "../../base/link-element";
import dropdownStyle from "./dropdown.css";
import dropdownItemStyle from "./dropdown-item.css";
/**
 * @summary `SgdsDropdownItem` are navigation links built with `HTMLAnchorElement`. It should be used in the default slot of `SgdsDropdown`
 */
export class SgdsDropdownItem extends LinkElement {
  static styles = [dropdownStyle, dropdownItemStyle];

  @query("a")
  private anchor: HTMLElement;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        this.anchor.click();
      }
    });
    this.setAttribute("role", "menuitem");
  }

  render() {
    return html`
      <div
        class="dropdown-item ${classMap({
          disabled: this.disabled,
          active: this.active
        })}"
        tabindex=${this.disabled ? "-1": "0"}
      >
        <slot></slot>
        ${this.active
          ? html`<div class="active-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path
                  d="M17.7701 0.968446C17.843 1.04113 17.9008 1.12748 17.9402 1.22255C17.9797 1.31762 18 1.41953 18 1.52246C18 1.62539 17.9797 1.7273 17.9402 1.82237C17.9008 1.91744 17.843 2.00379 17.7701 2.07647L6.81504 13.0315C6.74235 13.1044 6.656 13.1622 6.56094 13.2017C6.46587 13.2411 6.36395 13.2614 6.26103 13.2614C6.1581 13.2614 6.05619 13.2411 5.96112 13.2017C5.86605 13.1622 5.7797 13.1044 5.70701 13.0315L0.22948 7.55401C0.0825462 7.40707 0 7.20779 0 6.99999C0 6.7922 0.0825462 6.59291 0.22948 6.44598C0.376413 6.29905 0.575698 6.2165 0.783493 6.2165C0.991289 6.2165 1.19057 6.29905 1.33751 6.44598L6.26103 11.3711L16.6621 0.968446C16.7348 0.895574 16.8211 0.837758 16.9162 0.79831C17.0113 0.758862 17.1132 0.738556 17.2161 0.738556C17.319 0.738556 17.4209 0.758862 17.516 0.79831C17.6111 0.837758 17.6974 0.895574 17.7701 0.968446Z"
                  fill="#5A42C0"
                />
              </svg>
            </div>`
          : nothing}
      </div>
    `;
  }
}

export default SgdsDropdownItem;
