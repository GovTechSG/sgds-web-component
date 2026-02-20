import { createContext } from "@lit/context";
import { SidebarElement } from "../../base/sidebar-element";

export const SidebarActiveGroup = createContext<SidebarElement | null>("sidebar-active-group");
export const SidebarActiveItem = createContext<string>("sidebar-active");
export const SidebarCollapsed = createContext<boolean>("sidebar-collpased");
export const SidebarDrawerItems = createContext<SidebarElement[]>("sidebar-drawer-items");
