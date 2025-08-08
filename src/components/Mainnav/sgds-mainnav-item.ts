import { html } from "lit";
import { property } from "lit/decorators.js";
import { watch } from "../../utils/watch";
import SgdsElement from "../../base/sgds-element";
import mainnavItemStyle from "./mainnav-item.css";

/**
 * @slot default - slot for SgdsMainnavItem element.
 *
 *  */
export class SgdsMainnavItem extends SgdsElement {
  static styles = [...SgdsElement.styles, mainnavItemStyle];

  /** when true, sets the active stylings of the navigation item */
  @property({ type: Boolean, reflect: true })
  active = false;

  /** Disables the SgdsMainnavItem */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  @watch("disabled")
  _handleDisabled() {
    this.setAttribute("aria-disabled", `${this.disabled}`);
  }

  private _handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const assignedElements = slot.assignedElements({ flatten: true });
    const anchorItems = assignedElements.filter(
      item => item.tagName.toLowerCase() === "a" || item.tagName.toLowerCase() === "sgds-link"
    );

    if (anchorItems.length > 1) {
      console.error("More than one anchor tag is added to sgds-mainnav-item");
      return;
    }

    if (anchorItems.length === 0) {
      const nodes = slot.assignedNodes({ flatten: true });
      nodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          const hyperlink = document.createElement("a");
          hyperlink.textContent = node.textContent;
          node.parentNode.replaceChild(hyperlink, node);
        }
      });
    }

    if (anchorItems.length === 1) {
      const anchor = anchorItems[0] as HTMLAnchorElement;

      if (this.active) {
        anchor.setAttribute("aria-current", "true");
      }

      if (this.disabled) {
        anchor.setAttribute("href", "javascript:void(0)");
        anchor.setAttribute("tabindex", "-1");
      }
    }
  }

  render() {
    return html`<slot @slotchange=${this._handleSlotChange}></slot>`;
  }
}

export default SgdsMainnavItem;
