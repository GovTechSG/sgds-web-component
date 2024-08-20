const reportValidityOverloads = new WeakMap();
export class FormSubmitController {
    constructor(host, options) {
        (this.host = host).addController(this);
        this.options = Object.assign({ form: (input) => {
                return input.closest("form");
            }, name: (input) => input.name, value: (input) => input.value, defaultValue: (input) => input.defaultValue, disabled: (input) => input.disabled, reportValidity: (input) => {
                return typeof input.reportValidity === "function" ? input.reportValidity() : true;
            }, setValue: (input, value) => {
                input.value = value;
            } }, options);
        this.handleFormData = this.handleFormData.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleFormReset = this.handleFormReset.bind(this);
        this.reportFormValidity = this.reportFormValidity.bind(this);
    }
    hostConnected() {
        this.form = this.options.form(this.host);
        if (this.form) {
            this.form.addEventListener("formdata", this.handleFormData);
            this.form.addEventListener("submit", this.handleFormSubmit);
            this.form.addEventListener("reset", this.handleFormReset);
            // Overload the form's reportValidity() method so it looks at Shoelace form controls
            if (!reportValidityOverloads.has(this.form)) {
                reportValidityOverloads.set(this.form, this.form.reportValidity);
                this.form.reportValidity = () => this.reportFormValidity();
            }
        }
    }
    hostDisconnected() {
        if (this.form) {
            this.form.removeEventListener("formdata", this.handleFormData);
            this.form.removeEventListener("submit", this.handleFormSubmit);
            this.form.removeEventListener("reset", this.handleFormReset);
            // Remove the overload and restore the original method
            if (reportValidityOverloads.has(this.form)) {
                this.form.reportValidity = reportValidityOverloads.get(this.form);
                reportValidityOverloads.delete(this.form);
            }
            this.form = undefined;
        }
    }
    handleFormData(event) {
        const disabled = this.options.disabled(this.host);
        const name = this.options.name(this.host);
        const value = this.options.value(this.host);
        if (!disabled && typeof name === "string" && typeof value !== "undefined") {
            if (Array.isArray(value)) {
                value.forEach(val => {
                    event.formData.append(name, val.toString());
                });
            }
            else {
                event.formData.append(name, value.toString());
            }
        }
    }
    handleFormSubmit(event) {
        const disabled = this.options.disabled(this.host);
        const reportValidity = this.options.reportValidity;
        if (this.form && !this.form.noValidate && !disabled && !reportValidity(this.host)) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    }
    handleFormReset() {
        this.options.setValue(this.host, this.options.defaultValue(this.host));
    }
    reportFormValidity() {
        //
        // Shoelace form controls work hard to act like regular form controls. They support the Constraint Validation API
        // and its associated methods such as setCustomValidity() and reportValidity(). However, the HTMLFormElement also
        // has a reportValidity() method that will trigger validation on all child controls. Since we're not yet using
        // ElementInternals, we need to overload this method so it looks for any element with the reportValidity() method.
        //
        // We preserve the original method in a WeakMap, but we don't call it from the overload because that would trigger
        // validations in an unexpected order. When the element disconnects, we revert to the original behavior. This won't
        // be necessary once we can use ElementInternals.
        //
        // Note that we're also honoring the form's novalidate attribute.
        //
        if (this.form && !this.form.noValidate) {
            // This seems sloppy, but checking all elements will cover native inputs, Shoelace inputs, and other custom
            // elements that support the constraint validation API.
            const elements = this.form.querySelectorAll("*");
            for (const element of elements) {
                if (typeof element.reportValidity === "function") {
                    if (!element.reportValidity()) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    doAction(type, invoker) {
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
    reset(invoker) {
        this.doAction("reset", invoker);
    }
    /** Submits the form, triggering validation and form data injection. */
    submit(invoker) {
        // Calling form.submit() bypasses the submit event and constraint validation. To prevent this, we can inject a
        // native submit button into the form, "click" it, then remove it to simulate a standard form submission.
        this.doAction("submit", invoker);
    }
}
//# sourceMappingURL=form.js.map