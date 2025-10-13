import { html, PropertyValueMap } from "lit";
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
    this.menuRef = ref();
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

  protected menuRef;

  private async _handleClick() {
    if (this.disabled) {
      return;
    }
    this.toggleMenu();
  }

  private _handleCloseMenu() {
    const button = this._toggler[0];
    button?.focus();
  }

  async connectedCallback() {
    super.connectedCallback();
    this.addEventListener("sgds-hide", this._handleCloseMenu);
  }

  async disconnectedCallback() {
    this.removeEventListener("sgds-hide", this._handleCloseMenu);
  }

  async firstUpdated(changedProperties: PropertyValueMap<this>) {
    super.firstUpdated(changedProperties);
    if (this.menuIsOpen) {
      await this.showMenu();
    }
    this._handleDisabled();
  }

  @watch("disabled", { waitUntilFirstUpdate: true })
  _handleDisabled() {
    const button = this._toggler[0];
    if (button) {
      if (this.disabled) {
        button.setAttribute("disabled", "true");
      } else {
        button.hasAttribute("disabled") && button.removeAttribute("disabled");
      }
    }
  }

  render() {
    return html`
      <div class="dropdown">
        <div
          class="toggler-container"
          ${ref(this.myDropdown)}
          @click=${this._handleClick}
          aria-expanded="${this.menuIsOpen}"
          aria-haspopup="menu"
        >
          <slot name="toggler"></slot>
        </div>
        <div class="dropdown-menu" role="menu" ${ref(this.menuRef)}>
          <slot id="default" @click=${this.handleSelectSlot}></slot>
        </div>
      </div>
    `;
  }
}

export default SgdsDropdown;
