import { LitElement } from "lit";
import style from "./sgds-element.css";
/**
 * @cssprop --sgds-{stateColor} - State colors in hexadecimal value
 * @cssprop --sgds-{stateColor}-rgb - State colors in rgb value
 * @cssprop --sgds-{stateColor}-{weights} - State colors with different weightage in hexadecimal value
 * @cssprop --sgds-gray-{weights} - State colors with different weightage in hexadecimal value
 * @cssprop --overlay-background-color - The drawer and modal component overlay background color
 * @cssprop --zindex-modal - The drawer and modal component z-index value
 */
class SgdsElement extends LitElement {
    /** Emits a custom event with more convenient defaults. */
    emit(name, options) {
        const event = new CustomEvent(name, Object.assign({ bubbles: true, cancelable: false, composed: true, detail: {} }, options));
        this.dispatchEvent(event);
        return event;
    }
}
SgdsElement.styles = [style];
export default SgdsElement;
//# sourceMappingURL=sgds-element.js.map