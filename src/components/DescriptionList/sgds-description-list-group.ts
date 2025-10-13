import { html, PropertyValues } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { property, queryAssignedElements } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import { HasSlotController } from "../../utils/slot";
import descriptionListGroupStyle from "./description-list-group.css";

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

  /** Used only for SSR to indicate the presence of the `title` slot. */
  @property({ type: Boolean }) hasTitleSlot = false;

  /** Used only for SSR to indicate the presence of the `description` slot. */
  @property({ type: Boolean }) hasDescriptionSlot = false;

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

    if (!this.hasTitleSlot) this.hasTitleSlot = this.hasSlotController.test("title");
    if (!this.hasDescriptionSlot) this.hasDescriptionSlot = this.hasSlotController.test("description");
  }

  render() {
    return html`
      <div class="container">
        <div
          class="${classMap({
            header: true,
            "has-header": this.hasTitleSlot || this.hasDescriptionSlot
          })}"
        >
          <slot name="title"></slot>
          <slot name="description"></slot>
        </div>
        <div>
          <slot></slot>
        </div>
      </div>
    `;
  }
}

export default SgdsDescriptionListGroup;
