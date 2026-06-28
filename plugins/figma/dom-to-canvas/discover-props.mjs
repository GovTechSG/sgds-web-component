#!/usr/bin/env node
/**
 * Figma Component Property Discovery Script
 *
 * Queries the Figma REST API to discover all component properties
 * (variants, booleans, text, instance swaps, nested instances)
 * for the SGDS design system library.
 *
 * Usage:
 *   node plugins/figma/dom-to-canvas/discover-props.mjs
 *
 * Requires .env file with FIGMA_TOKEN and FIGMA_FILE_ID
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- Load .env ---
function loadEnv() {
  const envPath = resolve(__dirname, ".env");
  try {
    const content = readFileSync(envPath, "utf-8");
    const vars = {};
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const [key, ...rest] = trimmed.split("=");
      vars[key.trim()] = rest.join("=").trim();
    }
    return vars;
  } catch (e) {
    console.error("Error: .env file not found at", envPath);
    console.error("Create it with FIGMA_TOKEN and FIGMA_FILE_ID");
    process.exit(1);
  }
}

const env = loadEnv();
const TOKEN = env.FIGMA_TOKEN;
const FILE_ID = env.FIGMA_FILE_ID;

if (!TOKEN || !FILE_ID) {
  console.error("Error: FIGMA_TOKEN and FIGMA_FILE_ID must be set in .env");
  process.exit(1);
}

// --- Figma API helpers ---
const API_BASE = "https://api.figma.com/v1";
const HEADERS = { "X-Figma-Token": TOKEN };

async function figmaGet(path) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Figma API ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// --- Name mapping: Figma component name → sgds-* tag ---
// Manually defined because Figma names don't always match tag conventions
const FIGMA_NAME_TO_TAG = {
  "Official Government Banner": "sgds-masthead",
  "Main Nav": "sgds-mainnav",
  Footer: "sgds-footer",
  Button: "sgds-button",
  "Full width button": "sgds-button-fullwidth",
  "Icon button": "sgds-icon-button",
  Card: "sgds-card",
  "Image card": "sgds-image-card",
  "Thumbnail card": "sgds-thumbnail-card",
  Accordion: "sgds-accordion",
  Badge: "sgds-badge",
  Alert: "sgds-alert",
  Breadcrumb: "sgds-breadcrumb",
  Checkbox: "sgds-checkbox",
  "Checkbox group": "sgds-checkbox-group",
  "Close button": "sgds-close-button",
  Combobox: "sgds-combo-box",
  "Date picker": "sgds-datepicker",
  "Description list": "sgds-description-list",
  Divider: "sgds-divider",
  Drawer: "sgds-drawer",
  Dropdown: "sgds-dropdown",
  "File upload": "sgds-file-upload",
  Input: "sgds-input",
  Link: "sgds-link",
  Modal: "sgds-modal",
  "Overflow menu": "sgds-overflow-menu",
  Pagination: "sgds-pagination",
  "Progress bar": "sgds-progress-bar",
  "Quantity toggle": "sgds-quantity-toggle",
  Radio: "sgds-radio",
  "Radio group": "sgds-radio-group",
  Select: "sgds-select",
  Sidebar: "sgds-sidebar",
  "Side navigation": "sgds-sidenav",
  Skeleton: "sgds-skeleton",
  Spinner: "sgds-spinner",
  Stepper: "sgds-stepper",
  "Sub nav": "sgds-subnav",
  Switch: "sgds-switch",
  "System banner": "sgds-system-banner",
  Tab: "sgds-tab",
  Table: "sgds-table",
  "Table of contents": "sgds-table-of-contents",
  "Text area": "sgds-textarea",
  Toast: "sgds-toast",
  Tooltip: "sgds-tooltip",
  "Icon list": "sgds-icon-list",
  "Icon card": "sgds-icon-card",
};

// --- Step 1: Fetch all component sets from the file ---
async function fetchComponentSets() {
  console.log("Fetching component sets from file...");
  const data = await figmaGet(`/files/${FILE_ID}/component_sets`);
  const sets = data.meta?.component_sets || [];
  console.log(`Found ${sets.length} component sets`);
  return sets;
}

// --- Step 2: Fetch node details in batches ---
async function fetchNodes(nodeIds) {
  const results = {};
  const BATCH_SIZE = 12;

  for (let i = 0; i < nodeIds.length; i += BATCH_SIZE) {
    const batch = nodeIds.slice(i, i + BATCH_SIZE);
    const ids = batch.join(",");
    console.log(
      `  Fetching nodes batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(nodeIds.length / BATCH_SIZE)} (${batch.length} nodes)...`
    );

    try {
      const data = await figmaGet(`/files/${FILE_ID}/nodes?ids=${ids}`);
      if (data.nodes) {
        Object.assign(results, data.nodes);
      }
    } catch (e) {
      console.error(`  Error fetching batch: ${e.message}`);
    }

    // Rate limit: wait between batches
    if (i + BATCH_SIZE < nodeIds.length) {
      await sleep(2500);
    }
  }

  return results;
}

// --- Step 3: Extract properties from a component node tree ---
function extractComponentProperties(node) {
  const props = {
    boolean: {},
    text: {},
    instanceSwap: {},
  };

  // componentPropertyDefinitions is on the ComponentSet node
  const defs = node.componentPropertyDefinitions || {};
  for (const [key, def] of Object.entries(defs)) {
    if (def.type === "BOOLEAN") {
      props.boolean[key] = { defaultValue: def.defaultValue };
    } else if (def.type === "TEXT") {
      props.text[key] = { defaultValue: def.defaultValue };
    } else if (def.type === "INSTANCE_SWAP") {
      props.instanceSwap[key] = {
        defaultValue: def.defaultValue,
        preferredValues: def.preferredValues || [],
      };
    }
  }

  return props;
}

// --- Step 4: Extract variant properties from children ---
function extractVariantProperties(node) {
  const variants = {};

  if (!node.children) return variants;

  for (const child of node.children) {
    // Each child is a variant component
    // Parse variant name like "Variant=info, Dismissible=True"
    const name = child.name || "";
    const pairs = name.split(",").map((s) => s.trim());
    for (const pair of pairs) {
      const [prop, value] = pair.split("=").map((s) => s.trim());
      if (prop && value) {
        if (!variants[prop]) variants[prop] = new Set();
        variants[prop].add(value);
      }
    }
  }

  // Convert Sets to sorted arrays
  const result = {};
  for (const [prop, values] of Object.entries(variants)) {
    result[prop] = [...values].sort();
  }
  return result;
}

// --- Step 5: Walk tree to find nested instances ---
function findNestedInstances(node, depth = 0, maxDepth = 3) {
  const instances = [];
  if (!node.children || depth > maxDepth) return instances;

  for (const child of node.children) {
    if (child.type === "INSTANCE") {
      const inst = {
        name: child.name,
        id: child.id,
        componentId: child.componentId || null,
      };
      // Capture exposed componentProperties from the instance (REST API provides these)
      if (child.componentProperties) {
        inst.exposedProperties = {};
        for (const [key, prop] of Object.entries(child.componentProperties)) {
          inst.exposedProperties[key] = {
            type: prop.type,
            value: prop.value,
          };
        }
      }
      instances.push(inst);
    }
    // Recurse into frames/groups/components but not into instances (their internals are from the library)
    if (
      child.type === "FRAME" ||
      child.type === "GROUP" ||
      child.type === "COMPONENT"
    ) {
      instances.push(...findNestedInstances(child, depth + 1, maxDepth));
    }
  }

  return instances;
}

// --- Step 6: Detect item patterns (numbered instances like "↳ Accordion 1") ---
function detectItemPattern(instances) {
  const patterns = {};

  for (const inst of instances) {
    // Match names like "↳ Accordion 1", "Icon list 1", "↳ Nav 1"
    const match = inst.name.match(/^(.*?)\s*(\d+)$/);
    if (match) {
      const base = match[1].trim();
      if (!patterns[base]) patterns[base] = [];
      patterns[base].push(parseInt(match[2]));
    }
  }

  // Return patterns with 2+ numbered items (likely a repeated pattern)
  const result = [];
  for (const [base, numbers] of Object.entries(patterns)) {
    if (numbers.length >= 2) {
      result.push({ pattern: base, count: numbers.length });
    }
  }

  return result;
}

// --- Step 7: Get first variant's full node tree for nested instance discovery ---
async function fetchFirstVariantTree(componentSetNode) {
  if (!componentSetNode.children || componentSetNode.children.length === 0)
    return null;

  // The first child is a variant — get its full tree
  const firstVariant = componentSetNode.children[0];
  // We already have it in the node tree from the /nodes call
  return firstVariant;
}

// --- Main ---
async function main() {
  console.log("=== SGDS Figma Component Property Discovery ===\n");

  // Step 1: Get all component sets
  const componentSets = await fetchComponentSets();

  // Filter to only SGDS components we care about
  const sgdsSets = componentSets.filter((cs) => {
    const tag = FIGMA_NAME_TO_TAG[cs.name];
    return !!tag;
  });

  console.log(
    `\nFiltered to ${sgdsSets.length} SGDS-relevant component sets\n`
  );

  // Collect node IDs
  const nodeIds = sgdsSets.map((cs) => cs.node_id);

  // Step 2: Fetch detailed node data
  console.log("Fetching detailed node data...");
  const nodeData = await fetchNodes(nodeIds);

  // Step 3-7: Process each component
  const results = {};
  let processed = 0;

  for (const cs of sgdsSets) {
    const tag = FIGMA_NAME_TO_TAG[cs.name];
    const nodeInfo = nodeData[cs.node_id];
    if (!nodeInfo || !nodeInfo.document) {
      console.log(`  Skipping ${cs.name} (${tag}) — no node data`);
      continue;
    }

    const doc = nodeInfo.document;

    // Extract all info
    const variantProperties = extractVariantProperties(doc);
    const componentProperties = extractComponentProperties(doc);
    const nestedInstances = findNestedInstances(doc);
    const itemPatterns = detectItemPattern(nestedInstances);

    results[tag] = {
      key: cs.key,
      name: cs.name,
      nodeId: cs.node_id,
      variantProperties,
      componentProperties,
      nestedInstances,
      itemPatterns,
    };

    processed++;
  }

  console.log(`\nProcessed ${processed} components\n`);

  // --- Step 8: Summarize exposed properties from item pattern instances ---
  for (const [tag, data] of Object.entries(results)) {
    if (data.itemPatterns.length === 0) continue;
    const patternNames = data.itemPatterns.map((p) => p.pattern);

    // Find the first instance matching each pattern and extract its exposedProperties
    const itemExposedProps = {};
    for (const inst of data.nestedInstances) {
      if (!inst.exposedProperties) continue;
      const matchedPattern = patternNames.find((p) => inst.name.indexOf(p) >= 0);
      if (matchedPattern && !itemExposedProps[matchedPattern]) {
        itemExposedProps[matchedPattern] = inst.exposedProperties;
      }
    }

    if (Object.keys(itemExposedProps).length > 0) {
      data.itemExposedProperties = itemExposedProps;
    }
  }

  // --- Step 9: Discover design token variables (spacing, colors) ---
  console.log("Fetching design token variables...");
  try {
    const varsData = await figmaGet(`/files/${FILE_ID}/variables/local`);
    const variables = varsData.meta?.variables || {};
    const collections = varsData.meta?.variableCollections || {};

    // Filter for SGDS variables (FLOAT for spacing, COLOR for fills)
    const spacingVars = {};
    const colorVars = {};

    for (const [id, variable] of Object.entries(variables)) {
      const name = variable.name || "";
      const key = variable.key || "";
      const type = variable.resolvedType;

      // Only include variables with "sgds" in their path or from sgds collections
      if (!name.toLowerCase().includes("sgds") && !name.includes("/")) continue;

      if (type === "FLOAT") {
        spacingVars[name] = { key, id, scopes: variable.scopes || [] };
      } else if (type === "COLOR") {
        colorVars[name] = { key, id, scopes: variable.scopes || [] };
      }
    }

    console.log(`  Found ${Object.keys(spacingVars).length} FLOAT variables (spacing/sizing)`);
    console.log(`  Found ${Object.keys(colorVars).length} COLOR variables`);

    // Write variables to separate file for reference
    const varsPath = resolve(__dirname, "discovered-variables.json");
    writeFileSync(
      varsPath,
      JSON.stringify({ spacing: spacingVars, colors: colorVars, collections }, null, 2)
    );
    console.log(`  Written: ${varsPath}\n`);
  } catch (e) {
    console.log(`  Warning: Could not fetch variables: ${e.message}`);
    console.log(`  (This requires Figma Enterprise or file-level variables)\n`);
  }

  // --- Output JSON ---
  const jsonPath = resolve(__dirname, "discovered-props.json");
  writeFileSync(jsonPath, JSON.stringify(results, null, 2));
  console.log(`Written: ${jsonPath}`);

  // --- Generate JS config ---
  const jsPath = resolve(__dirname, "generated-config.js");
  const jsContent = generateJsConfig(results);
  writeFileSync(jsPath, jsContent);
  console.log(`Written: ${jsPath}`);

  // --- Summary ---
  console.log("\n=== Summary ===");
  for (const [tag, data] of Object.entries(results)) {
    const vCount = Object.keys(data.variantProperties).length;
    const bCount = Object.keys(data.componentProperties.boolean).length;
    const tCount = Object.keys(data.componentProperties.text).length;
    const iCount = Object.keys(data.componentProperties.instanceSwap).length;
    const nCount = data.nestedInstances.length;
    console.log(
      `  ${tag}: ${vCount} variants, ${bCount} booleans, ${tCount} text, ${iCount} swaps, ${nCount} nested`
    );
  }
}

// --- Generate JS output ---
function generateJsConfig(results) {
  let js = `// Auto-generated from Figma REST API — ${new Date().toISOString().split("T")[0]}
// Run: node plugins/figma/dom-to-canvas/discover-props.mjs
// Do not edit manually — re-run the script to update.

`;

  // 1. SGDS_COMPONENT_MAP
  js += "var SGDS_COMPONENT_MAP = {\n";
  for (const [tag, data] of Object.entries(results)) {
    js += `  "${tag}": { key: "${data.key}", name: "${data.name}" },\n`;
  }
  js += "};\n\n";

  // 2. Discover all variant property names across all components
  const allVariantProps = new Set();
  for (const data of Object.values(results)) {
    for (const prop of Object.keys(data.variantProperties)) {
      allVariantProps.add(prop);
    }
  }

  js += "// All variant property names found across components:\n";
  js += "// " + [...allVariantProps].sort().join(", ") + "\n";
  js += "var ATTR_TO_VARIANT_PROP = {\n";
  for (const prop of [...allVariantProps].sort()) {
    const attrName = prop.toLowerCase().replace(/\s+/g, "-");
    js += `  // "${attrName}": "${prop}",  // found in: ${findComponentsWithProp(results, prop).join(", ")}\n`;
  }
  js += "};\n\n";

  // 3. Discover all variant option values
  const allValues = new Map(); // value → Set of component tags
  for (const [tag, data] of Object.entries(results)) {
    for (const [prop, values] of Object.entries(data.variantProperties)) {
      for (const v of values) {
        if (!allValues.has(v)) allValues.set(v, new Set());
        allValues.get(v).add(tag);
      }
    }
  }

  js += "// All variant option values (for ATTR_VALUE_MAP):\n";
  js += "var ATTR_VALUE_MAP = {\n";
  for (const [value] of [...allValues.entries()].sort((a, b) =>
    a[0].localeCompare(b[0])
  )) {
    // Only list values that have parenthetical suffixes or differ from lowercase
    if (value.includes("(") || value !== value.toLowerCase()) {
      js += `  // "${value}"\n`;
    }
  }
  js += "};\n\n";

  // 4. COMPONENT_SLOT_CONFIG — full property dump per component
  js += "var COMPONENT_SLOT_CONFIG = {\n";
  for (const [tag, data] of Object.entries(results)) {
    js += `  "${tag}": {\n`;
    js += `    // Variant properties: ${Object.keys(data.variantProperties).join(", ") || "none"}\n`;

    // Variant values
    for (const [prop, values] of Object.entries(data.variantProperties)) {
      js += `    //   ${prop}: [${values.map((v) => `"${v}"`).join(", ")}]\n`;
    }

    // Boolean properties
    const booleans = Object.entries(data.componentProperties.boolean);
    if (booleans.length > 0) {
      js += `    // Booleans:\n`;
      for (const [key, val] of booleans) {
        js += `    //   "${key}" (default: ${val.defaultValue})\n`;
      }
    }

    // Text properties
    const texts = Object.entries(data.componentProperties.text);
    if (texts.length > 0) {
      js += `    // Text:\n`;
      for (const [key, val] of texts) {
        js += `    //   "${key}" (default: "${val.defaultValue}")\n`;
      }
    }

    // Instance swap properties
    const swaps = Object.entries(data.componentProperties.instanceSwap);
    if (swaps.length > 0) {
      js += `    // Instance swaps:\n`;
      for (const [key, val] of swaps) {
        js += `    //   "${key}"\n`;
      }
    }

    // Nested instances
    if (data.nestedInstances.length > 0) {
      js += `    // Nested instances: ${data.nestedInstances.map((i) => `"${i.name}"`).join(", ")}\n`;
    }

    // Item patterns
    if (data.itemPatterns.length > 0) {
      js += `    // Item patterns: ${data.itemPatterns.map((p) => `"${p.pattern}" (x${p.count})`).join(", ")}\n`;
    }

    js += `    slots: {},\n`;
    js += `    textProps: {}\n`;
    js += `  },\n`;
  }
  js += "};\n";

  return js;
}

function findComponentsWithProp(results, prop) {
  const tags = [];
  for (const [tag, data] of Object.entries(results)) {
    if (data.variantProperties[prop]) tags.push(tag);
  }
  return tags;
}

main().catch((e) => {
  console.error("Fatal error:", e.message);
  process.exit(1);
});
