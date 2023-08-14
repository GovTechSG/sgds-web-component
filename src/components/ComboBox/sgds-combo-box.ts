import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { html } from "lit";
import { property } from "lit/decorators.js";
import { ref } from "lit/directives/ref.js";
import { DropdownElement } from "../../base/dropdown-element";
import { defaultValue } from "../../utils/defaultvalue";
import { SgdsDropdownItem } from "../Dropdown";
import { SgdsInput } from "../Input";
import styles from "./sgds-combo-box.scss";

/**
 * @summary ComboBox component is used for users to make one or more selections from a list.
 *
 * @slot icon - slot for form control icon to be displayed on the right of the input box.
 *
 * @event sgds-select - Emitted when the combo box's selected value changes.
 * @event sgds-input -  Emitted when user input is received and its value changes.
 */
export class SgdsComboBox extends ScopedElementsMixin(DropdownElement) {
  static styles = [DropdownElement.styles, styles];
  static get scopedElements() {
    return {
      "sgds-input": SgdsInput,
      "sgds-dropdown-item": SgdsDropdownItem
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
  /** The input's label  */
  @property({ reflect: true }) label = "";
  /** The input's hint text below the label */
  @property({ reflect: true }) hintText = "";
  /**The input's name attribute */
  @property({ reflect: true }) name: string;
  /**The input's placeholder text. */
  @property({ type: String, reflect: true }) placeholder = "placeholder";
  /**Autofocus the input */
  @property({ type: Boolean, reflect: true }) autofocus = false;
  /**Disables the input. */
  @property({ type: Boolean, reflect: true }) disabled = false;
  /**Makes the input a required field. */
  @property({ type: Boolean, reflect: true }) required = false;
  /**Makes the input readonly. */
  @property({ type: Boolean, reflect: true }) readonly = false;
  /**The input's value attribute. */
  @property({ reflect: true }) value = "";
  /**Gets or sets the default value used to reset this element. The initial value corresponds to the one originally specified in the HTML that created this element. */
  @defaultValue()
  defaultValue = "";
  /**The list of items to display in the dropdown. */
  @property({ type: Array }) menuList: string[] = [];

  private _getFilteredMenuList(inputValue: string) {
    return this.menuList.filter(n => {
      const nLowerCase = n.toLowerCase();
      const valueLower = inputValue.toLowerCase();
      return nLowerCase.startsWith(valueLower);
    });
  }

  private _handleInputChange(e: CustomEvent) {
    this.bsDropdown.show();
    this.value = (e.target as SgdsInput).value;
  }

  private _handleSelectChange(e: KeyboardEvent | MouseEvent) {
    this.value = (e.target as SgdsDropdownItem).innerText;
    this._handleSelectSlot(e);
  }

  render() {
    return html`
      <div class="sgds combobox dropdown">
        <sgds-input
          class="dropdown-toggle w-100"
          label=${this.label}
          hintText=${this.hintText}
          name=${this.name}
          ${ref(this.myDropdown)}
          @click=${() => this._onClickButton()}
          placeholder=${this.placeholder}
          ?autofocus=${this.autofocus}
          ?disabled=${this.disabled}
          ?required=${this.required}
          ?readonly=${this.readonly}
          .value=${this.value}
          @sgds-input=${this._handleInputChange}
        >
        </sgds-input>
        <div class="form-control-icon">
          <slot name="icon"></slot>
        </div>
        <ul class="dropdown-menu" part="menu">
          ${this._getFilteredMenuList(this.value).map(
            item => html`<sgds-dropdown-item href="#" @click=${this._handleSelectChange}>${item}</sgds-dropdown-item>`
          )}
        </ul>
      </div>
    `;
  }
}

export default SgdsComboBox;
