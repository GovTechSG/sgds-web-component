import { SgdsBreadcrumb } from "./sgds-breadcrumb";
import { SgdsBreadcrumbItem } from "./sgds-breadcrumb-item";

//sideEffect
customElements.define("sgds-breadcrumb", SgdsBreadcrumb);
customElements.define("sgds-breadcrumb-item", SgdsBreadcrumbItem);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-breadcrumb-item": SgdsBreadcrumbItem;
    "sgds-breadcrumb": SgdsBreadcrumb;
  }
}
