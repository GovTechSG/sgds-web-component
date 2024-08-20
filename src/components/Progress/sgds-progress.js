import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import { html } from "lit";
import progressStyle from "./progress.css";
import bgStyles from "../../styles/bg-variants.css";
/**
 * @summary Provide up-to-date feedback on the progress of a workflow or action with simple yet flexible progress bars.
 * @slot default - slot for progress-bar
 *
 * @cssprop --sgds-progress-bg - Sets the background color of the progress wrapper.
 * @cssprop --sgds-progress-border-radius - Sets the border radius of the progress wrapper.
 * @cssprop --sgds-progress-height - Sets the height of the progress wrapper.
 */
export class SgdsProgress extends SgdsElement {
    render() {
        return html `
      <div
        class=${classMap({
            progress: true
        })}
      >
        <slot></slot>
      </div>
    `;
    }
}
SgdsProgress.styles = [...SgdsElement.styles, bgStyles, progressStyle];
export default SgdsProgress;
//# sourceMappingURL=sgds-progress.js.map