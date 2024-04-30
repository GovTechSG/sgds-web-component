import { LitElement } from "lit";
import style from "./sgds-element.style";
/**
 * @cssprop --sgds-{stateColor} - State colors in hexadecimal value
 * @cssprop --sgds-{stateColor}-rgb - State colors in rgb value
 * @cssprop --sgds-{stateColor}-{weights} - State colors with different weightage in hexadecimal value
 * @cssprop --sgds-gray-{weights} - State colors with different weightage in hexadecimal value
 * @cssprop --overlay-background-color - The drawer and modal component overlay background color
 * @cssprop --zindex-modal - The drawer and modal component z-index value
 */

export default class SgdsElement extends LitElement {
  static styles = [style];
  /** Emits a custom event with more convenient defaults. */
  emit(name: string, options?: CustomEventInit) {
    const event = new CustomEvent(name, {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {},
      ...options
    });

    this.dispatchEvent(event);

    return event;
  }
}
