figma.showUI(__html__, { width: 400, height: 420 });

// SGDS web component → Figma library component key mapping
// Full SGDS web component → Figma library component mapping
var SGDS_COMPONENT_MAP = {
  "sgds-masthead": { key: "18cdf31bb749a24322cc64d6085161d53ed76375", name: "Official Government Banner" },
  "sgds-mainnav": { key: "357c4643c3d7937f0da2298e4c383b2ee7e82ca5", name: "Main Nav" },
  "sgds-footer": { key: "bebf3b1311b700524579ee0c84abed609def47cd", name: "Footer" },
  "sgds-button": { key: "6f2f3d88022cd929560600e6d9df2016dd542b3c", name: "Button" },
  "sgds-icon-button": { key: "3d6ef97abfa684a4590866cbb603c44b86427f2d", name: "Icon button" },
  "sgds-card": { key: "a80a897e32592c4f2d8aebfafffc1d760669b55f", name: "Card", nestedProps: { Variant: "default" } },
  "sgds-image-card": { key: "4a9e664f1b163b039023ebeebc3bd2e2f16bb256", name: "Image card" },
  "sgds-thumbnail-card": {
    key: "a80a897e32592c4f2d8aebfafffc1d760669b55f",
    name: "Card",
    nestedProps: { Variant: "thumbnail" }
  },
  "sgds-accordion": { key: "ffada43a96f710368e420ffd6087b09ee8894502", name: "Accordion" },
  "sgds-badge": { key: "30f64a9fe1033f49f39d7e77f1b318b0549a852f", name: "Badge" },
  "sgds-alert": { key: "78d35168e3f57033a677c8bce6d5242e1e771ffc", name: "Alert" },
  "sgds-breadcrumb": { key: "0fe6194b637fc81281ba384c7cb7595e36e2aa23", name: "Breadcrumb" },
  "sgds-checkbox": { key: "cfd682cb134b8cba84738cabe537e7f4973a97af", name: "Checkbox" },
  "sgds-checkbox-group": { key: "a8736f77a9aa8db166ba3e6a2af36ea62f231796", name: "Checkbox group" },
  "sgds-close-button": { key: "dfa571631b0ed13939f6bc803b89d0cb7b866734", name: "Close button" },
  "sgds-combo-box": { key: "402b7c27be729d83b27dc56b20ed4012bb7894b5", name: "Combobox" },
  "sgds-datepicker": { key: "22707078ef36a68de4d1d59b52d1e774523b3d9e", name: "Date picker" },
  "sgds-description-list": { key: "f737ee7ccde2b947ccb0873fbe0373c38968e5e5", name: "Description list" },
  "sgds-divider": { key: "0fa48002f60b73b5c40cc5f9960a0d33fa9aede2", name: "Divider" },
  "sgds-drawer": { key: "286077554b9c670410265a4efddc044d2f79c830", name: "Drawer" },
  "sgds-dropdown": { key: "8abe77a377974f59945df172f56b462c09d930d2", name: "Dropdown" },
  "sgds-file-upload": { key: "c4be285d559cc8e7d1e5022d6246fbd4afad08dd", name: "File upload" },
  "sgds-input": { key: "2ef894eecddfbaad424e24480aaaa70c6232d579", name: "Input" },
  "sgds-link": { key: "be078ab26a178669da5e19be495a97951e14f5f4", name: "Link" },
  "sgds-modal": { key: "b22aedc5141b82416d7943e46a78598d44e4423f", name: "Modal" },
  "sgds-overflow-menu": { key: "4f6abe52cb03aad3e9201d579a1b9a42ee0b2f96", name: "Overflow menu" },
  "sgds-pagination": { key: "9e6f67ae6f0a3d36e74371b7e0121a90617f3437", name: "Pagination" },
  "sgds-progress-bar": { key: "7343e7e18d316aaf3a076f67474c394a69106130", name: "Progress bar" },
  "sgds-quantity-toggle": { key: "7a8181de949074a2d44261aa6d6387381ff7fafd", name: "Quantity toggle" },
  "sgds-radio": { key: "529c74d47e2706156c625441dee324962caf32a9", name: "Radio" },
  "sgds-radio-group": { key: "1bc0266f520ffce648079e4137dedee58896ff57", name: "Radio group" },
  "sgds-select": { key: "76689841e9a0e34127817f173746ff90ad4f6d01", name: "Select" },
  "sgds-sidebar": { key: "f82b74ef96b1fba2824eb1b42773e614d1912b61", name: "Sidebar" },
  "sgds-sidenav": { key: "fe7d7f7bb4bad60bf90236bdefad2d621794aea1", name: "Side navigation" },
  "sgds-skeleton": { key: "e637146dfde782038c230e94e2b50905588a32a8", name: "Skeleton" },
  "sgds-spinner": { key: "57f93a97c6752fe191c5baaae85fcd94af48fb6c", name: "Spinner" },
  "sgds-stepper": { key: "f2d7340d4a7cae5305c275cdf4536a881006adaa", name: "Stepper" },
  "sgds-subnav": { key: "f224ffd722edb29ae69e98f57adc236a30e4ab60", name: "Sub nav" },
  "sgds-switch": { key: "4feb4a7ce800cc003834a757142e2fae22b407cb", name: "Switch" },
  "sgds-system-banner": { key: "8964354f90723ab11cfecac907643c00b8671489", name: "System banner" },
  "sgds-tab": { key: "84c758d53a47383d98f776a64e12c5e34b3a3042", name: "Tab" },
  "sgds-table": { key: "3e453c92dfce98aa59f3fdf54743848ba1928478", name: "Table" },
  "sgds-table-of-contents": { key: "71c683805758b4fd9be63158a990cac4f9b1cc08", name: "Table of contents" },
  "sgds-textarea": { key: "8309f3c597191757e791ee07827c6d91462e5312", name: "Text area" },
  "sgds-toast": { key: "1fba52a6b9e5133c161913561e756e717136329b", name: "Toast" },
  "sgds-tooltip": { key: "", name: "Tooltip" }, // Not available as ComponentSet in library
  "sgds-icon-list": { key: "9a32ab706ce2f0a23d974f5d1487d98e551d3b69", name: "Icon list" },
  "sgds-icon-card": { key: "a80a897e32592c4f2d8aebfafffc1d760669b55f", name: "Card", nestedProps: { Variant: "icon" } }
};

// SGDS Tailwind class → Figma variable key mapping
// Pattern: sgds:bg-{token} → Figma variable sgds/{path}
// Derived from utility.css: --background-color-{x} → var(--sgds-{y}) → Figma sgds/{y with / separators}
var SGDS_VARIABLE_MAP = {
  // === BACKGROUND COLORS (sgds:bg-*) ===
  // Surface
  "bg-surface-default": "d918d0396e55942380ceb130c1f621d975314913",
  "bg-surface-raised": "57a7785c6e80f81eb376812d1d707853241cd7fa",
  "bg-surface-inverse": "7da0c8a651bf49067c372ea95516a22dccf5f061",
  // Base backgrounds
  "bg-default": "c27bcd171762c8c0ad9a476be4a369f405349684",
  "bg-overlay": "d4b49e071eaf4075926b584df14b1e9f11e8d9f5",
  // Primary
  "bg-primary-surface-default": "4e31c2abf4dba4a98fd41b13705519de1d1bcda5",
  "bg-primary-surface-emphasis": "4a22b9be607a9ff731cd775bafe8866c3a76dc1e",
  "bg-primary-surface-muted": "25e448d40c38270da1e843f026b9567b66ef90b5",
  // Accent
  "bg-accent-surface-default": "5e39d26043c8ab16f6e737b4881b2cf289e5d5dd",
  "bg-accent-surface-emphasis": "cbef3747bf8914084e3e7155a750b26834db6182",
  "bg-accent-muted": "e0599475a9936b30b1dbc55141a2ae1894a0cd54",
  // Success
  "bg-success-surface-default": "7f12ac36246da6fc850d3900037bac69b77dc75e",
  "bg-success-surface-muted": "d178dfec05b713ef5f4ad23e8a488f4f4905b765",
  "bg-success-muted": "41aeb0ea66f438e8409e1b5e6d2afe5e8a4fd6bc",
  // Danger
  "bg-danger-surface-default": "a4e55bca657460538cf51e74fd69b9f948c0c2dd",
  "bg-danger-surface-muted": "5899fa2dc523e7fb0562577714627b7b8ff6f82f",
  "bg-danger-muted": "6cdf823d79c2fb966f573652132a8fd07caf1d8c",
  // Cyan
  "bg-cyan-surface-default": "979a928bab40a20c5440551370da1e7c47fb9f54",
  "bg-cyan-surface-muted": "59841c52cd5ac832662952b7080493832cce2958",
  "bg-cyan-muted": "e90e0eecf30e41c444aaf5e473f0736df0392b18",
  // Warning
  "bg-warning-muted": "81cd03ffe33fc729f1b62619fe0a85b927557c03",
  // Purple
  "bg-purple-muted": "fbc5aed31ebdf89f71fc6f3807b5581fc58cb6a9",
  // Neutral
  "bg-neutral-muted": "59310a3c7d9f8fd669756afc630d635a3f8c24f3"

  // === TEXT COLORS (sgds:text-*) - add keys here as discovered ===
  // To find keys: search_design_system query "sgds/{name}/color-default"
  // e.g. 'text-body-default': 'KEY_HERE',
  // e.g. 'text-heading-default': 'KEY_HERE',
};

// SGDS spacing class → Figma variable key mapping (FLOAT variables)
// Tailwind: sgds:py-layout-md → Figma variable: sgds/layout/padding/md
// Tailwind: sgds:gap-sm → Figma variable: sgds/gap/sm
// Margins converted to padding (Figma has no margins)
var SGDS_SPACING_MAP = {
  // Layout padding (larger, section-level)
  "layout-xs": "89c9ad2f370845cbbba2c434f07333d9fea0f7ab",
  "layout-sm": "d5b2aa0b802469f8b4ed42f2781d1fec15d9a915",
  "layout-md": "37ec013797e155db991a48db7f514a0851c17cf9",
  "layout-lg": "9e52b034963065e9384655b15af866cba3754093",
  "layout-xl": "f1b8a67b1b07e04c8964e1b85f73c1f5bbefb426",
  // Layout gap
  "layout-gap-2-xs": "2acc288eaad399a10c49dc50485cbcca972bb3a1",
  "layout-gap-xs": "e41563056d916eeccf13707fa3ae5d821cc91994",
  "layout-gap-sm": "264a182d25512a99f28631977728b56bd05bff34",
  "layout-gap-md": "f24863bda1524075c9bf13c4f27f3b9e86c91f5d",
  "layout-gap-lg": "cac0599410256b10fc64c68b6788aacebdd3e22c",
  "layout-gap-xl": "e059ad27d69c72d22b384d34214acb43a619deff",
  // Semantic gap (component-level spacing)
  none: "212274a9abebb673b6a9649d7126ba4f7ad2944b",
  xs: "bfe07fc0dea91255cf262edc2166751e45a7087f",
  sm: "2f173ba36517121bfcd695f8a0d4dc6394a8b534",
  md: "c4283dcbcc426b5dcb4c45c4a211233755c0f833",
  lg: "92b139a8540ede45588e18e28d77fad933b0f66f",
  xl: "a09702e317b7ccfd57023b53c1d93f19e9ca7e0f"
};

// Cache for imported variables
var importedVariables = {};

// Cache for imported component sets
var importedComponents = {};

// Attribute-to-Figma variant property name mapping
// Maps DOM attribute names to Figma variant property names with capitalization
var ATTR_TO_VARIANT_PROP = {
  variant: "Variant",
  outlined: "Outlined",
  dismissible: "Dismissible",
  size: "Size",
  state: "State",
  tone: "Tone",
  orientation: "Orientation"
};

// Declarative slot configuration for each component
// Maps web component slots → Figma property keys (BOOLEAN toggles, INSTANCE_SWAP, TEXT)
// Discovered via Figma REST API /v1/files/.../nodes
var COMPONENT_SLOT_CONFIG = {
  "sgds-card": {
    structureName: "Structure",
    slots: {
      upper: { booleanKey: "🔷 Upper slot#29055:1", swapKey: "↳ Swap instance (upper)#29055:60", frameName: "[upper slot]" },
      lower: { booleanKey: "🔷 Lower slot#29055:12", swapKey: "↳ Swap instance (lower)#30708:0", frameName: "[lower slot]" }
    },
    textProps: {
      title: { instanceName: "Card header", key: "↳ Edit text #29055:26" },
      subtitle: { instanceName: "Card header", key: "↳ Edit text#29055:29", booleanKey: "Subtitle#29055:23" },
      description: { instanceName: "Card header", key: "↳ Edit text  #30610:3", booleanKey: "Description#30610:0" }
    },
    extraBooleans: { tinted: "Tinted#29055:104", footer: "Footer#29055:82" }
  },
  "sgds-icon-card": {
    structureName: "Structure",
    slots: {
      upper: { booleanKey: "🔷 Upper slot#29055:1", swapKey: "↳ Swap instance (upper)#29055:60", frameName: "[upper slot]" },
      lower: { booleanKey: "🔷 Lower slot#29055:12", swapKey: "↳ Swap instance (lower)#30708:0", frameName: "[lower slot]" }
    },
    textProps: {
      title: { instanceName: "Card header", key: "↳ Edit text #29055:26" },
      subtitle: { instanceName: "Card header", key: "↳ Edit text#29055:29", booleanKey: "Subtitle#29055:23" },
      description: { instanceName: "Card header", key: "↳ Edit text  #30610:3", booleanKey: "Description#30610:0" }
    },
    extraBooleans: { footer: "Footer#29055:82" }
  },
  "sgds-thumbnail-card": {
    structureName: "Structure",
    slots: {
      upper: { booleanKey: "🔷 Upper slot#29055:1", swapKey: "↳ Swap instance (upper)#29055:60", frameName: "[upper slot]" },
      lower: { booleanKey: "🔷 Lower slot#29055:12", swapKey: "↳ Swap instance (lower)#30708:0", frameName: "[lower slot]" }
    },
    textProps: {
      title: { instanceName: "Card header", key: "↳ Edit text #29055:26" },
      subtitle: { instanceName: "Card header", key: "↳ Edit text#29055:29", booleanKey: "Subtitle#29055:23" },
      description: { instanceName: "Card header", key: "↳ Edit text  #30610:3", booleanKey: "Description#30610:0" }
    },
    extraBooleans: { footer: "Footer#29055:82" }
  },
  "sgds-image-card": {
    structureName: "Card structure",
    slots: {
      upper: { booleanKey: "🔷 Upper slot#29125:13", swapKey: "↳ Swap instance (upper)#29125:26", frameName: "[upper slot]" },
      lower: { booleanKey: "🔷 Lower slot#29125:39", swapKey: "↳ Swap instance (lower)#31095:9", frameName: "[lower slot]" }
    },
    textProps: {
      title: { instanceName: "Card header", key: "↳ Edit text #29055:26" },
      subtitle: { instanceName: "Card header", key: "↳ Edit text#29055:29", booleanKey: "Subtitle#29055:23" },
      description: { instanceName: "Card header", key: "↳ Edit text  #30610:3", booleanKey: "Description#30610:0" }
    },
    extraBooleans: { footer: "Footer#29125:65" }
  },
  "sgds-button": {
    textProps: {
      default: { key: "Edit button label#12484:5" }
    },
    slots: {
      leftIcon: { booleanKey: "Leading icon#12484:3", swapKey: "↳ Select icon#17388:71" },
      rightIcon: { booleanKey: "Trailing icon#12484:1", swapKey: "↳ Select icon #17388:169" }
    }
  },
  "sgds-accordion": {
    // Accordion items are nested instances named "↳ Accordion N"
    // Each item has: Edit title (TEXT), Badge (BOOLEAN), Icon (BOOLEAN), badge swap, icon swap
    itemPattern: "↳ Accordion",
    itemProps: {
      title: { key: "Edit title#16551:8" },
      badge: { booleanKey: "Badge#29585:8", swapKey: "↳ 🔷 Swap instance#16545:8" },
      icon: { booleanKey: "Icon#29595:24", swapKey: "↳ Select icon#29595:46" }
    }
  },
  "sgds-modal": {
    // Modal has slot group for custom content, footer buttons as Action 1/2
    slots: {
      footer: { instanceName: "wrapper-footer" }
    },
    textProps: {}
  },
  "sgds-drawer": {
    // Drawer has footer with Button group containing Button 1/2
    slots: {
      footer: { instanceName: "wrapper-footer" }
    },
    textProps: {}
  },
  "sgds-alert": {
    slots: {
      action: { booleanKey: "🔷 Action slot#29246:0", swapKey: "↳ Swap instance#29246:11" }
    },
    textProps: {
      title: { key: "↳ Edit text#15588:34", booleanKey: "Title#15588:17" },
      description: { key: "Edit description#13094:45" }
    }
  },
  "sgds-footer": {
    structureName: "Directory",
    textProps: {
      title: { key: "↳ Edit text#18383:36", booleanKey: "Site title#28242:10" },
      description: { key: "↳ Edit text #18383:37", booleanKey: "Site description#28242:11" }
    },
    slots: {}
  },
  "sgds-input": {
    slots: {
      action: { swapKey: "Select icon#17388:218", instanceName: "Icon button" }
    },
    textProps: {}
  },
  "sgds-dropdown": {
    structureName: "Menu",
    slots: {
      top: { booleanKey: "🔷 Slot top#28035:6", swapKey: "↳ Swap instance#28035:57" },
      bottom: { booleanKey: "🔷 Slot bottom#28035:74", swapKey: "↳ Swap instance #28035:91" }
    },
    textProps: {}
  },
  "sgds-description-list": {
    // Description list items are nested as "List N" instances
    itemPattern: "List",
    itemProps: {
      label: { key: "Edit label#18830:0" },
      data: { key: "Edit data#18830:6" },
      slot1: { booleanKey: "🔷 Slot 1#18830:7", swapKey: "↳ Swap instance  #18830:8" },
      slot2: { booleanKey: "🔷 Slot 2#18830:10", swapKey: "↳ Swap instance #18830:9" }
    }
  },
  "sgds-badge": {
    textProps: {
      default: { key: "Edit label#13032:18" }
    },
    slots: {}
  },
  "sgds-link": {
    textProps: {
      default: { key: "Edit link#16010:0" }
    },
    slots: {
      leadingIcon: { booleanKey: "Leading icon#15978:6", swapKey: "↳ Select icon#17388:0" },
      trailingIcon: { booleanKey: "Trailing icon#15978:15", swapKey: "↳ Select icon #17388:25" }
    }
  },
  "sgds-toast": {
    textProps: {
      title: { key: "↳ Edit text#16370:284", booleanKey: "Title#29198:3" },
      description: { key: "Edit message#16370:290" }
    },
    slots: {
      action: { booleanKey: "Action#16370:296" }
    }
  },
  "sgds-system-banner": {
    textProps: {
      default: { key: "Edit message#25212:8" }
    },
    slots: {}
  },
  "sgds-select": {
    textProps: {
      label: { key: "↳ Edit text #16273:0", booleanKey: "Label#16252:5" },
      placeholder: { key: "↳ Edit text  #16273:12", booleanKey: "Placeholder text#16259:126" },
      hint: { key: "↳ Edit text   #16273:36", booleanKey: "Hint text#16252:0" }
    },
    slots: {}
  },
  "sgds-combo-box": {
    textProps: {
      label: { key: "↳ Edit text #16273:0", booleanKey: "Label#16252:5" },
      placeholder: { key: "↳ Edit text  #16273:12", booleanKey: "Placeholder text#16259:126" },
      hint: { key: "↳ Edit text   #16273:36", booleanKey: "Hint text#16252:0" }
    },
    slots: {}
  },
  "sgds-textarea": {
    textProps: {
      label: { key: "↳ Edit text #16273:0", booleanKey: "Label#16252:5" },
      placeholder: { key: "↳ Edit text  #16273:12", booleanKey: "Placeholder text#16259:126" },
      hint: { key: "↳ Edit text   #16273:36", booleanKey: "Hint text#16252:0" }
    },
    slots: {}
  },
  "sgds-datepicker": {
    textProps: {
      label: { key: "↳ Edit text #16273:0", booleanKey: "Label#16252:5" },
      hint: { key: "↳ Edit text   #16273:36", booleanKey: "Hint text#16252:0" }
    },
    slots: {}
  },
  "sgds-file-upload": {
    textProps: {
      label: { key: "↳ Edit text  #29661:1", booleanKey: "Label#29661:0" },
      hint: { key: "↳ Edit text #29661:2", booleanKey: "Hint text#29661:3" }
    },
    slots: {}
  },
  "sgds-checkbox": {
    textProps: {
      default: { key: "↳ Edit text#15167:0", booleanKey: "Label#16008:0" }
    },
    slots: {}
  },
  "sgds-radio": {
    textProps: {
      default: { key: "↳ Edit text#15163:0", booleanKey: "Label#16008:16" }
    },
    slots: {}
  },
  "sgds-switch": {
    textProps: {
      default: { key: "↳ Edit text#16008:27", booleanKey: "Label#15380:0" }
    },
    slots: {}
  },
  "sgds-spinner": {
    textProps: {
      default: { key: "↳ Edit text#26271:0", booleanKey: "Label#16158:6" }
    },
    slots: {}
  },
  "sgds-checkbox-group": {
    textProps: {
      label: { key: "↳ Edit text  #15640:6", booleanKey: "Label#15640:9" },
      hint: { key: "↳ Edit text #15640:7", booleanKey: "Hint text#15640:8" }
    },
    slots: {}
  },
  "sgds-radio-group": {
    textProps: {
      label: { key: "↳ Edit text #15655:51", booleanKey: "Label#15655:31" },
      hint: { key: "↳ Edit text#15655:46", booleanKey: "Hint text#15655:41" }
    },
    slots: {}
  },
  "sgds-quantity-toggle": {
    textProps: {
      label: { key: "↳ Edit text#16461:94", booleanKey: "Label#16461:83" },
      hint: { key: "↳ Edit text    #16461:149", booleanKey: "Hint text#16461:66" }
    },
    slots: {}
  },
  "sgds-pagination": {
    textProps: {
      description: { key: "Edit description#16740:0" }
    },
    slots: {}
  },
  "sgds-icon-list": {
    // Icon list items are nested as "Icon list N"
    itemPattern: "Icon list",
    itemProps: {
      label: { key: "Edit text#16628:108" },
      icon: { swapKey: "Select icon#16628:110" }
    }
  },
  "sgds-table-of-contents": {
    textProps: {
      header: { key: "Edit header#25146:1" }
    },
    slots: {}
  },
  "sgds-sidebar": {
    slots: {
      upper: { booleanKey: "Upper slot#34629:1", swapKey: "↳ Swap instance#34629:3" },
      lower: { booleanKey: "Lower slot#34629:2", swapKey: "↳ Swap instance #35957:24" }
    },
    textProps: {}
  },
  "sgds-mainnav": {
    slots: {
      brand: { swapKey: "Product logo#19005:129" },
      slot: { booleanKey: "🔷 Slot#29312:8" }
    },
    textProps: {}
  },
  "sgds-tab": {
    // Tab items are nested as "Tab N"
    itemPattern: "Tab",
    itemProps: {
      label: { key: "Edit tab label#17655:91" },
      badge: { booleanKey: "Badge#17655:64" }
    }
  },
  "sgds-stepper": {
    // Stepper items are nested as "↳ Step N"
    itemPattern: "↳ Step",
    itemProps: {
      label: { key: "Label#16203:7" }
    }
  },
  "sgds-icon-button": {
    slots: {
      icon: { swapKey: "Select icon#17388:218" }
    },
    textProps: {}
  },
  "sgds-progress-bar": {
    textProps: {},
    slots: {}
  },
  "sgds-overflow-menu": {
    textProps: {},
    slots: {}
  }
};

figma.ui.onmessage = async function (msg) {
  if (msg.type === "import") {
    try {
      var data = msg.data;
      var totalEstimate = countNodes(data);
      var nodeCount = 0;

      // Load common fonts
      await Promise.all([
        figma.loadFontAsync({ family: "Inter", style: "Regular" }),
        figma.loadFontAsync({ family: "Inter", style: "Bold" }),
        figma.loadFontAsync({ family: "Inter", style: "Semi Bold" }),
        figma.loadFontAsync({ family: "Inter", style: "Medium" }),
        figma.loadFontAsync({ family: "Inter", style: "Light" })
      ]).catch(function (e) {});

      // Create root frame
      var pageWidth = data.pageWidth || data.width || 1440;
      var pageHeight = data.pageHeight || data.height || 900;

      var rootFrame = figma.createFrame();
      rootFrame.name = data.title || "Imported Page";
      rootFrame.resize(pageWidth, pageHeight);
      rootFrame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      rootFrame.clipsContent = true;

      // Add single 12-column layout grid guide to root frame (Ctrl+G to toggle)
      rootFrame.layoutGrids = [
        {
          pattern: "COLUMNS",
          alignment: "MIN",
          count: 12,
          gutterSize: 32,
          sectionSize: 80,
          offset: 100,
          visible: true
        }
      ];

      // Position away from existing content
      var maxX = 0;
      for (var i = 0; i < figma.currentPage.children.length; i++) {
        var child = figma.currentPage.children[i];
        maxX = Math.max(maxX, child.x + child.width);
      }
      rootFrame.x = maxX + 100;
      rootFrame.y = 0;

      var rootOffsetX = data.x || 0;
      var rootOffsetY = data.y || 0;

      if (data.children) {
        for (var c = 0; c < data.children.length; c++) {
          var rootSibTags = data.children.map(function (ch) {
            return ch.tag || "";
          });
          await createNode(data.children[c], rootFrame, rootOffsetX, rootOffsetY, rootSibTags);
          nodeCount++;
          if (nodeCount % 5 === 0) {
            figma.ui.postMessage({
              type: "progress",
              percent: Math.round((nodeCount / totalEstimate) * 100)
            });
          }
        }
      }

      figma.viewport.scrollAndZoomIntoView([rootFrame]);
      figma.ui.postMessage({ type: "done", nodeCount: totalEstimate });
    } catch (err) {
      figma.ui.postMessage({ type: "error", message: err.message || String(err) });
    }
  }
};

function countNodes(node) {
  var count = 1;
  if (node.children) {
    for (var i = 0; i < node.children.length; i++) {
      count += countNodes(node.children[i]);
    }
  }
  return count;
}

// Check if a tag is an SGDS component with a Figma mapping
function isSgdsComponent(tag) {
  if (!tag) return false;
  var mapping = SGDS_COMPONENT_MAP[tag];
  return mapping && mapping.key;
}

// Check if sgds-masthead should be skipped (Main Nav component already includes it)
function shouldSkipMasthead(data, parent) {
  if (data.tag !== "sgds-masthead") return false;
  // If sgds-mainnav is a sibling, skip masthead since Main Nav includes it
  if (parent && parent._childTags) {
    return parent._childTags.indexOf("sgds-mainnav") >= 0;
  }
  return false;
}

// Import and create an SGDS component instance
async function createSgdsComponent(data, parent, parentX, parentY, siblingTags) {
  var mapping = SGDS_COMPONENT_MAP[data.tag];
  if (!mapping || !mapping.key) return null;

  // Import if not cached
  if (!importedComponents[data.tag]) {
    try {
      var componentSet = await figma.importComponentSetByKeyAsync(mapping.key);
      importedComponents[data.tag] = componentSet;
    } catch (e) {
      // If import fails, fall back to frame
      return null;
    }
  }

  var componentSet = importedComponents[data.tag];
  var variant = componentSet.defaultVariant || componentSet.children[0];
  var instance = variant.createInstance();

  // Apply nested component properties (e.g. Structure.Variant = "thumbnail")
  if (mapping.nestedProps) {
    try {
      var structure = instance.findOne(function (n) {
        return n.name === "Structure" && n.type === "INSTANCE";
      });
      if (structure) {
        structure.setProperties(mapping.nestedProps);
      }
    } catch (e) {}
  }

  instance.name = mapping.name;

  var posX = (data.x || 0) - parentX;
  var posY = (data.y || 0) - parentY;

  // If this is sgds-mainnav and sgds-masthead was skipped (because Main Nav includes it),
  // position at y:0 since the component renders its own banner
  if (data.tag === "sgds-mainnav" && siblingTags && siblingTags.indexOf("sgds-masthead") >= 0) {
    posY = 0;
  }

  instance.x = posX;
  instance.y = posY;

  // Resize to match DOM dimensions
  if (data.width && data.width > 0 && data.height && data.height > 0) {
    instance.resize(data.width, data.height);
  } else if (data.width && data.width > 0) {
    instance.resize(data.width, instance.height);
  }

  parent.appendChild(instance);

  // Apply slot content using declarative config
  var slotConfig = COMPONENT_SLOT_CONFIG[data.tag];
  if (slotConfig) {
    await applySlotContent(instance, data, slotConfig);
  } else {
    // Fallback: try generic text application for components without config
    await applyComponentText(instance, data);
  }

  return instance;
}

// Import a slotted component and return the correct variant Component node
// for use with INSTANCE_SWAP properties.
// Returns the Component node (variant child of ComponentSet), not an Instance.
async function importSlottedComponent(childData) {
  var tag = childData.tag;
  var mapping = SGDS_COMPONENT_MAP[tag];
  if (!mapping || !mapping.key) return null;

  // Import ComponentSet if not cached
  if (!importedComponents[tag]) {
    try {
      var componentSet = await figma.importComponentSetByKeyAsync(mapping.key);
      importedComponents[tag] = componentSet;
    } catch (e) {
      return null;
    }
  }

  var componentSet = importedComponents[tag];
  var attrs = childData.attrs || {};

  // Build variant property criteria from DOM attrs
  var criteria = {};
  for (var attrName in attrs) {
    var propName = ATTR_TO_VARIANT_PROP[attrName];
    if (propName) {
      var value = attrs[attrName];
      // Boolean attrs: true → "True", false/absent → "False"
      if (value === true || value === "") {
        criteria[propName] = "True";
      } else if (value === false || value === "false") {
        criteria[propName] = "False";
      } else {
        criteria[propName] = value;
      }
    }
  }

  // Find the matching variant child
  var bestMatch = null;
  var bestScore = -1;

  for (var i = 0; i < componentSet.children.length; i++) {
    var variant = componentSet.children[i];
    var variantProps = variant.variantProperties || {};
    var score = 0;
    var mismatch = false;

    for (var prop in criteria) {
      if (variantProps[prop] !== undefined) {
        if (variantProps[prop] === criteria[prop]) {
          score++;
        } else {
          mismatch = true;
          break;
        }
      }
    }

    if (!mismatch && score > bestScore) {
      bestScore = score;
      bestMatch = variant;
    }
  }

  // Return the Component node (variant) — fallback to default
  return bestMatch || componentSet.defaultVariant || componentSet.children[0];
}

// Create a local Figma Component from a non-SGDS DOM element (e.g. styled span)
// so it can be swapped into an INSTANCE_SWAP slot
async function createLocalSlotComponent(childData) {
  var text = childData.text || collectFirstText(childData);

  // Find the styled child (the actual visual element)
  var styledNode = childData;
  var styles = childData.styles || {};
  if (!styles.backgroundColor && childData.children) {
    for (var i = 0; i < childData.children.length; i++) {
      var child = childData.children[i];
      if (child.styles && child.styles.backgroundColor) {
        styledNode = child;
        styles = child.styles;
        if (!text) text = child.text || collectFirstText(child);
        break;
      }
    }
  }

  // Parse dimensions from sgds: classes (e.g. sgds:w-10 sgds:h-10)
  // Tailwind v4 spacing base = 4px, so w-10 = 40px
  var width = 40;
  var height = 40;
  var classNames = styledNode.name || childData.name || "";
  var wMatch = classNames.match(/sgds:w-(\d+)/);
  var hMatch = classNames.match(/sgds:h-(\d+)/);
  if (wMatch) width = parseInt(wMatch[1]) * 4; // spacing base = 4px
  if (hMatch) height = parseInt(hMatch[1]) * 4;
  // Fallback to DOM dimensions if no class match
  if (!wMatch) width = styledNode.width || childData.width || 40;
  if (!hMatch) height = styledNode.height || childData.height || 40;

  // Parse border radius from classes
  var borderRadius = styles.borderRadius || 0;
  if (classNames.indexOf("rounded-full") >= 0) {
    borderRadius = Math.max(width, height); // full circle
  } else if (classNames.match(/sgds:rounded-/)) {
    // Could parse specific radius values here
    borderRadius = styles.borderRadius || 8;
  }

  // Get text styles from the deepest text node
  var textStyles = styledNode.textStyles || childData.textStyles || {};
  if (!textStyles.fontSize && childData.children) {
    var texts = [];
    collectTexts(childData, texts);
    if (texts.length > 0) textStyles = texts[0].textStyles || {};
  }

  // Create a Component (required for swapComponent / INSTANCE_SWAP)
  var comp = figma.createComponent();
  comp.name = "slot: " + (text || "custom");
  comp.resize(width, height);

  // Apply background color
  if (styles.backgroundColor) {
    var bg = styles.backgroundColor;
    comp.fills = [{
      type: "SOLID",
      color: { r: bg.r, g: bg.g, b: bg.b },
      opacity: bg.a !== undefined ? bg.a : 1
    }];
  } else {
    comp.fills = [];
  }

  // Apply border radius
  if (borderRadius > 0) {
    comp.cornerRadius = Math.min(borderRadius, Math.max(width, height) / 2);
  }

  // Use auto-layout with HUG sizing (like Badge component)
  // This prevents the parent slot's auto-layout from stretching it
  comp.layoutMode = "HORIZONTAL";
  comp.primaryAxisAlignItems = "CENTER";
  comp.counterAxisAlignItems = "CENTER";
  comp.primaryAxisSizingMode = "AUTO"; // HUG
  comp.counterAxisSizingMode = "AUTO"; // HUG

  // Calculate padding to achieve the desired width/height around the text
  // For a step number: 40x40 circle with ~20px font → need padding to fill space
  var fontSize = (textStyles && textStyles.fontSize) || 16;
  var estTextWidth = fontSize * 0.7; // rough estimate for single char
  var estTextHeight = fontSize * 1.2;
  var padX = Math.max(0, Math.round((width - estTextWidth) / 2));
  var padY = Math.max(0, Math.round((height - estTextHeight) / 2));
  comp.paddingLeft = padX;
  comp.paddingRight = padX;
  comp.paddingTop = padY;
  comp.paddingBottom = padY;

  // Add text if present
  if (text) {
    var fontWeight = (textStyles.fontWeight && parseInt(textStyles.fontWeight) >= 600) ? "Bold" : "Regular";
    try {
      await figma.loadFontAsync({ family: "Inter", style: fontWeight });
    } catch (e) {
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      fontWeight = "Regular";
    }

    var textNode = figma.createText();
    textNode.characters = text;
    textNode.fontName = { family: "Inter", style: fontWeight };
    textNode.fontSize = textStyles.fontSize || 16;
    textNode.textAlignHorizontal = "CENTER";
    textNode.textAutoResize = "WIDTH_AND_HEIGHT";

    // Text color
    if (textStyles.color) {
      textNode.fills = [{
        type: "SOLID",
        color: { r: textStyles.color.r, g: textStyles.color.g, b: textStyles.color.b },
        opacity: textStyles.color.a !== undefined ? textStyles.color.a : 1
      }];
    }

    comp.appendChild(textNode);
  }

  // Move off-screen so it doesn't clutter the canvas
  comp.x = -9999;
  comp.y = -9999;

  return comp;
}

// Swap the placeholder instance inside a named slot container with a target component.
// Searches for an instance inside the slot frame and calls swapComponent() on it.
// Returns true if swap was successful.
async function swapSlotInstance(cardInstance, slotFrameName, targetComponent) {
  // Strategy 1: Find the slot frame by name, then find the INSTANCE inside it
  var slotFrame = cardInstance.findOne(function (n) {
    return n.name === slotFrameName;
  });
  if (slotFrame) {
    var placeholder = null;
    if (slotFrame.type === "INSTANCE") {
      placeholder = slotFrame;
    } else if (slotFrame.children) {
      for (var i = 0; i < slotFrame.children.length; i++) {
        if (slotFrame.children[i].type === "INSTANCE") {
          placeholder = slotFrame.children[i];
          break;
        }
      }
    }
    if (placeholder) {
      try {
        placeholder.swapComponent(targetComponent);
        return true;
      } catch (e) {}
    }
  }

  // Strategy 2: Find any instance whose name contains "slot" in the card-media area
  var mediaFrame = cardInstance.findOne(function (n) {
    return n.name === "card-media" || n.name === "Card media";
  });
  if (mediaFrame) {
    var instances = mediaFrame.findAllWithCriteria({ types: ["INSTANCE"] });
    if (instances.length > 0) {
      try {
        instances[0].swapComponent(targetComponent);
        return true;
      } catch (e) {}
    }
  }

  return false;
}

// Find a swapped instance by checking mainComponent's parent key
function findSwappedInstance(cardInstance, componentSetKey) {
  var allInstances = cardInstance.findAllWithCriteria({ types: ["INSTANCE"] });
  for (var i = 0; i < allInstances.length; i++) {
    var inst = allInstances[i];
    try {
      if (inst.mainComponent && inst.mainComponent.parent && inst.mainComponent.parent.key === componentSetKey) {
        return inst;
      }
    } catch (e) {}
  }
  return null;
}

// Component-specific text property keys for setting label/content after instance swap
var COMPONENT_TEXT_PROPS = {
  "sgds-badge": "Edit label#13032:18",
  "sgds-button": "Edit button label#12484:5"
};

// Apply text to a slotted component instance after it's been swapped in
async function applySlottedComponentText(instance, tag, text) {
  var textPropKey = COMPONENT_TEXT_PROPS[tag];
  if (textPropKey && text) {
    try {
      await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
      var props = {};
      props[textPropKey] = text;
      instance.setProperties(props);
    } catch (e) {}
  }
}

// ============================================================
// GENERIC SLOT CONTENT APPLIER (config-driven)
// ============================================================

// Classify DOM children by their slot attribute into a map
function classifySlots(data) {
  var result = {};
  if (!data.children) return result;

  for (var i = 0; i < data.children.length; i++) {
    var child = data.children[i];
    var slot = child.slot || "default";

    if (!result[slot]) {
      result[slot] = child;
    } else if (Array.isArray(result[slot])) {
      result[slot].push(child);
    } else {
      result[slot] = [result[slot], child];
    }
  }
  return result;
}

// Generic slot content applier — uses COMPONENT_SLOT_CONFIG to drive behavior
async function applySlotContent(instance, data, config) {
  if (!data) return;

  try {
    await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  } catch (e) {}

  // Find structure/target instance if specified
  var target = instance;
  if (config.structureName) {
    var structure = instance.findOne(function (n) {
      return n.name === config.structureName && n.type === "INSTANCE";
    });
    if (structure) target = structure;
  }

  // Classify children by slot attribute
  var slotChildren = classifySlots(data);

  // Also check for heuristic fallback (card legacy: children without slot attrs)
  var hasSlotAttrs = data.children && data.children.some(function (c) { return !!c.slot; });

  // --- Apply INSTANCE_SWAP slots ---
  if (config.slots) {
    for (var slotName in config.slots) {
      var slotConfig = config.slots[slotName];
      var slotChild = slotChildren[slotName];
      if (!slotChild) continue;
      // Handle first item if array
      if (Array.isArray(slotChild)) slotChild = slotChild[0];

      // Enable slot boolean
      if (slotConfig.booleanKey) {
        try { target.setProperties(makeProps(slotConfig.booleanKey, true)); } catch (e) {}
      }

      // Import and swap the slotted component
      if (slotChild.tag && isSgdsComponent(slotChild.tag)) {
        var component = await importSlottedComponent(slotChild);
        if (component) {
          // Try swap strategies
          var swapped = false;
          if (slotConfig.frameName) {
            swapped = await swapSlotInstance(instance, slotConfig.frameName, component);
          }
          if (!swapped && slotConfig.swapKey) {
            try {
              target.setProperties(makeProps(slotConfig.swapKey, component));
              swapped = true;
            } catch (e) {}
          }
          // Apply text to swapped instance
          if (swapped) {
            var label = slotChild.text || collectFirstText(slotChild);
            if (label) {
              var swappedInst = findSwappedInstance(instance, SGDS_COMPONENT_MAP[slotChild.tag].key);
              if (swappedInst) {
                await applySlottedComponentText(swappedInst, slotChild.tag, label);
              }
            }
          }
        }
      } else {
        // Non-SGDS slot child (e.g. <span> with step number circle)
        // Create a local Component with HUG sizing (like Badge) so it won't stretch
        var localComponent = await createLocalSlotComponent(slotChild);
        if (localComponent) {
          var slotText = slotChild.text || collectFirstText(slotChild);

          // Enable tinted mode for step number indicators
          if (slotText && slotText.length <= 2 && config.extraBooleans && config.extraBooleans.tinted) {
            try { instance.setProperties(makeProps(config.extraBooleans.tinted, true)); } catch (e) {}
          }

          // Swap it into the slot
          var swapped = false;
          if (slotConfig.frameName) {
            swapped = await swapSlotInstance(instance, slotConfig.frameName, localComponent);
          }
          if (!swapped && slotConfig.swapKey) {
            try {
              target.setProperties(makeProps(slotConfig.swapKey, localComponent));
              swapped = true;
            } catch (e) {}
          }
        }
      }
    }
  }

  // --- Apply TEXT properties ---
  if (config.textProps) {
    for (var textSlot in config.textProps) {
      var textConfig = config.textProps[textSlot];
      var textChild = slotChildren[textSlot];
      var textValue = "";

      if (textChild) {
        if (Array.isArray(textChild)) textChild = textChild[0];
        textValue = textChild.text || collectFirstText(textChild);
      } else if (textSlot === "default" && data.text) {
        // For simple components (badge, button) that have direct text
        textValue = data.text;
        if (!textValue && data.children) {
          var texts = [];
          collectTexts(data, texts);
          if (texts.length > 0) textValue = texts[0].text;
        }
      }

      if (!textValue) continue;

      var textTarget = instance;
      if (textConfig.instanceName) {
        var found = instance.findOne(function (n) {
          return n.name === textConfig.instanceName && n.type === "INSTANCE";
        });
        if (found) textTarget = found;
      } else if (config.structureName && target !== instance) {
        textTarget = target;
      }

      var textProps = {};
      textProps[textConfig.key] = textValue;
      if (textConfig.booleanKey) textProps[textConfig.booleanKey] = true;
      try { textTarget.setProperties(textProps); } catch (e) {}
    }
  }

  // --- Card-specific: heuristic fallback for legacy JSON without slot attrs ---
  if ((data.tag === "sgds-card" || data.tag === "sgds-icon-card" || data.tag === "sgds-thumbnail-card") && !hasSlotAttrs) {
    await applyCardContentHeuristic(instance, data, config, target);
  }

  // --- Hide footer if no footer slot content ---
  if (config.extraBooleans && config.extraBooleans.footer) {
    if (!slotChildren.footer && !slotChildren.link && !hasSlotAttrs) {
      // Only hide footer if we have slot data and no footer was provided
      // For heuristic mode, leave as-is (footer is visible by default)
    } else if (hasSlotAttrs && !slotChildren.footer && !slotChildren.link) {
      try { target.setProperties(makeProps(config.extraBooleans.footer, false)); } catch (e) {}
    }
  }

  // --- Card tinted mode: step number indicator ---
  if (config.extraBooleans && config.extraBooleans.tinted) {
    var stepNum = findStepNumber(data);
    if (stepNum) {
      try {
        instance.setProperties(makeProps(config.extraBooleans.tinted, true));
        if (target !== instance) {
          var upperBool = config.slots && config.slots.upper && config.slots.upper.booleanKey;
          if (upperBool) target.setProperties(makeProps(upperBool, true));
        }
      } catch (e) {}
    }
  }
}

// Card-specific heuristic: classify by font size/weight when no slot attrs present
async function applyCardContentHeuristic(instance, data, config, target) {
  var texts = [];
  collectTexts(data, texts);

  var title = "";
  var description = "";
  var hasBadge = false;

  for (var i = 0; i < texts.length; i++) {
    var t = texts[i];
    var fs = (t.textStyles && t.textStyles.fontSize) || 16;
    var fw = parseInt((t.textStyles && t.textStyles.fontWeight) || "400");

    // Skip step numbers
    if (t.text.length <= 2 && t.styles && t.styles.backgroundColor) continue;

    if (!title && (fs >= 20 || fw >= 600)) {
      title = t.text;
    } else if (!description && fs <= 20 && fw < 600) {
      description = t.text;
    }
  }

  // Check for badge child (upper slot heuristic)
  if (data.children) {
    for (var j = 0; j < data.children.length; j++) {
      var child = data.children[j];
      if (child.tag === "sgds-badge") {
        hasBadge = true;
        // Enable upper slot and swap badge
        if (config.slots && config.slots.upper) {
          var upperConfig = config.slots.upper;
          if (upperConfig.booleanKey) {
            try { target.setProperties(makeProps(upperConfig.booleanKey, true)); } catch (e) {}
          }
          var badgeComponent = await importSlottedComponent(child);
          if (badgeComponent) {
            var swapped = false;
            if (upperConfig.frameName) {
              swapped = await swapSlotInstance(instance, upperConfig.frameName, badgeComponent);
            }
            if (!swapped && upperConfig.swapKey) {
              try { target.setProperties(makeProps(upperConfig.swapKey, badgeComponent)); swapped = true; } catch (e) {}
            }
            if (swapped) {
              var badgeLabel = child.text || collectFirstText(child);
              if (badgeLabel) {
                var badgeInst = findSwappedInstance(instance, SGDS_COMPONENT_MAP["sgds-badge"].key);
                if (badgeInst) await applySlottedComponentText(badgeInst, "sgds-badge", badgeLabel);
              }
            }
          }
        }
        // Skip badge text from title/description
        if (child.text === title) title = "";
        break;
      }
    }
  }

  // Apply title/description to card header
  if (title || description) {
    var cardHeader = instance.findOne(function (n) {
      return n.name === "Card header" && n.type === "INSTANCE";
    });
    if (cardHeader) {
      var headerProps = {};
      if (title && config.textProps.title) headerProps[config.textProps.title.key] = title;
      if (description && config.textProps.description) headerProps[config.textProps.description.key] = description;
      if (!description && config.textProps.description && config.textProps.description.booleanKey) {
        headerProps[config.textProps.description.booleanKey] = false;
      }
      if (Object.keys(headerProps).length > 0) {
        try { cardHeader.setProperties(headerProps); } catch (e) {}
      }
    }
  }
}

// Find step number (single digit with background color) in card children
function findStepNumber(data) {
  if (!data.children) return null;
  for (var i = 0; i < data.children.length; i++) {
    var child = data.children[i];
    if (child.text && child.text.length <= 2 && child.styles && child.styles.backgroundColor) {
      return child.text;
    }
    var found = findStepNumber(child);
    if (found) return found;
  }
  return null;
}

// ============================================================
// LEGACY APPLIERS (kept for reference, replaced by generic)
// ============================================================

// Generic: apply DOM text to any SGDS component's TEXT properties
async function applyComponentText(instance, data) {
  try {
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
  } catch (e) {}

  // Collect all text from DOM children
  var texts = [];
  collectTexts(data, texts);
  if (texts.length === 0 && data.text) {
    texts.push(data);
  }
  if (texts.length === 0) return;

  // Get all TEXT properties from the instance (and nested instances)
  var textProps = getTextProperties(instance);

  // Match DOM texts to component TEXT properties
  // Strategy: match by content role (title→title, description→description, label→label)
  // Fallback: match in order
  var domTexts = texts.map(function (t) {
    return t.text;
  });

  if (domTexts.length === 1 && textProps.length >= 1) {
    // Single text — set on the most likely property (label, title, or first)
    var labelProp = textProps.find(function (p) {
      return p.key.toLowerCase().indexOf("label") >= 0;
    });
    var titleProp = textProps.find(function (p) {
      return p.key.toLowerCase().indexOf("title") >= 0;
    });
    var target = labelProp || titleProp || textProps[0];
    if (target) {
      target.instance.setProperties(makeProps(target.key, domTexts[0]));
    }
  } else if (domTexts.length >= 2) {
    // Multiple texts — try to match title + description
    // Sort by font size/weight to identify title vs description
    var sorted = texts.slice().sort(function (a, b) {
      var aSize = (a.textStyles && a.textStyles.fontSize) || 16;
      var bSize = (b.textStyles && b.textStyles.fontSize) || 16;
      return bSize - aSize; // larger first = title
    });

    var titleText = sorted[0] ? sorted[0].text : "";
    var descTexts = sorted.slice(1).map(function (t) {
      return t.text;
    });

    // Find title property
    var tProp = textProps.find(function (p) {
      var k = p.key.toLowerCase();
      return k.indexOf("title") >= 0 || k.indexOf("header") >= 0 || k.indexOf("heading") >= 0;
    });
    // Find description property
    var dProp = textProps.find(function (p) {
      var k = p.key.toLowerCase();
      return k.indexOf("desc") >= 0 || k.indexOf("text") >= 0 || k.indexOf("content") >= 0;
    });
    // Find label property
    var lProp = textProps.find(function (p) {
      var k = p.key.toLowerCase();
      return k.indexOf("label") >= 0;
    });

    if (tProp && titleText) {
      tProp.instance.setProperties(makeProps(tProp.key, titleText));
    }
    if (dProp && descTexts.length > 0) {
      dProp.instance.setProperties(makeProps(dProp.key, descTexts[0]));
    }
    if (lProp && !tProp && titleText) {
      lProp.instance.setProperties(makeProps(lProp.key, titleText));
    }

    // If we have a button label specifically
    if (data.tag === "sgds-button" && lProp) {
      lProp.instance.setProperties(makeProps(lProp.key, domTexts[0]));
    }
  }
}

// Helper to make a single-key property object
function makeProps(key, value) {
  var obj = {};
  obj[key] = value;
  return obj;
}

// Get all TEXT type properties from an instance and its nested instances
function getTextProperties(instance) {
  var results = [];
  var props = instance.componentProperties;
  for (var key in props) {
    if (props[key].type === "TEXT") {
      results.push({ key: key, value: props[key].value, instance: instance });
    }
  }
  // Check nested instances
  var nested = instance.findAllWithCriteria({ types: ["INSTANCE"] });
  for (var i = 0; i < nested.length; i++) {
    var nestedProps = nested[i].componentProperties;
    for (var nKey in nestedProps) {
      if (nestedProps[nKey].type === "TEXT") {
        results.push({ key: nKey, value: nestedProps[nKey].value, instance: nested[i] });
      }
    }
  }
  return results;
}

// Extract content from sgds-card children and map to Figma Card slots/properties
// Figma Card property keys (from API inspection):
//   Structure instance:
//     "🔷 Upper slot#29055:1" (BOOLEAN) — show/hide upper slot
//     "🔷 Lower slot#29055:12" (BOOLEAN) — show/hide lower slot
//     "↳ Edit text#29055:49" (TEXT) — secondary text
//     "Footer#29055:82" (BOOLEAN) — show/hide footer
//   Card header instance (inside Structure):
//     "↳ Edit text #29055:26" (TEXT) — title
//     "↳ Edit text  #30610:3" (TEXT) — description
//     "↳ Edit text#29055:29" (TEXT) — subtitle
//     "Subtitle#29055:23" (BOOLEAN) — show/hide subtitle
//     "Description#30610:0" (BOOLEAN) — show/hide description
//   Top-level:
//     "Tinted#29055:104" (BOOLEAN) — tinted background
async function applyCardContent(instance, data) {
  if (!data.children) return;

  try {
    await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  } catch (e) {}

  // Classify children by slot role
  var slotData = classifyCardSlots(data);

  // Find the Structure instance
  var structure = instance.findOne(function (n) {
    return n.name === "Structure" && n.type === "INSTANCE";
  });

  // --- Upper slot: insert slotted component (e.g. sgds-badge) ---
  if (slotData.upperContent && structure) {
    try {
      structure.setProperties({ "🔷 Upper slot#29055:1": true });
    } catch (e) {
      figma.ui.postMessage({ type: "debug", message: "Failed to enable upper slot: " + e.message });
    }

    // Import and swap the slotted component into the upper slot
    var upperChild = slotData.upperContent;
    if (upperChild.tag && isSgdsComponent(upperChild.tag)) {
      var slotComponent = await importSlottedComponent(upperChild);
      if (slotComponent) {
        // Strategy 1: Find the placeholder instance in the slot and swap it
        var swapped = await swapSlotInstance(instance, "[upper slot]", slotComponent);

        // Strategy 2: Try via Structure's exposed INSTANCE_SWAP property
        if (!swapped) {
          try {
            structure.setProperties({ "↳ Swap instance (upper)#29055:60": slotComponent });
            swapped = true;
          } catch (e2) {
            figma.ui.postMessage({ type: "debug", message: "setProperties swap failed: " + e2.message });
          }
        }

        // Strategy 3: Find any INSTANCE inside the card-media/upper area and swap it
        if (!swapped) {
          var allInstances = instance.findAllWithCriteria({ types: ["INSTANCE"] });
          for (var si = 0; si < allInstances.length; si++) {
            var candidate = allInstances[si];
            // Look for placeholder instances (default swap targets from library)
            if (
              candidate.name.toLowerCase().indexOf("swap") >= 0 ||
              candidate.name.toLowerCase().indexOf("slot") >= 0 ||
              candidate.name.toLowerCase().indexOf("placeholder") >= 0
            ) {
              try {
                candidate.swapComponent(slotComponent);
                swapped = true;
                break;
              } catch (e3) {}
            }
          }
        }

        // Apply text label to the swapped badge instance
        if (swapped) {
          var label = upperChild.text || collectFirstText(upperChild);
          if (label) {
            var badgeInstance = findSwappedInstance(instance, SGDS_COMPONENT_MAP[upperChild.tag].key);
            if (badgeInstance) {
              await applySlottedComponentText(badgeInstance, upperChild.tag, label);
            }
          }
        } else {
          figma.ui.postMessage({ type: "debug", message: "Could not swap badge into upper slot for card" });
        }
      } else {
        figma.ui.postMessage({ type: "debug", message: "importSlottedComponent returned null for " + upperChild.tag });
      }
    }
  }

  // --- Title, Description, Subtitle on Card header ---
  var cardHeader = instance.findOne(function (n) {
    return n.name === "Card header" && n.type === "INSTANCE";
  });
  if (cardHeader) {
    var headerProps = {};
    if (slotData.title) headerProps["↳ Edit text #29055:26"] = slotData.title;
    if (slotData.description) headerProps["↳ Edit text  #30610:3"] = slotData.description;
    if (slotData.subtitle) {
      headerProps["↳ Edit text#29055:29"] = slotData.subtitle;
      headerProps["Subtitle#29055:23"] = true;
    }
    if (!slotData.description) headerProps["Description#30610:0"] = false;
    if (Object.keys(headerProps).length > 0) {
      try {
        cardHeader.setProperties(headerProps);
      } catch (e) {}
    }
  }

  // --- Tinted + step number in upper slot ---
  if (slotData.stepNumber) {
    try {
      instance.setProperties({ "Tinted#29055:104": true });
      if (structure) {
        structure.setProperties({ "🔷 Upper slot#29055:1": true });
      }
      var upperSlot = instance.findOne(function (n) {
        return n.name === "[upper slot]";
      });
      if (upperSlot) {
        upperSlot.visible = true;
        var descInSlot = upperSlot.findOne(function (n) {
          return n.name === "description" && n.type === "TEXT";
        });
        if (descInSlot) {
          await figma.loadFontAsync({ family: "Inter", style: "Regular" });
          descInSlot.characters = slotData.stepNumber;
        }
      }
    } catch (e) {}
  }

  // --- Lower slot: insert slotted component ---
  if (slotData.lowerContent && structure) {
    try {
      structure.setProperties({ "🔷 Lower slot#29055:12": true });

      var lowerChild = slotData.lowerContent;
      if (lowerChild.tag && isSgdsComponent(lowerChild.tag)) {
        var lowerComponent = await importSlottedComponent(lowerChild);
        if (lowerComponent) {
          var lowerSwapped = await swapSlotInstance(instance, "[lower slot]", lowerComponent);
          if (!lowerSwapped) {
            try {
              structure.setProperties({ "↳ Swap instance (lower)#30708:0": lowerComponent });
              lowerSwapped = true;
            } catch (e2) {}
          }
          if (lowerSwapped) {
            var lowerLabel = lowerChild.text || collectFirstText(lowerChild);
            if (lowerLabel) {
              var lowerBadgeInstance = findSwappedInstance(instance, SGDS_COMPONENT_MAP[lowerChild.tag].key);
              if (lowerBadgeInstance) {
                await applySlottedComponentText(lowerBadgeInstance, lowerChild.tag, lowerLabel);
              }
            }
          }
        }
      }
    } catch (e) {}
  }

  // --- Footer: hide if no footer content ---
  if (!slotData.hasFooter && structure) {
    try {
      structure.setProperties({ "Footer#29055:82": false });
    } catch (e) {}
  }
}

// Classify card DOM children into slot roles
// Uses the `slot` attribute when available (from Chrome extension capture),
// falls back to heuristics (tag/font analysis) for legacy JSON without slot data.
function classifyCardSlots(data) {
  var result = {
    title: "",
    subtitle: "",
    description: "",
    upperContent: null,
    lowerContent: null,
    footerContent: null,
    stepNumber: null,
    hasFooter: false
  };

  if (!data.children) return result;

  var hasSlotAttrs = data.children.some(function (c) {
    return !!c.slot;
  });

  if (hasSlotAttrs) {
    // --- Slot-based classification (reliable) ---
    for (var i = 0; i < data.children.length; i++) {
      var child = data.children[i];
      var slot = child.slot || "";

      switch (slot) {
        case "upper":
          result.upperContent = child;
          break;
        case "title":
          result.title = child.text || collectFirstText(child);
          break;
        case "subtitle":
          result.subtitle = child.text || collectFirstText(child);
          break;
        case "description":
          result.description = child.text || collectFirstText(child);
          break;
        case "lower":
          result.lowerContent = child;
          break;
        case "footer":
        case "link":
          result.footerContent = child;
          result.hasFooter = true;
          break;
        default:
          // Default slot — check for step numbers or other content
          if (child.text && child.text.length <= 2 && child.styles && child.styles.backgroundColor) {
            result.stepNumber = child.text;
          }
          break;
      }
    }
  } else {
    // --- Heuristic fallback (legacy JSON without slot attrs) ---
    for (var i = 0; i < data.children.length; i++) {
      var child = data.children[i];

      // sgds-badge in card = upper slot content
      if (child.tag === "sgds-badge") {
        result.upperContent = child;
        continue;
      }

      // Step number: single digit with background color (circular badge)
      if (child.text && child.text.length <= 2 && child.styles && child.styles.backgroundColor) {
        result.stepNumber = child.text;
        continue;
      }

      // Recurse into wrapper elements to find badge/step
      if (child.children) {
        for (var j = 0; j < child.children.length; j++) {
          var grandchild = child.children[j];
          if (grandchild.tag === "sgds-badge") {
            result.upperContent = grandchild;
          }
          if (
            grandchild.text &&
            grandchild.text.length <= 2 &&
            grandchild.styles &&
            grandchild.styles.backgroundColor
          ) {
            result.stepNumber = grandchild.text;
          }
        }
      }
    }

    // Collect text nodes and classify by font properties
    var texts = [];
    collectTexts(data, texts);

    for (var t = 0; t < texts.length; t++) {
      var node = texts[t];
      var fs = (node.textStyles && node.textStyles.fontSize) || 16;
      var fw = parseInt((node.textStyles && node.textStyles.fontWeight) || "400");

      // Skip step number text
      if (node.text.length <= 2 && result.stepNumber === node.text) continue;
      // Skip badge text
      if (result.upperContent && node.text === (result.upperContent.text || "")) continue;

      if (!result.title && (fs >= 20 || fw >= 600)) {
        result.title = node.text;
      } else if (!result.description && fs <= 20 && fw < 600) {
        result.description = node.text;
      }
    }
  }

  return result;
}

// Helper: get first text content from a node tree
function collectFirstText(node) {
  if (node.text) return node.text;
  if (node.children) {
    for (var i = 0; i < node.children.length; i++) {
      var t = collectFirstText(node.children[i]);
      if (t) return t;
    }
  }
  return "";
}

// Add a small annotation badge to SGDS component frames
async function addComponentAnnotation(frame, tag) {
  try {
    await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
  } catch (e) {
    return;
  }

  var label = figma.createText();
  label.characters = "<" + tag + ">";
  label.fontSize = 10;
  label.fontName = { family: "Inter", style: "Semi Bold" };
  label.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  label.textAutoResize = "WIDTH_AND_HEIGHT";

  // Background badge
  var badge = figma.createFrame();
  badge.name = "annotation: " + tag;
  badge.resize(label.width + 8, 16);
  badge.cornerRadius = 4;
  badge.fills = [{ type: "SOLID", color: { r: 0.64, g: 0.16, b: 0.68 }, opacity: 0.9 }];

  badge.appendChild(label);
  label.x = 4;
  label.y = 2;

  // Position badge at top-left of the frame
  frame.appendChild(badge);
  badge.x = 0;
  badge.y = -18;

  return badge;
}

// Recursively collect all text nodes
function collectTexts(node, results) {
  if (node.type === "text" && node.text) {
    results.push(node);
  }
  if (node.children) {
    for (var i = 0; i < node.children.length; i++) {
      collectTexts(node.children[i], results);
    }
  }
}

// Apply text label to Button instance
async function applyButtonContent(instance, data) {
  var label = data.text || "";
  if (!label && data.children) {
    var texts = [];
    collectTexts(data, texts);
    if (texts.length > 0) label = texts[0].text;
  }
  if (label) {
    try {
      await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
      instance.setProperties({ "Edit button label#12484:5": label });
    } catch (e) {}
  }
}

// Apply text label to Badge instance
async function applyBadgeContent(instance, data) {
  var label = data.text || "";
  if (!label && data.children) {
    var texts = [];
    collectTexts(data, texts);
    if (texts.length > 0) label = texts[0].text;
  }
  if (label) {
    try {
      await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
      instance.setProperties({ "Edit label#13032:18": label });
    } catch (e) {}
  }
}

async function createNode(data, parent, parentX, parentY, siblingTags) {
  if (!data || !data.type) return null;

  // Skip sgds-masthead if sgds-mainnav is a sibling (Main Nav already includes banner)
  if (data.tag === "sgds-masthead" && siblingTags && siblingTags.indexOf("sgds-mainnav") >= 0) {
    return null;
  }

  // Skip overlay elements — apply as fill on parent instead of creating child frame
  // Overlays are position:absolute in CSS and same size as parent (they shouldn't be in auto-layout)
  var nodeName = data.name || "";
  if (nodeName.indexOf("sgds:bg-overlay") >= 0 || nodeName.indexOf("bg-overlay") >= 0) {
    // Apply semi-transparent dark fill to the parent
    if (parent && parent.type === "FRAME") {
      var existingFills = parent.fills ? JSON.parse(JSON.stringify(parent.fills)) : [];
      existingFills.push({
        type: "SOLID",
        color: { r: 0, g: 0, b: 0 },
        opacity: 0.5
      });
      parent.fills = existingFills;
    }
    return null;
  }

  // Import library components only for structurally complex web components
  // (their shadow DOM internals don't capture well as raw frames)
  if (data.tag && isSgdsComponent(data.tag)) {
    var sgdsNode = await createSgdsComponent(data, parent, parentX, parentY, siblingTags);
    if (sgdsNode) return sgdsNode;
  }

  if (data.type === "text" && data.text) {
    return await createTextNode(data, parent, parentX, parentY);
  }

  if (data.type === "image") {
    return createImageNode(data, parent, parentX, parentY);
  }

  return await createFrameNode(data, parent, parentX, parentY);
}

// Parse sgds: class names from node name and try to bind variables
async function applyTokenBindings(node, data) {
  var name = data.name || "";

  // Look for sgds:bg-* pattern (background color)
  var bgMatch = name.match(/sgds:bg-([a-z0-9-]+)/);
  if (bgMatch) {
    var bgToken = "bg-" + bgMatch[1];
    var bgKey = findVariableKey(bgToken);
    if (bgKey) {
      try {
        var bgVar = await importVariable(bgKey);
        if (bgVar) {
          var paint = figma.variables.setBoundVariableForPaint(
            { type: "SOLID", color: { r: 0, g: 0, b: 0 } },
            "color",
            bgVar
          );
          node.fills = [paint];
          return true;
        }
      } catch (e) {}
    }
  }

  // Look for sgds:text-* pattern (text color) — for text nodes
  var textMatch = name.match(/sgds:text-([a-z0-9-]+)/);
  if (textMatch && node.type === "TEXT") {
    var textToken = "text-" + textMatch[1];
    var textKey = findVariableKey(textToken);
    if (textKey) {
      try {
        var textVar = await importVariable(textKey);
        if (textVar) {
          var textPaint = figma.variables.setBoundVariableForPaint(
            { type: "SOLID", color: { r: 0, g: 0, b: 0 } },
            "color",
            textVar
          );
          node.fills = [textPaint];
        }
      } catch (e) {}
    }
  }

  return false;
}

// Look up Figma variable key from tailwind class token
function findVariableKey(token) {
  // Direct match: "bg-surface-default" → key
  if (SGDS_VARIABLE_MAP[token]) return SGDS_VARIABLE_MAP[token];

  // Try without "bg-" prefix for surface tokens: "bg-surface-default" already handled above
  // Try alternate patterns for fuzzy matching
  // e.g. "bg-primary-default" could be "bg-primary-surface-default"
  var withSurface = token.replace(/^(bg-[a-z]+)-(default|emphasis|muted)$/, "$1-surface-$2");
  if (SGDS_VARIABLE_MAP[withSurface]) return SGDS_VARIABLE_MAP[withSurface];

  return null;
}

async function importVariable(key) {
  if (importedVariables[key]) return importedVariables[key];
  try {
    var variable = await figma.variables.importVariableByKeyAsync(key);
    importedVariables[key] = variable;
    return variable;
  } catch (e) {
    return null;
  }
}

async function createFrameNode(data, parent, parentX, parentY) {
  var frame = figma.createFrame();
  frame.name = data.name || data.tag || "frame";

  frame.x = (data.x || 0) - parentX;
  frame.y = (data.y || 0) - parentY;
  frame.resize(Math.max(data.width || 1, 1), Math.max(data.height || 1, 1));

  var styles = data.styles || {};

  // Try to bind SGDS variable token first
  var boundToVariable = await applyTokenBindings(frame, data);

  if (!boundToVariable) {
    if (styles.backgroundColor) {
      var bg = styles.backgroundColor;
      frame.fills = [
        {
          type: "SOLID",
          color: { r: bg.r, g: bg.g, b: bg.b },
          opacity: bg.a !== undefined ? bg.a : 1
        }
      ];
    } else {
      frame.fills = [];
    }
  }

  if (styles.borderRadius) {
    frame.cornerRadius = styles.borderRadius;
  }

  if (styles.border && styles.border.width > 0 && styles.border.color) {
    var bc = styles.border.color;
    frame.strokes = [
      {
        type: "SOLID",
        color: { r: bc.r, g: bc.g, b: bc.b },
        opacity: bc.a !== undefined ? bc.a : 1
      }
    ];
    frame.strokeWeight = styles.border.width;
  }

  if (styles.boxShadow) {
    var s = styles.boxShadow;
    var sc = s.color || { r: 0, g: 0, b: 0, a: 0.25 };
    frame.effects = [
      {
        type: "DROP_SHADOW",
        visible: true,
        blendMode: "NORMAL",
        offset: { x: s.offsetX, y: s.offsetY },
        radius: s.blur,
        spread: s.spread || 0,
        color: { r: sc.r, g: sc.g, b: sc.b, a: sc.a !== undefined ? sc.a : 0.25 }
      }
    ];
  }

  if (styles.opacity !== undefined) {
    frame.opacity = styles.opacity;
  }

  frame.clipsContent = !!styles.clipContent;

  parent.appendChild(frame);

  // Simple absolute positioning — honour DOM dimensions exactly
  var thisX = data.x || 0;
  var thisY = data.y || 0;

  if (data.children) {
    for (var i = 0; i < data.children.length; i++) {
      var sibTags = data.children.map(function (ch) {
        return ch.tag || "";
      });
      await createNode(data.children[i], frame, thisX, thisY, sibTags);
    }
  }

  return frame;
}

// Parse spacing classes and apply padding/gap with variable bindings
async function applySpacing(frame, name) {
  if (!name) return;

  // Parse all sgds: spacing classes
  var classes = name.split(/\s+/);
  for (var i = 0; i < classes.length; i++) {
    var cls = classes[i];
    if (cls.indexOf("sgds:") !== 0) continue;
    var token = cls.replace("sgds:", "");

    // Gap: sgds:gap-sm, sgds:gap-layout-md
    var gapMatch = token.match(/^gap-(.+)$/);
    if (gapMatch) {
      var gapKey = resolveSpacingKey(gapMatch[1]);
      if (gapKey) {
        var gapVar = await importVariable(gapKey);
        if (gapVar) {
          // Need auto-layout for gap
          if (frame.layoutMode === "NONE") frame.layoutMode = "VERTICAL";
          frame.setBoundVariable("itemSpacing", gapVar);
        }
      }
      continue;
    }

    // Padding Y: sgds:py-layout-md, sgds:py-xl
    var pyMatch = token.match(/^py-(.+)$/);
    if (pyMatch) {
      var pyKey = resolveSpacingKey(pyMatch[1]);
      if (pyKey) {
        var pyVar = await importVariable(pyKey);
        if (pyVar) {
          if (frame.layoutMode === "NONE") frame.layoutMode = "VERTICAL";
          frame.setBoundVariable("paddingTop", pyVar);
          frame.setBoundVariable("paddingBottom", pyVar);
        }
      }
      continue;
    }

    // Padding X: sgds:px-layout-lg, sgds:px-xl
    var pxMatch = token.match(/^px-(.+)$/);
    if (pxMatch) {
      var pxKey = resolveSpacingKey(pxMatch[1]);
      if (pxKey) {
        var pxVar = await importVariable(pxKey);
        if (pxVar) {
          if (frame.layoutMode === "NONE") frame.layoutMode = "VERTICAL";
          frame.setBoundVariable("paddingLeft", pxVar);
          frame.setBoundVariable("paddingRight", pxVar);
        }
      }
      continue;
    }

    // Padding all: sgds:p-xl
    var pMatch = token.match(/^p-(.+)$/);
    if (pMatch && !token.match(/^p[xytblr]-/)) {
      var pKey = resolveSpacingKey(pMatch[1]);
      if (pKey) {
        var pVar = await importVariable(pKey);
        if (pVar) {
          if (frame.layoutMode === "NONE") frame.layoutMode = "VERTICAL";
          frame.setBoundVariable("paddingTop", pVar);
          frame.setBoundVariable("paddingBottom", pVar);
          frame.setBoundVariable("paddingLeft", pVar);
          frame.setBoundVariable("paddingRight", pVar);
        }
      }
      continue;
    }

    // Padding top: sgds:pt-*
    var ptMatch = token.match(/^pt-(.+)$/);
    if (ptMatch) {
      var ptKey = resolveSpacingKey(ptMatch[1]);
      if (ptKey) {
        var ptVar = await importVariable(ptKey);
        if (ptVar) {
          if (frame.layoutMode === "NONE") frame.layoutMode = "VERTICAL";
          frame.setBoundVariable("paddingTop", ptVar);
        }
      }
      continue;
    }

    // Padding bottom: sgds:pb-*
    var pbMatch = token.match(/^pb-(.+)$/);
    if (pbMatch) {
      var pbKey = resolveSpacingKey(pbMatch[1]);
      if (pbKey) {
        var pbVar = await importVariable(pbKey);
        if (pbVar) {
          if (frame.layoutMode === "NONE") frame.layoutMode = "VERTICAL";
          frame.setBoundVariable("paddingBottom", pbVar);
        }
      }
      continue;
    }

    // Margin → Padding conversion (Figma has no margins)
    // sgds:mb-xl → paddingBottom, sgds:mt-lg → paddingTop
    var mbMatch = token.match(/^mb-(.+)$/);
    if (mbMatch) {
      var mbKey = resolveSpacingKey(mbMatch[1]);
      if (mbKey) {
        var mbVar = await importVariable(mbKey);
        if (mbVar) {
          if (frame.layoutMode === "NONE") frame.layoutMode = "VERTICAL";
          frame.setBoundVariable("paddingBottom", mbVar);
        }
      }
      continue;
    }

    var mtMatch = token.match(/^mt-(.+)$/);
    if (mtMatch) {
      var mtKey = resolveSpacingKey(mtMatch[1]);
      if (mtKey) {
        var mtVar = await importVariable(mtKey);
        if (mtVar) {
          if (frame.layoutMode === "NONE") frame.layoutMode = "VERTICAL";
          frame.setBoundVariable("paddingTop", mtVar);
        }
      }
      continue;
    }
  }
}

// Parse column span from sgds-col-* class name
// Prioritizes largest breakpoint: sgds-col-lg-4 > sgds-col-md-6 > sgds-col-4
function parseColSpan(name) {
  // Check from largest breakpoint down: 2-xl, xl, lg, md, sm, base
  var match2xl = name.match(/sgds-col-2-xl-(\d+)/);
  if (match2xl) return parseInt(match2xl[1]);

  var matchXl = name.match(/sgds-col-xl-(\d+)/);
  if (matchXl) return parseInt(matchXl[1]);

  var matchLg = name.match(/sgds-col-lg-(\d+)/);
  if (matchLg) return parseInt(matchLg[1]);

  var matchMd = name.match(/sgds-col-md-(\d+)/);
  if (matchMd) return parseInt(matchMd[1]);

  var matchSm = name.match(/sgds-col-sm-(\d+)/);
  if (matchSm) return parseInt(matchSm[1]);

  // Base: sgds-col-4 (but not sgds-col-lg-4 etc.)
  var matchBase = name.match(/sgds-col-(\d+)/);
  if (matchBase) return parseInt(matchBase[1]);

  return 0;
}

// Resolve a spacing token to a variable key
// e.g. "layout-md" → layout padding md key, "sm" → semantic gap sm key
function resolveSpacingKey(token) {
  // Direct match: "sm", "md", "xl", "layout-md"
  if (SGDS_SPACING_MAP[token]) return SGDS_SPACING_MAP[token];

  // "layout-md" for padding context
  if (SGDS_SPACING_MAP["layout-" + token]) return SGDS_SPACING_MAP["layout-" + token];

  return null;
}

async function createTextNode(data, parent, parentX, parentY) {
  var textNode = figma.createText();
  textNode.name = data.name || "text";

  textNode.x = (data.x || 0) - parentX;
  textNode.y = (data.y || 0) - parentY;

  var ts = data.textStyles || {};
  var fontFamily = ts.fontFamily || "Inter";
  var fontWeight = ts.fontWeight || "400";
  var figmaStyle = weightToStyle(fontWeight);

  try {
    await figma.loadFontAsync({ family: fontFamily, style: figmaStyle });
    textNode.fontName = { family: fontFamily, style: figmaStyle };
  } catch (e) {
    textNode.fontName = { family: "Inter", style: "Regular" };
  }

  textNode.characters = data.text || "";

  // Determine if text is single-line or multi-line
  var lineHeight = ts.lineHeight && ts.lineHeight > 0 ? ts.lineHeight : (ts.fontSize || 16) * 1.2;
  var isSingleLine = data.height <= lineHeight * 1.5;

  if (isSingleLine) {
    // Single-line: let text auto-size width to avoid wrapping
    textNode.textAutoResize = "WIDTH_AND_HEIGHT";
  } else if (data.width && data.width > 0) {
    // Multi-line: fix width, let height grow
    textNode.resize(data.width, Math.max(data.height || 20, 1));
    textNode.textAutoResize = "HEIGHT";
  }

  if (ts.fontSize) textNode.fontSize = ts.fontSize;

  if (ts.lineHeight && ts.lineHeight > 0) {
    textNode.lineHeight = { unit: "PIXELS", value: ts.lineHeight };
  }

  if (ts.letterSpacing) {
    textNode.letterSpacing = { unit: "PIXELS", value: ts.letterSpacing };
  }

  if (ts.textAlign) {
    var alignMap = {
      left: "LEFT",
      center: "CENTER",
      right: "RIGHT",
      justify: "JUSTIFIED",
      start: "LEFT",
      end: "RIGHT"
    };
    textNode.textAlignHorizontal = alignMap[ts.textAlign] || "LEFT";
  }

  if (ts.color) {
    textNode.fills = [
      {
        type: "SOLID",
        color: { r: ts.color.r, g: ts.color.g, b: ts.color.b },
        opacity: ts.color.a !== undefined ? ts.color.a : 1
      }
    ];
  }

  parent.appendChild(textNode);
  return textNode;
}

function createImageNode(data, parent, parentX, parentY) {
  var rect = figma.createRectangle();
  rect.name = data.name || "image";

  rect.x = (data.x || 0) - parentX;
  rect.y = (data.y || 0) - parentY;
  rect.resize(Math.max(data.width || 100, 1), Math.max(data.height || 100, 1));

  rect.fills = [{ type: "SOLID", color: { r: 0.85, g: 0.85, b: 0.85 } }];

  var styles = data.styles || {};
  if (styles.borderRadius) {
    rect.cornerRadius = styles.borderRadius;
  }

  parent.appendChild(rect);
  return rect;
}

function weightToStyle(weight) {
  var w = parseInt(weight) || 400;
  if (w <= 100) return "Thin";
  if (w <= 200) return "Extra Light";
  if (w <= 300) return "Light";
  if (w <= 400) return "Regular";
  if (w <= 500) return "Medium";
  if (w <= 600) return "Semi Bold";
  if (w <= 700) return "Bold";
  if (w <= 800) return "Extra Bold";
  return "Black";
}
