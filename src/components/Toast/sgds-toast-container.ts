import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import toastContainerStyle from "./toast-container.css";
/**
 * @summary ToastContainer is the container component to position `sgds-toast` in screen. When there is multiple toasts in the container, the toast components are stacked vertically.
 *
 * @slot default - The slot for `sgds-toast` elements
 *
 * @cssproperty --sgds-toast-container-slot-elements-gap - The gap between multiple `sgds-toast` elements. Defaults to 0.5rem
 */
export class SgdsToastContainer extends SgdsElement {
  static styles = [toastContainerStyle];

  /** Controls the position of `sgds-toast` within itself. When specified, toast container becomes position-absolute */
  @property({ type: String, reflect: true }) position: ToastPosition;

  render() {
    return html`
      <div
        class=${classMap({
          "sgds toast-container": true,
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
