import { html } from "lit";
import { property, queryAssignedElements } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import SgdsIcon from "../Icon/sgds-icon";
import dropdownItemStyle from "./dropdown-item.css";
import dropdownStyle from "./dropdown.css";
/**
 * @summary `SgdsDropdownItem` are navigation links built with `HTMLAnchorElement`. It should be used in the default slot of `SgdsDropdown`
 * @slot default - The default slot for SgdsDropdownItem. Pass in a single anchor tag per dropdown item directly for navigation items.
 */
export class SgdsDropdownItem extends SgdsElement {
  static styles = [dropdownStyle, dropdownItemStyle];
  static dependencies = {
    "sgds-icon": SgdsIcon
  };

  /** @internal */
  @queryAssignedElements({ flatten: true }) private anchor: HTMLAnchorElement[];

  /** when true, sets the active stylings of .nav-link */
  @property({ type: Boolean })
  active = false;

  /** Disables the SgdsMainnavItem */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        this.anchor[0].click();
      }
    });
    this.setAttribute("role", "menuitem");
    this.setAttribute("aria-disabled", `${this.disabled}`);
  }

  render() {
    return html`
      <div
        class="dropdown-item ${classMap({
          disabled: this.disabled,
          active: this.active
        })}"
        tabindex=${this.disabled ? "-1" : "0"}
      >
        <slot></slot>
      </div>
    `;
  }
}

export default SgdsDropdownItem;
