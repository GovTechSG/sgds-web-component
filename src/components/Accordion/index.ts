import { SgdsAccordion } from "./sgds-accordion";
import { SgdsAccordionItem } from "./sgds-accordion-item";

//sideEffect
customElements.define("sgds-accordion", SgdsAccordion);
customElements.define("sgds-accordion-item", SgdsAccordionItem);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-accordion-item": SgdsAccordionItem;
    "sgds-accordion": SgdsAccordion;
  }
}
