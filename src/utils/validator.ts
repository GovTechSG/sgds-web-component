import { LitElement } from "lit";
import { queryAsync, state } from "lit/decorators.js";
import { property } from "lit/decorators/property.js";
import { SgdsInput } from "../components";
import { InputValidationController } from "./inputValidationController";

type Constructor<T> = new (...args: any[]) => T;

export const SgdsFormValidatorMixin = <T extends Constructor<LitElement>>(superClass: T) => {
  class ToBeValidatedElement extends superClass {
    static formAssociated = true;
    inputValidationController;
    input: HTMLInputElement | SgdsInput;
    // sgdsInput: SgdsInput
    /** When true, disables SGDS default form validation behaviour */
    @property({ type: Boolean }) noValidation = false;

    @state() validationMessage: string;

    @queryAsync("sgds-input") sgdsInput: Promise<SgdsInput>;

    connectedCallback(): void {
      super.connectedCallback();
      if (!this.noValidation) {
        this.inputValidationController = new InputValidationController(this);
      }
    }
    async firstUpdated(changedProperties) {
      super.firstUpdated(changedProperties);
      if (!this.noValidation) {
        this.input = this.shadowRoot.querySelector("input");

        /* Either input or sgds-input. For example, quantity-toggle uses sgds-input */
        this.input = this.shadowRoot.querySelector("input") || (await this.sgdsInput);

        this.inputValidationController.validateInput(this.input);
      }
    }
    handleChange(e: Event): void {
      if (!this.noValidation) {
        this.inputValidationController.handleChange(e);
      }
    }
    handleInputChange(e: Event): void {
      if (!this.noValidation) {
        this.inputValidationController.handleInput(e);
      }
    }
  }

  return ToBeValidatedElement as Constructor<ToBeValidatedElementInterface> & T;
};

export declare class ToBeValidatedElementInterface {
  noValidation: boolean;
  inputValidationController: any;
  input: HTMLInputElement;
  handleChange(e: Event): void;
  handleInputChange(e: Event): void;
}
