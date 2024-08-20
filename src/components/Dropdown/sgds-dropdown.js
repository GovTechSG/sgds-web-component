import { __decorate } from "tslib";
import { ScopedElementsMixin } from "@open-wc/scoped-elements/lit-element.js";
import { html } from "lit";
import { property, queryAsync } from "lit/decorators.js";
import { ref } from "lit/directives/ref.js";
import { DropdownListElement } from "../../base/dropdown-list-element";
import genId from "../../utils/generateId";
import { SgdsButton } from "../Button/sgds-button";
import dropdownStyle from "./dropdown.css";
/**
 * @summary `SgdsDropdown` toggles contextual overlays for displaying lists of links.
 * @slot default - slot for sgds-dropdown-item passed into dropdown's menu
 *
 * @csspart menu - The dropdown's menu (ul element)
 *
 * @cssprop --sgds-dropdown-z-index - The z-index of dropdown, determining its stacking order relative to other elements.
 * @cssprop --sgds-dropdown-min-width - The minimum width of dropdown
 * @cssprop --sgds-dropdown-padding-x - The left and right padding of dropdown
 * @cssprop --sgds-dropdown-padding-y - The top and bottom padding of dropdown
 * @cssprop --sgds-dropdown-spacer - The margin spacing of dropdown depending on the drop position
 * @cssprop --sgds-dropdown-font-size - The font size of dropdown
 * @cssprop --sgds-dropdown-color - The text color of dropdown
 * @cssprop --sgds-dropdown-bg - The background color of dropdown
 * @cssprop --sgds-dropdown-border-color - The border color of dropdown
 * @cssprop --sgds-dropdown-border-radius - The border radius of dropdown
 * @cssprop --sgds-dropdown-border-width - The border width of dropdown
 * @cssprop --sgds-dropdown-border-width - The border width of dropdown
 * @cssprop --sgds-dropdown-divider-bg - The background color of divider
 * @cssprop --sgds-dropdown-divider-margin-y - The top and bottom margin of divider
 * @cssprop --sgds-dropdown-item-color - The text color of dropdown item
 * @cssprop --sgds-dropdown-item-hover-color - The text color of dropdown item in hover state
 * @cssprop --sgds-dropdown-item-hover-bg - The background color of dropdown item in hover state
 * @cssprop --sgds-dropdown-item-active-color - The text color of dropdown item in active state
 * @cssprop --sgds-dropdown-item-active-bg - The background color of dropdown item in active state
 * @cssprop --sgds-dropdown-item-disabled-color - The text color of dropdown item in disabled state
 * @cssprop --sgds-dropdown-item-padding-x - The left and right padding of dropdown item
 * @cssprop --sgds-dropdown-item-padding-y - The top and bottom padding of dropdown item
 * @cssprop --sgds-dropdown-header-color - The text color of dropdown header
 * @cssprop --sgds-dropdown-header-padding-x - The left and right padding of dropdown header
 * @cssprop --sgds-dropdown-header-padding-y - The top and bottom padding of dropdown header
 *
 */
export class SgdsDropdown extends ScopedElementsMixin(DropdownListElement) {
    /**@internal */
    static get scopedElements() {
        return {
            "sgds-button": SgdsButton
        };
    }
    constructor() {
        super();
        this.togglerId = genId("dropdown", "button");
        /** Sets the text content of Dropdown button */
        this.togglerText = "";
        /** Controls auto-flipping of menu */
        this.noFlip = false;
        /** When true, aligns right edge of menu with right edge of button */
        this.menuAlignRight = false;
        /** The drop position of menu relative to the toggle button */
        this.drop = "down";
        /** Sets color of Dropdown button */
        this.variant = "secondary";
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
    async firstUpdated() {
        super.firstUpdated();
        if (this.menuIsOpen) {
            await this.dropdownRef;
            this.showMenu();
        }
    }
    render() {
        return html `
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
SgdsDropdown.styles = [...DropdownListElement.styles, dropdownStyle];
__decorate([
    property({ type: String })
    /** Forwards value to id attribute of toggle button of Dropdown. An unique id generated by default */
], SgdsDropdown.prototype, "togglerId", void 0);
__decorate([
    property({ type: String })
], SgdsDropdown.prototype, "togglerText", void 0);
__decorate([
    property({ type: Boolean, reflect: true, state: false })
], SgdsDropdown.prototype, "noFlip", void 0);
__decorate([
    property({ type: Boolean, reflect: true, state: false })
], SgdsDropdown.prototype, "menuAlignRight", void 0);
__decorate([
    property({ type: String, reflect: true, state: false })
], SgdsDropdown.prototype, "drop", void 0);
__decorate([
    property({ type: String, reflect: true })
], SgdsDropdown.prototype, "variant", void 0);
__decorate([
    queryAsync("sgds-button")
], SgdsDropdown.prototype, "dropdownRef", void 0);
export default SgdsDropdown;
//# sourceMappingURL=sgds-dropdown.js.map