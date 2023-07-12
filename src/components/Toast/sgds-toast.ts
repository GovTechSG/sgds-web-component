import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import { animateTo } from "../../utils/animate";
import { getAnimation, setDefaultAnimation } from "../../utils/animation-registry";
import { waitForEvent } from "../../utils/event";
import { watch } from "../../utils/watch";
import styles from "./sgds-toast.scss";

/**
 * @summary Toast allows you to convey quick messaging notifications to the user.
 *
 * @slot default - The content to pass into toast's body
 * @slot icon - The slot to pass in icon to toast's header
 * @slot duration - When required, pass in the duration since toast appeared to this slot
 *
 * @event sgds-show - Emitted on show.
 * @event sgds-after-show - Emitted on show after animation has completed.
 * @event sgds-hide - Emitted on hide.
 * @event sgds-after-hide - Emitted on hide after animation has completed.
 *
 * @cssproperty --toast-icon-margin-right - The margin-right between toast's icon and title in its header. Defaults to 0.5rem
 */
export class SgdsToast extends SgdsElement {
  static styles = [SgdsElement.styles, styles];
  /**@internal */
  @query("div.toast") toast: HTMLElement;
  /** Controls the appearance of toast */
  @property({ type: Boolean, reflect: true }) show = false;
  /** The header title of toast. It is required to assign a title to toast */
  @property({ type: String, reflect: true }) title = "Title";
  /** Controls whether the toast has fade animation during its appearance/disappearance */
  @property({ type: Boolean, reflect: true }) noAnimation = false;
  /** Controls if the toast will hide itself after the delay time. Works with delay property */
  @property({ type: Boolean, reflect: true }) autohide = false;
  /** The amount of time taken for toast to disappear after its first render. It takes effect only when autohide is set to true */
  @property({ type: Number, reflect: true }) delay = 5000;
  /** The colour variant of toast */
  @property({ type: String, reflect: true }) variant: ToastVariant;
  /** Optional for toast. Forwards to the base div wrapper of toast. Can be used to insert any utility classes such as `me-auto` */
  @property({ type: String, reflect: true }) toastClasses: string;
  /** The toast variant. */
  @property({ type: String, reflect: true }) bg:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "dark"
    | "light";
  /**Adds CSS styling to `<Toast />` based on the defined status */
  @property({ type: String, reflect: true }) status: "success" | "warning" | "danger";

  /** Shows the toast */
  public async showToast() {
    if (this.show) {
      return;
    }

    this.show = true;
    return waitForEvent(this, "sgds-after-show");
  }

  /** Hide the toast */
  public async hideToast() {
    if (!this.show) {
      return;
    }
    this.show = false;
    return waitForEvent(this, "sgds-after-hide");
  }

  /** @internal */
  handleCloseClick() {
    this.show = false;
    this.emit("sgds-close");
  }
  /**@internal */
  @watch("show", { waitUntilFirstUpdate: true })
  async handleShowChange() {
    if (this.show) {
      this.emit("sgds-show");
      this.toast.hidden = !this.show;

      const toastAnimation = getAnimation(this, "toast.show");
      !this.noAnimation && (await animateTo(this.toast, toastAnimation.keyframes, toastAnimation.options));

      this.emit("sgds-after-show");
    } else {
      this.emit("sgds-hide");
      const toastAnimation = getAnimation(this, "toast.hide");

      !this.noAnimation && (await animateTo(this.toast, toastAnimation.keyframes, toastAnimation.options));
      this.emit("sgds-after-hide");
      this.toast.hidden = !this.show;
    }
  }
  protected firstUpdated(): void {
    this.toast.hidden = !this.show;
  }

  render() {
    if (this.autohide && this.show) {
      setTimeout(() => {
        this.show = false;
      }, this.delay);
    }
    return html`
      <div
        class="toast sgds show ${classMap({
          [`is-${this.variant}`]: this.variant,
          [`bg-${this.bg}`]: this.bg,
          [`is-${this.status}`]: this.status,
          [`${this.toastClasses}`]: this.toastClasses
        })}"
        role="alert"
        aria-hidden=${this.show ? "false" : "true"}
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-header">
          <slot name="icon"></slot>
          <strong class="me-auto">${this.title}</strong>
          <small class="text-muted me-2"><slot name="duration"></slot></small>
          <sgds-closebutton
            closeLabel="Close the Toast"
            @click=${this.handleCloseClick}
            data-dismiss="toast"
          ></sgds-closebutton>
        </div>
        <div class="toast-body"><slot></slot></div>
      </div>
    `;
  }
}

export type ToastVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "dark" | "light";

export default SgdsToast;

setDefaultAnimation("toast.show", {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  options: { duration: 400, easing: "ease" }
});
setDefaultAnimation("toast.hide", {
  keyframes: [{ opacity: 1 }, { opacity: 0 }],
  options: { duration: 400, easing: "ease" }
});
