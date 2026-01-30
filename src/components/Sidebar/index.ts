import { SgdsSidebar } from "./sgds-sidebar";
import { SgdsSidebarOption } from "./sgds-sidebar-option";
import { SgdsSidebarSection } from "./sgds-sidebar-section";

customElements.define("sgds-sidebar", SgdsSidebar);
customElements.define("sgds-sidebar-option", SgdsSidebarOption);
customElements.define("sgds-sidebar-section", SgdsSidebarSection);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-sidebar": SgdsSidebar;
    "sgds-sidebar-option": SgdsSidebarOption;
    "sgds-sidebar-section": SgdsSidebarSection;
  }
}
