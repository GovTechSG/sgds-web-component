import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { html, literal } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import { FormSubmitController } from "../../utils/form";
import buttonStyles from "./button.css";
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "link";

/**
 * @summary Custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and more.
 *
 * @slot default - The button's label.
 * @slot leftIcon - The slot for icon to the left of the button text
 * @slot rightIcon - The slot for icon to the right of the button text
 *
 * @event sgds-blur - Emitted when the button is not focused.
 * @event sgds-focus - Emitted when the button is focused.
 *
 * @cssprop --sgds-btn-padding-x - The x-axis padding of button
 * @cssprop --sgds-btn-padding-y - The y-axis padding of button
 * @cssprop --sgds-btn-font-family - The font family of text content in button
 * @cssprop --sgds-btn-font-size - The font size of text content in button
 * @cssprop --sgds-btn-font-weight - The font weight of text content in button
 * @cssprop --sgds-btn-line-height - The line height of text content in button
 * @cssprop --sgds-btn-color - The text color of button
 * @cssprop --sgds-btn-bg - The background color of button
 * @cssprop --sgds-btn-border-width - The thickness of the button border
 * @cssprop --sgds-btn-border-color - The color of the button border
 * @cssprop --sgds-btn-border-radius - The border radius of button border
 * @cssprop --sgds-btn-disabled-color - The text color of a button in disabled state
 * @cssprop --sgds-btn-disabled-opacity - The opacity of a button in disabled state
 * @cssprop --sgds-btn-hover-color - The text color of a button in hover state
 * @cssprop --sgds-btn-hover-border-color - The border color of a button in hover state
 * @cssprop --sgds-btn-hover-bg - The background color of a button in hover state
 * @cssprop --sgds-btn-active-color - The text color of a button in active state
 * @cssprop --sgds-btn-active-border-color - The border color of a button in active state
 * @cssprop --sgds-btn-active-bg - The background color of a button in active state
 * @cssprop --sgds-btn-focus-box-shadow-color - The color of box shadow of a focused button
 * @cssprop --sgds-btn-focus-box-shadow - The box shadow of a button in focused state
 * @cssprop --sgds-btn-icon-gutter - The space between icons and the text in button
 *
 */
export class SgdsButton extends SgdsElement {
  static styles = [...SgdsElement.styles, buttonStyles];

  @query(".btn") private button: HTMLButtonElement | HTMLLinkElement;

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

  /** One or more button variant combinations buttons may be one of a variety of visual variants such as: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `dark`, `light`, `link` as well as "outline" versions (prefixed by `outline-*`) */
  @property({ reflect: true }) variant: ButtonVariant = "primary";

  /** One or more button variant combinations buttons may be one of a variety of visual variants such as: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `dark`, `light`, `link` as well as "outline" versions (prefixed by `outline-*`) */
  @property({ type: Boolean, reflect: true }) outlined = false;

  /** Specifies a large or small button */
  @property({ reflect: true }) size: "sm" | "lg";

  /** Manually set the visual state of the button to `:active` */
  @property({ type: Boolean, reflect: true }) active = false;

  /** The disabled state of the button */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** The behavior of the button with default as `type='button', `reset` resets all the controls to their initial values and `submit` submits the form data to the server */
  @property() type: "button" | "submit" | "reset" = "button";

  /** When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. */
  @property() href: string;

  /** Tells the browser where to open the link. Only used when `href` is set. */
  @property() target: "_blank" | "_parent" | "_self" | "_top";

  /** Tells the browser to download the linked file as this filename. Only used when `href` is set. */
  @property({ reflect: true }) download: string;

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
  @property({ attribute: "formtarget" }) formTarget: "_self" | "_blank" | "_parent" | "_top" | string;

  /** Sets focus on the button. */
  public focus(options?: FocusOptions) {
    this.button.focus(options);
  }

  /** Simulates a click on the button. */
  public click() {
    this.button.click();
  }

  /** Removes focus from the button. */
  public blur() {
    this.button.blur();
  }

  handleBlur() {
    this.emit("sgds-blur");
  }

  handleFocus() {
    this.emit("sgds-focus");
  }

  handleClick(event: MouseEvent) {
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
    return html`
      <${tag}
        class="sgds btn ${classMap({
          disabled: this.disabled,
          active: this.active,
          [`btn-${this.size}`]: this.size,
          "btn-link": this.variant === "link"
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
        @click=${this.handleClick}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      >
      <slot name="leftIcon"></slot>
      <slot></slot>
      <slot name="rightIcon"></slot>
      </${tag}>
    `;
  }
}

export default SgdsButton;
