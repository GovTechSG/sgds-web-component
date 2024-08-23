import { property, query } from "lit/decorators.js";
import { ScopedElementsMixin } from "@open-wc/scoped-elements/lit-element.js";
import { classMap } from "lit/directives/class-map.js";
import { html, nothing } from "lit";
import SgdsElement from "../../base/sgds-element";
import { setDefaultAnimation } from "../../utils/animation-registry";
import { waitForEvent } from "../../utils/event";
import { watch } from "../../utils/watch";
import toastStyle from "./toast.css";
import SgdsCloseButton from "../CloseButton/sgds-close-button";
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
        class="toast sgds show ${classMap({
          [`is-${this.variant}`]: this.variant
        })}"
        role="alert"
        aria-hidden=${this.show ? "false" : "true"}
        aria-live="assertive"
        aria-atomic="true"
      >
       <div class="toast-header">
        <slot name="icon"></slot>
        <strong>${this.title}</strong>
        ${this.dismissable
          ? html`<sgds-close-button ariaLabel="close toast" @click=${this.close}></sgds-close-button>`
          : nothing }
      </div>
      <div class="toast-body"><slot></slot></div>
      ${this.action
        ? html`<div class="toast-action"><slot name="action"></slot></div>`
        : nothing }
    </div>
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
