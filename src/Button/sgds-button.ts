import { customElement, property, state, query } from "lit/decorators.js";
import { html, literal } from "lit/static-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { classMap } from "lit/directives/class-map.js";
import { FormSubmitController } from "../utils/form";
import SgdsElement from "../base/sgds-element";
import styles from "./sgds-button.scss";
import { SgdsAlert } from "../Alert";
import { SgdsStepper } from "../Stepper";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "link"
  | "outline-primary"
  | "outline-secondary"
  | "outline-success"
  | "outline-danger"
  | "outline-warning"
  | "outline-info"
  | "outline-light"
  | "outline-dark";

interface MyAlert extends SgdsAlert {
  toggleShow(): void;
}
interface MyStepper extends SgdsStepper {
  incrementStep(): void;
  decrementStep(): void;
  firstStep(): void;
  lastStep(): void;
}

/**
 * @slot - The button's label.
 * 
 * @event sgds-blur - Emitted when the button is not focused.
 * @event sgds-focus - Emitted when the button is focused.
 */
@customElement("sgds-button")
export class SgdsButton extends SgdsElement {
  static styles = styles;

  @query(".btn") button: HTMLButtonElement | HTMLLinkElement;

  private readonly formSubmitController = new FormSubmitController(this, {
    form: (input: HTMLInputElement) => {
      // Buttons support a form attribute that points to an arbitrary form, so if this attribute it set we need to query
      // the form from the same root using its id
      if (input.hasAttribute("form")) {
        const doc = input.getRootNode() as Document | ShadowRoot;
        const formId = input.getAttribute("form")!;
        return doc.getElementById(formId) as HTMLFormElement;
      }

      // Fall back to the closest containing form
      return input.closest("form");
    },
  });

  @state() private hasFocus = false;

  /** The button's variant. */
  @property({ reflect: true }) variant: ButtonVariant = "primary";

  @property({ reflect: true }) buttonClasses?: string;

  /** Button sizes */
  @property({ reflect: true }) size: "sm" | "lg";

  /** Button active state */
  @property({ type: Boolean, reflect: true }) active = false;

  /** Button disabled state */
  @property({ type: Boolean, reflect: true }) disabled = false;

  @property() type: "button" | "submit" | "reset" = "button";

  /** When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. */
  @property() href?: string;

  /** Tells the browser where to open the link. Only used when `href` is set. */
  @property() target?: "_blank" | "_parent" | "_self" | "_top";

  /** Tells the browser to download the linked file as this filename. Only used when `href` is set. */
  @property({ reflect: true }) download?: string;

  /**
   * The "form owner" to associate the button with. If omitted, the closest containing form will be used instead. The
   * value of this attribute must be an id of a form in the same document or shadow root as the button.
   */
  @property() form: string;

  /** Used to override the form owner's `action` attribute. */
  @property({ attribute: "formaction" }) formAction: string;

  /** Used to override the form owner's `method` attribute.  */
  @property({ attribute: "formmethod" }) formMethod: "post" | "get";

  /** Used to override the form owner's `novalidate` attribute. */
  @property({ attribute: "formnovalidate", type: Boolean })
  formNoValidate: boolean;

  /** Used to override the form owner's `target` attribute. */
  @property({ attribute: "formtarget" }) formTarget:
    | "_self"
    | "_blank"
    | "_parent"
    | "_top"
    | string;

  @property({ reflect: true }) refId?: string;

  @property({ reflect: true }) methodType?:
    | "toggleShow"
    | "decrement"
    | "increment"
    | "first"
    | "last";

  @property({ reflect: true }) stepperId?: string;

  /** Sets focus on the button. */
  focus(options?: FocusOptions) {
    this.button.focus(options);
  }

  /** Simulates a click on the button. */
  click() {
    this.button.click();
  }

  /** Removes focus from the button. */
  blur() {
    this.button.blur();
  }

  handleBlur() {
    this.hasFocus = false;
    this.emit("sgds-blur");
  }

  handleFocus() {
    this.hasFocus = true;
    this.emit("sgds-focus");
  }

  handleClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.removeEventListener("click", this.clickHandler);
    this.addEventListener("click", this.clickHandler);
  }

  clickHandler = () => {
    if (this.type === "submit") {
      this.formSubmitController.submit(this);
    }
    if (this.type === "reset") {
      this.formSubmitController.reset(this);
    }
    if (this.refId != null) {
      const sgdsAlert = document.querySelector(`#${this.refId}`) as MyAlert;
      const sgdsStepper = document.querySelector(`#${this.refId}`) as MyStepper;
      switch (this.methodType) {
        case "toggleShow":
          sgdsAlert.toggleShow();
        case "increment":
          sgdsStepper.incrementStep();
          break;
        case "decrement":
          sgdsStepper.decrementStep();
          break;
        case "first":
          sgdsStepper.firstStep();
          break;
        case "last":
          sgdsStepper.lastStep();
          break;
      }
    }
  };

  render() {
    const isLink = this.href;
    const tag = isLink ? literal`a` : literal`button`;
    return html`
      <${tag}
        class="sgds btn ${classMap({
          disabled: isLink && this.disabled,
          active: this.active,
          [`btn-${this.variant}`]: this.variant,
          [`btn-${this.size}`]: this.size,
          [`${this.buttonClasses}`]: this.buttonClasses,
        })}"
        ?disabled=${ifDefined(isLink ? undefined : this.disabled)}
        type=${ifDefined(isLink ? undefined : this.type)}
        href=${ifDefined(isLink ? this.href : undefined)}
        target=${ifDefined(isLink ? this.target : undefined)}
        download=${ifDefined(isLink ? this.download : undefined)}
        rel=${ifDefined(
          isLink && this.target === "_blank" ? "noreferrer noopener" : undefined
        )}
        role=${ifDefined(isLink ? "button" : undefined)}
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? "-1" : "0"}
        @click=${this.handleClick}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      >
          <slot></slot>
      </${tag}>
    `;
  }
}

export default SgdsButton;
