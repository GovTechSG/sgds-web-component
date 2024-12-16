import { html, nothing } from "lit";
import { query, queryAssignedElements } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import LinkElement from "../../base/link-element";
import SgdsIcon from "../Icon/sgds-icon";
import dropdownItemStyle from "./dropdown-item.css";
import dropdownStyle from "./dropdown.css";
/**
 * @summary `SgdsDropdownItem` are navigation links built with `HTMLAnchorElement`. It should be used in the default slot of `SgdsDropdown`
 * @slot default - The default slot for SgdsDropdownItem. Pass in a single anchor tag per dropdown item directly for navigation items.
 */
export class SgdsDropdownItem extends LinkElement {
  static styles = [dropdownStyle, dropdownItemStyle];
  static dependencies = {
    "sgds-icon": SgdsIcon
  };

  @queryAssignedElements({ flatten: true }) anchor: HTMLAnchorElement[];

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        this.anchor[0].click();
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
        tabindex=${this.disabled ? "-1" : "0"}
      >
        <slot></slot>

<!-- //TODO: Remove active icon for dropdown as navigational dropdowns do not need active icon. Active icon is specific to combobox only.
// When working on combobox please refactor to segregate combobox item from dropdown item -->
        ${this.active
          ? html`<div class="active-icon">
              <sgds-icon name="check"></sgds-icon>
            </div>`
          : nothing}
      </div>
    `;
  }
}

export default SgdsDropdownItem;

