import { EventEmitter } from "../../stencil-public-runtime";
export type ButtonTone = "brand" | "danger" | "fixed-light" | "neutral";
export type ButtonVariant = "primary" | "outline" | "ghost" | "danger";
export declare class SgdsButton {
  el: HTMLElement;
  /** Sets the visual variants such as: `primary`, `outline`, `ghost`. `danger` is @deprecated since v3.5.6 */
  variant: ButtonVariant;
  /** Sets the visual colour of the button: `brand`, `danger`, `fixed-light`, `neutral` */
  tone: ButtonTone;
  /** Specifies a small, medium or large button, the size is medium by default. */
  size: "xs" | "sm" | "md" | "lg";
  /** Manually set the visual state of the button to `:active` */
  active: boolean;
  /** The disabled state of the button */
  disabled: boolean;
  /** When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. */
  href: string;
  /** Where to display the linked URL */
  target: "_blank" | "_parent" | "_self" | "_top";
  /** Tells the browser to download the linked file as this filename. Only used when `href` is set. */
  download: string;
  /** The aria-label attribute to passed to button element when necessary */
  ariaLabel: string;
  /** When true, shows a loading spinner */
  loading: boolean;
  /** The behavior of the button with default as `type='button'`, `reset` resets all the controls to their initial values and `submit` submits the form data to the server */
  type: "button" | "submit" | "reset";
  /** The "form owner" to associate the button with. The value must be an id of a form in the same document or shadow root. */
  form: string;
  /** Used to override the form owner's `action` attribute. */
  formAction: string;
  /** Used to override the form owner's `method` attribute. */
  formMethod: "post" | "get";
  /** Used to override the form owner's `novalidate` attribute. */
  formNoValidate: boolean;
  /** Used to override the form owner's `target` attribute. */
  formTarget: "_self" | "_blank" | "_parent" | "_top" | string;
  /** When set, the button will be in full width. */
  fullWidth: boolean;
  /** Used only for SSR to indicate the presence of the `leftIcon` slot. */
  hasLeftIconSlot: boolean;
  /** Used only for SSR to indicate the presence of the `rightIcon` slot. */
  hasRightIconSlot: boolean;
  private associatedForm;
  /** Emitted when the button is blurred. */
  sgdsBlur: EventEmitter<void>;
  /** Emitted when the button is focused. */
  sgdsFocus: EventEmitter<void>;
  connectedCallback(): void;
  disconnectedCallback(): void;
  componentDidLoad(): void;
  /** Sets focus on the button. */
  setFocus(options?: FocusOptions): Promise<void>;
  /** Removes focus from the button. */
  setBlur(): Promise<void>;
  private getInnerElement;
  private checkSlots;
  private handleSlotChange;
  private handleClick;
  private handleKeydown;
  private handleFocus;
  private handleBlur;
  private assignSpinnerSize;
  private assignSpinnerTone;
  render(): any;
}
