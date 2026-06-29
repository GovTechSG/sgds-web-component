#!/usr/bin/env node
/**
 * Semi-auto Config Generation for SGDS DOM-to-Figma Plugin
 *
 * Reads discovered-props.json (Figma component metadata) and optionally
 * __fixtures__/*.json (captured DOM JSONs) to generate a draft
 * manual-overrides configuration with best-guess slot/text/item mappings.
 *
 * Uses naming conventions in Figma property keys to infer mappings.
 * Outputs manual-overrides.draft.json for human review.
 *
 * Usage:
 *   node plugins/figma/dom-to-canvas/generate-slot-config.mjs
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DISCOVERED_PATH = resolve(__dirname, "discovered-props.json");
const FIXTURES_DIR = resolve(__dirname, "__fixtures__");
const OUTPUT_PATH = resolve(__dirname, "manual-overrides.draft.json");

// --- Load data ---
const discoveredProps = JSON.parse(readFileSync(DISCOVERED_PATH, "utf-8"));

// Load fixtures if available
let fixtures = {};
if (existsSync(FIXTURES_DIR)) {
  const files = readdirSync(FIXTURES_DIR).filter(f => f.endsWith(".json"));
  for (const file of files) {
    try {
      fixtures[file.replace(".json", "")] = JSON.parse(readFileSync(resolve(FIXTURES_DIR, file), "utf-8"));
    } catch (e) {}
  }
}

// --- Naming convention rules ---

// Infer text mapping from Figma text property keys
function inferTextMappings(tag, props) {
  const textProps = props.componentProperties?.text || {};
  const nestedTexts = {};

  // Collect text props from nested instances too
  for (const nested of props.nestedInstances || []) {
    for (const [key, val] of Object.entries(nested.exposedProperties || {})) {
      if (val.type === "TEXT") {
        nestedTexts[key] = { ...val, instanceName: nested.name };
      }
    }
  }

  const allTexts = { ...textProps };
  for (const [k, v] of Object.entries(nestedTexts)) {
    if (!allTexts[k]) allTexts[k] = v;
  }

  const mapping = {};
  for (const [key, val] of Object.entries(allTexts)) {
    const keyLower = key.toLowerCase();
    let name = null;
    let source = "text";

    // Infer name from key patterns
    if (keyLower.includes("label") || keyLower.includes("button label")) {
      name = "label";
      source = "text";
    } else if (keyLower.includes("title") || keyLower.includes("header")) {
      name = "title";
      source = "attr:title";
    } else if (keyLower.includes("description") || keyLower.includes("message")) {
      name = "description";
      source = "slot:default";
    } else if (keyLower.includes("hint")) {
      name = "hint";
      source = "attr:hintText";
    } else if (keyLower.includes("placeholder")) {
      name = "placeholder";
      source = "attr:placeholder";
    } else if (keyLower.includes("link")) {
      name = "label";
      source = "text";
    } else if (keyLower.includes("feedback")) {
      name = "feedback";
      source = "attr:invalidFeedback";
    } else if (keyLower.includes("subtitle") || keyLower.includes("secondary")) {
      name = "subtitle";
      source = "attr:subtitle";
    }

    if (name) {
      mapping[name] = { key, source };
      if (val.instanceName) mapping[name].instanceName = val.instanceName;
    }
  }

  return mapping;
}

// Infer boolean-to-slot mappings from Figma boolean property keys
function inferSlotMappings(tag, props) {
  const booleans = props.componentProperties?.boolean || {};
  const swaps = props.componentProperties?.instanceSwap || {};
  const mapping = {};

  // Also check nested instance exposed properties
  const allBooleans = { ...booleans };
  const allSwaps = { ...swaps };
  for (const nested of props.nestedInstances || []) {
    for (const [key, val] of Object.entries(nested.exposedProperties || {})) {
      if (val.type === "BOOLEAN") allBooleans[key] = val;
      if (val.type === "INSTANCE_SWAP") allSwaps[key] = val;
    }
  }

  for (const [key, val] of Object.entries(allBooleans)) {
    const keyLower = key.toLowerCase();

    // 🔷 prefix = slot toggle
    if (key.startsWith("🔷")) {
      let slotName = null;
      if (keyLower.includes("upper slot")) slotName = "upper";
      else if (keyLower.includes("lower slot")) slotName = "lower";
      else if (keyLower.includes("action slot") || keyLower.includes("action")) slotName = "action";
      else if (keyLower.includes("default slot")) slotName = "default";
      else if (keyLower.includes("slot top")) slotName = "top";
      else if (keyLower.includes("slot bottom")) slotName = "bottom";
      else if (keyLower.includes("slot")) slotName = "default";

      if (slotName) {
        mapping[slotName] = { booleanKey: key };
        // Try to find matching swap key
        const swapKey = findMatchingSwap(slotName, allSwaps);
        if (swapKey) mapping[slotName].swapKey = swapKey;
      }
    }

    // Icon booleans
    if (keyLower.includes("leading icon")) {
      mapping.leadingIcon = { booleanKey: key };
      const swapKey = findIconSwap("leading", allSwaps);
      if (swapKey) mapping.leadingIcon.swapKey = swapKey;
    } else if (keyLower.includes("trailing icon")) {
      mapping.trailingIcon = { booleanKey: key };
      const swapKey = findIconSwap("trailing", allSwaps);
      if (swapKey) mapping.trailingIcon.swapKey = swapKey;
    } else if (keyLower.match(/^icon#/) && !keyLower.includes("leading") && !keyLower.includes("trailing")) {
      mapping.icon = { booleanKey: key };
      const swapKey = findIconSwap("icon", allSwaps);
      if (swapKey) mapping.icon.swapKey = swapKey;
    }
  }

  return mapping;
}

// Find a swap key matching a slot name
function findMatchingSwap(slotName, swaps) {
  for (const key of Object.keys(swaps)) {
    const keyLower = key.toLowerCase();
    if (slotName === "upper" && keyLower.includes("upper")) return key;
    if (slotName === "lower" && keyLower.includes("lower")) return key;
    if (slotName === "action" && keyLower.includes("action")) return key;
    if (slotName === "default" && keyLower.includes("swap instance") && !keyLower.includes("upper") && !keyLower.includes("lower")) return key;
  }
  return null;
}

// Find icon swap key
function findIconSwap(type, swaps) {
  for (const key of Object.keys(swaps)) {
    const keyLower = key.toLowerCase();
    if (keyLower.includes("select icon")) {
      // Distinguish leading (no trailing space before #) vs trailing (space before #)
      if (type === "leading" && !keyLower.includes("icon ")) return key;
      if (type === "trailing" && keyLower.includes("icon ")) return key;
      if (type === "icon") return key;
    }
  }
  // Fallback: return first select icon swap
  for (const key of Object.keys(swaps)) {
    if (key.toLowerCase().includes("select icon")) return key;
  }
  return null;
}

// Infer item patterns from nested instances
function inferItemPatterns(tag, props) {
  const nested = props.nestedInstances || [];
  if (nested.length < 2) return null;

  // Find numbered sequences (e.g. "Link 1", "Link 2", "Link 3")
  const nameGroups = {};
  for (const inst of nested) {
    const match = inst.name.match(/^(.+?)\s*(\d+)$/);
    if (match) {
      const base = match[1].trim();
      if (!nameGroups[base]) nameGroups[base] = [];
      nameGroups[base].push(inst);
    }
  }

  // Find the largest numbered group (that's likely the item pattern)
  let bestPattern = null;
  let bestCount = 0;
  for (const [pattern, instances] of Object.entries(nameGroups)) {
    if (instances.length > bestCount && instances.length >= 2) {
      // Skip separators
      if (pattern.toLowerCase().includes("seperator") || pattern.toLowerCase().includes("separator")) continue;
      bestCount = instances.length;
      bestPattern = pattern;
    }
  }

  if (!bestPattern) return null;

  // Infer childCountVariant from variant properties
  const variantProps = props.variantProperties || {};
  let childCountVariant = null;
  for (const prop of Object.keys(variantProps)) {
    if (prop.toLowerCase().includes("no.") || prop.toLowerCase().includes("number")) {
      childCountVariant = prop;
      break;
    }
  }

  // Infer childTag from convention: sgds-{component}-item
  const baseName = tag.replace("sgds-", "");
  const childTag = `${tag}-item`;

  // Infer itemProps from first instance's exposed properties
  const firstInst = nameGroups[bestPattern][0];
  const itemProps = {};
  if (firstInst.exposedProperties) {
    for (const [key, val] of Object.entries(firstInst.exposedProperties)) {
      if (val.type === "TEXT") {
        const keyLower = key.toLowerCase();
        if (keyLower.includes("label") || keyLower.includes("text") || keyLower.includes("link") || keyLower.includes("title")) {
          itemProps.label = { key };
        }
      }
      if (val.type === "VARIANT" && key === "State") {
        itemProps.state = { prop: "State", activeValue: "active", defaultValue: "default" };
      }
    }
  }

  return {
    pattern: bestPattern,
    childTag,
    childCountVariant,
    itemProps
  };
}

// Determine confidence level
function assessConfidence(tag, textMapping, slotMapping, itemPattern) {
  let score = 0;
  if (Object.keys(textMapping).length > 0) score++;
  if (Object.keys(slotMapping).length > 0) score++;
  if (itemPattern) score++;

  // High confidence if we matched multiple things
  if (score >= 2) return "high";
  if (score === 1) return "medium";
  return "low";
}

// --- Main inference ---
console.log("=== SGDS Slot Config Generator ===\n");
console.log(`Components in discovered-props: ${Object.keys(discoveredProps).length}`);
console.log(`Fixtures available: ${Object.keys(fixtures).length}\n`);

const draft = {};

for (const [tag, props] of Object.entries(discoveredProps)) {
  const textMapping = inferTextMappings(tag, props);
  const slotMapping = inferSlotMappings(tag, props);
  const itemPattern = inferItemPatterns(tag, props);
  const unmapped = [];

  // Check for properties we couldn't map
  const allBooleans = props.componentProperties?.boolean || {};
  for (const key of Object.keys(allBooleans)) {
    const keyLower = key.toLowerCase();
    if (!key.startsWith("🔷") && !keyLower.includes("icon") && !keyLower.includes("tinted")) {
      // Check if it's already mapped in text (as booleanKey)
      const isMapped = Object.values(textMapping).some(t => t.booleanKey === key);
      if (!isMapped) {
        unmapped.push(`BOOLEAN: ${key}`);
      }
    }
  }

  const confidence = assessConfidence(tag, textMapping, slotMapping, itemPattern);

  draft[tag] = {
    _confidence: confidence,
    _unmapped: unmapped
  };

  if (Object.keys(textMapping).length > 0) draft[tag].textMapping = textMapping;
  if (Object.keys(slotMapping).length > 0) draft[tag].slotMapping = slotMapping;
  if (itemPattern) draft[tag].itemPatterns = itemPattern;
}

// Write output
writeFileSync(OUTPUT_PATH, JSON.stringify(draft, null, 2));
console.log(`\nGenerated: ${OUTPUT_PATH}`);
console.log(`\n=== Summary ===`);

const highConf = Object.values(draft).filter(d => d._confidence === "high").length;
const medConf = Object.values(draft).filter(d => d._confidence === "medium").length;
const lowConf = Object.values(draft).filter(d => d._confidence === "low").length;
const withUnmapped = Object.entries(draft).filter(([_, d]) => d._unmapped.length > 0);

console.log(`  High confidence: ${highConf}`);
console.log(`  Medium confidence: ${medConf}`);
console.log(`  Low confidence: ${lowConf}`);
console.log(`  Components with unmapped properties: ${withUnmapped.length}`);

if (withUnmapped.length > 0) {
  console.log(`\n  Components needing manual review:`);
  for (const [tag, d] of withUnmapped.slice(0, 10)) {
    console.log(`    ${tag}: ${d._unmapped.join(", ")}`);
  }
}
