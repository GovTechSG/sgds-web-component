import { html } from "lit";
import SgdsElement from "../../base/sgds-element";
import overflowMenuStyles from "./overflow-menu.css";
import { property } from "lit/decorators.js";
import { SgdsDropdown } from "../../components/Dropdown/sgds-dropdown";
import { SgdsDropdownItem } from "../../components/Dropdown/sgds-dropdown-item";
import { SgdsIcon } from "../../components/Icon/sgds-icon";
/**
 * @summary An overflow menu is a UI element, often represented by three dots (⋮ or …), that opens a menu with additional actions or options.
 * @slot default - The overflow menu items. Pass in sgds-dropdown-items in this slot
 */
export class SgdsOverflowMenu extends SgdsElement {
  static styles = [...SgdsElement.styles, overflowMenuStyles];
  static dependencies = {
    "sgds-dropdown": SgdsDropdown,
    "sgds-dropdown-item": SgdsDropdownItem,
    "sgds-icon": SgdsIcon
  };
  /** Specifies a large or small button */
  @property({ type: String, reflect: true }) size: "sm" | "md" = "md";

  render() {
    return html`
      <sgds-dropdown>
        <button slot="toggler" class="overflow-btn">
          <sgds-icon name="three-dots" size=${this.size}></sgds-icon>
        </button>
        <slot></slot>
      </sgds-dropdown>
    `;
  }
}

export default SgdsOverflowMenu;
