import { html, nothing } from "lit";
import { property, queryAsync, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { ref } from "lit/directives/ref.js";
import { SelectElement, SgdsSelectItemData } from "../../base/select-element";
import { watch } from "../../utils/watch";
import { SgdsBadge } from "../Badge/sgds-badge";
import SgdsIcon from "../Icon/sgds-icon";
import { ComboBoxItem } from "./combo-box-item";
import comboBoxStyle from "./combo-box.css";

/**
 * Each item in the ComboBox has a label to display
 * and a value (the actual data / ID).
 */
type SgdsComboBoxItemData = SgdsSelectItemData;
/**
 * @summary ComboBox component is used for users to make one or more selections from a list through user input, keyboard or mouse actions
 *
 * @slot icon - slot for form control icon to be displayed on the right of the input box.
 *
 * @event sgds-select - Emitted when the combo box's selected value changes.
 * @event sgds-input -  Emitted when user input is received and its value changes.
 */

export class SgdsComboBox extends SelectElement {
  static styles = [...SelectElement.styles, comboBoxStyle];

  /** @internal */
  static dependencies = {
    "sgds-combo-box-item": ComboBoxItem,
    "sgds-icon": SgdsIcon,
    "sgds-badge": SgdsBadge
  };

  /** If true, renders multiple checkbox selection items. If false, single-select. */
  @property({ type: Boolean, reflect: true }) multiSelect = false;

  /** If true, renders badge that fills width of combobox */
  @property({ type: Boolean, reflect: true }) badgeFullWidth = false;

  /** The function used to filter the menu list, given the user's input value. */
  @property()
  filterFunction: (inputValue: string, item: SgdsComboBoxItemData) => boolean = (inputValue, item) => {
    return item.label.toLowerCase().startsWith(inputValue.toLowerCase());
  };

  /** Managed menu to render depending on the activity. On input change, show filteredMenu, on selections and initial state show full menu list. */
  @state()
  private _renderedMenu: SgdsComboBoxItemData[] = [];

  @queryAsync("input#multi-select-input-tracker") private _multiSelectInput: Promise<HTMLInputElement>;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("sgds-hide", async () => {
      const sgdsInput = await this._input;
      sgdsInput.focus();
      this._renderedMenu = this.menuList;
    });
  }

  async firstUpdated() {
    super.firstUpdated();

    this._renderedMenu = this.menuList;
    if (this.value) {
      const valueArray = this.value.split(";");
      const initialSelectedItem = this.menuList.filter(({ value }) => valueArray.includes(value));
      this.selectedItems = [...initialSelectedItem, ...this.selectedItems];

      if (!this.multiSelect) {
        this.displayValue = initialSelectedItem[0].label;
      }
    }
    this.multiSelect ? (this.input = await this._multiSelectInput) : (this.input = await this._input);
    this._mixinValidate(this.input);

    if (this.menuIsOpen && !this.readonly) {
      this.showMenu();
    }
  }

  @watch("value", { waitUntilFirstUpdate: true })
  async _handleValueChange() {
    if (this.value) {
      this.emit("sgds-select");
    }
    const sgdsInput = await this._input;
    this._mixinSetFormValue();

    if (this.multiSelect) {
      this._mixinValidate(this.input);
    } else {
      // this._mixinValidate(sgdsInput.input);
      this._mixinValidate(sgdsInput);
    }
    if (!this._isTouched && this.value === "") return;

    this.invalid = !this._mixinReportValidity();
  }

  // Called each time the user types in the <sgds-input>, we set .value and show the menu
  private async _handleInputChange(e: CustomEvent) {
    this.emit("sgds-input");
    const input = e.target as HTMLInputElement;
    this.displayValue = input.value;
    this.filteredMenuList = this.menuList.filter(item => this.filterFunction(this.displayValue, item));

    // reset menu list when displayValue
    if (this.displayValue === "" && !this.multiSelect) {
      this.selectedItems = [];
      this.value = this.selectedItems.join(";");
    }

    this.invalid = false;
    this.showMenu();

    this.displayValue = (e.target as HTMLInputElement).value;
    this._renderedMenu = this.filteredMenuList;

    if (this.displayValue === "") {
      this._renderedMenu = this.menuList;
      await this.updateComplete;
    }
  }

  /**
   * Called whenever an <sgds-combo-box-item> dispatches sgds-select"
   */
  protected async _handleItemSelected(e: CustomEvent) {
    const itemEl = e.target as ComboBoxItem;
    const itemLabel = itemEl.textContent?.trim() ?? "";
    const itemValueAttr = itemEl.getAttribute("value") ?? itemLabel;
    const foundItem = this.filteredMenuList.find(i => i.value.toString() === itemValueAttr) || {
      label: itemLabel,
      value: itemValueAttr
    };

    if (this.multiSelect) {
      if (!this.selectedItems.some(i => i.value === foundItem.value)) {
        this.selectedItems = [...this.selectedItems, foundItem];
        setTimeout(() => (this.displayValue = ""));
      }
      this.hideMenu();
      this.value = this.selectedItems.map(i => i.value).join(";");
    } else {
      // Single-select
      this.selectedItems = [foundItem];
      this.value = foundItem.value.toString();
      this.displayValue = this.selectedItems[0].label;
      this.hideMenu();
    }
  }

  private _handleItemUnselect(e: CustomEvent) {
    const itemEl = e.target as ComboBoxItem;

    const itemLabel = itemEl.textContent?.trim() ?? "";
    const itemValueAttr = itemEl.getAttribute("value") ?? itemLabel;
    const foundItem = this.filteredMenuList.find(i => i.value.toString() === itemValueAttr) || {
      label: itemLabel,
      value: itemValueAttr
    };

    this.selectedItems = this.selectedItems.filter(i => i.value !== foundItem.value);
    this.value = this.selectedItems.map(i => i.value).join(";");
  }

  private async _handleBadgeDismissed(e: CustomEvent, item: SgdsComboBoxItemData) {
    e.preventDefault();
    this.selectedItems = this.selectedItems.filter(i => i.value !== item.value);
    this.value = this.selectedItems.map(i => i.value).join(";");
  }
  private async _handleMultiSelectKeyDown(e: KeyboardEvent) {
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
  protected async _handleInputBlur(e: Event) {
    e.preventDefault();
    if (this.multiSelect) {
      const displayValueMatchedSelectedItems = this.selectedItems.filter(({ label }) => this.displayValue === label);
      if (displayValueMatchedSelectedItems.length <= 0) {
        this.displayValue = "";
      }
    } else {
      // Single select
      if (this.selectedItems.length > 0) {
        this.displayValue = this.selectedItems[0].label;
      } else {
        this.displayValue = "";
      }
    }
  }

  /** For form reset  */
  protected async _mixinResetFormControl() {
    this.value = this.defaultValue;
    if (!this.multiSelect) {
      const initialItem = this.menuList.filter(({ value }) => value === this.value);
      if (initialItem.length <= 0) {
        this.displayValue = "";
      } else {
        this.displayValue = initialItem[0].label;
      }
      this._mixinResetValidity(await this._input);
    } else {
      const valueArray = this.value.split(";");
      const initialItem = this.menuList.filter(({ value }) => valueArray.includes(value));
      this.selectedItems = initialItem;
      this._mixinResetValidity(await this._multiSelectInput);
    }
  }

  protected _renderMenu() {
    const emptyMenu = html` <div class="empty-menu">No options</div> `;
    const menu = this._renderedMenu.map(item => {
      let isActive = false;
      if (this.multiSelect) {
        const selectedItemValueArray = this.selectedItems.map(i => i.value);
        isActive = selectedItemValueArray.includes(item.value);
      } else {
        isActive = item.value === this.value;
      }
      return html`
        <sgds-combo-box-item
          ?active=${isActive}
          ?checkbox=${this.multiSelect}
          value=${item.value}
          @sgds-select=${this._handleItemSelected}
          @sgds-unselect=${this._handleItemUnselect}
        >
          ${item.label}
        </sgds-combo-box-item>
      `;
    });
    return this._renderedMenu.length === 0 ? emptyMenu : menu;
  }

  protected _renderInput() {
    const wantFeedbackStyle = this.hasFeedback;
    return html`
      <div
        ${ref(this.myDropdown)}
        class="form-control-group ${classMap({
          disabled: this.disabled,
          readonly: this.readonly,
          "is-invalid": this.invalid && wantFeedbackStyle
        })}"
        @click=${this._handleClick}
      >
        <div class="combobox-input-container">
          ${this.multiSelect
            ? html`
                ${this.selectedItems.map(
                  item =>
                    html`<sgds-badge
                      outlined
                      variant="neutral"
                      show
                      dismissible
                      ?fullwidth=${this.badgeFullWidth}
                      @sgds-hide=${e => this._handleBadgeDismissed(e, item)}
                      >${item.label}</sgds-badge
                    >`
                )}
              `
            : nothing}
          <input
            class="form-control"
            type="text"
            id=${this._controlId}
            name=${ifDefined(this.name)}
            placeholder=${ifDefined(this.placeholder)}
            aria-invalid=${this.invalid ? "true" : "false"}
            ?autofocus=${this.autofocus}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?required=${this.required}
            .value=${this.displayValue}
            @input=${this._handleInputChange}
            @blur=${this._handleInputBlur}
            aria-describedby=${ifDefined(this.invalid && this.hasFeedback ? `${this._controlId}-invalid` : undefined)}
            aria-labelledby="${this._labelId} ${this._controlId}Help ${this.invalid && this.hasFeedback
              ? `${this._controlId}-invalid`
              : ""}"
          />
        </div>
        <sgds-icon name="chevron-down" size="md"></sgds-icon>
      </div>
    `;
  }
  render() {
    return html`
      <div class="combobox" @keydown=${this._handleMultiSelectKeyDown}>
        ${this._renderLabel()}
        <!-- The input -->
        ${this._renderInput()} ${this._renderFeedback()}
        <ul id=${this.dropdownMenuId} class="dropdown-menu" part="menu" tabindex="-1">
          ${this._renderMenu()}
        </ul>
      </div>
      <!-- Required an input element for constraint validation -->
      ${this.multiSelect
        ? html`<input
            .value=${live(this.value)}
            id="multi-select-input-tracker"
            class="visually-hidden"
            ?required=${this.required}
          />`
        : nothing}
    `;
  }
}

export default SgdsComboBox;
