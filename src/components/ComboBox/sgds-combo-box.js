import { __decorate } from "tslib";
import { ScopedElementsMixin } from "@open-wc/scoped-elements/lit-element.js";
import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { ref } from "lit/directives/ref.js";
import { DropdownListElement } from "../../base/dropdown-list-element";
import { defaultValue } from "../../utils/defaultvalue";
import { watch } from "../../utils/watch";
import { SgdsDropdownItem } from "../Dropdown/sgds-dropdown-item";
import { SgdsInput } from "../Input/sgds-input";
import comboBoxStyle from "./combo-box.css";
import dropdownStyle from "../Dropdown/dropdown.css";
/**
 * @summary ComboBox component is used for users to make one or more selections from a list.
 *
 * @slot icon - slot for form control icon to be displayed on the right of the input box.
 *
 * @event sgds-select - Emitted when the combo box's selected value changes.
 * @event sgds-input -  Emitted when user input is received and its value changes.
 */
export class SgdsComboBox extends ScopedElementsMixin(DropdownListElement) {
    /**@internal */
    static get scopedElements() {
        return {
            "sgds-input": SgdsInput,
            "sgds-dropdown-item": SgdsDropdownItem
        };
    }
    constructor() {
        super();
        /** The input's label  */
        this.label = "";
        /** The input's hint text below the label */
        this.hintText = "";
        /**The input's placeholder text. */
        this.placeholder = "placeholder";
        /**Autofocus the input */
        this.autofocus = false;
        /**Disables the input. */
        this.disabled = false;
        /**Makes the input a required field. */
        this.required = false;
        /**Makes the input readonly. */
        this.readonly = false;
        /**The input's value attribute. */
        this.value = "";
        /**Gets or sets the default value used to reset this element. The initial value corresponds to the one originally specified in the HTML that created this element. */
        this.defaultValue = "";
        /** Allows invalidFeedback, invalid and valid styles to be visible with the input */
        this.hasFeedback = false;
        /**Feedback text for error state when validated */
        this.invalidFeedback = "";
        /** Marks the component as invalid. Replace the pseudo :invalid selector for absent in custom elements */
        this.invalid = false;
        /** Marks the input as invalid. Replace the pseudo :valid selector for absent in custom elements */
        this.valid = false;
        /**The list of items to display in the dropdown. */
        this.menuList = [];
        /**The function used to determine if a menu item should be shown in the menu list, given the user's input value. */
        this.filterFunction = (inputValue, menuItem) => {
            const itemLowerCase = menuItem.toLowerCase();
            const valueLower = inputValue.toLowerCase();
            return itemLowerCase.startsWith(valueLower);
        };
        /**@internal */
        this.filteredMenuList = [];
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
    /**@internal */
    _handleFilterMenu() {
        this.filteredMenuList = this.menuList.filter(item => this.filterFunction.call(null, this.value, item));
        if (!this.myDropdown || !this.bsDropdown)
            return;
        // To hide dropdown menu when filtered menuList is empty
        if (this.filteredMenuList.length === 0) {
            this.hideMenu();
        }
        else if (this.menuIsOpen) {
            this.showMenu();
        }
    }
    _handleInputChange(e) {
        this.showMenu();
        this.value = e.target.value;
    }
    _handleSelectChange(e) {
        this.value = e.target.innerText;
        this.handleSelectSlot(e);
    }
    render() {
        return html `
      <div class="sgds combobox dropdown">
        <sgds-input
          class="dropdown-toggle"
          label=${this.label}
          hintText=${this.hintText}
          name=${this.name}
          ${ref(this.myDropdown)}
          @click=${() => (this.filteredMenuList.length > 0 ? this.showMenu() : this.hideMenu())}
          placeholder=${this.placeholder}
          ?autofocus=${this.autofocus}
          ?disabled=${this.disabled}
          required=${this.required}
          ?readonly=${this.readonly}
          ?hasFeedback=${this.hasFeedback}
          invalidfeedback=${this.invalidFeedback}
          ?invalid=${this.invalid}
          ?valid=${this.valid}
          .value=${this.value}
          @sgds-input=${this._handleInputChange}
          role="combobox"
          aria-expanded=${this.menuIsOpen}
          aria-autocomplete="list"
          aria-controls=${this.dropdownMenuId}
        >
        </sgds-input>
        <div class="form-control-icon">
          <slot name="icon"></slot>
        </div>
        <ul id=${this.dropdownMenuId} class="dropdown-menu" part="menu" tabindex="-1">
          ${this.filteredMenuList.map(item => html `<sgds-dropdown-item @click=${this._handleSelectChange}>${item}</sgds-dropdown-item>`)}
        </ul>
      </div>
    `;
    }
}
SgdsComboBox.styles = [...DropdownListElement.styles, comboBoxStyle, dropdownStyle];
__decorate([
    property({ reflect: true })
], SgdsComboBox.prototype, "label", void 0);
__decorate([
    property({ reflect: true })
], SgdsComboBox.prototype, "hintText", void 0);
__decorate([
    property({ reflect: true })
], SgdsComboBox.prototype, "name", void 0);
__decorate([
    property({ type: String, reflect: true })
], SgdsComboBox.prototype, "placeholder", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsComboBox.prototype, "autofocus", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsComboBox.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsComboBox.prototype, "required", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsComboBox.prototype, "readonly", void 0);
__decorate([
    property({ reflect: true })
], SgdsComboBox.prototype, "value", void 0);
__decorate([
    defaultValue()
], SgdsComboBox.prototype, "defaultValue", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsComboBox.prototype, "hasFeedback", void 0);
__decorate([
    property({ type: String, reflect: true })
], SgdsComboBox.prototype, "invalidFeedback", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsComboBox.prototype, "invalid", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsComboBox.prototype, "valid", void 0);
__decorate([
    property({ type: Array })
], SgdsComboBox.prototype, "menuList", void 0);
__decorate([
    property()
], SgdsComboBox.prototype, "filterFunction", void 0);
__decorate([
    state()
], SgdsComboBox.prototype, "filteredMenuList", void 0);
__decorate([
    watch("value")
], SgdsComboBox.prototype, "_handleFilterMenu", null);
export default SgdsComboBox;
//# sourceMappingURL=sgds-combo-box.js.map