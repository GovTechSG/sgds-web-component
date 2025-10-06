import { html } from "lit";
import { property, queryAsync, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { size } from "@floating-ui/dom";
import dropdownMenuStyle from "../components/Dropdown/dropdown-menu.css";
import feedbackStyles from "../styles/feedback.css";
import hintTextStyles from "../styles/form-hint.css";
import formControlStyles from "../styles/form-text-control.css";
import { defaultValue } from "../utils/defaultvalue";
import { SgdsFormControl } from "../utils/formSubmitController";
import generateId from "../utils/generateId";
import { SgdsFormValidatorMixin } from "../utils/validatorMixin";
import { DropdownListElement } from "./dropdown-list-element";

export class SelectElement extends SgdsFormValidatorMixin(DropdownListElement) implements SgdsFormControl {
  static styles = [...DropdownListElement.styles, dropdownMenuStyle, hintTextStyles, feedbackStyles, formControlStyles];

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

    this.floatingOpts = {
      middleware: [
        size({
          apply({ rects, elements }) {
            elements.floating.style.width = `${rects.reference.width}px`;
          }
        })
      ]
    };
  }

  @queryAsync("input.form-control") protected _input: Promise<HTMLInputElement>;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("blur", async () => {
      this.invalid = !this._mixinReportValidity();
    });
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
            <sgds-icon name="exclamation-circle-fill" size="md"></sgds-icon>
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
}

export interface SgdsSelectItemData {
  label: string;
  value: string;
}
