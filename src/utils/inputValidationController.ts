import { ReactiveController, ReactiveControllerHost } from "lit";
import { SgdsFormControl } from "./formSubmitController";
import { SgdsCheckbox, SgdsInput } from "../components";

/**
 * SGDS custom form validation methods and behaviours
 */
export class InputValidationController implements ReactiveController {
  host: ReactiveControllerHost & HTMLElement;
  _internals: ElementInternals;
  validationError: keyof ValidityState;
  options: InputValidationControllerOptions;

  constructor(
    host: ReactiveControllerHost & HTMLElement,
    internals: ElementInternals,
    options?: Partial<InputValidationControllerOptions>
  ) {
    (this.host = host).addController(this);
    this._internals = internals;
    this.options = {
      setInvalid: (host: SgdsFormControl, value: boolean) => {
        host.invalid = value;
      },
      value: (host: SgdsFormControl) => {
        return host.value;
      },
      input: (host: SgdsFormControl) => host.input,
      ...options
    };
  }

  hostConnected(): void {
    this.host.addEventListener("invalid", e => this.handleInvalid(e));
  }

  hostDisconnected(): void {
    this.host.removeEventListener("invalid", e => this.handleInvalid(e));
  }
  /**
   * Prevents the native browser error message pop up when reportValidity() called by
   * associated form or the component's reportValidity during constraint validation
   * Sets invalid reactive prop to true
   */
  handleInvalid(e: Event) {
    e.preventDefault();
    this.options.setInvalid(this.host, true);
  }

  /**
   * Sets invalid to false when invoked and
   * Updates the ValidityState based on new value, but
   * does not update invalid reactive prop
   * @param e
   */
  handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.options.setInvalid(this.host, false);
    this.validateInput(input);
  }
  /**
   * Validate the input's new value after onChange and
   * update invalid reactive prop
   * @param e
   */
  handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.validateInput(input);
    this.options.setInvalid(this.host, !this.checkValidity());
  }

  get form() {
    return this._internals.form;
  }

  get validity() {
    return this._internals.validity;
  }

  get validationMessage() {
    return this._internals.validationMessage;
  }

  get willValidate() {
    return this._internals.willValidate;
  }
  /**
   * Checks the validity and updates the invalid reactive prop of form components
   */
  updateInvalidState() {
    this.options.setInvalid(this.host, !this.checkValidity());
  }
  /**
   * Resets the ValidityState of the control
   */
  resetValidity() {
    return this._internals.setValidity({});
  }
  /**
   * Reports the validity
   */
  checkValidity(): boolean {
    return this._internals.checkValidity();
  }
  /**
   * Reports the validity with a error popup message
   */
  reportValidity(): boolean {
    return this._internals.reportValidity();
  }
  setValidity(flags?: ValidityStateFlags, message?: string, anchor?: HTMLElement): void {
    return this._internals.setValidity(flags, message, anchor);
  }
  /**
   * Sets the form control value into FormData,
   * making the value of control accessible via FormData
   */
  setFormValue() {
    const value = this.options.value(this.host) as string | FormData | File;
    this._internals.setFormValue(value);
  }
  /**
   * Updates the ValidityState of the input in form component at current state
   */
  validateInput(input) {
    /** When the form control is disabled, its always valid */
    if (this.options.input(this.host).disabled) {
      return this._internals.setValidity({});
    }
    // get the validity of the internal <input>
    const validState = input.validity;
    // if the input is invalid, show the correct error
    if (!validState.valid) {
      // loop through the error reasons
      for (const state in validState) {
        // if there is an error and corresponding attribute holding
        // the message
        if (validState[state]) {
          this.validationError = state.toString() as keyof ValidityState;
          // set the validity error reason and the corresponding
          // message
          this._internals.setValidity({ [this.validationError]: true }, input.validationMessage, input);
        }
      }
    } else {
      this._internals.setValidity({});
    }
  }
}

export interface InputValidationControllerOptions {
  /** A function that sets the value of host invalid reactive prop */
  setInvalid: (host: ReactiveControllerHost & HTMLElement, value: boolean) => void;
  /** A function that gets the value of host value reactive prop */
  value: (host: ReactiveControllerHost & HTMLElement) => unknown;
  /** A function that gets the input control of host value reactive prop */
  input: (host: ReactiveController & HTMLElement) => HTMLInputElement | SgdsInput | SgdsCheckbox;
}
