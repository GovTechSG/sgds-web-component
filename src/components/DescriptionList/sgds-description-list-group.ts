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
 * @slot subtitle - Slot for the subtitle content
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
  private readonly hasSlotController = new HasSlotController(this, "title", "subtitle");

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "list");
    this.updateComplete.then(() => {
      this._updateDescriptionLists();
    });
  }

  private _updateDescriptionLists() {
    if (!this._descriptionLists) return;
    this._descriptionLists.forEach(descriptionList => {
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
    const hasSubtitleSlot = this.hasSlotController.test("subtitle");
    return html`
      <div class="description-list-group" part="base">
        ${hasTitleSlot || hasSubtitleSlot
          ? html`
              <div class="description-list-group__header">
                ${hasTitleSlot
                  ? html` <div class="description-list-group__title">
                      <slot name="title"></slot>
                    </div>`
                  : nothing}
                ${hasSubtitleSlot
                  ? html`
                      <div class="description-list-group__subtitle">
                        <slot name="subtitle"></slot>
                      </div>
                    `
                  : nothing}
              </div>
            `
          : nothing}
        <div class="description-list-group__content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

export default SgdsDescriptionListGroup;
