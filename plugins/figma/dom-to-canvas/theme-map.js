/**
 * SGDS Theming → Figma Variable Mode Mapping
 *
 * Maps DOM theme indicators to Figma variable collection modes.
 *
 * DOM detection:
 *   - data.theme.agency → "gt" means GovTech brand
 *   - data.theme.color → "pink", "blue", etc. → GT brand mode
 *   - html class "sgds-night-theme" → Dark mode
 *   - No theme → default SGDS (purple, light)
 *
 * Figma application:
 *   - Set variable mode on root frame via setExplicitVariableModeForCollection()
 *   - Mode collection: Light/Dark
 *   - GT Brand collection: purple/cyan/blue/magenta/pink/red
 *   - Product collection: SGDS/DevConsole/STACK X/TechPass/DevPortal
 */

// Variable Collection IDs and their mode mappings
export var THEME_COLLECTIONS = {
  // Day/Night mode (Light = day.css, Dark = night.css + .sgds-night-theme)
  mode: {
    collectionId: "VariableCollectionId:8059:8595",
    collectionKey: "9d900397f8f0b2c7b972c7a7e271382ea9fcef95",
    modes: {
      light: "10388:0",
      dark: "10388:1"
    }
  },

  // GovTech brand colors (one of 6 palettes)
  gtBrand: {
    collectionId: "VariableCollectionId:33495:17427",
    collectionKey: "23e086fd1c3e03221b79847965afd45932e1cbc0",
    modes: {
      purple: "33503:4",  // default
      cyan: "33495:0",
      blue: "33503:3",
      magenta: "33503:1",
      pink: "33503:5",
      red: "33503:2"
    }
  },

  // Product-specific themes
  product: {
    collectionId: "VariableCollectionId:29541:58337",
    collectionKey: "3c35b193196ec2cbcaa961c799729c93d8bac029",
    modes: {
      sgds: "29541:4",        // default
      devconsole: "29541:0",
      stackx: "29541:1",
      techpass: "29541:2",
      devportal: "29541:3"
    }
  }
};

// GT Brand variable keys (gt/color/100 through gt/color/900)
export var GT_BRAND_VARIABLES = {
  "gt/color/100": { key: "27a6a26ef1733c507144f459ff6c76bb0c4d0425", id: "VariableID:33495:17450" },
  "gt/color/200": { key: "4fc944784ef3f6a6ac8d84de1ce7d2edab1baabc", id: "VariableID:33495:17452" },
  "gt/color/300": { key: "211a8511eb39ddd6e50610e8c4570a16df898d8e", id: "VariableID:33495:17455" },
  "gt/color/400": { key: "10ebc38fe2395c5bf90270ce91b5ff2d7f5b5ae4", id: "VariableID:33495:17451" },
  "gt/color/500": { key: "2f213d2725ac7dd6b3ca01ecc6f20b2589b0930b", id: "VariableID:33495:17453" },
  "gt/color/600": { key: "16816de12631fb2ada9d065cef7f7a8ea9cf5b6d", id: "VariableID:33495:17449" },
  "gt/color/700": { key: "22a3ad41b0321f7adc50ea6348e5bfa317bc46fe", id: "VariableID:33495:17448" },
  "gt/color/800": { key: "018bd6c6d903835ad3eb8e51de74a8baedd6cf0a", id: "VariableID:33495:17454" },
  "gt/color/900": { key: "91351b47f2aea37d3e23ad6804c81358322489cd", id: "VariableID:33495:17447" }
};

/**
 * Resolve DOM theme data to Figma variable modes.
 * @param {object} themeData - The captured DOM theme: { agency: "gt", color: "pink" } or null
 * @param {boolean} isNightMode - Whether the page has .sgds-night-theme class
 * @returns {{ modeId: string, collectionId: string }[]} - Array of mode assignments to apply
 */
export function resolveThemeModes(themeData, isNightMode) {
  var modes = [];

  // Day/Night mode
  modes.push({
    collectionId: THEME_COLLECTIONS.mode.collectionId,
    modeId: isNightMode ? THEME_COLLECTIONS.mode.modes.dark : THEME_COLLECTIONS.mode.modes.light
  });

  // GT Brand color
  if (themeData && themeData.agency === "gt" && themeData.color) {
    var gtMode = THEME_COLLECTIONS.gtBrand.modes[themeData.color];
    if (gtMode) {
      modes.push({
        collectionId: THEME_COLLECTIONS.gtBrand.collectionId,
        modeId: gtMode
      });
    }
  }

  return modes;
}
