import { html } from "lit";
import { queryAssignedElements } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { ref } from "lit/directives/ref.js";
import { SelectElement } from "../../base/select-element";
import { watch } from "../../utils/watch";
import SgdsIcon from "../Icon/sgds-icon";
import selectStyle from "./select.css";
import formTextControlStyles from "../../styles/form-text-control.css";
import SgdsSelectOption from "./sgds-select-option";

/**
 * @summary Select is used to make one selection from a list through keyboard or mouse actions
 *
 * @event sgds-select - Emitted when an option is selected.
 * @event sgds-change - Emitted when the select value changes.
 * @event sgds-focus -  Emitted when user input is focused.
 * @event sgds-blur -  Emitted when user input is blurred.
 * @event change -  Emitted when the select value changes (native event)
 *
 * @slot default - slot for sgds-select-option passed into select's menu
 */
export class SgdsSelect extends SelectElement {
  static styles = [...SelectElement.styles, formTextControlStyles, selectStyle];

  /** @internal */
  static dependencies = {
    "sgds-icon": SgdsIcon,
    "sgds-select-option": SgdsSelectOption
  };
  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("sgds-hide", async () => {
      const sgdsInput = await this._input;
      sgdsInput.focus();
    });
  }
  @queryAssignedElements({ flatten: true, selector: "sgds-select-option" })
  protected options: SgdsSelectOption[];

  protected get menuListFromlightDomOptions() {
    return this.lighDomOptions.map((o: HTMLElement) => ({
      disabled: o.hasAttribute("disabled"),
      value: o.getAttribute("value"),
      label: o.textContent
    }));
  }
  protected get lighDomOptions() {
    return Array.from(this.querySelectorAll("sgds-select-option"));
  }
  async firstUpdated() {
    super.firstUpdated();
    // this.shadowRoot.querySelector("slot#options").addEventListener("slotchange", () => {
    //   console.log("slotchange happend");
    //   if (this.options.length > 0) {
    //     this.menuList = this._getMenuListFromOptions();
    //   }

    //   if (this.value) {
    //     const initialSelectedItem = this.menuList.filter(({ value }) => value === this.value);
    //     this.displayValue = initialSelectedItem[0].label;

    //     this._setActiveToOption();
    //   }
    // });
    this.menuList = this.options.length > 0 ? this._getMenuListFromOptions() : this.menuList;
    if (this.value) {
      const initialSelectedItem = this.menuList.filter(({ value }) => value === this.value);
      this.displayValue = initialSelectedItem[0].label;

      this._setActiveToOption();
    }

    if (this.value && this.menuList.length > 0) {
      const initialSelectedItem = this.menuList.filter(({ value }) => value === this.value);
      this.displayValue = initialSelectedItem[0].label;

      this._setActiveToOption();
    }

    this.input = await this._input;
    this._mixinValidate(this.input);
    if (this.menuIsOpen && !this.readonly) {
      this.showMenu();
    }
  }
  private _handleSlotChange() {
    if (this.ssr) {
      console.log("slotchange happend");
      if (this.options.length > 0) {
        this.menuList = this._getMenuListFromOptions();
      }

      if (this.value) {
        const initialSelectedItem = this.menuList.filter(({ value }) => value === this.value);
        this.displayValue = initialSelectedItem[0].label;

        this._setActiveToOption();
      }
    }
    this.menuList = this._getMenuListFromOptions();
  }
  private _setActiveToOption() {
    const activeIndex = this.menuList.findIndex(item => item.value.toString() === this.value);
    this.options.forEach((option, index) => {
      option.active = index === activeIndex;
    });
  }

  @watch("value", { waitUntilFirstUpdate: true })
  async _handleValueChange() {
    this._setActiveToOption();

    // when value change, always emit a change event
    this.relayNativeEvent(new Event("change", { bubbles: true, composed: true }));
    this.emit("sgds-change");

    if (this.value) {
      this.emit("sgds-select");
    }
    const sgdsInput = await this._input;
    this._mixinSetFormValue();

    this._mixinValidate(sgdsInput);

    if (!this._isTouched && this.value === "") return;

    this.invalid = !this._mixinReportValidity();
  }

  protected async _handleItemSelected(e: Event) {
    const itemEl = e.target as SgdsSelectOption;
    const itemLabel = itemEl.textContent?.trim() ?? "";
    const itemValueAttr = itemEl.getAttribute("value") ?? itemLabel;
    const foundItem = {
      label: itemLabel,
      value: itemValueAttr
    };
    this.value = foundItem.value.toString();
    this.displayValue = foundItem.label;
    this.hideMenu();
  }

  protected _handleFocus() {
    this.emit("sgds-focus");
  }

  protected async _handleInputBlur(e: Event) {
    e.preventDefault();
    this.emit("sgds-blur");
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
  private _blockInputKeydown = (e: KeyboardEvent) => {
    if (e.key !== "Tab") {
      e.preventDefault();
    }
  };
  protected _renderEmptyMenu() {
    return html` <div class="empty-menu">No options</div> `;
  }

  @watch("ssr")
  handleSSRChange() {
    console.log("ssr changed", this.ssr);
  }
  protected _renderMenu() {
    const menu = this.menuList.map(item => {
      const isActive = item.value === this.value;
      return html`
        <sgds-select-option
          ?active=${isActive}
          value=${item.value}
          ?disabled=${item.disabled}
          @click=${this._handleItemSelected}
          @keydown=${(e: KeyboardEvent) => {
            if (e.key === "Enter") {
              this._handleItemSelected(e);
            }
          }}
        >
          ${item.label}
        </sgds-select-option>
      `;
    });
    return this.menuList.length === 0 ? this._renderEmptyMenu() : menu;
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
          @blur=${this._handleInputBlur}
          @focus=${this._handleFocus}
          aria-describedby=${ifDefined(this.invalid && this.hasFeedback ? `${this._controlId}-invalid` : undefined)}
          aria-labelledby="${this._labelId} ${this._controlId}Help ${this.invalid && this.hasFeedback
            ? `${this._controlId}-invalid`
            : ""}"
          @keydown=${this._blockInputKeydown}
        />
        <sgds-icon name="chevron-down" size="md"></sgds-icon>
      </div>
    `;
  }

  render() {
    return html`
      <div
        class=${classMap({
          disabled: this.disabled,
          select: true,
          "form-control-container": true
        })}
      >
        ${this._renderLabel()}
        <!-- The input -->
        ${this._renderInput()} ${this._renderFeedback()}
        <ul id=${this.dropdownMenuId} class="dropdown-menu" part="menu" tabindex="-1" ${ref(this.menuRef)}>
          ${this._renderMenu()}
        </ul>
        <slot @slotchange=${this._handleSlotChange} id="options"></slot>
      </div>
    `;
  }
}

export default SgdsSelect;
