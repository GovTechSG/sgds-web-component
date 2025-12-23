import { html, nothing, TemplateResult } from "lit";
import SgdsComboBox from "../ComboBox/sgds-combo-box";
import { property } from "lit/decorators.js";
import searchInputStyles from "./search-input.css";

export class SgdsSearchInput extends SgdsComboBox {
  static styles = [...SgdsComboBox.styles, searchInputStyles];
  @property({ type: Boolean, reflect: true }) loading = false;

  constructor() {
    super();
    this.clearable = true;
    this.suffixIconTemplate = html`${nothing}`;
    this.prefixIconTemplate = html`<sgds-icon name="search" size="md"></sgds-icon>`;
  }

  protected override _renderInput(): TemplateResult {
    const showClearButtonForSingle = this.isFocused && !!this.displayValue;
    const showClearButtonForMulti = this.isFocused && (!!this.displayValue || this.selectedItems.length > 0);
    return super._renderInput(this.multiSelect ? showClearButtonForMulti : showClearButtonForSingle);
  }
  protected override _handleClick() {
    if (this.options.length === 0) {
      return null;
    }
    super._handleClick();
  }
  /** Loading state takes priority over default behaviour */
  protected override _renderFeedbackMenu() {
    return this.loading
      ? html`<div class="loading-menu"><sgds-spinner size="xs" tone="brand"></sgds-spinner>Loading...</div>`
      : super._renderFeedbackMenu();
  }
}

export default SgdsSearchInput;
