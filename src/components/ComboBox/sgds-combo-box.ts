import { live } from "lit/directives/live.js";
import { html, nothing, PropertyValueMap } from "lit";
import { property, queryAssignedElements, queryAsync, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";

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

  /** If true, a clear button will be enabled on focus */
  @property({ type: Boolean, reflect: true }) clearable = false;

  /** The function used to filter the menu list, given the user's input value. */
  @property()
  filterFunction: (inputValue: string, item: SgdsComboBoxOptionData) => boolean = (inputValue, item) => {
    return item.label.toLowerCase().startsWith(inputValue.toLowerCase());
  };

  @queryAsync("input#multi-select-input-tracker") private _multiSelectInput: Promise<HTMLInputElement>;

  @queryAssignedElements({ flatten: true, selector: "sgds-combo-box-option" })
  protected options: SgdsComboBoxOption[];

  @state() optionList: SgdsComboBoxOptionData[] = [];
  @state() emptyMenu = false;

  // Used to show and hide the clear button
  @state() isFocused = false;

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener("focus", async () => {
      this.isFocused = true;
    });

    this.addEventListener("blur", async () => {
      this.isFocused = false;
    });

    this.addEventListener("keydown", (e: KeyboardEvent) => {
      if (
        e.key === "Enter" &&
        (e.target as HTMLElement).shadowRoot?.querySelector(".form-clearable")?.matches(":focus")
      ) {
        this._handleClear();
      }
    });

    this.addEventListener("sgds-hide", async () => {
      const sgdsInput = await this._input;
      sgdsInput.focus();

      this.options.forEach(o => o.removeAttribute("hidden"));
      // reset emptyMenu state
      this.emptyMenu = false;
    });
  }
  async firstUpdated(changedProperties: PropertyValueMap<this>) {
    super.firstUpdated(changedProperties);
    this.menuList.forEach(o => {
      const comboBoxOption = document.createElement("sgds-combo-box-option") as SgdsComboBoxOption;
      comboBoxOption.innerText = o.label;
      comboBoxOption.value = o.value;
      comboBoxOption.checkbox = this.multiSelect;
      comboBoxOption.active = this.value.includes(o.value);
      this.appendChild(comboBoxOption);
    });
    this._setupValidation(this.menuList);

    if (this.menuIsOpen && !this.readonly) {
      this.showMenu();
    }
  }

  protected async _handleDefaultSlotChange(e: Event) {
    const assignedElements = (e.target as HTMLSlotElement).assignedElements({ flatten: true });
    assignedElements.forEach(option => {
      option.addEventListener("i-sgds-select", (e: CustomEvent) => {
        if (option.hasAttribute("disabled")) return;
        this._handleItemSelected(e);
      });
      if (this.value.includes(option.getAttribute("value"))) {
        option.setAttribute("active", "true");
      }
      if (this.multiSelect) {
        option.addEventListener("i-sgds-unselect", (e: CustomEvent) => {
          const option = e.target as SgdsComboBoxOption;
          if (option.disabled) return;
          this._handleItemUnselect(e);
        });
      }
    });

    /** this will trigger _updateValueAndDisplayValue */
    await this.updateComplete;
    this.optionList = await this._getMenuListFromOptions(assignedElements);
    this._setupValidation(this.optionList);
  }

  private async _setupValidation(list: SgdsComboBoxOptionData[]) {
    if (this.value && list.length > 0) {
      const valueArray = this.value.split(";");
      const initialSelectedItem = list.filter(({ value }) => valueArray.includes(value));
      this.selectedItems = [...initialSelectedItem, ...this.selectedItems];

      if (!this.multiSelect) {
        this.displayValue = initialSelectedItem[0]?.label;
      }
      this.multiSelect ? (this.input = await this._multiSelectInput) : (this.input = await this._input);

      this._mixinValidate(this.input);
    }
  }
  @watch("value", { waitUntilFirstUpdate: true })
  async _handleValueChange() {
    // when value change, always emit a change event
    this.emit("sgds-change");
    this.options.forEach(o => o.removeAttribute("hidden"));
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

    // When value is updated by user and it doesn't map to selectedItems, we should re-map selectedItems
    const selectedItemVal = this.selectedItems.map(val => val.value).join(";");
    if (selectedItemVal !== this.value) {
      this._updateValueAndDisplayValue(this.optionList);
    }

    if (!this._isTouched && this.value === "") return;
    this.invalid = !this._mixinReportValidity();
  }

  @watch("optionList", { waitUntilFirstUpdate: true })
  _handleOptionListChange() {
    this._updateValueAndDisplayValue(this.optionList);
  }

  @watch("menuList", { waitUntilFirstUpdate: true })
  _handleMenuListChange() {
    const newMenu = this.menuList.map(o => {
      const comboBoxOption = document.createElement("sgds-combo-box-option") as SgdsComboBoxOption;
      comboBoxOption.innerText = o.label;
      comboBoxOption.value = o.value;
      comboBoxOption.checkbox = this.multiSelect;
      comboBoxOption.active = this.value.includes(o.value);
      return comboBoxOption;
    });
    this.replaceChildren(...newMenu);
  }

  private _updateValueAndDisplayValue(list: SgdsComboBoxOptionData[]) {
    const valueArray = this.value.split(";");
    const initialSelectedItem = list.filter(({ value }) => valueArray.includes(value));
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
    // There is a race condition in certain situations where this.optionList is not fully updated during slotchange
    // Hence instead of using this.optionList, we have to perform a query on the <sgds-combo-box-option> elements
    const optionList = this.options.map(o => ({ value: o.value, label: o.textContent.trim() }));
    this.filteredList = optionList.filter(item => this.filterFunction(this.displayValue, item));

    // reset menu list when displayValue
    if (this.displayValue === "" && !this.multiSelect) {
      this.selectedItems = [];
      this.value = this.selectedItems.join(";");
      this.options.forEach(o => (o.active = false));
    }

    this.invalid = false;
    this.showMenu();

    // Filtering for slots
    this.emptyMenu = this.filteredList.length === 0;
    const filteredValues = this.filteredList.map(l => l.value);

    this.options.forEach(o => {
      if (!filteredValues.includes(o.value)) {
        o.hidden = true;
      } else {
        o.hidden = false;
      }
    });
    if (this.displayValue === "") {
      this.options.forEach(o => (o.hidden = false));
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
    const foundItem = this.filteredList.find(i => i.value.toString() === itemValueAttr) || {
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
      // Only update active states if a new item is selected
      if (this.selectedItems.length === 0 || this.selectedItems[0].value !== foundItem.value) {
        // Remove active from all options
        this.options.forEach(o => (o.active = false));
        // Set active only on the selected item
        itemEl.active = true;
        this.selectedItems = [foundItem];
        this.value = foundItem.value.toString();
        this.displayValue = foundItem.label;
        this.hideMenu();
      }
      // If the same item is clicked again, do nothing (keep active state)
    }
  }

  private _handleItemUnselect(e: CustomEvent) {
    const itemEl = e.target as SgdsComboBoxOption;
    itemEl.removeAttribute("active");

    const itemLabel = itemEl.textContent?.trim() ?? "";
    const itemValueAttr = itemEl.getAttribute("value") ?? itemLabel;
    const foundItem = this.filteredList.find(i => i.value.toString() === itemValueAttr) || {
      label: itemLabel,
      value: itemValueAttr
    };

    this.selectedItems = this.selectedItems.filter(i => i.value !== foundItem.value);
    this.value = this.selectedItems.map(i => i.value).join(";");
  }

  private async _handleBadgeDismissed(e: CustomEvent, item: SgdsComboBoxOptionData) {
    e.preventDefault();
    const removedValue = item.value;
    this.options?.forEach(o => (o.value === removedValue ? (o.active = false) : null));
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
        const removedValue = this.selectedItems[this.selectedItems.length - 1].value;
        this.options?.forEach(o => (o.value === removedValue ? (o.active = false) : null));
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

  // For clearing the value
  protected async _handleClear() {
    this.value = "";
    this.options?.forEach(o => (o.active = false));

    const sgdsInput = await this._input;
    sgdsInput.focus();
    this.showMenu();
  }

  /** For form reset  */
  protected async _mixinResetFormControl() {
    this.value = this.defaultValue;
    if (!this.multiSelect) {
      //reset menu
      this.options.forEach(o => {
        o.active = o.value === this.value;
      });
      const initialOption = this.options.filter(o => o.value === this.value);
      if (initialOption.length <= 0) {
        this.displayValue = "";
      } else {
        this.displayValue = initialOption[0].textContent.trim();
      }
      this._mixinResetValidity(await this._input);
    } else {
      const valueArray = this.value.split(";");
      // reset menu
      this.options.forEach(o => {
        o.active = valueArray.includes(o.value);
      });
      const initialOption = this.options.filter(o => valueArray.includes(o.value));
      this.selectedItems = initialOption.map(o => ({ value: o.value, label: o.textContent.trim() }));
      this._mixinResetValidity(await this._multiSelectInput);
    }
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
    const showButton = (this.isFocused || this.menuIsOpen) && this.value !== "" && this.clearable;

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
            .value=${this.displayValue.trim()}
            @input=${this._handleInputChange}
            @blur=${this._handleInputBlur}
            @focus=${this._handleFocus}
            aria-describedby=${ifDefined(this.invalid && this.hasFeedback ? `${this._controlId}-invalid` : undefined)}
            aria-labelledby="${this._labelId} ${this._controlId}Help ${this.invalid && this.hasFeedback
              ? `${this._controlId}-invalid`
              : ""}"
          />
        </div>

        ${showButton
          ? html`
              <sgds-icon
                id=${`${this._controlId}-combobox-clear-button`}
                tabindex="0"
                class="form-clearable"
                name="xcircle-fill"
                size="md"
                @click=${this._handleClear}
                aria-hidden=${showButton ? "false" : "true"}
              ></sgds-icon>
            `
          : nothing}

        <sgds-icon name=${this.menuIsOpen ? "chevron-up" : "chevron-down"} size="md"></sgds-icon>
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
          <slot id="default" @slotchange=${this._handleDefaultSlotChange}
            ><div class="empty-menu">No options</div></slot
          >
          ${this.emptyMenu && this.optionList.length > 0 ? html`<div class="empty-menu">No options</div>` : nothing}
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

//TODO:
// Replace this.optionList ?
// During slotchange event _handleDefaultSlotChange, we try to populate this.optionList to obtain value attribute and textContent as label from <sgds-combo-box-option>
// However, it has race conditions in certain situation like nextjs, where the last option's label (essentially the slot of <sgds-combo-box-option>) may not be available immediately.
// To circumvent this, I avoid relying on this.optionList to perform filterFunction onInput handler and query this.options directly at the point of user typing.
// To prevent confusion, this.optionList should ideally be removed in future iterations
