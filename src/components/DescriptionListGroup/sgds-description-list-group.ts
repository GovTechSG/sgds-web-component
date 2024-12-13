import { html, PropertyValues } from "lit";
import { property, queryAssignedElements } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import descriptionListGroupStyle from "./description-list-group.css";

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
  @property({ type: Boolean, reflect: true }) border = false;

  /** When true, the description lists are displayed in a stacked layout. */
  @property({ type: Boolean, reflect: true }) stacked = false;

  @queryAssignedElements({ slot: "", flatten: true })
  private _descriptionLists!: HTMLElement[];

  connectedCallback() {
    super.connectedCallback();
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
      if (this.border) {
        descriptionList.setAttribute("border", "");
      } else {
        descriptionList.removeAttribute("border");
      }
    });
  }

  protected updated(_changedProperties: PropertyValues) {
    if (_changedProperties.has("stacked")) {
      this._updateDescriptionLists();
    }
    if (_changedProperties.has("border")) {
      this._updateDescriptionLists();
    }
  }

  render() {
    return html`
      <div class="description-list-group" part="base">
        ${this.querySelector('[slot="title"]') || this.querySelector('[slot="subtitle"]')
          ? html`
              <div class="description-list-group__header">
                <div class="description-list-group__title">
                  <slot name="title"></slot>
                </div>
                <div class="description-list-group__subtitle">
                  <slot name="subtitle"></slot>
                </div>
              </div>
            `
          : ""}
        <div class="description-list-group__content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

export default SgdsDescriptionListGroup;
