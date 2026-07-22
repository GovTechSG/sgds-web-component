import { html, nothing, PropertyValueMap } from "lit";
import { property, query, queryAssignedNodes } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import SgdsCloseButton from "../CloseButton/sgds-close-button";
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
 * @slot icon - The icon in toast.
 *
 * @event sgds-show - Emitted on show.
 * @event sgds-after-show - Emitted on show after animation has completed.
 * @event sgds-hide - Emitted on hide.
 * @event sgds-after-hide - Emitted on hide after animation has completed.
 *
 */
export class SgdsToast extends SgdsElement {
  static styles = [...SgdsElement.styles, toastStyle];
  /**@internal */
  static dependencies = {
    "sgds-close-button": SgdsCloseButton
  };
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
  @property({ type: Boolean, reflect: true }) dismissible = false;

  /** @internal Used by toast-container to trigger a simple fade-out for overflow hides */
  _overflowHide = false;

  /** @internal Used by toast-container to pause autohide on hover */
  private _autohideTimer: ReturnType<typeof setTimeout> | null = null;
  private _autohideRemaining = 0;
  private _autohideStart = 0;

  /** @internal Pause autohide countdown */
  pauseAutohide() {
    if (this._autohideTimer) {
      clearTimeout(this._autohideTimer);
      this._autohideTimer = null;
      this._autohideRemaining -= Date.now() - this._autohideStart;
    }
  }

  /** @internal Resume autohide countdown */
  resumeAutohide() {
    if (this.autohide && this.show && this._autohideRemaining > 0 && !this._autohideTimer) {
      this._startAutohideTimer(this._autohideRemaining);
    }
  }

  private _startAutohideTimer(duration: number) {
    this._autohideRemaining = duration;
    this._autohideStart = Date.now();
    this._autohideTimer = setTimeout(() => {
      this._autohideTimer = null;
      this.show = false;
    }, duration);
  }

  private _clearAutohideTimer() {
    if (this._autohideTimer) {
      clearTimeout(this._autohideTimer);
      this._autohideTimer = null;
    }
  }

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

  /** @internal */
  private getPositionDirection(): "Top" | "Bottom" {
    const container = this.closest("sgds-toast-container");
    const position = container?.getAttribute("position") || "";
    if (position.startsWith("top")) return "Top";
    return "Bottom";
  }
  /**@internal */
  @watch("show", { waitUntilFirstUpdate: true })
  async handleShowChange() {
    const direction = this.getPositionDirection();

    if (this.show) {
      this.emit("sgds-show");
      this.toast.classList.remove("d-none");
      this.style.height = "";
      this.style.overflow = "";

      const showAnimation = getAnimation(this, `toast.show${direction}`) || getAnimation(this, "toast.show");

      if (!this.noAnimation) {
        await animateTo(this.toast, showAnimation.keyframes, showAnimation.options);
      }

      this.emit("sgds-after-show");

      if (this.autohide) {
        this._startAutohideTimer(this.delay);
      }
    } else {
      this._clearAutohideTimer();
      this.emit("sgds-hide");

      if (this._overflowHide) {
        this._overflowHide = false;
        this.toast.classList.add("d-none");
        this.style.height = "0px";
        this.style.overflow = "hidden";
      } else {
        const hideAnimation = getAnimation(this, `toast.hide${direction}`) || getAnimation(this, "toast.hide");

        if (!this.noAnimation) {
          await animateTo(this.toast, hideAnimation.keyframes, hideAnimation.options);
          this.toast.classList.add("d-none");
          // Collapse host height for smooth restacking
          const currentHeight = this.offsetHeight;
          if (currentHeight > 0) {
            await animateTo(
              this,
              [
                { height: `${currentHeight}px`, overflow: "hidden" },
                { height: "0px", overflow: "hidden" }
              ],
              { duration: 300, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
            );
          }
        } else {
          this.toast.classList.add("d-none");
        }

        this.style.height = "";
        this.style.overflow = "";
      }

      this.emit("sgds-after-hide");
    }
  }

  protected firstUpdated(changedProperties: PropertyValueMap<this>): void {
    super.firstUpdated(changedProperties);

    if (!this.show) {
      this.toast.classList.add("d-none");
    }

    if (this.show && this.autohide) {
      this._startAutohideTimer(this.delay);
    }

    if (this._actionNodes.length === 0) {
      return this.shadowRoot.querySelector("slot[name='action']")?.classList.add("d-none");
    }
  }

  @queryAssignedNodes({ slot: "action", flatten: true })
  private _actionNodes!: Array<Node>;

  render() {
    return html`
      <div
        class="toast"
        role="alert"
        aria-hidden=${this.show ? "false" : "true"}
        aria-live="assertive"
        aria-atomic="true"
      >
        <slot name="icon"></slot>
        <div class="toast-content">
          <div class="toast-body">
            <div class="toast-body__title">${this.title}</div>
            <span class="toast-body__message"><slot></slot></span>
          </div>
          <slot class="toast-action" name="action"></slot>
        </div>
        ${this.dismissible
          ? html`<sgds-close-button
              class="close-btn"
              aria-label="close toast"
              @click=${this.handleCloseClick}
            ></sgds-close-button>`
          : nothing}
      </div>
    `;
  }
}

export default SgdsToast;

// Fallback (no container) — slides up
setDefaultAnimation("toast.show", {
  keyframes: [
    { opacity: 0, translate: "0 48px" },
    { opacity: 1, translate: "0 0" }
  ],
  options: { duration: 400, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
});
setDefaultAnimation("toast.hide", {
  keyframes: [
    { opacity: 1, translate: "0 0" },
    { opacity: 0, translate: "0 48px" }
  ],
  options: { duration: 400, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
});

// Top positions: slide down on show, slide up on hide
setDefaultAnimation("toast.showTop", {
  keyframes: [
    { opacity: 0, translate: "0 -48px" },
    { opacity: 1, translate: "0 0" }
  ],
  options: { duration: 400, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
});
setDefaultAnimation("toast.hideTop", {
  keyframes: [
    { opacity: 1, translate: "0 0" },
    { opacity: 0, translate: "0 -48px" }
  ],
  options: { duration: 400, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
});

// Bottom positions: slide up on show, slide down on hide
setDefaultAnimation("toast.showBottom", {
  keyframes: [
    { opacity: 0, translate: "0 48px" },
    { opacity: 1, translate: "0 0" }
  ],
  options: { duration: 400, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
});
setDefaultAnimation("toast.hideBottom", {
  keyframes: [
    { opacity: 1, translate: "0 0" },
    { opacity: 0, translate: "0 48px" }
  ],
  options: { duration: 400, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
});
