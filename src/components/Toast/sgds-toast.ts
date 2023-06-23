import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import styles from "./sgds-toast.scss";
import { setDefaultAnimation, getAnimation } from "../../utils/animation-registry";
import { watch } from "../../utils/watch";
import { animateTo } from "../../utils/animate";

export type ToastVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "dark" | "light";

@customElement("sgds-toast")
export class SgdsToast extends SgdsElement {
  static styles = [SgdsElement.styles, styles];
  /**@internal */
  @query("div.toast") toast: HTMLElement;

  @property({ type: Boolean, reflect: true }) show = true;
  @property({ type: String, reflect: true }) title = "Title";

  /**
   * Apply a CSS fade transition to the toast
   */
  @property({ type: Boolean, reflect: true }) noAnimation = false;

  @property({ type: Boolean, reflect: true }) autohide = false;

  @property({ type: Number, reflect: true }) delay = Infinity;

  @property({ type: String, reflect: true }) variant: ToastVariant;
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
  @property({ type: String, reflect: true }) status?: "success" | "warning" | "danger";

  handleCloseClick() {
    this.show = false;
    this.emit("sgds-close");
  }
  /**@internal */
  @watch("show", { waitUntilFirstUpdate: true })
  async handleShowChange() {
    if (this.show) {
      this.emit("sgds-show");
      this.toast.hidden = false;

      const toastAnimation = getAnimation(this, "toast.show");
      !this.noAnimation && (await animateTo(this.toast, toastAnimation.keyframes, toastAnimation.options));

      this.emit("sgds-after-show");
    } else {
      this.emit("sgds-hide");
      const toastAnimation = getAnimation(this, "toast.hide");

      !this.noAnimation && (await animateTo(this.toast, toastAnimation.keyframes, toastAnimation.options));
      this.emit("sgds-after-hide");
      this.toast.hidden = true;
    }
  }

  render() {
    if (this.autohide && this.delay < Infinity) {
      setTimeout(() => {
        this.show = false;
      }, this.delay);
    }
    return html`
      <div
        part="base"
        class="toast show sgds ${classMap({
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

export default SgdsToast;

setDefaultAnimation("toast.show", {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  options: { duration: 400, easing: "ease" }
});
setDefaultAnimation("toast.hide", {
  keyframes: [{ opacity: 1 }, { opacity: 0 }],
  options: { duration: 400, easing: "ease" }
});
