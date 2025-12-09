import { html, nothing, PropertyValueMap } from "lit";
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
  }

  firstUpdated(changedProperties: PropertyValueMap<this>) {
    super.firstUpdated(changedProperties);

    const parent = this.closest("sgds-combo-box");
    if (parent?.multiSelect) {
      this.checkbox = true;
    }
  }

  protected _renderItemContent = () => {
    return this.checkbox
      ? html`
          <sgds-checkbox .checked=${this.active} .disabled=${this.disabled}>
            <slot></slot>
          </sgds-checkbox>
        `
      : html`
          <div class="normal-item-content">
            <slot></slot>
            ${this.active ? html` <sgds-icon name="check"></sgds-icon> ` : nothing}
          </div>
        `;
  };
}

export default SgdsComboBoxOption;
