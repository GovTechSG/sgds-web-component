import { html, nothing, PropertyValues } from "lit";
import { property, queryAssignedElements } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import descriptionListGroupStyle from "./description-list-group.css";
import { HasSlotController } from "../../utils/slot";

/**
 * @summary Description List Group organizes multiple description lists.
 *
 * @slot default - The slot for `description-list` components
 * @slot title - Slot for the title content
 * @slot description - Slot for the description content
 *
 */
export class SgdsDescriptionListGroup extends SgdsElement {
  static styles = [...SgdsElement.styles, descriptionListGroupStyle];

  /** When true, adds a border around the entire group. */
  @property({ type: Boolean, reflect: true }) bordered = false;

  /** When true, the description lists are displayed in a stacked layout. */
  @property({ type: Boolean, reflect: true }) stacked = false;

  @queryAssignedElements({ flatten: true })
  private _descriptionLists!: HTMLElement[];

  /** @internal */
  private readonly hasSlotController = new HasSlotController(this, "title", "description");

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "list");
    this.updateComplete.then(() => {
      this._updateDescriptionLists();
    });
  }

  private _updateDescriptionLists() {
    if (!this._descriptionLists) return;
    this._descriptionLists.forEach((descriptionList, index) => {
      if (this.stacked) {
        descriptionList.setAttribute("stacked", "");
      } else {
        descriptionList.removeAttribute("stacked");
      }
      if (this.bordered) {
        descriptionList.setAttribute("bordered", "");
      } else {
        descriptionList.removeAttribute("bordered");
      }

      if (index === this._descriptionLists.length - 1) {
        descriptionList.setAttribute("isLastChild", "");
      }
    });
  }

  protected updated(_changedProperties: PropertyValues) {
    if (_changedProperties.has("stacked")) {
      this._updateDescriptionLists();
    }
    if (_changedProperties.has("bordered")) {
      this._updateDescriptionLists();
    }
  }

  render() {
    const hasTitleSlot = this.hasSlotController.test("title");
    const hasDescriptionSlot = this.hasSlotController.test("description");
    return html`
      <div class="container" part="base">
        ${hasTitleSlot || hasDescriptionSlot
          ? html`
              <div class="header">
                ${hasTitleSlot
                  ? html` <div class="title">
                      <slot name="title"></slot>
                    </div>`
                  : nothing}
                ${hasDescriptionSlot
                  ? html`
                      <div class="description">
                        <slot name="description"></slot>
                      </div>
                    `
                  : nothing}
              </div>
            `
          : nothing}
        <div>
          <slot></slot>
        </div>
      </div>
    `;
  }
}

export default SgdsDescriptionListGroup;
