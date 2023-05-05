import type SgdsButton from "../components/Button/sgds-button";
import type { ReactiveController, ReactiveControllerHost } from "lit";
export interface FormSubmitControllerOptions {
    /** A function that returns the form containing the form control. */
    form: (input: unknown) => HTMLFormElement | null;
    /** A function that returns the form control's name, which will be submitted with the form data. */
    name: (input: unknown) => string;
    /** A function that returns the form control's current value. */
    value: (input: unknown) => unknown | unknown[];
    /** A function that returns the form control's default value. */
    defaultValue: (input: unknown) => unknown | unknown[];
    /** A function that returns the form control's current disabled state. If disabled, the value won't be submitted. */
    disabled: (input: unknown) => boolean;
    /**
     * A function that maps to the form control's reportValidity() function. When the control is invalid, this will
     * prevent submission and trigger the browser's constraint violation warning.
     */
    reportValidity: (input: unknown) => boolean;
    /** A function that sets the form control's value */
    setValue: (input: unknown, value: unknown) => void;
}
export declare class FormSubmitController implements ReactiveController {
    host?: ReactiveControllerHost & Element;
    form?: HTMLFormElement | null;
    options: FormSubmitControllerOptions;
    constructor(host: ReactiveControllerHost & Element, options?: Partial<FormSubmitControllerOptions>);
    hostConnected(): void;
    hostDisconnected(): void;
    handleFormData(event: FormDataEvent): void;
    handleFormSubmit(event: Event): void;
    handleFormReset(): void;
    reportFormValidity(): boolean;
    doAction(type: "submit" | "reset", invoker?: HTMLInputElement | SgdsButton): void;
    /** Resets the form, restoring all the control to their default value */
    reset(invoker?: HTMLInputElement | SgdsButton): void;
    /** Submits the form, triggering validation and form data injection. */
    submit(invoker?: HTMLInputElement | SgdsButton): void;
}
