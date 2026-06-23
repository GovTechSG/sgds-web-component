/**
 * Finds the form associated with an element.
 * If formId is provided, looks up the form by ID in the root node.
 * Otherwise falls back to the closest containing form.
 */
export function getAssociatedForm(el: HTMLElement, formId?: string): HTMLFormElement | null {
  if (formId) {
    const root = el.getRootNode() as Document | ShadowRoot;
    return root.getElementById(formId) as HTMLFormElement | null;
  }
  return el.closest("form");
}

/**
 * Resets a form by injecting a temporary hidden reset button.
 */
export function resetForm(form: HTMLFormElement): void {
  doAction("reset", form, {});
}

/**
 * Submits a form by injecting a temporary hidden submit button.
 * This technique allows web components to trigger native form submission
 * with proper submitter reference and form attribute overrides.
 */
export function submitForm(
  form: HTMLFormElement,
  invoker: {
    formAction?: string;
    formMethod?: string;
    formNoValidate?: boolean;
    formTarget?: string;
  }
): void {
  doAction("submit", form, invoker);
}

function doAction(
  type: "submit" | "reset",
  form: HTMLFormElement,
  invoker: {
    formAction?: string;
    formMethod?: string;
    formNoValidate?: boolean;
    formTarget?: string;
  }
): void {
  const button = document.createElement("button");
  button.type = type;
  button.style.position = "absolute";
  button.style.width = "0";
  button.style.height = "0";
  button.style.clipPath = "inset(50%)";
  button.style.overflow = "hidden";
  button.style.whiteSpace = "nowrap";

  if (type === "submit") {
    if (invoker.formAction) {
      button.formAction = invoker.formAction;
    }
    if (invoker.formMethod) {
      button.setAttribute("formmethod", invoker.formMethod);
    }
    if (invoker.formNoValidate) {
      button.formNoValidate = true;
    }
    if (invoker.formTarget) {
      button.formTarget = invoker.formTarget;
    }
  }

  form.appendChild(button);
  button.click();
  form.removeChild(button);
}
