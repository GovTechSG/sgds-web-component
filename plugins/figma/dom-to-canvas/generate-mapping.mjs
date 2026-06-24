#!/usr/bin/env node
/**
 * Generate DOM-to-Figma Mapping Configuration
 *
 * Reads:
 *   - discovered-props.json (Figma component properties from REST API)
 *   - manual-overrides.json (hand-maintained semantic mappings)
 *
 * Outputs:
 *   - generated-config.js (complete config ready to paste into code.js)
 *
 * Usage:
 *   node plugins/figma/dom-to-canvas/generate-mapping.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- Load inputs ---
const discoveredProps = JSON.parse(
  readFileSync(resolve(__dirname, "discovered-props.json"), "utf-8")
);
const overrides = JSON.parse(
  readFileSync(resolve(__dirname, "manual-overrides.json"), "utf-8")
);

// --- Generate SGDS_COMPONENT_MAP ---
function generateComponentMap() {
  const map = {};
  for (const [tag, data] of Object.entries(discoveredProps)) {
    map[tag] = { key: data.key, name: data.name };
  }

  // Add aliases that share keys (Card variants)
  if (map["sgds-card"]) {
    map["sgds-thumbnail-card"] = {
      key: map["sgds-card"].key,
      name: "Card",
      nestedProps: { Variant: "thumbnail" },
    };
    map["sgds-icon-card"] = {
      key: map["sgds-card"].key,
      name: "Card",
      nestedProps: { Variant: "icon" },
    };
  }

  return map;
}

// --- Generate ATTR_TO_VARIANT_PROP ---
function generateAttrToVariantProp() {
  // Collect all variant property names across all components
  const allVariantProps = new Set();
  for (const data of Object.values(discoveredProps)) {
    for (const prop of Object.keys(data.variantProperties)) {
      allVariantProps.add(prop);
    }
  }

  // Map: lowercase/kebab version of Figma prop name → Figma prop name
  // Only include props where the DOM attr name would logically match
  const mapping = {};
  // Maps Figma variant prop name → DOM attribute name
  const knownMappings = {
    Variant: "variant",
    Size: "size",
    Tone: "tone",
    Density: "density",
    Orientation: "orientation",
    Outlined: "outlined",
    Dismissible: "dismissible",
    Thickness: "thickness",
    State: "state",
  };

  for (const prop of allVariantProps) {
    // Find the DOM attr name for this Figma prop
    const domAttr = Object.entries(knownMappings).find(
      ([figma]) => figma === prop
    );
    if (domAttr) {
      mapping[domAttr[1]] = prop;
    }
  }

  return mapping;
}

// --- Generate ATTR_VALUE_MAP ---
function generateAttrValueMap() {
  // Collect all variant values that have parenthetical suffixes or differ from DOM values
  const valueMap = {
    // Boolean-like
    true: "True",
    false: "False",
    // Size with suffix
    md: "md (default)",
    // Tone values (spaces vs hyphens)
    "fixed-light": "fixed light (white)",
    "fixed-dark": "fixed dark",
    // Variant aliases
    outline: "outline (secondary)",
    ghost: "ghost (tertiary)",
    // Thickness
    thin: "thin (default)",
  };

  return valueMap;
}

// --- Generate COMPONENT_SLOT_CONFIG ---
function generateSlotConfig() {
  const config = {};

  for (const [tag, data] of Object.entries(discoveredProps)) {
    const entry = {};

    // --- attrOverrides ---
    if (overrides.attrOverrides && overrides.attrOverrides[tag]) {
      entry.attrOverrides = overrides.attrOverrides[tag];
    }

    // --- slots (from manual slotMapping) ---
    if (overrides.slotMapping && overrides.slotMapping[tag]) {
      entry.slots = overrides.slotMapping[tag];
    }

    // --- iconSlots → merge into slots ---
    if (overrides.iconSlots && overrides.iconSlots[tag]) {
      if (!entry.slots) entry.slots = {};
      Object.assign(entry.slots, overrides.iconSlots[tag]);
    }

    // --- textProps (from manual textMapping) ---
    if (overrides.textMapping && overrides.textMapping[tag]) {
      entry.textProps = overrides.textMapping[tag];
    }

    // --- structureName ---
    if (overrides.structureNames && overrides.structureNames[tag]) {
      entry.structureName = overrides.structureNames[tag];
    }

    // --- cardSlots → merge into slots ---
    if (overrides.cardSlots && overrides.cardSlots[tag]) {
      if (!entry.slots) entry.slots = {};
      Object.assign(entry.slots, overrides.cardSlots[tag]);
    }

    // --- itemPattern ---
    if (overrides.itemPatterns && overrides.itemPatterns[tag]) {
      const ip = overrides.itemPatterns[tag];
      entry.itemPattern = ip.pattern;
      entry.itemProps = ip.itemProps || {};
      if (ip.childCountVariant) {
        entry.childCountVariant = {
          prop: ip.childCountVariant,
          childTag: ip.childTag,
        };
      }
    }

    // --- valueOverrides (component-specific value mappings) ---
    if (overrides.valueOverrides && overrides.valueOverrides[tag]) {
      entry.valueOverrides = overrides.valueOverrides[tag];
    }

    // Only add if non-empty
    if (Object.keys(entry).length > 0) {
      config[tag] = entry;
    }
  }

  return config;
}

// --- Format as JS ---
function formatJs(componentMap, attrToVariant, attrValueMap, slotConfig) {
  let js = `// =============================================================================
// AUTO-GENERATED CONFIGURATION — ${new Date().toISOString().split("T")[0]}
// Generated by: node plugins/figma/dom-to-canvas/generate-mapping.mjs
// Sources: discovered-props.json + manual-overrides.json
// =============================================================================

`;

  // --- SGDS_COMPONENT_MAP ---
  js += "var SGDS_COMPONENT_MAP = {\n";
  for (const [tag, data] of Object.entries(componentMap)) {
    if (data.nestedProps) {
      js += `  "${tag}": { key: "${data.key}", name: "${data.name}", nestedProps: ${JSON.stringify(data.nestedProps)} },\n`;
    } else {
      js += `  "${tag}": { key: "${data.key}", name: "${data.name}" },\n`;
    }
  }
  js += "};\n\n";

  // --- ATTR_TO_VARIANT_PROP ---
  js += "var ATTR_TO_VARIANT_PROP = {\n";
  for (const [attr, prop] of Object.entries(attrToVariant)) {
    js += `  ${attr}: "${prop}",\n`;
  }
  js += "};\n\n";

  // --- ATTR_VALUE_MAP ---
  js += "var ATTR_VALUE_MAP = {\n";
  for (const [value, mapped] of Object.entries(attrValueMap)) {
    js += `  "${value}": "${mapped}",\n`;
  }
  js += "};\n\n";

  // --- COMPONENT_SLOT_CONFIG ---
  js += "var COMPONENT_SLOT_CONFIG = {\n";
  for (const [tag, config] of Object.entries(slotConfig)) {
    js += `  "${tag}": ${JSON.stringify(config, null, 4).replace(/\n/g, "\n  ")},\n`;
  }
  js += "};\n";

  return js;
}

// --- Also generate a reference comment block showing all Figma properties per component ---
function generateReference() {
  let ref = `// =============================================================================
// FIGMA PROPERTY REFERENCE (from discovered-props.json)
// Use this to understand what's available for each component
// =============================================================================

`;

  for (const [tag, data] of Object.entries(discoveredProps)) {
    ref += `// --- ${tag} (${data.name}) ---\n`;

    // Variant properties
    if (Object.keys(data.variantProperties).length > 0) {
      ref += `//   Variants:\n`;
      for (const [prop, values] of Object.entries(data.variantProperties)) {
        ref += `//     ${prop}: ${values.join(", ")}\n`;
      }
    }

    // Boolean properties
    const booleans = Object.entries(data.componentProperties.boolean);
    if (booleans.length > 0) {
      ref += `//   Booleans:\n`;
      for (const [key, val] of booleans) {
        ref += `//     "${key}" (default: ${val.defaultValue})\n`;
      }
    }

    // Text properties
    const texts = Object.entries(data.componentProperties.text);
    if (texts.length > 0) {
      ref += `//   Text:\n`;
      for (const [key, val] of texts) {
        ref += `//     "${key}" (default: "${val.defaultValue}")\n`;
      }
    }

    // Instance swap properties
    const swaps = Object.entries(data.componentProperties.instanceSwap);
    if (swaps.length > 0) {
      ref += `//   Instance Swaps:\n`;
      for (const [key] of swaps) {
        ref += `//     "${key}"\n`;
      }
    }

    // Nested instances (unique names only)
    if (data.nestedInstances.length > 0) {
      const uniqueNames = [
        ...new Set(data.nestedInstances.map((i) => i.name)),
      ];
      ref += `//   Nested instances: ${uniqueNames.join(", ")}\n`;
    }

    // Item patterns
    if (data.itemPatterns.length > 0) {
      ref += `//   Item patterns: ${data.itemPatterns.map((p) => `"${p.pattern}" (x${p.count})`).join(", ")}\n`;
    }

    ref += `//\n`;
  }

  return ref;
}

// --- Main ---
function main() {
  console.log("=== Generating DOM-to-Figma Mapping ===\n");

  const componentMap = generateComponentMap();
  const attrToVariant = generateAttrToVariantProp();
  const attrValueMap = generateAttrValueMap();
  const slotConfig = generateSlotConfig();

  console.log(`Components: ${Object.keys(componentMap).length}`);
  console.log(`Variant props mapped: ${Object.keys(attrToVariant).length}`);
  console.log(`Value overrides: ${Object.keys(attrValueMap).length}`);
  console.log(
    `Slot configs: ${Object.keys(slotConfig).length} components configured`
  );

  // Generate output
  const jsConfig = formatJs(componentMap, attrToVariant, attrValueMap, slotConfig);
  const reference = generateReference();

  const output = jsConfig + "\n\n" + reference;
  const outputPath = resolve(__dirname, "generated-config.js");
  writeFileSync(outputPath, output);
  console.log(`\nWritten: ${outputPath}`);

  // Also output a summary of what's configured vs not
  console.log("\n=== Coverage Summary ===");
  const configured = new Set(Object.keys(slotConfig));
  const all = new Set(Object.keys(discoveredProps));
  const unconfigured = [...all].filter((t) => !configured.has(t));

  console.log(`\nConfigured (${configured.size}): ${[...configured].sort().join(", ")}`);
  console.log(`\nUnconfigured (${unconfigured.length}): ${unconfigured.sort().join(", ")}`);
  console.log(
    "\nUnconfigured components have no special slot/text/item handling — they use variant matching only."
  );
}

main();
