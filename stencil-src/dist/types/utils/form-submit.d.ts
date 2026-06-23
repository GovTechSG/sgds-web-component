/**
 * Finds the form associated with an element.
 * If formId is provided, looks up the form by ID in the root node.
 * Otherwise falls back to the closest containing form.
 */
export declare function getAssociatedForm(el: HTMLElement, formId?: string): HTMLFormElement | null;

/**
 * Resets a form by injecting a temporary hidden reset button.
 */
export declare function resetForm(form: HTMLFormElement): void;

/**
 * Submits a form by injecting a temporary hidden submit button.
 * This technique allows web components to trigger native form submission
 * with proper submitter reference and form attribute overrides.
 */
export declare function submitForm(
  form: HTMLFormElement,
  invoker: {
    formAction?: string;
    formMethod?: string;
    formNoValidate?: boolean;
    formTarget?: string;
  }
): void;
