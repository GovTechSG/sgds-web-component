import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import { html } from "lit";
import progressStyle from "./progress.css";
/**
 * @summary Provide up-to-date feedback on the progress of a workflow or action with simple yet flexible progress bars.
 * @slot default - slot for progress-bar
 *
 * @cssprop --progress-height - Sets the height of the progress wrapper.
 */

export class SgdsProgress extends SgdsElement {
  static styles = [progressStyle];

  render() {
    return html`
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

export default SgdsProgress;
