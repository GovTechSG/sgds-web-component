import { html } from "lit";
import { property, queryAssignedElements } from "lit/decorators.js";
import { ref } from "lit/directives/ref.js";
import { DropdownListElement } from "../../base/dropdown-list-element";
import { watch } from "../../utils/watch";
import dropdownMenuStyle from "./dropdown-menu.css";
import dropdownStyle from "./dropdown.css";
export type DropDirection = "left" | "right" | "up" | "down";
export type DropdownButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

/**
 * @summary `SgdsDropdown` toggles contextual overlays for displaying lists of links.
 * @slot default - slot for sgds-dropdown-item passed into dropdown's menu
 * @slot toggler - slot for the toggler that triggers the open and closing of menu, typically a button. Only pass in a single element into this slot
 *
 */
export class SgdsDropdown extends DropdownListElement {
  static styles = [...DropdownListElement.styles, dropdownStyle, dropdownMenuStyle];
  constructor() {
    super();
    /**@internal */
    this.modifierOpt = [
      {
        name: "offset",
        options: {
          offset: [0, 8]
        }
      }
    ];
  }

  /** Controls auto-flipping of menu */
  @property({ type: Boolean, reflect: true, state: false })
  noFlip = false;

  /** When true, aligns right edge of menu with right edge of button */
  @property({ type: Boolean, reflect: true, state: false })
  menuAlignRight = false;

  /** The drop position of menu relative to the toggle button */
  @property({ type: String, reflect: true, state: false })
  drop: DropDirection = "down";

  @queryAssignedElements({ slot: "toggler", flatten: true })
  private _toggler: Array<HTMLElement>;

  private _handleCloseMenu() {
    const button = this._toggler[0];
    button.focus();
  }

  async connectedCallback() {
    super.connectedCallback();
    this.addEventListener("sgds-hide", this._handleCloseMenu);
  }

  async disconnectedCallback() {
    this.removeEventListener("sgds-hide", this._handleCloseMenu);
  }

  async firstUpdated() {
    super.firstUpdated();
    if (this.menuIsOpen) {
      this.showMenu();
    }
    this._handleDisabled();
  }

  @watch("disabled", { waitUntilFirstUpdate: true })
  _handleDisabled() {
    const button = this._toggler[0];

    if (this.disabled) {
      button.setAttribute("disabled", "true");
    } else {
      button.hasAttribute("disabled") && button.removeAttribute("disabled");
    }
  }
  render() {
    return html`
      <div class="dropdown">
        <div
          class="toggler-container"
          ${ref(this.myDropdown)}
          @click=${() => this.toggleMenu()}
          aria-expanded="${this.menuIsOpen}"
          aria-haspopup="menu"
        >
          <slot name="toggler"></slot>
        </div>
        <div class="dropdown-menu" role="menu">
          <slot id="default" @click=${this.handleSelectSlot}></slot>
        </div>
      </div>
    `;
  }
}

export default SgdsDropdown;
