import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { html, literal } from "lit/static-html.js";
import ButtonElement from "../../base/button-element";
import { HasSlotController } from "../../utils/slot";
import { FormSubmitController } from "../../utils/formSubmitController";
import anchorStyles from "../../styles/anchor.css";
import buttonStyles from "./button.css";

export type ButtonVariant = "primary" | "outline" | "ghost" | "danger";

/**
 * @summary Custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and more.
 *
 * @slot default - The button's label.
 * @slot leftIcon - The slot for icon to the left of the button text
 * @slot rightIcon - The slot for icon to the right of the button text
 *
 * @event sgds-blur - Emitted when the button is blurred.
 * @event sgds-focus - Emitted when the button is focused.
 *
 *
 */
export class SgdsButton extends ButtonElement {
  static styles = [...ButtonElement.styles, anchorStyles, buttonStyles];

  /** @internal */
  private readonly formSubmitController = new FormSubmitController(this, {
    form: (input: HTMLInputElement) => {
      // Buttons support a form attribute that points to an arbitrary form, so if this attribute it set we need to query
      // the form from the same root using its id
      if (input.hasAttribute("form")) {
        const doc = input.getRootNode() as Document | ShadowRoot;
        const formId = input.getAttribute("form");
        return doc.getElementById(formId) as HTMLFormElement;
      }

      // Fall back to the closest containing form
      return input.closest("form");
    }
  });
  /** The behavior of the button with default as `type='button', `reset` resets all the controls to their initial values and `submit` submits the form data to the server */
  @property({ type: String, reflect: true }) type: "button" | "submit" | "reset" = "button";
  /**
   * The "form owner" to associate the button with. If omitted, the closest containing form will be used instead. The
   * value of this attribute must be an id of a form in the same document or shadow root as the button.
   */
  @property({ type: String, reflect: true }) form: string;

  /** Used to override the form owner's `action` attribute. */
  @property({ type: String, reflect: true, attribute: "formaction" }) formAction: string;

  /** Used to override the form owner's `method` attribute.  */
  @property({ type: String, reflect: true, attribute: "formmethod" }) formMethod: "post" | "get";

  /** Used to override the form owner's `novalidate` attribute. */
  @property({ attribute: "formnovalidate", type: Boolean, reflect: true })
  formNoValidate: boolean;

  /** Used to override the form owner's `target` attribute. */
  @property({ type: String, reflect: true, attribute: "formtarget" }) formTarget:
    | "_self"
    | "_blank"
    | "_parent"
    | "_top"
    | string;

  /** When set, the button will be in full width. */
  @property({ type: Boolean, reflect: true }) fullWidth = false;

  /** Used only for SSR to indicate the presence of the `leftIcon` slot. */
  @property({ type: Boolean }) hasLeftIconSlot = false;

  /** Used only for SSR to indicate the presence of the `rightIcon` slot. */
  @property({ type: Boolean }) hasRightIconSlot = false;

  private readonly hasSlotController = new HasSlotController(this, "leftIcon", "rightIcon");

  updated() {
    if (!this.hasLeftIconSlot) this.hasLeftIconSlot = this.hasSlotController.test("leftIcon");
    if (!this.hasRightIconSlot) this.hasRightIconSlot = this.hasSlotController.test("rightIcon");
  }

  protected override _handleClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.removeEventListener("click", this._clickHandler);
    this.addEventListener("click", this._clickHandler);
  }

  private _clickHandler = () => {
    if (this.type === "submit") {
      this.formSubmitController.submit(this);
    }
    if (this.type === "reset") {
      this.formSubmitController.reset(this);
    }
  };

  render() {
    const isLink = this.href;
    const tag = isLink ? literal`a` : literal`button`;
    const noIcon = !this.hasLeftIconSlot && !this.hasRightIconSlot;

    return html`
      <${tag}
        class="btn ${classMap({
          disabled: this.disabled,
          active: this.active,
          "has-left-icon": this.hasLeftIconSlot,
          "has-right-icon": this.hasRightIconSlot,
          "no-icon": noIcon,
          loading: this.loading
        })}"
        ?disabled=${ifDefined(isLink ? undefined : this.disabled)}
        type=${ifDefined(isLink ? undefined : this.type)}
        href=${ifDefined(isLink ? this.href : undefined)}
        target=${ifDefined(isLink ? this.target : undefined)}
        download=${ifDefined(isLink ? this.download : undefined)}
        rel=${ifDefined(isLink && this.target === "_blank" ? "noreferrer noopener" : undefined)}
        role=${ifDefined(isLink ? "button" : undefined)}
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? "-1" : "0"}
        @click=${this._handleClick}
        @focus=${this._handleFocus}
        @blur=${this._handleBlur}
        aria-label=${ifDefined(this.ariaLabel)}
      >
       ${
         this.loading
           ? html`<sgds-spinner
               size=${ifDefined(this._assignSpinnerSize(this.size))}
               tone=${ifDefined(this._assignSpinnerTone(this.tone, this.variant))}
             ></sgds-spinner>`
           : html`<slot name="leftIcon"></slot>
               <span><slot></slot></span>
               <slot name="rightIcon"></slot>`
       }
      
      </${tag}>
    `;
  }
}

export default SgdsButton;
