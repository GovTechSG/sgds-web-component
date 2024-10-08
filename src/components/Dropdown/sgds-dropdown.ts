import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { html } from "lit";
import { property, queryAsync } from "lit/decorators.js";
import { ref } from "lit/directives/ref.js";
import { DropdownListElement } from "../../base/dropdown-list-element";
import genId from "../../utils/generateId";
import { SgdsButton } from "../Button/sgds-button";
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
 *
 * @csspart menu - The dropdown's menu (ul element)
 *
 */
export class SgdsDropdown extends ScopedElementsMixin(DropdownListElement) {
  static styles = [...DropdownListElement.styles, dropdownStyle];
  /**@internal */
  static get scopedElements() {
    return {
      "sgds-button": SgdsButton
    };
  }
  constructor() {
    super();
    /**@internal */
    this.modifierOpt = [
      {
        name: "offset",
        options: {
          offset: [0, 10]
        }
      }
    ];
  }
  @property({ type: String })
  /** Forwards value to id attribute of toggle button of Dropdown. An unique id generated by default */
  togglerId: string = genId("dropdown", "button");

  /** Sets the text content of Dropdown button */
  @property({ type: String })
  togglerText = "";

  /** Controls auto-flipping of menu */
  @property({ type: Boolean, reflect: true, state: false })
  noFlip = false;

  /** When true, aligns right edge of menu with right edge of button */
  @property({ type: Boolean, reflect: true, state: false })
  menuAlignRight = false;

  /** The drop position of menu relative to the toggle button */
  @property({ type: String, reflect: true, state: false })
  drop: DropDirection = "down";

  /** Sets color of Dropdown button */
  @property({ type: String, reflect: true })
  variant: DropdownButtonVariant = "secondary";

  /**@internal */
  @queryAsync("sgds-button")
  private dropdownRef: Promise<SgdsButton>;

  async firstUpdated() {
    super.firstUpdated();
    if (this.menuIsOpen) {
      await this.dropdownRef;
      this.showMenu();
    }
  }
  render() {
    return html`
      <div>
        <sgds-button
          outlined
          role="button"
          variant=${this.variant}
          ?disabled=${this.disabled}
          aria-expanded="${this.menuIsOpen}"
          aria-haspopup="menu"
          ${ref(this.myDropdown)}
          @click=${() => this.toggleMenu()}
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
        <div class="dropdown-menu" role="menu" part="menu">
          <slot id="default" @click=${this.handleSelectSlot}></slot>
        </div>
      </div>
    `;
  }
}

export default SgdsDropdown;
