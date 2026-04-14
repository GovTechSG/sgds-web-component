import { createContext } from "@lit/context";
import { SidebarElement } from "./sidebar-element";

/**
 * Context providing the currently active sidebar group (parent with nested children).
 * Stores the SidebarElement instance of the group whose drawer overlay is currently open.
 * Used to manage drawer visibility and determine which nested items to display.
 * Value is null when no group drawer is open.
 * @type {SidebarElement | null}
 */
export const SidebarActiveGroup = createContext<SidebarElement | null>("sidebar-active-group");

/**
 * Context providing the currently selected/active sidebar item element.
 * Stores the SidebarElement instance that is currently marked as active/selected.
 * Used to highlight and visually emphasize the selected navigation item.
 * Value is null when no item is selected.
 * @type {SidebarElement | null}
 */
export const SidebarActiveItem = createContext<SidebarElement | null>("sidebar-active");

/**
 * Context indicating whether the sidebar is in collapsed (icon-only) state.
 * When true, sidebar displays only icons and uses tooltips for labels.
 * When false, sidebar displays full labels alongside icons.
 * Consumed by all sidebar child elements to adjust their layout and styling accordingly.
 * @type {boolean}
 */
export const SidebarCollapsed = createContext<boolean>("sidebar-collapsed");

/**
 * Context providing the array of drawer items currently displayed in the sidebar overlay.
 * Contains the child elements of the active group that are rendered in the drawer.
 * Updated when group drawers open/close to show/hide nested children.
 * Empty array when no drawer is open.
 * @type {SidebarElement[]}
 */
export const SidebarDrawerItems = createContext<SidebarElement[]>("sidebar-drawer-items");

/**
 * Context indicating whether a drawer overlay is currently open for displaying nested items.
 * When true, a group drawer is open showing child elements.
 * When false, no drawer is currently displayed.
 * Used to manage the visibility state of the overlay across the component hierarchy.
 * @type {boolean}
 */
export const SidebarDrawerOpen = createContext<boolean>("sidebar-drawer-open");

/**
 * Context indicating whether the sidebar is in overlay mode (floating panel) or inline (static).
 * When true, sidebar is displayed as a floating panel over page content with close button.
 * When false, sidebar is displayed inline as part of the page layout with collapse button.
 * Consumed by child elements to adjust their rendering and behavior based on layout mode.
 * @type {boolean}
 */
export const SidebarDrawerOverlay = createContext<boolean>("sidebar-drawer-overlay");
