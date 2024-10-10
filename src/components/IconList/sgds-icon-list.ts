import SgdsElement from "../../base/sgds-element";
import { html } from "lit";
import iconListStyles from "./icon-list.css";
import { property } from "lit/decorators.js";
/**
 * @summary A IconList can be used to display content related to the same topic. Each list item begins an icon.
 *
 * @slot default - The list items of IconList. Each list items should have aria attribute role="list" added
 */
export class SgdsIconList extends SgdsElement {
  static styles = [...SgdsElement.styles, iconListStyles];

  @property({ type: String, reflect: true }) role = "list";

  render() {
    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }
}

export default SgdsIconList;
