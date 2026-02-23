import { createContext } from "@lit/context";
import { SidebarElement } from "../../base/sidebar-element";

/**
 * Context providing the currently active sidebar group (parent with nested children).
 * Consumed by all sidebar child elements to determine visibility and state.
 * Value is null when no group drawer is open.
 * @type {SidebarElement | null}
 */
export const SidebarActiveGroup = createContext<SidebarElement | null>("sidebar-active-group");

/**
 * Context providing the name of the currently selected/active sidebar item.
 * Consumed by all sidebar child elements for styling and state management.
 * @type {string}
 */
export const SidebarActiveItem = createContext<string>("sidebar-active");

/**
 * Context indicating whether the sidebar is in collapsed (icon-only) state.
 * When true, sidebar shows only icons and tooltips; when false, shows full labels.
 * Consumed by all sidebar child elements to adjust their layout.
 * @type {boolean}
 */
export const SidebarCollapsed = createContext<boolean>("sidebar-collapsed");

/**
 * Context providing the array of drawer items currently displayed in the sidebar overlay.
 * Updated when group drawers open/close to show nested children.
 * @type {SidebarElement[]}
 */
export const SidebarDrawerItems = createContext<SidebarElement[]>("sidebar-drawer-items");
