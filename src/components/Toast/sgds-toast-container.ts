import { customElement, property } from "lit/decorators.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import styles from "./sgds-toast-container.scss";
import { classMap } from "lit/directives/class-map.js";
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

const positionClasses = {
  "top-start": "top-0 start-0",
  "top-center": "top-0 start-50 translate-middle-x",
  "top-end": "top-0 end-0",
  "middle-start": "top-50 start-0 translate-middle-y",
  "middle-center": "top-50 start-50 translate-middle",
  "middle-end": "top-50 end-0 translate-middle-y",
  "bottom-start": "bottom-0 start-0",
  "bottom-center": "bottom-0 start-50 translate-middle-x",
  "bottom-end": "bottom-0 end-0"
};

/**
 * @summary ToastContainer is the container component to position `sgds-toast` in screen. When there is multiple toasts in the container, the toast components are stacked vertically.
 *
 * @slot default - The slot for `sgds-toast` elements
 *
 * @cssproperty --toast-container-slot-elements-gap - The gap between multiple `sgds-toast` elements
 */
@customElement("sgds-toast-container")
export class SgdsToastContainer extends SgdsElement {
  static styles = [SgdsElement.styles, styles];

  /** Controls the position of `sgds-toast` within itself. When specified, toast container becomes position-absolute */
  @property({ type: String, reflect: true }) position: ToastPosition;

  render() {
    return html`
      <div
        class=${classMap({
          "sgds toast-container": true,
          [`position-absolute`]: this.position,
          [`${positionClasses[this.position]}`]: this.position
        })}
      >
        <slot></slot>
      </div>
    `;
  }
}

export default SgdsToastContainer;
