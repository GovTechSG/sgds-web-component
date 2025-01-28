import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { ref } from "lit/directives/ref.js";
import { DropdownListElement } from "../../base/dropdown-list-element";
import { defaultValue } from "../../utils/defaultvalue";
import { watch } from "../../utils/watch";
import { SgdsComboBoxItem } from "./sgds-combo-box-item";
import { SgdsInput } from "../Input/sgds-input";
import { SgdsBadge } from "../Badge/sgds-badge";
import comboBoxStyle from "./combo-box.css";
import dropdownStyle from "../Dropdown/dropdown.css";
import dropdownMenuStyle from "../Dropdown/dropdown-menu.css";
import SgdsIcon from "../Icon/sgds-icon";

/**
 * Each item in the ComboBox has a label to display
 * and a value (the actual data / ID).
 */
interface SgdsComboBoxItemData {
  label: string;
  value: string | number;
}

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

  /** @internal */
  static dependencies = {
    "sgds-input": SgdsInput,
    "sgds-combo-box-item": SgdsComboBoxItem,
    "sgds-icon": SgdsIcon,
    "sgds-badge": SgdsBadge
  };

  constructor() {
    super();
    /** @internal */
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

  /** The input's name attribute */
  @property({ reflect: true }) name: string;

  /** The input's placeholder text. */
  @property({ type: String, reflect: true }) placeholder = "placeholder";

  /** Autofocus the input */
  @property({ type: Boolean, reflect: true }) autofocus = false;

  /** Disables the input. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Makes the input a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Makes the input readonly. */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /**
   * IMPORTANT:
   * We still expose `.value` externally, but this is now the underlying ID or data
   * (e.g. 1, 2, 'abc', ...), not the label that appears in the input box.
   */
  @property({ type: String, reflect: true })
  value = "";

  @state()
  private displayValue = "";

  /** Gets or sets the default value used to reset this element. */
  @defaultValue()
  defaultValue = "";

  /** Allows invalidFeedback, invalid and valid styles to be visible with the input */
  @property({ type: Boolean, reflect: true }) hasFeedback = false;

  /** Feedback text for error state when validated */
  @property({ type: String, reflect: true }) invalidFeedback = "";

  /** Marks the component as invalid. Replace the pseudo :invalid selector. */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /** Marks the input as valid. Replace the pseudo :valid selector. */
  @property({ type: Boolean, reflect: true }) valid = false;

  /** The list of items to display in the dropdown. */
  @property({ type: Array }) menuList: SgdsComboBoxItemData[] = [];

  /** If true, renders multiple checkbox selection items. If false, single-select. */
  @property({ type: Boolean, reflect: true }) multiSelect = false;

  /** The function used to filter the menu list, given the user's input value. */
  @property()
  filterFunction: (inputValue: string, item: SgdsComboBoxItemData) => boolean = (inputValue, item) => {
    return item.label.toLowerCase().startsWith(inputValue.toLowerCase());
  };

  /** @internal */
  @state()
  private filteredMenuList: SgdsComboBoxItemData[] = [];

  /** Track selected items (even for single-select, but it will have at most one). */
  @state()
  private selectedItems: SgdsComboBoxItemData[] = [];

  /** Watch the input's value to dynamically filter items in the dropdown. */
  @watch("displayValue")
  _filterMenu() {
    // Filter items based on the typed input
    this.filteredMenuList = this.menuList.filter(item => this.filterFunction(this.displayValue, item));

    // If using bootstrap's dropdown logic
    if (!this.myDropdown || !this.bsDropdown) return;

    // Hide dropdown menu if there are no items
    if (this.filteredMenuList.length === 0) {
      this.hideMenu();
    } else if (this.menuIsOpen) {
      this.showMenu();
    }
    // reset menu list when displayValue
    if (this.displayValue === "" && !this.multiSelect) {
      this.selectedItems = [];
      this.value = this.selectedItems.join(";");
    }
  }
  // Called each time the user types in the <sgds-input>, we set .value and show the menu
  private _handleInputChange(e: CustomEvent) {
    this.showMenu();
    this.displayValue = (e.target as SgdsInput).value;
  }

  /**
   * Called whenever an <sgds-combo-box-item> dispatches "sgds-selected"
   */
  private _handleItemSelected(e: CustomEvent) {
    const itemEl = e.target as SgdsComboBoxItem;
    const isActive = e.detail.active;

    const itemLabel = itemEl.textContent?.trim() ?? "";
    const itemValueAttr = itemEl.getAttribute("value") ?? itemLabel;
    const foundItem = this.filteredMenuList.find(i => i.value.toString() === itemValueAttr) || {
      label: itemLabel,
      value: itemValueAttr
    };

    if (this.multiSelect) {
      if (isActive) {
        if (!this.selectedItems.some(i => i.value === foundItem.value)) {
          this.selectedItems = [...this.selectedItems, foundItem];
          this.displayValue = "";
        }
      } else {
        // Remove
        this.selectedItems = this.selectedItems.filter(i => i.value !== foundItem.value);
      }

      this.value = this.selectedItems.map(i => i.value).join(";");
    } else {
      // Single-select
      if (isActive) {
        this.selectedItems = [foundItem];

        this.value = foundItem.value.toString();
        this.displayValue = this.selectedItems[0].label;
        this.hideMenu();
      } else {
        this.selectedItems = [];
        this.displayValue = "";
        this.value = "";
      }
    }

    console.log("selectedItems:", this.selectedItems);
    console.log("value:", this.value);
  }

  private _handleBadgeDismissed(item: SgdsComboBoxItemData) {
    this.selectedItems = this.selectedItems.filter(i => i.value !== item.value);

    this.value = this.selectedItems.map(i => i.value).join(";");
  }
  private _handleKeyDown(e: KeyboardEvent) {
    // Only do this in multi-select mode
    if (!this.multiSelect) {
      return;
    }

    if (e.key === "Backspace" && this.multiSelect) {
      if (this.displayValue.trim() === "" && this.selectedItems.length > 0) {
        this.selectedItems = this.selectedItems.slice(0, -1);
        this.value = this.selectedItems.map(i => i.value).join(";");
      }
    }
  }

  render() {
    return html`
      <div class="combobox" @keydown=${this._handleKeyDown}>
        <!-- The input -->
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
          .value=${this.displayValue}
          @sgds-input=${this._handleInputChange}
          role="combobox"
          aria-expanded=${this.menuIsOpen}
          aria-autocomplete="list"
          aria-controls=${this.dropdownMenuId}
          suffix=${html`<sgds-icon name="chevron-down" size="md"></sgds-icon>`}
          .prefix=${this.multiSelect
            ? html`
                ${this.selectedItems.map(
                  item =>
                    html`<sgds-badge
                      outlined
                      variant="neutral"
                      show
                      dismissible
                      @sgds-hide=${() => this._handleBadgeDismissed(item)}
                      >${item.label}</sgds-badge
                    >`
                )}
              `
            : null}
        >
        </sgds-input>

        <ul id=${this.dropdownMenuId} class="dropdown-menu" part="menu" tabindex="-1">
          ${this.filteredMenuList.map(item => {
            const isActive = this.selectedItems.includes(item);
            return html`
              <sgds-combo-box-item
                ?active=${isActive}
                ?checkbox=${this.multiSelect}
                value=${item.value}
                @sgds-selected=${this._handleItemSelected}
              >
                ${item.label}
              </sgds-combo-box-item>
            `;
          })}
        </ul>
      </div>
    `;
  }
}

export default SgdsComboBox;
