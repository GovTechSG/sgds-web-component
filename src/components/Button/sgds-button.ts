import { state, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { html, literal } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import { FormSubmitController } from "../../utils/form";
import buttonStyles from "./button.css";
import anchorStyles from "../../styles/anchor.css";

export type ButtonVariant = "primary" | "outline" | "ghost" | "danger";

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
 * @cssprop --sgds-btn-font-weight - The font weight of text content in button
 * @cssprop --sgds-btn-bg - The background color of button
 * @cssprop --sgds-btn-hover-bg - The background color of a button in hover state
 * @cssprop --sgds-btn-border-radius - The border radius of button border
 * @cssprop --sgds-btn-color - The text color of button, applicable to primary, outline, and ghost variants only
 * @cssprop --sgds-btn-border-width - The thickness of the button border, applicable to outline variant only
 * @cssprop --sgds-btn-border-color - The color of the button border, applicable to outline variant only
 *
 */
export class SgdsButton extends SgdsElement {
  static styles = [...SgdsElement.styles, anchorStyles, buttonStyles];

  @query(".btn") private button: HTMLButtonElement | HTMLLinkElement;

  /** @internal */
  @state()
  protected _hasLeftIcon = false;

  /** @internal */
  @state()
  protected _hasRightIcon = false;

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
  @property({ reflect: true }) variant: ButtonVariant;

  /** Specifies a small, medium or large button, the size is medium by default. */
  @property({ reflect: true }) size: "sm" | "md" | "lg" = "md";

  /** Manually set the visual state of the button to `:active` */
  @property({ type: Boolean, reflect: true }) active = false;

  /** The disabled state of the button */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** The behavior of the button with default as `type='button', `reset` resets all the controls to their initial values and `submit` submits the form data to the server */
  @property({ type: String, reflect: true }) type: "button" | "submit" | "reset" = "button";

  /** When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. */
  @property({ type: String, reflect: true }) href: string;

  /** Tells the browser where to open the link. Only used when `href` is set. */
  @property({ type: String, reflect: true }) target: "_blank" | "_parent" | "_self" | "_top";

  /** Tells the browser to download the linked file as this filename. Only used when `href` is set. */
  @property({ type: String, reflect: true }) download: string;

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

  /** The aria-label attribute to passed to button element when necessary */
  @property({ type: String }) ariaLabel: string;

  /** When set, the button will be in full width. */
  @property({ type: Boolean, reflect: true }) fullWidth = false;

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

  handleLeftIconSlotchange(e: Event) {
    const childNodes = (e.target as HTMLSlotElement).assignedNodes({ flatten: true }) as Array<HTMLOrSVGImageElement>;
    if (childNodes.length > 0) {
      return (this._hasLeftIcon = true);
    }
  }

  handleRightIconSlotchange(e: Event) {
    const childNodes = (e.target as HTMLSlotElement).assignedNodes({ flatten: true }) as Array<HTMLOrSVGImageElement>;
    if (childNodes.length > 0) {
      return (this._hasRightIcon = true);
    }
  }

  render() {
    const isLink = this.href;
    const tag = isLink ? literal`a` : literal`button`;
    return html`
      <${tag}
        class="sgds btn ${classMap({
          disabled: this.disabled,
          active: this.active,
          "full-width": this.fullWidth,
          "has-left-icon": this._hasLeftIcon,
          "has-right-icon": this._hasRightIcon,
          [`btn-${this.variant}`]: this.variant,
          [`btn-${this.size}`]: this.size
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
        aria-label=${ifDefined(this.ariaLabel)}
      >
      <slot name="leftIcon" @slotchange=${this.handleLeftIconSlotchange}></slot>
      <span><slot></slot></span>
      <slot name="rightIcon" @slotchange=${this.handleRightIconSlotchange}></slot>
      </${tag}>
    `;
  }
}

export default SgdsButton;
