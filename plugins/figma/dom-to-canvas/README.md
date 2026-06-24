# SGDS DOM-to-Canvas Figma Plugin

Converts a captured DOM tree (JSON) into Figma frames and SGDS library component instances.

## Flow

```
Chrome Extension (captures DOM) → JSON → Plugin UI (paste) → Plugin Code (creates Figma nodes)
```

## Files

| File | Role |
|------|------|
| `manifest.json` | Plugin metadata (id, entry points) |
| `ui.html` | Textarea for pasting JSON, import button, progress bar |
| `code.js` | Main engine — parses DOM JSON, creates Figma nodes |

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  CONFIGURATION TABLES                                   │
├─────────────────────────────────────────────────────────┤
│  SGDS_COMPONENT_MAP       — tag → Figma component key   │
│  VARIABLE_KEYS            — token name → variable key   │
│  ATTR_TO_VARIANT_PROP     — DOM attr → Figma prop name  │
│  ATTR_VALUE_MAP           — code values → Figma values  │
│  COMPONENT_SLOT_CONFIG    — per-component slot/text     │
│                             property mappings            │
│  COMPONENT_TEXT_PROPS     — tag → default text prop key │
│  NO_RESIZE_TAGS           — components to skip resize   │
├─────────────────────────────────────────────────────────┤
│  ENTRY POINT                                            │
│  figma.ui.onmessage → creates root frame, walks tree   │
├─────────────────────────────────────────────────────────┤
│  RECURSIVE TREE WALKER                                  │
│  createNode() — dispatches per node type:               │
│    ├── SGDS tag? → createSgdsComponent()                │
│    ├── text?     → createTextNode()                     │
│    ├── image?    → createImageNode()                    │
│    └── element?  → createFrameNode() (recurses)         │
├─────────────────────────────────────────────────────────┤
│  COMPONENT CREATION                                     │
│  createSgdsComponent():                                 │
│    1. Import ComponentSet by key (cached)               │
│    2. Match variant from DOM attrs                      │
│    3. Create instance, position, resize                 │
│    4. Apply content via config-driven pipeline:         │
│       ├── applySlotContent()         — named slots      │
│       ├── applyItemPattern()         — repeated items   │
│       ├── applyCardContent()         — card-specific    │
│       ├── applyCardContentHeuristic  — fallback cards   │
│       └── applyComponentText()       — generic text     │
├─────────────────────────────────────────────────────────┤
│  SLOT / SWAP HELPERS                                    │
│  importSlottedComponent()    — import nested component  │
│  createLocalSlotComponent()  — local comp for non-SGDS  │
│  swapSlotInstance()          — swap into slot frame     │
│  findSwappedInstance()       — find swapped instance    │
│  applySlottedComponentText() — set text + icon state    │
├─────────────────────────────────────────────────────────┤
│  STYLING                                                │
│  applyTokenBindings() — bind sgds: CSS class names to   │
│  Figma variables (bg color, text color, border radius)  │
└─────────────────────────────────────────────────────────┘
```

## Key Concepts

- **Config-driven**: Each component's Figma property keys are declared in `COMPONENT_SLOT_CONFIG`. The engine reads DOM slots/attrs and maps them to Figma properties via `setProperties()`.
- **Variant matching**: DOM attributes (`variant`, `tone`, `size`, `outlined`) are scored against Figma variant properties to pick the best match.
- **Item patterns**: Components with repeated children (accordion, icon-list, description-list, stepper, tabs) use `itemPattern` to map DOM children to numbered Figma instances (e.g. "Icon list 1", "Icon list 2"). Unused instances beyond DOM count are hidden.
- **Slot swapping**: Nested SGDS components in slots (e.g. badge inside card upper slot) are imported and swapped via `INSTANCE_SWAP` properties.
- **Fallback**: If a component import fails, the node falls through to `createFrameNode()` which renders it as a positioned rectangle with recursive children.
- **Token bindings**: `sgds:bg-*`, `sgds:text-*` class names are parsed and bound to Figma variables for theme-aware fills/colors.

## Component Mappings

### Cards (sgds-card, sgds-icon-card, sgds-thumbnail-card, sgds-image-card)

| Feature | Mapping |
|---------|---------|
| Title | Card header → `↳ Edit text #29055:26` |
| Subtitle | Card header → `↳ Edit text#29055:29` (bool: `Subtitle#29055:23`) |
| Description | Card header → `↳ Edit text  #30610:3` (bool: `Description#30610:0`) |
| Upper slot | Bool: `🔷 Upper slot`, Swap: `↳ Swap instance (upper)` |
| Lower slot | Bool: `🔷 Lower slot`, Swap: `↳ Swap instance (lower)` |
| Badge in slot | Imported + swapped, text applied, icon bool set from DOM children |

### Button (sgds-button)

| Feature | Mapping |
|---------|---------|
| Label | `Edit button label#12484:5` |
| Leading icon | Bool: `Leading icon#12484:3`, Swap: `↳ Select icon#17388:71` |
| Trailing icon | Bool: `Trailing icon#12484:1`, Swap: `↳ Select icon #17388:169` |

### Accordion (sgds-accordion)

| Feature | Mapping |
|---------|---------|
| Item pattern | `↳ Accordion N` |
| Title | `Edit title#16551:8` |
| Badge | Bool: `Badge#29585:8`, Swap: `↳ 🔷 Swap instance#16545:8` |
| Icon | Bool: `Icon#29595:24`, Swap: `↳ Select icon#29595:46` |
| Variant override | DOM `variant="border"` → Figma `Border=True` |

### Alert (sgds-alert)

| Feature | Mapping |
|---------|---------|
| Title | `↳ Edit text#15588:34` (bool: `Title#15588:17`) |
| Description | `Edit description#13094:45` |
| Action slot | Bool: `🔷 Action slot#29246:0`, Swap: `↳ Swap instance#29246:11` |

### Toast (sgds-toast)

| Feature | Mapping |
|---------|---------|
| Title | `↳ Edit text#16370:284` (bool: `Title#29198:3`) |
| Message | `Edit message#16370:290` |
| Action | Bool: `Action#16370:296` |

### Badge (sgds-badge)

| Feature | Mapping |
|---------|---------|
| Label | `Edit label#13032:18` |
| Icon | Bool: `Icon` — set to `false` when no `<sgds-icon slot="icon">` child |

### Link (sgds-link)

| Feature | Mapping |
|---------|---------|
| Text | `Edit link#16010:0` |
| Leading icon | Bool: `Leading icon#15978:6`, Swap: `↳ Select icon#17388:0` |
| Trailing icon | Bool: `Trailing icon#15978:15`, Swap: `↳ Select icon #17388:25` |

### Form Components (sgds-select, sgds-combo-box, sgds-textarea, sgds-datepicker, sgds-file-upload)

| Feature | Mapping |
|---------|---------|
| Label | `↳ Edit text #16273:0` (bool: `Label#16252:5`) |
| Placeholder | `↳ Edit text  #16273:12` (bool: `Placeholder text#16259:126`) |
| Hint | `↳ Edit text   #16273:36` (bool: `Hint text#16252:0`) |

### Form Controls (sgds-checkbox, sgds-radio, sgds-switch, sgds-spinner)

| Feature | Mapping |
|---------|---------|
| Label | Component-specific text key with boolean toggle |

### Form Groups (sgds-checkbox-group, sgds-radio-group, sgds-quantity-toggle)

| Feature | Mapping |
|---------|---------|
| Label | Bool toggle |
| Hint | Bool toggle |

### Item Pattern Components

| Component | Pattern | Per-Item Props |
|-----------|---------|---------------|
| sgds-description-list | `List N` | label, data, slot1 (bool+swap), slot2 (bool+swap) |
| sgds-icon-list | `Icon list N` | label, icon (swap) |
| sgds-tab | `Tab N` | label, badge (bool) |
| sgds-stepper | `↳ Step N` | label |

### Other Components

| Component | Mapping |
|-----------|---------|
| sgds-footer | site title (bool), site description (bool) |
| sgds-mainnav | brand (swap), slot (bool) |
| sgds-sidebar | upper (bool+swap), lower (bool+swap) |
| sgds-dropdown | top (bool+swap), bottom (bool+swap) |
| sgds-pagination | description text |
| sgds-table-of-contents | header text |
| sgds-icon-button | icon (swap) |
| sgds-system-banner | message text |
| sgds-modal / sgds-drawer | footer slot |

### Import-Only (no content mapping)

These are imported and placed with default Figma content:

`sgds-masthead`, `sgds-breadcrumb`, `sgds-close-button`, `sgds-divider`, `sgds-skeleton`, `sgds-subnav`, `sgds-sidenav`, `sgds-tooltip`
