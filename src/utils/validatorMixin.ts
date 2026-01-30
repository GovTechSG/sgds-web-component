import { LitElement, PropertyValueMap } from "lit";
import { queryAsync } from "lit/decorators.js";
import { SgdsInput } from "../components";
import { InputValidationController } from "./inputValidationController";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T> = new (...args: any[]) => T;

/**
 * @summary The FormValidationMixin used by the form components
 * @param superClass
 * @returns
 */
export const SgdsFormValidatorMixin = <T extends Constructor<LitElement>>(superClass: T) => {
  class ToBeValidatedElement extends superClass {
    static formAssociated = true;
    inputValidationController: InputValidationController;
    input: HTMLInputElement | SgdsInput | HTMLTextAreaElement;
    private _isTouched = false;
    @queryAsync("sgds-input") sgdsInput: Promise<SgdsInput>;
    @queryAsync("sgds-datepicker-input") sgdsDatepickerInput: Promise<SgdsInput>;

    connectedCallback(): void {
      super.connectedCallback();
      if (this._mixinShouldSkipSgdsValidation()) return;

      /** Idempotency guarantee */
      this.inputValidationController ??= new InputValidationController(this);
    }
    async firstUpdated(changedProperties: PropertyValueMap<this>) {
      super.firstUpdated(changedProperties);

      /* Either input or sgds-input. For example, quantity-toggle uses sgds-input */
      this.input =
        this.shadowRoot.querySelector("input") ||
        (await this.sgdsInput) ||
        this.shadowRoot.querySelector("textarea") ||
        (await this.sgdsDatepickerInput);

      if (this._mixinShouldSkipSgdsValidation()) return;

      this._mixinSetFormValue();

      this._mixinValidate(this.input);
    }

    /**
     * Native lifecycle of Form-Associated Custom Element Callbacks
     */
    formResetCallback() {
      if (this._mixinResetFormControl) {
        this._mixinResetFormControl();
      } else {
        this.value = this.defaultValue;
        this._mixinResetValidity(this.input);
      }
      this._mixinSetFormValue();
    }
    /**
     *
     * Methods use by classes using this mixin
     */

    /**
     * OnChange of form component
     * 1. Make value of control accessible via FormData
     * 2. Run change handler
     */
    _mixinHandleChange(e: Event): void {
      this._mixinSetFormValue();
      this.inputValidationController.handleChange(e);
    }
    /**
     * OnChange of form component
     * 1. Make value of control accessible via FormData
     * 2. Run input handler
     */
    _mixinHandleInputChange(e: Event): void {
      this._mixinSetFormValue();
      this.inputValidationController.handleInput(e);
    }
    /**
     * During form resetting,
     * 1. ValidityState is reset
     * 2. invalid reactive prop is updated after the reset
     * 3. Revalidates the ValidityState (but do not update invalid prop)
     * to prepare for the next validity check
     * 4. Reset touched state to false for a pristine form
     */
    _mixinResetValidity(input: HTMLInputElement | SgdsInput | HTMLTextAreaElement) {
      this.inputValidationController.resetValidity();
      this.inputValidationController.updateInvalidState();
      this.inputValidationController.validateInput(input);
      this._isTouched ? (this._isTouched = false) : null;
    }

    _mixinValidate(input: HTMLInputElement | SgdsInput | HTMLTextAreaElement) {
      this.inputValidationController.validateInput(input);
    }
    _mixinSetFormValue() {
      this.inputValidationController.setFormValue();
    }
    _mixinCheckValidity(): boolean {
      return this.inputValidationController.checkValidity();
    }
    _mixinReportValidity(): boolean {
      return this.inputValidationController.reportValidity();
    }
    _mixinGetValidity(): ValidityState {
      return this.inputValidationController.validity;
    }
    _mixinGetValidationMessage(): string {
      return this.inputValidationController.validationMessage;
    }
    _mixinSetValidity(flags?: ValidityStateFlags, message?: string, anchor?: HTMLElement): void {
      return this.inputValidationController.setValidity(flags, message, anchor);
    }
    // Only check for noValidate prop
    _mixinShouldSkipSgdsValidation() {
      const form = this.closest("form");

      return form?.noValidate || this.noValidate;
    }

    /** DECLARED INSTANCE METHODS AND PROPERTIES*/

    /**
     * Resets a form control to its initial state
     */
    declare _mixinResetFormControl: () => void;
    declare value: string;
    declare defaultValue: string;
    declare defaultChecked: boolean;
    declare noValidate: boolean;
  }

  return ToBeValidatedElement as Constructor<ToBeValidatedElementInterface> & T;
};

export declare class ToBeValidatedElementInterface {
  inputValidationController: InputValidationController;
  input: HTMLInputElement;
  _mixinHandleChange(e: Event): void;
  _mixinHandleInputChange(e: Event): void;
  _mixinResetValidity(input: HTMLInputElement | SgdsInput): void;
  _mixinValidate(input: HTMLInputElement | SgdsInput): void;
  _mixinSetFormValue(): void;
  _mixinCheckValidity(): boolean;
  _mixinReportValidity(): boolean;
  _mixinSetValidity(flags?: ValidityStateFlags, message?: string, anchor?: HTMLElement): void;
  _mixinGetValidity(): ValidityState;
  _mixinGetValidationMessage(): string;
  _mixinShouldSkipSgdsValidation(): boolean;
}
