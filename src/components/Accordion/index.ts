import { SgdsAccordion } from "./sgds-accordion";
import { SgdsAccordionItem } from "./sgds-accordion-item";
import { register } from "../../utils/ce-registry";

register("sgds-accordion", SgdsAccordion);
register("sgds-accordion-item", SgdsAccordionItem);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-accordion-item": SgdsAccordionItem;
    "sgds-accordion": SgdsAccordion;
  }
}
