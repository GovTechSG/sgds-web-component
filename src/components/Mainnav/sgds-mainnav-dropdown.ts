import { html } from "lit";
import { property, queryAsync } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ref } from "lit/directives/ref.js";
import { DropdownListElement } from "../../base/dropdown-list-element";
import genId from "../../utils/generateId";
import dropdownStyle from "../Dropdown/dropdown.css";
import mainnavDropdownStyle from "./mainnav-dropdown.css";
/**
 * @slot default - The menu items. Pass in sgds-dropdown-item as the menu items
 * @slot toggler - The content of the toggler to pass in html content. `togglerText` property takes precedence over this slot when both are defined.
 *
 * @cssproperty --mainnav-dropdown-theme-color - Hover and active color for mainnav dropdowns. By default, it follows --mainnav-theme-color
 * @cssproperty --mainnav-dropdown-color - Text color of the mainnav dropdown toggler.
 * @cssproperty --mainnav-dropdown-border-bottom-width - border bottom width for hover and active state for mainnav dropdown toggler
 * @cssproperty --mainnav-dropdown-disabled-opacity - The opacity of mainnav dropdown at disabled state. By default, it follows --mainnav-disabled-opacity
 */
export class SgdsMainnavDropdown extends DropdownListElement {
  static styles = [...DropdownListElement.styles, dropdownStyle, mainnavDropdownStyle];

  /**@internal */
  @queryAsync("a")
  private dropdownRef: Promise<HTMLAnchorElement>;

  /** @internal Forwards value to id attribute of toggle button of Dropdown. An unique id generated by default */
  private togglerId: string = genId("dropdown", "button");

  /** Sets the text content of Dropdown button */
  @property({ type: String })
  togglerText = "";

  /** When true,  applies active styles on the dropdown button */
  @property({ type: Boolean })
  active = false;

  async firstUpdated() {
    super.firstUpdated();
    if (this.menuIsOpen) {
      await this.dropdownRef;
      this.showMenu();
    }
  }

  render() {
    return html`
      <li class="sgds nav-item dropdown">
        <a
          class="${classMap({
            "dropdown-toggle": true,
            "nav-link": true,
            active: this.active,
            disabled: this.disabled
          })}"
          ?disabled=${this.disabled}
          aria-expanded="${this.menuIsOpen}"
          ${ref(this.myDropdown)}
          @click=${() => this.toggleMenu()}
          id=${this.togglerId}
          tabindex=${this.disabled ? "-1" : "0"}
          role="button"
        >
          ${this.togglerText ? this.togglerText : html`<slot name="toggler"></slot>`}
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
          <slot id="default" @click=${this.handleSelectSlot}></slot>
        </ul>
      </li>
    `;
  }
}

export default SgdsMainnavDropdown;
