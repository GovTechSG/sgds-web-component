import { SgdsAccordion } from "./sgds-accordion";
import { SgdsAccordionItem } from "./sgds-accordion-item";
import registerCustomElement from "../../utils/registerCustomElement";

//sideEffect
registerCustomElement([SgdsAccordion, SgdsAccordionItem]);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-accordion-item": SgdsAccordionItem;
    "sgds-accordion": SgdsAccordion;
  }
}
