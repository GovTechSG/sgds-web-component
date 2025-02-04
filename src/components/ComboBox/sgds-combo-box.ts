import { html, nothing } from "lit";
import { property, queryAsync, state } from "lit/decorators.js";
import { ref } from "lit/directives/ref.js";
import { DropdownListElement } from "../../base/dropdown-list-element";
import { defaultValue } from "../../utils/defaultvalue";
import { SgdsFormControl } from "../../utils/formSubmitController";
import { SgdsFormValidatorMixin } from "../../utils/validatorMixin";
import { watch } from "../../utils/watch";
import { SgdsBadge } from "../Badge/sgds-badge";
import dropdownMenuStyle from "../Dropdown/dropdown-menu.css";
import SgdsIcon from "../Icon/sgds-icon";
import { SgdsInput } from "../Input/sgds-input";
import comboBoxStyle from "./combo-box.css";
import { SgdsComboBoxItem } from "./sgds-combo-box-item";
import generateId from "../../utils/generateId";
import { ifDefined } from "lit/directives/if-defined.js";
import hintTextStyles from "../../styles/form-hint.css";
import feedbackStyles from "../../styles/feedback.css";
import { live } from "lit/directives/live.js";

/**
 * Each item in the ComboBox has a label to display
 * and a value (the actual data / ID).
 */
interface SgdsComboBoxItemData {
  label: string;
  value: string;
}

/**
 * @summary ComboBox component is used for users to make one or more selections from a list.
 *
 * @slot icon - slot for form control icon to be displayed on the right of the input box.
 *
 * @event sgds-select - Emitted when the combo box's selected value changes.
 * @event sgds-input -  Emitted when user input is received and its value changes.
 */

export class SgdsComboBox extends SgdsFormValidatorMixin(DropdownListElement) implements SgdsFormControl {
  static styles = [...DropdownListElement.styles, dropdownMenuStyle, hintTextStyles, feedbackStyles, comboBoxStyle];

  /** @internal */
  static dependencies = {
    "sgds-input": SgdsInput,
    "sgds-combo-box-item": SgdsComboBoxItem,
    "sgds-icon": SgdsIcon,
    "sgds-badge": SgdsBadge
  };

  constructor() {
    super();
    /** @internal */
    this.modifierOpt = [
      {
        name: "offset",
        options: {
          offset: [0, 8]
        }
      }
    ];
  }

  /** The input's label  */
  @property({ reflect: true }) label = "";

  /** The input's hint text below the label */
  @property({ reflect: true }) hintText = "";

  /** The input's name attribute */
  @property({ reflect: true }) name: string;

  /** The input's placeholder text. */
  @property({ type: String, reflect: true }) placeholder = "placeholder";

  /** Autofocus the input */
  @property({ type: Boolean, reflect: true }) autofocus = false;

  /** Disables the input. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Makes the input a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Makes the input readonly. */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /**
   * IMPORTANT:
   * We still expose `.value` externally, but this is now the underlying ID or data
   * (e.g. 1, 2, 'abc', ...), not the label that appears in the input box.
   */
  @property({ type: String, reflect: true })
  value = "";

  @state()
  private displayValue = "";

  /** Gets or sets the default value used to reset this element. */
  @defaultValue()
  defaultValue = "";

  /** Allows invalidFeedback, invalid and valid styles to be visible with the input */
  @property({ type: Boolean, reflect: true }) hasFeedback = false;

  /** Feedback text for error state when validated */
  @property({ type: String, reflect: true }) invalidFeedback = "";

  /** Marks the component as invalid. Replace the pseudo :invalid selector. */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /** Marks the input as valid. Replace the pseudo :valid selector. */
  @property({ type: Boolean, reflect: true }) valid = false;

  /** The list of items to display in the dropdown. */
  @property({ type: Array }) menuList: SgdsComboBoxItemData[] = [];

  /** If true, renders multiple checkbox selection items. If false, single-select. */
  @property({ type: Boolean, reflect: true }) multiSelect = false;

  /** The function used to filter the menu list, given the user's input value. */
  @property()
  filterFunction: (inputValue: string, item: SgdsComboBoxItemData) => boolean = (inputValue, item) => {
    return item.label.toLowerCase().startsWith(inputValue.toLowerCase());
  };

  /** @internal Managed filtered menu on the fly with input change*/
  @state()
  private filteredMenuList: SgdsComboBoxItemData[] = [];
  /** @internal Managed menu to render depending on the activity. On input change, show filteredMenu, on selections and initial state show full menu list. */
  @state()
  private _renderedMenu: SgdsComboBoxItemData[] = [];
  /** Track selected items (even for single-select, but it will have at most one). */
  @state()
  private selectedItems: SgdsComboBoxItemData[] = [];

  private _isTouched = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("blur", async () => {
      const sgdsInput = await this._sgdsInput;
      this.invalid = sgdsInput.invalid = !this._mixinReportValidity();
    });
    this.addEventListener("sgds-hide", async () => {
      const sgdsInput = await this._sgdsInput;
      sgdsInput.focus();
      this._renderedMenu = this.menuList;
    });
  }

  async firstUpdated() {
    super.firstUpdated();
    this._renderedMenu = this.menuList;
    if (this.value) {
      const valueArray = this.value.split(";");
      const initialSelectedItem = this.menuList.filter(({ value }) => valueArray.includes(value));
      this.selectedItems = [...initialSelectedItem, ...this.selectedItems];

      if (!this.multiSelect) {
        this.displayValue = initialSelectedItem[0].label;
      }
    }

    if (this.multiSelect) {
      const input = await this._multiSelectInput;
      this._mixinValidate(input);
    } else {
      const sgdsInput = await this._sgdsInput;
      this._mixinValidate(sgdsInput.input);
    }
  }

  @queryAsync("sgds-input") private _sgdsInput: Promise<SgdsInput>;
  @queryAsync("input#multi-select-input-tracker") private _multiSelectInput: Promise<HTMLInputElement>;

  @watch("value", { waitUntilFirstUpdate: true })
  async _handleValueChange() {
    if (this.value) {
      this.emit("sgds-select");
    }
    const sgdsInput = await this._sgdsInput;
    this._mixinSetFormValue();

    if (this.multiSelect) {
      this._mixinValidate(this.input);
    } else {
      this._mixinValidate(sgdsInput.input);
    }
    if (!this._isTouched && this.value === "") return;

    this.invalid = sgdsInput.invalid = !this._mixinReportValidity();
  }

  // Called each time the user types in the <sgds-input>, we set .value and show the menu
  private async _handleInputChange(e: CustomEvent) {
    const input = e.target as SgdsInput;
    this.displayValue = input.value;
    this.filteredMenuList = this.menuList.filter(item => this.filterFunction(this.displayValue, item));

    // reset menu list when displayValue
    if (this.displayValue === "" && !this.multiSelect) {
      this.selectedItems = [];
      this.value = this.selectedItems.join(";");
    }

    this.invalid = false;
    this.showMenu();

    this.displayValue = (e.target as SgdsInput).value;
    this._renderedMenu = this.filteredMenuList;

    if (this.displayValue === "") {
      this._renderedMenu = this.menuList;
      await this.updateComplete;
    }
  }

  @state() activeComboBoxItem: SgdsComboBoxItem;
  /**
   * Called whenever an <sgds-combo-box-item> dispatches sgds-select"
   */
  private async _handleItemSelected(e: CustomEvent) {
    const itemEl = e.target as SgdsComboBoxItem;
    const itemLabel = itemEl.textContent?.trim() ?? "";
    const itemValueAttr = itemEl.getAttribute("value") ?? itemLabel;
    const foundItem = this.filteredMenuList.find(i => i.value.toString() === itemValueAttr) || {
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
      this.selectedItems = [foundItem];
      this.value = foundItem.value.toString();
      this.displayValue = this.selectedItems[0].label;
      this.hideMenu();
    }
  }

  private _handleItemUnselect(e: CustomEvent) {
    const itemEl = e.target as SgdsComboBoxItem;
    // const isActive = e.detail.active;

    const itemLabel = itemEl.textContent?.trim() ?? "";
    const itemValueAttr = itemEl.getAttribute("value") ?? itemLabel;
    const foundItem = this.filteredMenuList.find(i => i.value.toString() === itemValueAttr) || {
      label: itemLabel,
      value: itemValueAttr
    };

    this.selectedItems = this.selectedItems.filter(i => i.value !== foundItem.value);
    this.value = this.selectedItems.map(i => i.value).join(";");
  }

  private _handleBadgeDismissed(item: SgdsComboBoxItemData) {
    this.selectedItems = this.selectedItems.filter(i => i.value !== item.value);

    this.value = this.selectedItems.map(i => i.value).join(";");
  }
  private _handleKeyDown(e: KeyboardEvent) {
    // Only do this in multi-select mode
    if (!this.multiSelect) {
      return;
    }

    if (e.key === "Backspace" && this.multiSelect) {
      if (this.displayValue.trim() === "" && this.selectedItems.length > 0) {
        this.selectedItems = this.selectedItems.slice(0, -1);
        this.value = this.selectedItems.map(i => i.value).join(";");
      }
    }
  }
  private async _handleInputBlur(e: Event) {
    e.preventDefault();
    if (this.multiSelect) {
      const displayValueMatchedSelectedItems = this.selectedItems.filter(({ label }) => this.displayValue === label);
      if (displayValueMatchedSelectedItems.length <= 0) {
        this.displayValue = "";
      }
    } else {
      // Single select
      //When a seleection is made, input is blurred.
      if (this.selectedItems.length > 0) {
        this.displayValue = this.selectedItems[0].label;
      } else {
        this.displayValue = "";
      }
    }
  }

  /**
   * Checks for validity. Under the hood, HTMLFormElement's reportValidity method calls this method to check for component's validity state
   * Note that the native error popup is prevented for SGDS form components by default. Instead the validation message shows up in the feedback container of SgdsInput
   */
  public reportValidity(): boolean {
    return this._mixinReportValidity();
  }
  /**
   * Checks for validity without any native error popup message
   */
  public checkValidity(): boolean {
    return this._mixinCheckValidity();
  }

  /**
   * Returns the ValidityState object
   */
  public get validity(): ValidityState {
    return this._mixinGetValidity();
  }
  /**
   * Returns the validation message based on the ValidityState
   */
  public get validationMessage() {
    return this._mixinGetValidationMessage();
  }
  protected _controlId = generateId("input");
  protected _renderFeedback() {
    // const wantFeedbackText = this.hasFeedback === "both" || this.hasFeedback === "text";
    return this.invalid && this.hasFeedback
      ? html` <div class="invalid-feedback-container">
          <slot name="invalidIcon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10ZM10 6.25C9.49805 6.25 9.10584 6.68339 9.15578 7.18285L9.48461 10.4711C9.51109 10.7359 9.7339 10.9375 10 10.9375C10.2661 10.9375 10.4889 10.7359 10.5154 10.4711L10.8442 7.18285C10.8942 6.68339 10.5019 6.25 10 6.25ZM10.0014 11.875C9.48368 11.875 9.06394 12.2947 9.06394 12.8125C9.06394 13.3303 9.48368 13.75 10.0014 13.75C10.5192 13.75 10.9389 13.3303 10.9389 12.8125C10.9389 12.2947 10.5192 11.875 10.0014 11.875Z"
                fill="currentColor"
              />
            </svg>
          </slot>
          <div id="${this._controlId}-invalid" class="invalid-feedback">
            ${this.invalidFeedback ? this.invalidFeedback : this.validationMessage}
          </div>
        </div>`
      : html`${this._renderHintText()}`;
  }

  protected _renderHintText() {
    const hintTextTemplate = html` <div id="${this._controlId}Help" class="form-text">${this.hintText}</div> `;
    return this.hintText && hintTextTemplate;
  }

  private async _mixinResetFormControl() {
    this.value = this.defaultValue;
    if (!this.multiSelect) {
      const initialItem = this.menuList.filter(({ value }) => value === this.value);
      if (initialItem.length <= 0) {
        this.displayValue = "";
      } else {
        this.displayValue = initialItem[0].label;
      }
      await (
        await this._sgdsInput
      ).updateComplete;
      this._mixinResetValidity((await this._sgdsInput).input);
    } else {
      const valueArray = this.value.split(";");
      const initialItem = this.menuList.filter(({ value }) => valueArray.includes(value));
      this.selectedItems = initialItem;
      // this._mixinResetValidity((await this._sgdsInput).input);
      this._mixinResetValidity(await this._multiSelectInput);
    }
  }

  private _menu() {
    const menu = this._renderedMenu.map(item => {
      const isActive = this.multiSelect ? this.selectedItems.includes(item) : item.value === this.value;
      return html`
        <sgds-combo-box-item
          ?active=${isActive}
          ?checkbox=${this.multiSelect}
          value=${item.value}
          @sgds-select=${this._handleItemSelected}
          @sgds-unselect=${this._handleItemUnselect}
        >
          ${item.label}
        </sgds-combo-box-item>
      `;
    });
    return menu;
  }

  private _handleClick() {
    if (!this.menuIsOpen) {
      this.showMenu();
    } else {
      this.hideMenu();
    }
  }
  render() {
    return html`
      <div class="combobox" @keydown=${this._handleKeyDown}>
        <!-- The input -->
        <sgds-input
          class="dropdown-toggle"
          label=${this.label}
          name=${this.name}
          ${ref(this.myDropdown)}
          @click=${this._handleClick}
          placeholder=${this.placeholder}
          ?autofocus=${this.autofocus}
          ?disabled=${this.disabled}
          ?required=${this.required}
          ?readonly=${this.readonly}
          hasFeedback=${ifDefined(this.hasFeedback ? "style" : undefined)}
          invalidfeedback=${this.invalidFeedback}
          ?invalid=${this.invalid}
          .value=${this.displayValue}
          @sgds-input=${this._handleInputChange}
          @sgds-blur=${this._handleInputBlur}
          @sgds-change=${e => e.preventDefault()}
          role="combobox"
          aria-expanded=${this.menuIsOpen}
          aria-autocomplete="list"
          aria-controls=${this.dropdownMenuId}
          suffix=${html`<sgds-icon name="chevron-down" size="md"></sgds-icon>`}
          .prefix=${this.multiSelect
            ? html`
                ${this.selectedItems.map(
                  item =>
                    html`<sgds-badge
                      outlined
                      variant="neutral"
                      show
                      dismissible
                      @sgds-hide=${() => this._handleBadgeDismissed(item)}
                      >${item.label}</sgds-badge
                    >`
                )}
              `
            : null}
        >
        </sgds-input>
        ${this._renderFeedback()}
        <ul id=${this.dropdownMenuId} class="dropdown-menu" part="menu" tabindex="-1">
          ${this._menu()}
        </ul>
      </div>
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
