import { property, query } from "lit/decorators.js";
import SgdsElement from "./sgds-element";
import buttonStyles from "./button.css";
export type ButtonVariant = "primary" | "outline" | "ghost" | "danger";

export default class ButtonElement extends SgdsElement {
  static styles = [...SgdsElement.styles, buttonStyles];
  /** @internal */
  @query(".btn") protected button: HTMLButtonElement | HTMLLinkElement;

  /** One or more button variant combinations buttons may be one of a variety of visual variants such as: `primary`, `danger`, `outline`, `ghost` */
  @property({ reflect: true }) variant: ButtonVariant = "primary";

  /** Specifies a small, medium or large button, the size is medium by default. */
  @property({ reflect: true }) size: "sm" | "md" | "lg" = "md";

  /** Manually set the visual state of the button to `:active` */
  @property({ type: Boolean, reflect: true }) active = false;

  /** The disabled state of the button */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. */
  @property({ type: String, reflect: true }) href: string;

  /** Where to display the linked URL, as the name for a browsing context. Forwards to the HTMLAnchor target attribute */
  @property({ type: String, reflect: true })
  target: "_blank" | "_parent" | "_self" | "_top" = "_self";
  /** Tells the browser to download the linked file as this filename. Only used when `href` is set. */
  @property({ type: String, reflect: true }) download: string;

  /** The aria-label attribute to passed to button element when necessary */
  @property({ type: String }) ariaLabel: string;

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
  protected _handleBlur() {
    this.emit("sgds-blur");
  }

  protected _handleFocus() {
    this.emit("sgds-focus");
  }
  protected _handleClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
  }
}
