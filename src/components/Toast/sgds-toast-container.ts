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

@customElement("sgds-toast-container")
export class SgdsToastContainer extends SgdsElement {
  static styles = [SgdsElement.styles, styles];

  /** The toast variant. */
  @property({ type: String, reflect: true }) position: ToastPosition;

  render() {
    return html`
      <div
        class=${classMap({
          "sgds toast-container": true,
          [`position-absolute ${positionClasses[this.position]}`]: this.position
        })}
      >
        <slot></slot>
      </div>
    `;
  }
}

export default SgdsToastContainer;
