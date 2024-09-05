import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { html, nothing } from "lit";
import { property, query } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import { setDefaultAnimation } from "../../utils/animation-registry";
import { watch } from "../../utils/watch";
import SgdsCloseButton from "../../internals/CloseButton/sgds-close-button";
import toastStyle from "./toast.css";
/**
 * @summary Toast allows you to convey quick messaging notifications to the user.
 *
 * @slot default - The content to pass into toast's body
 * @slot icon - The slot to pass in icon to toast's header
 * @slot duration - When required, pass in the duration since toast appeared to this slot
 *
 *
 * @event sgds-show - Emitted on show.
 * @event sgds-hide - Emitted on hide.

 *
 * @cssproperty --sgds-toast-border-radius - The border radius of toast

 */
export class SgdsToast extends ScopedElementsMixin(SgdsElement) {
  static styles = [...SgdsElement.styles, toastStyle];
  /**@internal */
  static get scopedElements() {
    return {
      "sgds-close-button": SgdsCloseButton
    };
  }

  /**@internal */
  @query("div.toast") toast: HTMLElement;
  /** Controls the appearance of toast */
  @property({ type: Boolean, reflect: true }) show = false;
  /** The header title of toast. It is required to assign a title to toast */
  @property({ type: String, reflect: true }) title = "Title";
  /**Adds CSS styling to `<Toast />` based on the defined status */
  @property({ type: String, reflect: true }) variant: "success" | "warning" | "danger" | "info" = "info";
  /** Controls whether or not the Toast has a link */
  @property({ type: Boolean, reflect: true }) action = false;
  /** Controls whether or not the Toast is dismissible */
  @property({ type: Boolean, reflect: true }) dismissable = false;

  /** Closes the Toast  */
  public close() {
    this.show = false;
  }
  /**@internal */
  @watch("show")
  _handleShowChange() {
    this.show ? this.emit("sgds-show") : this.emit("sgds-hide");
  }

  render() {
    return this.show
      ? html`
          <div
            class="toast"
            role="alert"
            aria-hidden=${this.show ? "false" : "true"}
            aria-live="assertive"
            aria-atomic="true"
          >
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-airplane"
                viewBox="0 0 16 16"
              >
                <path
                  d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Zm.894.448C7.111 2.02 7 2.569 7 3v4a.5.5 0 0 1-.276.447l-5.448 2.724a.5.5 0 0 0-.276.447v.792l5.418-.903a.5.5 0 0 1 .575.41l.5 3a.5.5 0 0 1-.14.437L6.708 15h2.586l-.647-.646a.5.5 0 0 1-.14-.436l.5-3a.5.5 0 0 1 .576-.411L15 11.41v-.792a.5.5 0 0 0-.276-.447L9.276 7.447A.5.5 0 0 1 9 7V3c0-.432-.11-.979-.322-1.401C8.458 1.159 8.213 1 8 1c-.213 0-.458.158-.678.599Z"
                ></path>
              </svg>
            </i>
            <div class="toast-content">
              <div class="toast-body">
                <strong>${this.title}</strong>
                <slot></slot>
              </div>
              ${this.action ? html`<div class="toast-action"><slot name="action"></slot></div>` : nothing}
            </div>
            ${this.dismissable
              ? html`<sgds-close-button
                  class="close-btn"
                  ariaLabel="close toast"
                  @click=${this.close}
                ></sgds-close-button>`
              : nothing}
          </div>
        `
      : nothing;
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
