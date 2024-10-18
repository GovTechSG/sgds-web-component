import { LitElement } from "lit";
import { queryAsync } from "lit/decorators.js";
import { property } from "lit/decorators/property.js";
import { SgdsInput } from "../components";
import { InputValidationController } from "./inputValidationController";

type Constructor<T> = new (...args: any[]) => T;

/**
 * @summary When noValidation is false, applies the SGDS Form validation behaviour on the superClass
 * @param superClass
 * @returns
 */
export const SgdsFormValidatorMixin = <T extends Constructor<LitElement>>(superClass: T) => {
  class ToBeValidatedElement extends superClass {
    static formAssociated = true;
    inputValidationController;
    input: HTMLInputElement | SgdsInput;

    /** When true, disables SGDS default form validation behaviour */
    @property({ type: Boolean }) noValidation = false;

    @queryAsync("sgds-input") sgdsInput: Promise<SgdsInput>;

    connectedCallback(): void {
      super.connectedCallback();
      this.inputValidationController = new InputValidationController(this);
    }
    async firstUpdated(changedProperties) {
      super.firstUpdated(changedProperties);

      /* Either input or sgds-input. For example, quantity-toggle uses sgds-input */
      this.input = this.shadowRoot.querySelector("input") || (await this.sgdsInput);
      if (!this.noValidation) {
        this.inputValidationController.validateInput(this.input);
      }
    }
    handleChange(e: Event): void {
      this.inputValidationController.setFormValue();
      if (!this.noValidation) {
        this.inputValidationController.handleChange(e);
      }
    }
    handleInputChange(e: Event): void {
      this.inputValidationController.setFormValue();
      if (!this.noValidation) {
        this.inputValidationController.handleInput(e);
      }
    }

    // formStateRestoreCallback(state, _mode) {
    //   // const [date, view] = state.split("#");
    //   // this.view = view;
    //   // this.setValue(date);
    //   console.log(state)
    // }

    formResetCallback() {
      if (this.resetFormControl) {
        this.resetFormControl();
      } else {
        this.value = this.defaultValue;
        this.resetValidity(this.input);
      }
    }

    resetValidity(input: HTMLInputElement | SgdsInput) {
      this.inputValidationController.resetValidity();
      this.inputValidationController.updateInvalidState();
      this.inputValidationController.validateInput(input);
      this._isTouched ? (this._isTouched = false) : null;
    }
    /** DECLARED INSTANCE METHODS AND PROPERTIES*/

    /**
     * Resets a form control to its initial state
     */
    declare resetFormControl: () => void;
    declare value: string;
    declare defaultValue: string;
    declare defaultChecked: boolean;
    declare _isTouched: boolean;
  }

  return ToBeValidatedElement as Constructor<ToBeValidatedElementInterface> & T;
};

export declare class ToBeValidatedElementInterface {
  noValidation: boolean;
  inputValidationController: any;
  input: HTMLInputElement;
  handleChange(e: Event): void;
  handleInputChange(e: Event): void;
  resetValidity(input: HTMLInputElement | SgdsInput): void;
}
