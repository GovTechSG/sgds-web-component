import { html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { OptionElement } from "../../base/option-element";
import SgdsCheckbox from "../Checkbox/sgds-checkbox";
import SgdsIcon from "../Icon/sgds-icon";

/**
 * @summary ComboBoxOption is the option of the Combobox
 *
 * @slot default - The label of the option
 */
export class SgdsComboBoxOption extends OptionElement {
  /** @internal */
  static override dependencies = {
    "sgds-icon": SgdsIcon,
    "sgds-checkbox": SgdsCheckbox
  };

  /**
   * @internal If true, this item is rendered as a checkbox item.
   * This property is controlled by its combo box parent
   */
  @property({ type: Boolean, reflect: true }) checkbox = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        this.checkbox ? this._handleCheckboxClick() : this._handleNonCheckboxClick();
      }
    });
  }

  firstUpdated() {
    const parent = this.closest("sgds-combo-box");
    if (parent?.multiSelect) {
      this.checkbox = true;
    }
  }
  private _handleNonCheckboxClick() {
    if (!this.checkbox) {
      this.emit("i-sgds-select");
    }
  }
  private _handleCheckboxClick() {
    this.shadowRoot.querySelector("sgds-checkbox").click();
  }

  private _handleCheckboxChange(e: Event) {
    const checkbox = e.target as HTMLInputElement;
    this.active = checkbox.checked;
    this.active ? this.emit("i-sgds-select") : this.emit("i-sgds-unselect");
  }

  protected _renderItemContent = () => {
    return this.checkbox
      ? html`
          <sgds-checkbox .checked=${this.active} .disabled=${this.disabled} @sgds-change=${this._handleCheckboxChange}>
            <slot></slot>
          </sgds-checkbox>
        `
      : html`
          <div class="normal-item-content" @click=${this._handleNonCheckboxClick}>
            <slot></slot>
            ${this.active ? html` <sgds-icon name="check"></sgds-icon> ` : nothing}
          </div>
        `;
  };
}

export default SgdsComboBoxOption;
