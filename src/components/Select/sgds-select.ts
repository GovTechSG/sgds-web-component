import SgdsElement from "../../base/sgds-element";
import { html } from "lit";
import SgdsComboBox from "../ComboBox/sgds-combo-box";
import { SelectElement } from "../../base/select-element";
import SgdsIcon from "../Icon/sgds-icon";
import ComboBoxItem from "../ComboBox/combo-box-item";
import { watch } from "../../utils/watch";
import { ifDefined } from "lit/directives/if-defined.js";
import { classMap } from "lit/directives/class-map.js";
import { ref } from "lit/directives/ref.js";
import comboBoxStyle from "../ComboBox/combo-box.css";

export class SgdsSelect extends SelectElement {
  static styles = [...SelectElement.styles, comboBoxStyle];

  /** @internal */
  static dependencies = {
    "sgds-icon": SgdsIcon,
    "sgds-combo-box-item": ComboBoxItem
  };

  async firstUpdated() {
    super.firstUpdated();

    // this._renderedMenu = this.menuList;
    if (this.value) {
      const valueArray = this.value.split(";");
      const initialSelectedItem = this.menuList.filter(({ value }) => valueArray.includes(value));
      this.selectedItems = [...initialSelectedItem, ...this.selectedItems];
    }
    this.input = await this._input;
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

    this._mixinValidate(sgdsInput);

    if (!this._isTouched && this.value === "") return;

    this.invalid = !this._mixinReportValidity();
  }

  protected async _handleItemSelected(e: CustomEvent) {
    const itemEl = e.target as ComboBoxItem;
    const itemLabel = itemEl.textContent?.trim() ?? "";
    const itemValueAttr = itemEl.getAttribute("value") ?? itemLabel;
    const foundItem = this.filteredMenuList.find(i => i.value.toString() === itemValueAttr) || {
      label: itemLabel,
      value: itemValueAttr
    };

    // Single-select
    this.selectedItems = [foundItem];
    this.value = foundItem.value.toString();
    this.displayValue = this.selectedItems[0].label;
    this.hideMenu();
  }

  protected async _handleInputBlur(e: Event) {
    e.preventDefault();
    if (this.selectedItems.length > 0) {
      this.displayValue = this.selectedItems[0].label;
    } else {
      this.displayValue = "";
    }
  }

  /** For form reset  */
  protected async _mixinResetFormControl() {
    this.value = this.defaultValue;
    const initialItem = this.menuList.filter(({ value }) => value === this.value);
    if (initialItem.length <= 0) {
      this.displayValue = "";
    } else {
      this.displayValue = initialItem[0].label;
    }
    this._mixinResetValidity(await this._input);
  }

  protected _renderMenu() {
    const emptyMenu = html` <div class="empty-menu">No options</div> `;
    const menu = this.menuList.map(item => {
      const isActive = item.value === this.value;

      return html`
        <sgds-combo-box-item ?active=${isActive} value=${item.value} @sgds-select=${this._handleItemSelected}>
          ${item.label}
        </sgds-combo-box-item>
      `;
    });
    return this.menuList.length === 0 ? emptyMenu : menu;
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
          <input
            class="form-control"
            type="text"
            id=${this._controlId}
            name=${ifDefined(this.name)}
            placeholder=${ifDefined(this.placeholder)}
            aria-invalid=${this.invalid ? "true" : "false"}
            ?autofocus=${this.autofocus}
            ?disabled=${this.disabled}
            readonly
            ?required=${this.required}
            .value=${this.displayValue}
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
      <div class="combobox">
        ${this._renderLabel()}
        <!-- The input -->
        ${this._renderInput()} ${this._renderFeedback()}
        <ul id=${this.dropdownMenuId} class="dropdown-menu" part="menu" tabindex="-1">
          ${this._renderMenu()}
        </ul>
      </div>
    `;
  }
}

export default SgdsSelect;
