import { classMap } from "lit/directives/class-map.js";
import { html } from "lit";
import { customElement, property, queryAssignedNodes } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import styles from "./sgds-accordion.scss";
import type SgdsAccordionItem from "./sgds-accordion-item";

/**
 * @summary A dropdown mechanism that allow users to either show or hide related content.
 * @slot default - slot for accordion-item
 */
@customElement("sgds-accordion")
export class SgdsAccordion extends SgdsElement {
  static styles = styles;

  @property({ type: Boolean, reflect: true }) allowMultiple = false;

  @property({ reflect: true }) accordionClasses?: string;

  /** @internal */
  @queryAssignedNodes()
  private defaultNodes!: NodeListOf<SgdsAccordionItem>;

  /** @internal */
  get items(): SgdsAccordionItem[] {
    return [...(this.defaultNodes || [])].filter(
      (node: HTMLElement) => typeof node.tagName !== "undefined"
    ) as SgdsAccordionItem[];
  }

  firstUpdated() {
    const items = [...this.items] as SgdsAccordionItem[];
    items.forEach((item, index) => {
      if (items.length > 1) {
        switch (index) {
          case 0:
            item.setAttribute("first-of-type", "");
            break;

          case items.length - 1:
            item.setAttribute("last-of-type", "");
            break;

          default:
            item.setAttribute("nth-of-type", "");
        }
      }
    });
  }

  async onToggle(event: Event): Promise<void> {
    const target = event.target as SgdsAccordionItem;
    // Let the event pass through the DOM so that it can be
    // prevented from the outside if a user so desires.
    if (this.allowMultiple || event.defaultPrevented) {
      // No toggling when `allowMultiple` or the user prevents it.
      return;
    }
    const items = [...this.items] as SgdsAccordionItem[];

    if (items && !items.length) {
      // no toggling when there aren't items.
      return;
    }
    items.forEach(item => {
      if (item !== target) {
        // Close all the items that didn't dispatch the event.
        item.open = false;
      }
    });
  }

  render() {
    return html`
      <div
        class="
            ${classMap({
          "sgds accordion": true,
          [`${this.accordionClasses}`]: this.accordionClasses
        })}"
      >
        <slot @click=${this.onToggle}></slot>
      </div>
    `;
  }
}

export default SgdsAccordion;
