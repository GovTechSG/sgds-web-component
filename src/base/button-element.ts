import { property, query } from "lit/decorators.js";
import SgdsElement from "./sgds-element";
import buttonStyles from "./button.css";
import { SpinnerTone } from "../components";

export type ButtonTone = "brand" | "danger" | "fixed-light" | "neutral";
export type ButtonVariant =
  | "primary"
  | "outline"
  | "ghost"
  /** @deprecated since v3.5.6 */
  | "danger";

export default class ButtonElement extends SgdsElement {
  static styles = [...SgdsElement.styles, buttonStyles];
  /** @internal */
  @query(".btn") protected button: HTMLButtonElement | HTMLLinkElement;

  /** One or more button variant combinations buttons may be one of a variety of visual variants such as: `primary`, `danger`, `outline`, `ghost` */
  @property({ reflect: true }) variant: ButtonVariant = "primary";

  /** One or more button variant combinations buttons may be one of a variety of visual variants such as: `primary`, `danger`, `outline`, `ghost` */
  @property({ reflect: true }) tone: ButtonTone = "brand";

  /** Specifies a small, medium or large button, the size is medium by default. */
  @property({ reflect: true }) size: "xs" | "sm" | "md" | "lg" = "md";

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

  /** When true, shows a loading spinner */
  @property({ type: Boolean }) loading: boolean;

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
  protected _assignSpinnerSize(buttonSize: "xs" | "sm" | "md" | "lg") {
    if (buttonSize === "xs" || buttonSize === "sm") return "xs";
    if (buttonSize === "md" || buttonSize === "lg") return "sm";
  }
  protected _assignSpinnerTone(buttonTone: ButtonTone, buttonVariant: ButtonVariant): SpinnerTone {
    // Default spinner tone
    if (buttonTone === "fixed-light" && buttonVariant === "primary") return "fixed-dark";
    if (buttonTone === "fixed-light" || buttonVariant === "primary") return "fixed-light";
    if (buttonTone === "neutral" && (buttonVariant === "outline" || buttonVariant === "ghost")) return "neutral";
    return "brand";
  }
}
