/**
 * Parent-child component relationships.
 * Children listed here are rendered inside their parent.
 * All other tags are rendered as standalone elements.
 *
 * Update this map when new parent-child relationships are introduced.
 */
export const nestingMap: Record<string, string[]> = {
  "sgds-accordion": ["sgds-accordion-item"],
  "sgds-breadcrumb": ["sgds-breadcrumb-item"],
  "sgds-checkbox-group": ["sgds-checkbox"],
  "sgds-combo-box": ["sgds-combo-box-option"],
  "sgds-data-table": ["sgds-data-table-head", "sgds-data-table-row", "sgds-data-table-cell"],
  "sgds-description-list": ["sgds-description-list-group"],
  "sgds-dropdown": ["sgds-dropdown-item"],
  "sgds-footer": ["sgds-footer-item"],
  "sgds-mainnav": ["sgds-mainnav-item", "sgds-mainnav-dropdown", "sgds-mainnav-profile"],
  "sgds-overflow-menu": [],
  "sgds-radio-group": ["sgds-radio"],
  "sgds-select": ["sgds-select-option"],
  "sgds-sidebar": ["sgds-sidebar-item", "sgds-sidebar-group", "sgds-sidebar-section"],
  "sgds-sidenav": ["sgds-sidenav-item", "sgds-sidenav-link"],
  "sgds-stepper": ["sgds-step"],
  "sgds-subnav": ["sgds-subnav-item"],
  "sgds-system-banner": ["sgds-system-banner-item"],
  "sgds-tab-group": ["sgds-tab", "sgds-tab-panel"],
  "sgds-table": ["sgds-table-head", "sgds-table-row", "sgds-table-cell"],
  "sgds-toast-container": ["sgds-toast"]
};

/** All tags that are children — they should NOT be rendered standalone. */
export const childTags = new Set(Object.values(nestingMap).flat());

/**
 * React wrapper nesting map (PascalCase keys).
 * Derived from the tag-based nesting map.
 */
function tagToReactName(tag: string): string {
  // sgds-button → SgdsButton, sgds-combo-box → SgdsComboBox
  return tag
    .split("-")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export const reactNestingMap: Record<string, string[]> = {};
for (const [parent, children] of Object.entries(nestingMap)) {
  reactNestingMap[tagToReactName(parent)] = children.map(tagToReactName);
}

export const reactChildNames = new Set(Object.values(reactNestingMap).flat());
