import { html } from "lit";
import { property } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import descriptionListStyle from "./description-list.css";

let id = 0;

/**
 *
 * @summary Description Lists are used with description list group as list components
 *
 * @slot default - The slot for the label
 * @slot data - The slot for the data
 */

export class SgdsDescriptionList extends SgdsElement {
  static styles = [...SgdsElement.styles, descriptionListStyle];
  private readonly attrId = ++id;
  private readonly componentId = `sgds-description-list-${this.attrId}`;

  /** Makes the label and the data stacked */
  @property({ type: Boolean, reflect: true }) stacked = false;

  /** Changes the border bottom styles for bordered description list group */
  @property({ type: Boolean, reflect: true }) bordered = false;

  connectedCallback() {
    super.connectedCallback();
    // If the user didn't provide an ID, we'll set one so we can link tabs and tab panels with aria labels

    this.id = this.id.length > 0 ? this.id : this.componentId;
    this.setAttribute("role", "listitem");
  }

  render() {
    return html`
      <div class="description-list" part="container">
        <div class="description-list__label-container" part="label-container">
          <span class="label" part="label">
            <slot></slot>
            <!-- Default slot for label -->
          </span>
        </div>
        <div class="description-list__value-container" part="value-container">
          <span class="value" part="value">
            <slot name="data"></slot>
            <!-- Slot for data -->
          </span>
        </div>
      </div>
    `;
  }
}

export default SgdsDescriptionList;
