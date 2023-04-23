import { customElement,property } from "lit/decorators.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../utils/sgds-element";
import { classMap } from "lit/directives/class-map.js";
import styles from "./sgds-spinner.scss";

export type Type =
  | "border"
  | "grow";

@customElement("sgds-spinner")
export class SgdsSpinner extends SgdsElement {
    static styles = styles;
    @property({ reflect: true }) type: Type = "border" ;
    @property({ reflect: true }) spinnerClasses?: string;
  render() {
    return html`
      <div
        class="
            ${classMap(
                {
                    [`spinner-${this.type}`]: this.type,
                    [`${this.spinnerClasses}`]: this.spinnerClasses,
                }
            )
        }"
        role="status"
      >
        <span class="sr-only">Loading...</span>
      </div>
    `;
  }
}

export default SgdsSpinner;