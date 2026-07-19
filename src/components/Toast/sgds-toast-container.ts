import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import toastContainerStyle from "./toast-container.css";
/**
 * @summary ToastContainer is the container component to position `sgds-toast` in screen. When there is multiple toasts in the container, the toast components are stacked vertically.
 *
 * @slot default - The slot for `sgds-toast` elements
 *
 */
export class SgdsToastContainer extends SgdsElement {
  static styles = [toastContainerStyle];

  /**
   * Controls the position of `sgds-toast` within itself.
   * Since 3.7.1, the positions "top-start", "middle-start", "middle-center", and "middle-end" are deprecated.
   */
  @property({ type: String, reflect: true }) position: ToastPosition;

  @query("slot") private _slot: HTMLSlotElement;

  private _pendingHides = new WeakSet<HTMLElement>();
  private _hovered = false;

  private _pointerMoveHandler = (e: PointerEvent) => this._checkPointerInBounds(e);

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("sgds-show", () => this._updateStackLayout());
    this.addEventListener("sgds-after-hide", () => this._updateStackLayout());
    this.addEventListener("pointerenter", () => this._handleMouseEnter());
  }

  firstUpdated() {
    this._slot?.addEventListener("slotchange", () => this._updateStackLayout());
    this._updateStackLayout();
  }

  private _handleMouseEnter() {
    if (this._hovered) return;
    this._hovered = true;
    this.setAttribute("hovered", "");
    const toasts = this._getSlottedToasts().filter(t => t.hasAttribute("show"));
    toasts.forEach(toast => (toast as any).pauseAutohide?.());
    this._updateStackLayout();
    document.addEventListener("pointermove", this._pointerMoveHandler);
  }

  private _handleMouseLeave() {
    this._hovered = false;
    this.removeAttribute("hovered");
    document.removeEventListener("pointermove", this._pointerMoveHandler);
    const toasts = this._getSlottedToasts().filter(t => t.hasAttribute("show"));
    toasts.forEach(toast => (toast as any).resumeAutohide?.());
    this._updateStackLayout();
  }

  private _checkPointerInBounds(e: PointerEvent) {
    const toasts = this._getSlottedToasts().filter(t => t.hasAttribute("show"));
    if (toasts.length === 0) {
      this._handleMouseLeave();
      return;
    }
    // Get bounding rect that covers all visible toasts
    let top = Infinity,
      bottom = -Infinity,
      left = Infinity,
      right = -Infinity;
    toasts.forEach(toast => {
      const rect = toast.getBoundingClientRect();
      top = Math.min(top, rect.top);
      bottom = Math.max(bottom, rect.bottom);
      left = Math.min(left, rect.left);
      right = Math.max(right, rect.right);
    });
    // Add some padding for comfort
    const padding = 8;
    if (
      e.clientX < left - padding ||
      e.clientX > right + padding ||
      e.clientY < top - padding ||
      e.clientY > bottom + padding
    ) {
      this._handleMouseLeave();
    }
  }

  private _getSlottedToasts(): HTMLElement[] {
    if (!this._slot) return [];
    return this._slot.assignedElements().filter(el => el.tagName.toLowerCase() === "sgds-toast") as HTMLElement[];
  }

  private _updateStackLayout() {
    requestAnimationFrame(() => {
      const toasts = this._getSlottedToasts();
      const visibleToasts = toasts.filter(t => t.hasAttribute("show"));
      const isTop = this.position?.startsWith("top");
      const maxVisible = 3;
      const totalVisible = visibleToasts.length;

      if (this._hovered) {
        const gap = 12;
        visibleToasts.forEach((toast, index) => {
          const stackPosition = totalVisible - 1 - index;
          toast.style.zIndex = `${totalVisible - stackPosition}`;

          let offsetY = 0;
          for (let i = totalVisible - 1; i > index; i--) {
            offsetY += visibleToasts[i].offsetHeight + gap;
          }
          const direction = isTop ? 1 : -1;
          toast.style.transform = `scale(1) translateY(${offsetY * direction}px)`;
          toast.style.opacity = "1";
        });
        return;
      }

      // Collapsed: overlapping stack
      const toastHeight = totalVisible > 0 ? visibleToasts[totalVisible - 1].offsetHeight : 0;
      const peekAmount = Math.round(toastHeight * 0.25);

      visibleToasts.forEach((toast, index) => {
        const stackPosition = totalVisible - 1 - index; // 0 = newest

        toast.style.zIndex = `${totalVisible - stackPosition}`;

        const scale = 1 - stackPosition * 0.05;
        const offsetY = stackPosition * peekAmount;
        const direction = isTop ? 1 : -1;
        toast.style.transform = `scale(${scale}) translateY(${offsetY * direction}px)`;
        toast.style.opacity = stackPosition >= maxVisible ? "0" : "";

        // After CSS transition fades it out, actually hide it
        if (stackPosition >= maxVisible && !this._pendingHides.has(toast)) {
          this._pendingHides.add(toast);
          const onTransitionEnd = () => {
            toast.removeEventListener("transitionend", onTransitionEnd);
            this._pendingHides.delete(toast);
            if (toast.hasAttribute("show")) {
              (toast as any)._overflowHide = true;
              (toast as any).hideToast();
            }
          };
          toast.addEventListener("transitionend", onTransitionEnd);
        }
      });
    });
  }

  render() {
    return html`
      <div
        class=${classMap({
          "toast-container": true,
          [this.position]: this.position
        })}
      >
        <slot></slot>
      </div>
    `;
  }
}

export type ToastPosition =
  | "top-start"
  | "top-center"
  | "top-end"
  | "middle-start"
  | "middle-center"
  | "middle-end"
  | "bottom-start"
  | "bottom-center"
  | "bottom-end";

export default SgdsToastContainer;
