import { html, nothing, TemplateResult } from "lit";
import { queryAssignedElements } from "lit/decorators.js";
import SgdsComboBox from "../ComboBox/sgds-combo-box";
import searchInputStyles from "./search-input.css";
import SgdsSearchInputOption from "./sgds-search-input-option";
import SgdsIcon from "../Icon/sgds-icon";
import SgdsBadge from "../Badge/sgds-badge";
import SgdsSpinner from "../Spinner/sgds-spinner";

/**
 * @summary ComboBox component is used for users to make one or more selections from a list through user input, keyboard or mouse actions
 *
 * @slot default - default slot to pass in sgds-combo-box-option
 *
 * @event sgds-change - Emitted when the search input's value changes.
 * @event sgds-input -  Emitted when user input is received and its value changes. `event.detail = { displayValue }`
 * @event sgds-focus -  Emitted when user input is focused.
 * @event sgds-blur -  Emitted when user input is blurred.
 */
export class SgdsSearchInput extends SgdsComboBox {
  static styles = [...SgdsComboBox.styles, searchInputStyles];
  static override childName = "sgds-search-input-option";

  /** @internal */
  static override dependencies = {
    "sgds-icon": SgdsIcon,
    "sgds-badge": SgdsBadge,
    "sgds-spinner": SgdsSpinner,
    [SgdsSearchInput.childName]: SgdsSearchInputOption
  };

  @queryAssignedElements({ flatten: true, selector: "sgds-search-input-option" })
  protected options: SgdsSearchInputOption[];

  constructor() {
    super();
    this.clearable = true;
    this.suffixIconTemplate = html`${nothing}`;
    this.prefixIconTemplate = html`<sgds-icon name="search" size="md"></sgds-icon>`;
  }

  /**
   * Clearable icon appears as long as input is focused and
   *  has typed display value or selected value
   */
  protected override _renderInput(): TemplateResult {
    const showClearButtonForSingle = this.isFocused && !!this.displayValue;
    const showClearButtonForMulti = this.isFocused && (!!this.displayValue || this.selectedItems.length > 0);
    return super._renderInput(this.multiSelect ? showClearButtonForMulti : showClearButtonForSingle);
  }
  /**
   * Menu should not be able to open when there is no options
   * or loading state is false
   */
  protected override _handleClick() {
    if (this.options.length === 0 && !this.loading) {
      return null;
    }
    super._handleClick();
  }
  protected override _handleKeyboardMenuEvent(e: KeyboardEvent) {
    if (this.options.length === 0 && !this.loading) {
      return null;
    }
    super._handleKeyboardMenuEvent(e);
  }
}

export default SgdsSearchInput;
