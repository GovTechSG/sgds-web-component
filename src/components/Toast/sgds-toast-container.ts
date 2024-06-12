import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import mergeDeep from "../../utils/mergeDeep";
import toastContainerStyle from "./toast-container.css";
/**
 * @summary ToastContainer is the container component to position `sgds-toast` in screen. When there is multiple toasts in the container, the toast components are stacked vertically.
 *
 * @slot default - The slot for `sgds-toast` elements
 *
 * @cssproperty --toast-container-slot-elements-gap - The gap between multiple `sgds-toast` elements. Defaults to 0.5rem
 */
export class SgdsToastContainer extends SgdsElement {
  static styles = [toastContainerStyle];

  /** Controls the position of `sgds-toast` within itself. When specified, toast container becomes position-absolute */
  @property({ type: String, reflect: true }) position: ToastPosition;

  render() {
    const generatePositionCssTokenObj = (position: ToastPosition) => {
      if (!position) return {};
      const arrayOfCssTokensObj = [
        positionClasses[position].top,
        positionClasses[position].start,
        positionClasses[position].translate
      ]
        .filter(cssToken => !!cssToken)
        .map(truthyCssToken => ({ [`${truthyCssToken}`]: true }));
      return Object.assign({}, ...arrayOfCssTokensObj);
    };
    return html`
      <div
        class=${classMap(
          mergeDeep(
            {
              "sgds toast-container": true
            },
            generatePositionCssTokenObj(this.position)
          )
        )}
      >
        <slot></slot>
      </div>
    `;
  }
}

const positionClasses = {
  "top-start": {
    top: "top-0",
    start: "start-50",
    translate: "translate-middle-x"
  },
  "top-center": {
    top: "top-0",
    start: "start-50",
    translate: "translate-middle-x"
  },
  "top-end": { top: "top-0", start: "end-0", translate: null },
  "middle-start": { top: "top-50", start: "start-0", translate: "translate-middle-y" },
  "middle-center": { top: "top-50", start: "start-50", translate: "translate-middle" },
  "middle-end": { top: "top-50", start: "end-0", translate: "translate-middle-y" },
  "bottom-start": { top: "bottom-0", start: "start-0", translate: null },
  "bottom-center": { top: "bottom-0", start: "start-50", translate: "translate-middle-x" },
  "bottom-end": { top: "bottom-0", start: "end-0", translate: null }
};

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
