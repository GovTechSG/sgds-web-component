import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { html, nothing } from "lit";
import { property, query, queryAssignedNodes } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import SgdsCloseButton from "../../internals/CloseButton/sgds-close-button";
import { animateTo } from "../../utils/animate";
import { getAnimation, setDefaultAnimation } from "../../utils/animation-registry";
import { waitForEvent } from "../../utils/event";
import { watch } from "../../utils/watch";
import toastStyle from "./toast.css";
/**
 * @summary Toast allows you to convey quick messaging notifications to the user.
 *
 * @slot default - The content to pass into toast's body 
 * @slot action - The content to pass into toast's action  
 * 
 *
 * @event sgds-show - Emitted on show.
 * @event sgds-after-show - Emitted on show after animation has completed.
 * @event sgds-hide - Emitted on hide.
 * @event sgds-after-hide - Emitted on hide after animation has completed.
 
 * @cssproperty --toast-icon-margin-right - The margin right between toast's icon and title in its header.
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
  /** Controls whether the toast has fade animation during its appearance/disappearance */
  @property({ type: Boolean, reflect: true }) noAnimation = false;
  /** Controls if the toast will hide itself after the delay time. Works with delay property */
  @property({ type: Boolean, reflect: true }) autohide = false;
  /** The amount of time taken in miliseconds for toast to disappear after its first render. It takes effect only when autohide is set to true. Defaults to 5000ms */
  @property({ type: Number, reflect: true }) delay = 5000;
  /**The variant styles of toast */
  @property({ type: String, reflect: true }) variant: "success" | "warning" | "danger" | "info" = "info";
  /** Controls whether or not the Toast is dismissible */
  @property({ type: Boolean, reflect: true }) dismissable = false;

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
      this.toast.classList.remove("d-none");
      const toastAnimation = getAnimation(this, "toast.show");

      if (!this.noAnimation) {
        await animateTo(this.toast, toastAnimation.keyframes, toastAnimation.options);
      }

      this.emit("sgds-after-show");
    } else {
      this.emit("sgds-hide");

      const toastAnimation = getAnimation(this, "toast.hide");
      if (!this.noAnimation) {
        await animateTo(this.toast, toastAnimation.keyframes, toastAnimation.options);
      }
      this.toast.classList.add("d-none");

      this.emit("sgds-after-hide");
    }
  }

  protected firstUpdated(): void {
    if (!this.show) {
      this.toast.classList.add("d-none");
    }

    if (this._actionNodes.length === 0) {
      return this.shadowRoot.querySelector("slot[name='action']")?.classList.add("d-none");
    }
  }

  @queryAssignedNodes({ slot: "action", flatten: true })
  _actionNodes!: Array<Node>;

  render() {
    if (this.autohide && this.show) {
      setTimeout(() => {
        this.show = false;
      }, this.delay);
    }
    return html`
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
          <slot class="toast-action" name="action"></slot>
        </div>
        ${this.dismissable
          ? html`<sgds-close-button
              class="close-btn"
              ariaLabel="close toast"
              @click=${this.handleCloseClick}
            ></sgds-close-button>`
          : nothing}
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
