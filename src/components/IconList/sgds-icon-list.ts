import SgdsElement from "../../base/sgds-element";
import { html } from "lit";
import iconListStyles from "./icon-list.css";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
/**
 * @summary A IconList can be used to display content related to the same topic. Each list item begins an icon.
 *
 * @slot default - The list items of IconList. Each list items should have aria attribute role="list" added
 */
export class SgdsIconList extends SgdsElement {
  static styles = [...SgdsElement.styles, iconListStyles];

  /** Sets the aria-role of the sgds-icon-list */
  @property({ type: String, reflect: true }) role = "list";
  /** The size of icon list. Changes the font-size the list items */
  @property({ type: String, reflect: true }) size: "sm" | "md" | "lg" = "md";

  render() {
    return html`
      <div class=${classMap({ [this.size]: this.size })}>
        <slot></slot>
      </div>
    `;
  }
}

export default SgdsIconList;
