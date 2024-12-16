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
import dropdownMenuStyle from "../Dropdown/dropdown-menu.css";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import SgdsIcon from "../Icon/sgds-icon";

type FilterFunction = (inputValue: string, menuItem: string) => boolean;

/**
 * @summary ComboBox component is used for users to make one or more selections from a list.
 *
 * @slot icon - slot for form control icon to be displayed on the right of the input box.
 *
 * @event sgds-select - Emitted when the combo box's selected value changes.
 * @event sgds-input -  Emitted when user input is received and its value changes.
 */
export class SgdsComboBox extends DropdownListElement {
  static styles = [...DropdownListElement.styles, dropdownStyle, dropdownMenuStyle, comboBoxStyle];
  /**@internal */
  static dependencies = {
    "sgds-input": SgdsInput,
    "sgds-dropdown-item": SgdsDropdownItem,
    "sgds-icon": SgdsIcon
  };
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

  /** Allows invalidFeedback, invalid and valid styles to be visible with the input */
  @property({ type: Boolean, reflect: true }) hasFeedback = false;
  /**Feedback text for error state when validated */
  @property({ type: String, reflect: true }) invalidFeedback = "";

  /** Marks the component as invalid. Replace the pseudo :invalid selector for absent in custom elements */
  @property({ type: Boolean, reflect: true }) invalid = false;
  /** Marks the input as invalid. Replace the pseudo :valid selector for absent in custom elements */
  @property({ type: Boolean, reflect: true }) valid = false;

  /**The list of items to display in the dropdown. */
  @property({ type: Array }) menuList: string[] = [];

  /**The function used to determine if a menu item should be shown in the menu list, given the user's input value. */
  @property()
  filterFunction: FilterFunction = (inputValue: string, menuItem: string) => {
    const itemLowerCase = menuItem.toLowerCase();
    const valueLower = inputValue.toLowerCase();
    return itemLowerCase.startsWith(valueLower);
  };

  /**@internal */
  @state()
  private filteredMenuList: string[] = [];

  /**@internal */
  @watch("value")
  _handleFilterMenu() {
    this.filteredMenuList = this.menuList.filter(item => this.filterFunction.call(null, this.value, item));

    if (!this.myDropdown || !this.bsDropdown) return;

    // To hide dropdown menu when filtered menuList is empty
    if (this.filteredMenuList.length === 0) {
      this.hideMenu();
    } else if (this.menuIsOpen) {
      this.showMenu();
    }
  }

  private _handleInputChange(e: CustomEvent) {
    this.showMenu();
    this.value = (e.target as SgdsInput).value;
  }

  private _handleSelectChange(e: KeyboardEvent | MouseEvent) {
    this.value = (e.target as HTMLButtonElement).innerText;
    this.handleSelectSlot(e);
  }

  render() {
    return html`
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
          suffix=${html`<sgds-icon name="chevron-down" size="md"></sgds-icon>`}
        >
        </sgds-input>
        <ul id=${this.dropdownMenuId} class="dropdown-menu" part="menu" tabindex="-1">
          ${this.filteredMenuList.map(
            item => html`<sgds-dropdown-item @click=${this._handleSelectChange}>${item}</sgds-dropdown-item>`
          )}
        </ul>
      </div>
    `;
  }
}

export default SgdsComboBox;
