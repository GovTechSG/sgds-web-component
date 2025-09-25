import { html, nothing } from "lit";
import { OptionElement } from "../../base/option-element";
import SgdsIcon from "../Icon/sgds-icon";

export class SgdsSelectOption extends OptionElement {
  /** @internal */
  static dependencies = {
    "sgds-icon": SgdsIcon
  };

  protected _renderItemContent = () => {
    return html`<div class="normal-item-content">
      <slot></slot>
      ${this.active ? html` <sgds-icon name="check"></sgds-icon> ` : nothing}
    </div>`;
  };
}

export default SgdsSelectOption;
