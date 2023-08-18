import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { html } from "lit";
import { property, query } from "lit/decorators.js";
import { ref } from "lit/directives/ref.js";
import { DropdownElement } from "../../base/dropdown-element";
import { defaultValue } from "../../utils/defaultvalue";
import { SgdsDropdownItem } from "../Dropdown";
import { SgdsInput } from "../Input";
import styles from "./sgds-combo-box.scss";

type FilterFunction = (inputValue: string, menuItem: string) => boolean;

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
  /**@internal */
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

  @query(".dropdown-menu")
  // To get the dropdown menu element after render
  private dropdownMenu: HTMLUListElement;

  @property({ type: Function })
  filterFunction: FilterFunction = (inputValue: string, menuItem: string) => {
    const itemLowerCase = menuItem.toLowerCase();
    const valueLower = inputValue.toLowerCase();
    return itemLowerCase.startsWith(valueLower);
  };

  private _getFilteredMenuList(inputValue: string) {
    return this.menuList.filter(item => this.filterFunction.call(null, inputValue, item));
  }

  private _handleInputChange(e: CustomEvent) {
    this.showMenu();
    this.value = (e.target as SgdsInput).value;
  }

  private _handleSelectChange(e: KeyboardEvent | MouseEvent) {
    this.value = (e.target as SgdsDropdownItem).innerText;
    this._handleSelectSlot(e);
  }

  render() {
    const filteredMenu = this._getFilteredMenuList(this.value);

    // To hide dropdown menu when filtered menuList is empty
    if (filteredMenu.length === 0) {
      this.dropdownMenu?.classList.add("hide");
    } else {
      this.dropdownMenu?.classList.remove("hide");
    }

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
          ${filteredMenu.map(
            item =>
              html`<sgds-dropdown-item href="javascript:void(0)" @click=${this._handleSelectChange}
                >${item}</sgds-dropdown-item
              >`
          )}
        </ul>
      </div>
    `;
  }
}

export default SgdsComboBox;
