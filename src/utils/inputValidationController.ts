import { ReactiveController, ReactiveControllerHost } from "lit";
import { SgdsFormControl } from "./form";
import { SgdsCheckbox, SgdsInput } from "../components";

export class InputValidationController implements ReactiveController {
  host: ReactiveControllerHost & HTMLElement;
  _internals: ElementInternals;
  validationError: keyof ValidityState;
  options: InputValidationControllerOptions;

  constructor(host: ReactiveControllerHost & HTMLElement, options?: Partial<InputValidationControllerOptions>) {
    (this.host = host).addController(this);
    this._internals = this.host.attachInternals();
    this.options = {
      setInvalid: (host: SgdsFormControl, value: boolean) => {
        host.invalid = value;
      },
      value: (host: SgdsFormControl) => {
        return host.value;
      },
      defaultValue: (host: SgdsFormControl) => {
        return host.defaultValue;
      },
      defaultChecked: (host: SgdsFormControl) => {
        return host.defaultChecked;
      },
      input: (host: SgdsFormControl) => host.input,
      setValue: (input: HTMLInputElement, value: string) => {
        input.value = value;
      },
      ...options
    };
  }

  hostConnected(): void {
    this.host.addEventListener("invalid", e => this.handleInvalid(e));
  }

  hostDisconnected(): void {
    this.host.removeEventListener("invalid", e => this.handleInvalid(e));
  }

  handleInvalid(e: Event) {
    e.preventDefault();
    this.options.setInvalid(this.host, true);
  }

  handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.options.setInvalid(this.host, false);
    this.validateInput(input);
  }
  handleChange(e: Event) {
    console.log("this is running", e);
    const input = e.target as HTMLInputElement;
    this.validateInput(input);
    this.options.setInvalid(this.host, !this.checkValidity());
  }
  getInput() {
    return this.options.input(this.host);
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
  updateInvalidState() {
    this.options.setInvalid(this.host, !this.checkValidity());
  }
  resetValidity() {
    return this._internals.setValidity({});
  }
  checkValidity() {
    return this._internals.checkValidity();
  }
  reportValidity() {
    return this._internals.reportValidity();
  }
  /**
   *
   * Sets the form control value into FormData,
   * making the value of control accessible via FormData
   */
  setFormValue() {
    const value = this.options.value(this.host) as string | FormData | File;
    this._internals.setFormValue(value);
  }
  /**
   * Resets form when type="reset" button is click. Invoked in SgdsFormValidator
   */
  // resetForm() {
  //   // this.options.setValue(this.host, this.options.defaultValue(this.host));
  //   const input = this.options.input(this.host);
  //   const defaultValue = this.options.defaultValue(this.host);
  //   const defaultChecked = this.options.defaultChecked(this.host);
  //   // if (defaultChecked === undefined) {
  //   input.value = defaultValue as string;
  //   // }
  //   // if( defaultChecked === false){
  //   //   const checkboxInput = input as SgdsCheckbox
  //   //   checkboxInput.checked = defaultChecked
  //   //   checkboxInput.dispatchEvent(new Event("change"))
  //   // }
  //   // if(defaultChecked === true) {
  //   //   const checkboxInput = input as SgdsCheckbox
  //   //   checkboxInput.checked = defaultChecked
  //   //   // checkboxInput.dispatchEvent(new Event("change"))
  //   //   console.log('here')
  //   // }
  //   this._internals.setValidity({});
  //   this.options.setInvalid(this.host, !this.checkValidity());
  //   // this.setFormValue()
  // }
  validateInput(input) {
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
          this._internals.setValidity({ [this.validationError]: true }, input.validationMessage);
        }
      }
    } else {
      this._internals.setValidity({});
    }
  }

  // handleFormSubmit(event: Event) {
  //   const reportValidity = this.reportValidity;
  //   if (!reportValidity) {
  //     event.preventDefault();
  //     event.stopImmediatePropagation();
  //   }
  // }
}

export interface InputValidationControllerOptions {
  /** A function that sets the value of host invalid reactive prop */
  setInvalid: (host: ReactiveControllerHost & HTMLElement, value: boolean) => void;
  value: (host: ReactiveControllerHost & HTMLElement) => unknown;
  input: (host: ReactiveController & HTMLElement) => HTMLInputElement | SgdsInput | SgdsCheckbox;
  /** A function that returns the form control's default value. */
  defaultValue: (input: unknown) => unknown | unknown[];
  defaultChecked: (host: ReactiveController & HTMLElement) => boolean;
  /** A function that sets the form control's value */
  setValue: (input: unknown, value: unknown) => void;
}
