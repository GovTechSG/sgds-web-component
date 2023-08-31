import { SgdsBreadcrumb } from "./sgds-breadcrumb";
import { SgdsBreadcrumbItem } from "./sgds-breadcrumb-item";
import registerCustomElement from "../../utils/registerCustomElement";

//sideEffect
registerCustomElement([SgdsBreadcrumb, SgdsBreadcrumbItem]);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-breadcrumb-item": SgdsBreadcrumbItem;
    "sgds-breadcrumb": SgdsBreadcrumb;
  }
}
