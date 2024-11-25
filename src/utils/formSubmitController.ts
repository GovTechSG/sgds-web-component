import type SgdsButton from "../components/Button/sgds-button";
import type { ReactiveController, ReactiveControllerHost } from "lit";
import SgdsElement from "../base/sgds-element";
import { SgdsInput } from "../components";

/**
 * A controller to help with form submission
 */
export class FormSubmitController implements ReactiveController {
  host?: ReactiveControllerHost & Element;
  form?: HTMLFormElement | null;
  options: FormSubmitControllerOptions;

  constructor(host: ReactiveControllerHost & Element, options?: Partial<FormSubmitControllerOptions>) {
    (this.host = host).addController(this);
    this.options = {
      form: (input: HTMLInputElement) => {
        return input.closest("form");
      },
      ...options
    };
  }

  hostConnected() {
    this.form = this.options.form(this.host);
  }

  hostDisconnected() {
    if (this.form) {
      this.form = undefined;
    }
  }
  /**
   * Creates a temporary native HTML button that can participate in form and invoke form submits and reset
   * Button is removed once action is performed
   */
  doAction(type: "submit" | "reset", invoker?: HTMLInputElement | SgdsButton) {
    if (this.form) {
      const button = document.createElement("button");
      button.type = type;
      button.style.position = "absolute";
      button.style.width = "0";
      button.style.height = "0";
      button.style.clipPath = "inset(50%)";
      button.style.overflow = "hidden";
      button.style.whiteSpace = "nowrap";

      // Pass form attributes through to the temporary button
      if (invoker) {
        ["formaction", "formmethod", "formnovalidate", "formtarget"].forEach(attr => {
          if (invoker.hasAttribute(attr)) {
            button.setAttribute(attr, invoker.getAttribute(attr));
          }
        });
      }

      this.form.append(button);
      button.click();
      button.remove();
    }
  }

  /** Resets the form, restoring all the control to their default value */
  reset(invoker?: HTMLInputElement | SgdsButton) {
    this.doAction("reset", invoker);
  }

  /** Submits the form, triggering validation and form data injection. */
  submit(invoker?: HTMLInputElement | SgdsButton) {
    // Calling form.submit() bypasses the submit event and constraint validation. To prevent this, we can inject a
    // native submit button into the form, "click" it, then remove it to simulate a standard form submission.
    this.doAction("submit", invoker);
  }
}

export interface FormSubmitControllerOptions {
  /** A function that returns the form containing the form control. */
  form: (input: unknown) => HTMLFormElement | null;
}

export interface SgdsFormControl extends SgdsElement {
  // Form attributes
  name: string;
  value: unknown;
  disabled?: boolean;
  defaultValue?: unknown;
  defaultChecked?: boolean;
  form?: HTMLFormElement;
  valid?: boolean;
  invalid?: boolean;

  // Constraint validation attributes
  pattern?: string;
  min?: number | string | Date;
  max?: number | string | Date;
  step?: number | "any";
  required?: boolean;
  minlength?: number;
  maxlength?: number;

  input?: HTMLInputElement | SgdsInput;
}
