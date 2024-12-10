import { SgdsBreadcrumb } from "./sgds-breadcrumb";
import { SgdsBreadcrumbItem } from "./sgds-breadcrumb-item";
import { register } from "../../utils/ce-registry";

register("sgds-breadcrumb", SgdsBreadcrumb);
register("sgds-breadcrumb-item", SgdsBreadcrumbItem);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-breadcrumb-item": SgdsBreadcrumbItem;
    "sgds-breadcrumb": SgdsBreadcrumb;
  }
}
