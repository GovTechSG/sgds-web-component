import { html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { OptionElement } from "../../base/option-element";
import SgdsIcon from "../Icon/sgds-icon";

/**
 * @summary SelectOption is the option of the Select
 *
 * @slot default - The label of the option
 */
export class SgdsSelectOption extends OptionElement {
  /** @internal */
  static dependencies = {
    "sgds-icon": SgdsIcon
  };

  /** @internal Propagated from parent select */
  @property({ type: String, reflect: true }) size: "lg" | "md" = "lg";

  protected _renderItemContent = () => {
    const iconSize = this.size === "md" ? "md" : "lg";
    return html`<div class="normal-item-content" role="presentation">
      <slot></slot>
      ${this.active ? html` <sgds-icon name="check" size=${iconSize}></sgds-icon> ` : nothing}
    </div>`;
  };
}

export default SgdsSelectOption;
