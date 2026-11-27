import { html, nothing, PropertyValueMap } from "lit";
import { property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { OptionElement } from "../../base/option-element";
import SgdsCheckbox from "../Checkbox/sgds-checkbox";
import SgdsIcon from "../Icon/sgds-icon";
import SgdsComboBox from "./sgds-combo-box";

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

  /** @internal Propagated from parent combo box */
  @property({ type: String, reflect: true }) size: "lg" | "md" = "lg";

  connectedCallback(): void {
    super.connectedCallback();
  }

  firstUpdated(changedProperties: PropertyValueMap<this>) {
    super.firstUpdated(changedProperties);
    const parent = this.parentElement as SgdsComboBox;
    if (parent?.multiSelect) {
      this.checkbox = true;
    }
    if (parent?.size) {
      this.size = parent.size;
    }
  }

  protected _renderItemContent = () => {
    const iconSize = this.size === "md" ? "sm" : "md";
    const checkboxSize = this.size === "md" ? "md" : undefined;
    return this.checkbox
      ? html`
          <sgds-checkbox
            .checked=${this.active}
            .disabled=${this.disabled}
            size=${ifDefined(checkboxSize)}
          >
            <slot></slot>
          </sgds-checkbox>
        `
      : html`
          <div class="normal-item-content" role="presentation">
            <slot></slot>
            ${this.active ? html` <sgds-icon name="check" size=${iconSize}></sgds-icon> ` : nothing}
          </div>
        `;
  };
}

export default SgdsComboBoxOption;
