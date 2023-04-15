import { customElement, property, state, query} from "lit/decorators.js";
import { html, literal } from 'lit/static-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import {classMap} from 'lit/directives/class-map.js';
import SgdsElement from "../base/sgds-element";
import styles from "./sgds-breadcrumb.scss";
import type SgdsBreadcrumbItem from './sgds-breadcrumb-item';

@customElement("sgds-breadcrumb")
export class SgdsBreadcrumb extends SgdsElement {
    static styles = styles;

    @property({ type: String, reflect: true }) ariaLabel = "breadcrumb";

    @property({ reflect: true }) breadcrumbClasses? : string;

    @query('slot') defaultSlot: HTMLSlotElement;
    @query('slot[name="separator"]') separatorSlot: HTMLSlotElement;

    // Generates a clone of the separator element to use for each breadcrumb item
    private getSeparator() {
        const separator = this.separatorSlot.assignedElements({ flatten: true })[0] as HTMLElement;

        // Clone it, remove ids, and slot it
        const clone = separator.cloneNode(true) as HTMLElement;
        [clone, ...clone.querySelectorAll('[id]')].forEach(el => el.removeAttribute('id'));
        clone.setAttribute('data-default', '');
        clone.slot = 'separator';

        return clone;
    }

    private handleSlotChange() {
        const items = [...this.defaultSlot.assignedElements({ flatten: true })].filter(
          item => item.tagName.toLowerCase() === 'sgds-breadcrumb-item'
        ) as SgdsBreadcrumbItem[];
    
        items.forEach((item, index) => {
          // Append separators to each item if they don't already have one
          const separator = item.querySelector('[slot="separator"]');
          if (separator === null) {
            // No separator exists, add one
            item.append(this.getSeparator());
          } else if (separator.hasAttribute('data-default')) {
            // A default separator exists, replace it
            separator.replaceWith(this.getSeparator());
          } else {
            // The user provided a custom separator, leave it alone
          }
    
          // The last breadcrumb item is the "current page"
          
          if (index === items.length - 1) {
            console.log(items.length - 1)
            item.setAttribute('aria-current', 'page');
            
          } else {
            item.removeAttribute('aria-current');
          }
        });
      }

    render() {
        return html`
            <nav class="sgds breadcrumb
            ${classMap({
              [`${this.breadcrumbClasses}`]: this.breadcrumbClasses
            }
            )}" 
            aria-label=${this.ariaLabel}
            part="base"
            >
            <slot @slotchange=${this.handleSlotChange}></slot>
            </nav>
            <slot name="separator" hidden aria-hidden="true">
                <span class="sgds-breadcrumb-seperator"></span>
            </slot>
        `
    }
}

export default SgdsBreadcrumb;