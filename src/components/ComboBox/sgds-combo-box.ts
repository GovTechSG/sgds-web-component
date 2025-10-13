import { html, nothing } from "lit";
import { property, queryAssignedElements, queryAsync, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { ref } from "lit/directives/ref.js";
import { SelectElement, SgdsOptionData } from "../../base/select-element";
import { watch } from "../../utils/watch";
import { SgdsBadge } from "../Badge/sgds-badge";
import SgdsIcon from "../Icon/sgds-icon";
import comboBoxStyle from "./combo-box.css";
import formTextControlStyle from "../../styles/form-text-control.css";
import { SgdsComboBoxOption } from "./sgds-combo-box-option";

import { repeat } from "lit/directives/repeat.js";

/**
 * Each item in the ComboBox has a label to display
 * and a value (the actual data / ID).
 */
type SgdsComboBoxOptionData = SgdsOptionData;
/**
 * @summary ComboBox component is used for users to make one or more selections from a list through user input, keyboard or mouse actions
 *
 * @slot default - default slot to pass in sgds-combo-box-option
 *
 * @event sgds-select - Emitted when the combo box's selected value changes.
 * @event sgds-change - Emitted when the combo box's value changes.
 * @event sgds-input -  Emitted when user input is received and its value changes.
 * @event sgds-focus -  Emitted when user input is focused.
 * @event sgds-blur -  Emitted when user input is blurred.
 */

export class SgdsComboBox extends SelectElement {
  static styles = [...SelectElement.styles, formTextControlStyle, comboBoxStyle];

  /** @internal */
  static dependencies = {
    "sgds-combo-box-option": SgdsComboBoxOption,
    "sgds-icon": SgdsIcon,
    "sgds-badge": SgdsBadge
  };

  /** If true, renders multiple checkbox selection items. If false, single-select. */
  @property({ type: Boolean, reflect: true }) multiSelect = false;

  /** If true, renders badge that fills width of combobox */
  @property({ type: Boolean, reflect: true }) badgeFullWidth = false;

  /** The function used to filter the menu list, given the user's input value. */
  @property()
  filterFunction: (inputValue: string, item: SgdsComboBoxOptionData) => boolean = (inputValue, item) => {
    return item.label.toLowerCase().startsWith(inputValue.toLowerCase());
  };

  /** Managed menu to render depending on the activity. On input change, show filteredMenu, on selections and initial state show full menu list. */
  @state()
  private _renderedMenu: SgdsComboBoxOptionData[] = [];

  @queryAsync("input#multi-select-input-tracker") private _multiSelectInput: Promise<HTMLInputElement>;

  @queryAssignedElements({ flatten: true, selector: "sgds-combo-box-option" })
  protected options: SgdsComboBoxOption[];

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("sgds-hide", async () => {
      const sgdsInput = await this._input;
      sgdsInput.focus();
      this._renderedMenu = this.menuList;
    });
  }
  async firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this._renderedMenu = this.menuList;
    if (this.value && this.menuList.length > 0) {
      const valueArray = this.value.split(";");
      const initialSelectedItem = this.menuList.filter(({ value }) => valueArray.includes(value));
      this.selectedItems = [...initialSelectedItem, ...this.selectedItems];

      if (!this.multiSelect) {
        this.displayValue = initialSelectedItem[0]?.label;
      }
    }
    this.multiSelect ? (this.input = await this._multiSelectInput) : (this.input = await this._input);
    this._mixinValidate(this.input);

    if (this.menuIsOpen && !this.readonly) {
      this.showMenu();
    }
  }
  protected _handleDefaultSlotChange() {
    /** this will trigger _updateValueAndDisplayValue */
    this.menuList = this._getMenuListFromOptions();
  }

  @watch("value", { waitUntilFirstUpdate: true })
  async _handleValueChange() {
    // when value change, always emit a change event
    this.emit("sgds-change");

    if (this.value) {
      this.emit("sgds-select");
    }

    const sgdsInput = await this._input;
    this._mixinSetFormValue();

    if (this.multiSelect) {
      this._mixinValidate(this.input);
    } else {
      this._mixinValidate(sgdsInput);
    }
    if (!this._isTouched && this.value === "") return;

    this.invalid = !this._mixinReportValidity();

    // When value is updated by user and it doesn't map to selectedItems, we should re-map selectedItems
    const selectedItemVal = this.selectedItems.map(val => val.value).join(";");
    if (selectedItemVal !== this.value) {
      this._updateValueAndDisplayValue();
    }
  }

  @watch("menuList", { waitUntilFirstUpdate: true })
  _handleMenuListChange() {
    this._updateValueAndDisplayValue();
    this._renderedMenu = this.menuList;
  }

  private _updateValueAndDisplayValue() {
    const valueArray = this.value.split(";");
    const initialSelectedItem = this.menuList.filter(({ value }) => valueArray.includes(value));
    this.selectedItems = [...initialSelectedItem];

    // When the new filtered items don't match value we update it
    const updatedValue = initialSelectedItem.map(item => item.value).join(";");
    if (updatedValue !== this.value) {
      this.value = updatedValue;
    }

    if (!this.multiSelect) {
      this.displayValue = initialSelectedItem[0]?.label ?? "";
    }
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
   * Called whenever an <sgds-combo-box-option> dispatches sgds-select"
   */
  protected async _handleItemSelected(e: Event) {
    const itemEl = e.target as SgdsComboBoxOption;
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
    const itemEl = e.target as SgdsComboBoxOption;

    const itemLabel = itemEl.textContent?.trim() ?? "";
    const itemValueAttr = itemEl.getAttribute("value") ?? itemLabel;
    const foundItem = this.filteredMenuList.find(i => i.value.toString() === itemValueAttr) || {
      label: itemLabel,
      value: itemValueAttr
    };

    this.selectedItems = this.selectedItems.filter(i => i.value !== foundItem.value);
    this.value = this.selectedItems.map(i => i.value).join(";");
  }

  private async _handleBadgeDismissed(e: CustomEvent, item: SgdsComboBoxOptionData) {
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

  protected _handleFocus() {
    this.emit("sgds-focus");
  }

  protected async _handleInputBlur(e: Event) {
    e.preventDefault();
    this.emit("sgds-blur");
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
    const menu =
      this._renderedMenu.length === 0
        ? emptyMenu
        : repeat(
            this._renderedMenu,
            item => item.value,
            item => {
              let isActive = false;
              if (this.multiSelect) {
                const selectedItemValueArray = this.selectedItems.map(i => i.value);
                isActive = selectedItemValueArray.includes(item.value);
              } else {
                isActive = item.value === this.value;
              }

              return html`
                <sgds-combo-box-option
                  ?active=${isActive}
                  ?checkbox=${this.multiSelect}
                  value=${item.value}
                  ?disabled=${item.disabled}
                  @i-sgds-select=${this._handleItemSelected}
                  @i-sgds-unselect=${this._handleItemUnselect}
                >
                  ${item.label}
                </sgds-combo-box-option>
              `;
            }
          );
    return menu;
  }

  /**
   * Used `repeat` helper from Lit to render instead of .map:
   * The reassigning of value is affecting the truncation on badge as it is not triggering the slot change event.
   *
   * To compare this to lit-html's default handling for lists, consider reversing a large list of names:
   * For a list created using Array.map, lit-html maintains the DOM nodes for the list items, but reassigns the values
   * For a list created using repeat, the repeat directive reorders the existing DOM nodes, so the nodes representing the first list item move to the last position.
   */
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
                ${repeat(
                  this.selectedItems,
                  item => item.value,
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
            @focus=${this._handleFocus}
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
      <div
        class=${classMap({ "form-control-container": true, disabled: this.disabled, combobox: true })}
        @keydown=${this._handleMultiSelectKeyDown}
      >
        ${this._renderLabel()}
        <!-- The input -->
        ${this._renderInput()} ${this._renderFeedback()}
        <ul id=${this.dropdownMenuId} class="dropdown-menu" part="menu" tabindex="-1" ${ref(this.menuRef)}>
          ${this._renderMenu()}
        </ul>
        <slot @slotchange=${this._handleDefaultSlotChange}></slot>
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
