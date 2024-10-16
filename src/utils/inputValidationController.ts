import { ReactiveController, ReactiveControllerHost } from "lit";
import { SgdsFormControl } from "./form";

export class InputValidationController implements ReactiveController {
  host: ReactiveControllerHost & HTMLElement;
  _internals: ElementInternals;
  validationError: keyof ValidityState;
  options: InputValidationControllerOptions
  
  constructor(host: ReactiveControllerHost & HTMLElement, options?: Partial<InputValidationControllerOptions>) {
    (this.host = host).addController(this);
    this._internals = this.host.attachInternals();
    this.options = {
        setInvalid: (host: SgdsFormControl, value: boolean) => {
        host.invalid = value;
        },
        ...options
    }
  }

  hostConnected(): void {
    this.host.addEventListener("invalid", (e) => this.handleInvalid(e))
  }

  hostDisconnected(): void {
    this.host.removeEventListener("invalid", (e) => this.handleInvalid(e))
  }

  handleInvalid(e: Event) {
    e.preventDefault()
    this.options.setInvalid(this.host, true)
  }

  handleInput() {
    this.options.setInvalid(this.host, false)
  }
  handleChange(e: Event){
    const input = e.target as HTMLInputElement
    this.validateInput(input);
    // this.invalid = !input.checkValidity();
    this.options.setInvalid(this.host, !input.checkValidity())
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

  checkValidity() {
    return this._internals.checkValidity();
  }
  reportValidity() {
    return this._internals.reportValidity();
  }
  

   validateInput(input: HTMLInputElement) {
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
  
}

export interface InputValidationControllerOptions {
    /** A function that sets the value of host invalid reactive prop */
    setInvalid: (host:  ReactiveControllerHost & HTMLElement, value: boolean) => void;
  }