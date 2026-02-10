import { SgdsSidebar } from "./sgds-sidebar";
import { SgdsSidebarGroup } from "./sgds-sidebar-group";
import { SgdsSidebarItem } from "./sgds-sidebar-item";
import { SgdsSidebarSection } from "./sgds-sidebar-section";

customElements.define("sgds-sidebar", SgdsSidebar);
customElements.define("sgds-sidebar-item", SgdsSidebarItem);
customElements.define("sgds-sidebar-section", SgdsSidebarSection);
customElements.define("sgds-sidebar-group", SgdsSidebarGroup);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-sidebar": SgdsSidebar;
    "sgds-sidebar-item": SgdsSidebarItem;
    "sgds-sidebar-section": SgdsSidebarSection;
    "sgds-sidebar-group": SgdsSidebarGroup;
  }
}
