import { html, TemplateResult } from "lit";
import { property, queryAsync, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import dropdownMenuStyle from "../components/Dropdown/dropdown-menu.css";
import feedbackStyles from "../styles/feedback.css";
import hintTextStyles from "../styles/form-hint.css";
import { defaultValue } from "../utils/defaultvalue";
import { SgdsFormControl } from "../utils/formSubmitController";
import generateId from "../utils/generateId";
import { SgdsFormValidatorMixin } from "../utils/validatorMixin";
import { watch } from "../utils/watch";
import { DropdownListElement } from "./dropdown-list-element";

export class SelectElement extends SgdsFormValidatorMixin(DropdownListElement) implements SgdsFormControl {
  static styles = [...DropdownListElement.styles, dropdownMenuStyle, hintTextStyles, feedbackStyles];

  /** The input's label  */
  @property({ reflect: true }) label = "";

  /** The input's hint text below the label */
  @property({ reflect: true }) hintText = "";

  /** The input's name attribute */
  @property({ reflect: true }) name: string;

  /** The input's placeholder text. */
  @property({ type: String, reflect: true }) placeholder: string;

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
  protected displayValue = "";

  /** @internal Gets or sets the default value used to reset this element. */
  @defaultValue()
  defaultValue = "";

  /** Allows invalidFeedback, invalid and valid styles to be visible with the input */
  @property({ type: Boolean, reflect: true }) hasFeedback = false;

  /** Feedback text for error state when validated */
  @property({ type: String, reflect: true }) invalidFeedback = "";

  /** Marks the component as invalid. Replace the pseudo :invalid selector. */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /** The list of items to display in the dropdown.
   * `interface SgdsComboBoxItemData {
   * label: string;
   * value: string;
   * }`
   */
  @property({ type: Array }) menuList: SgdsSelectItemData[] = [];
  /** Track selected items (even for single-select, but it will have at most one). */
  @state()
  protected selectedItems: SgdsSelectItemData[] = [];
  /** @internal Managed filtered menu on the fly with input change*/
  @state()
  protected filteredMenuList: SgdsSelectItemData[] = [];

  protected _isTouched = false;

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

  @queryAsync("input.form-control") protected _input: Promise<HTMLInputElement>;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("blur", async () => {
      this.invalid = !this._mixinReportValidity();
    });
    if (this.readonly) {
      this._handleKeyboardMenuEvent = null;
      this._handleKeyboardMenuItemsEvent = null;
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
  public get validationMessage(): string {
    return this._mixinGetValidationMessage();
  }
  protected _controlId = generateId("input");
  protected _renderFeedback() {
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
  protected _labelId = generateId("label");
  protected _renderLabel() {
    const labelTemplate = html`
      <label
        for=${this._controlId}
        id=${this._labelId}
        class=${classMap({
          "form-label": true,
          required: this.required
        })}
        >${this.label}</label
      >
    `;
    return this.label && labelTemplate;
  }

  protected _handleClick() {
    if (this.readonly) {
      return null;
    }
    if (!this.menuIsOpen) {
      this.showMenu();
    } else {
      this.hideMenu();
    }
  }
  //   /** For form reset  */
  //   protected _mixinResetFormControl() {}

  //   // DECLARATION OF MUST HAVE METHODS
  //   protected _handleItemSelected(e: CustomEvent) {
  //     return;
  //   }
  //   protected _handleInputBlur(e: Event) {
  //     return;
  //   }
  //   protected _handleValueChange() {}
  //   protected _renderInput(): TemplateResult<1> {
  //     return html``;
  //   }
  //   protected _renderMenu(): TemplateResult<1> | TemplateResult<1>[] {
  //     return html``;
  //   }
}

export interface SgdsSelectItemData {
  label: string;
  value: string;
}
