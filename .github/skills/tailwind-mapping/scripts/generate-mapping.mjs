#!/usr/bin/env node
/**
 * SGDS → Tailwind v4 @theme mapping generator
 *
 * Reads SGDS CSS variables from a theme file and outputs the corresponding
 * Tailwind custom property mappings for src/css/utility.css.
 *
 * Usage:
 *   node generate-mapping.mjs [input-file] [--filter <pattern>] [--dry-run]
 *
 * Examples:
 *   node generate-mapping.mjs src/themes/day.css
 *   node generate-mapping.mjs src/themes/day.css --filter primary
 *   node generate-mapping.mjs src/themes/day.css --filter "bg|surface"
 *   node generate-mapping.mjs src/themes/day.css --dry-run
 *   node generate-mapping.mjs src/themes/responsive.css
 *
 * Arguments:
 *   input-file   Path to CSS file with --sgds-* variables (default: src/themes/day.css)
 *   --filter     Regex pattern to match only specific variable names
 *   --dry-run    Print output without writing to stdout (same effect, just labelled)
 *   --write      Write output directly to src/css/utility.css as a new section at the end
 */

import { readFileSync, appendFileSync } from "fs";
import { resolve } from "path";

const args = process.argv.slice(2);

const filterIndex = args.indexOf("--filter");
const filterPattern = filterIndex !== -1 ? args[filterIndex + 1] : null;
const writeMode = args.includes("--write");

const inputArg = args.find(a => !a.startsWith("--") && args.indexOf(a) !== filterIndex + 1);
const inputFile = inputArg ?? "src/themes/day.css";

const ROOT = new URL("../../../../", import.meta.url).pathname;
const inputPath = resolve(ROOT, inputFile);

let css;
try {
  css = readFileSync(inputPath, "utf8");
} catch {
  console.error(`Error: Could not read file "${inputPath}"`);
  process.exit(1);
}

// --- Extract all --sgds-* custom property declarations ---
const VAR_RE = /--sgds-([\w-]+)\s*:/g;
const variables = [];
let match;
while ((match = VAR_RE.exec(css)) !== null) {
  variables.push(match[1]);
}

if (variables.length === 0) {
  console.error("No --sgds-* variables found in the input file.");
  process.exit(1);
}

const createFilterRegex = pattern => {
  if (typeof pattern !== "string") {
    console.error("Filter pattern must be a string.");
    process.exit(1);
  }
  if (pattern.length > 500) {
    console.error("Filter pattern exceeds maximum allowed length of 500 characters.");
    process.exit(1);
  }
  try {
    return new RegExp(pattern, "i");
  } catch (e) {
    console.error(`Invalid filter pattern "${pattern}": ${e.message}`);
    process.exit(1);
  }
};

const filterRegex = filterPattern ? createFilterRegex(filterPattern) : null;
const filtered = filterRegex ? variables.filter(v => filterRegex.test(v)) : variables;

if (filtered.length === 0) {
  console.error(`No variables matched the filter pattern "${filterPattern}".`);
  process.exit(1);
}

// --- Conversion rules ---
// Each rule: { test, toTailwind } where toTailwind returns [tailwindProp, sgdsVar]

// Rules are ordered most-specific first so that e.g. "border-color" matches
// before "-color" which would otherwise greedily capture the wrong variant.
const rules = [
  // --sgds-border-color-{modifier}  →  --border-color-{modifier}
  {
    test: /^border-color-(.+)$/,
    toTailwind: ([, modifier]) => [
      `border-color-${modifier}`,
      `--sgds-border-color-${modifier}`
    ]
  },
  // --sgds-{variant}-border-color-{modifier}  →  --border-color-{variant}-{modifier}
  {
    test: /^([\w]+(?:-[\w]+)*)-border-color-(.+)$/,
    toTailwind: ([, variant, modifier]) => [
      `border-color-${variant}-${modifier}`,
      `--sgds-${variant}-border-color-${modifier}`
    ]
  },
  // --sgds-bg-{modifier}  →  --background-color-{modifier}
  {
    test: /^bg-(.+)$/,
    toTailwind: ([, modifier]) => [
      `background-color-${modifier}`,
      `--sgds-bg-${modifier}`
    ]
  },
  // --sgds-surface-{modifier}  →  --background-color-surface-{modifier}
  {
    test: /^surface-(.+)$/,
    toTailwind: ([, modifier]) => [
      `background-color-surface-${modifier}`,
      `--sgds-surface-${modifier}`
    ]
  },
  // --sgds-color-{modifier}  →  --text-color-{modifier}
  {
    test: /^color-(.+)$/,
    toTailwind: ([, modifier]) => [
      `text-color-${modifier}`,
      `--sgds-color-${modifier}`
    ]
  },
  // --sgds-{variant}-bg-{modifier}  →  --background-color-{variant}-{modifier}
  {
    test: /^([\w]+(?:-[\w]+)*)-bg-(.+)$/,
    toTailwind: ([, variant, modifier]) => [
      `background-color-${variant}-${modifier}`,
      `--sgds-${variant}-bg-${modifier}`
    ]
  },
  // --sgds-{variant}-surface-{modifier}  →  --background-color-{variant}-surface-{modifier}
  {
    test: /^([\w]+(?:-[\w]+)*)-surface-(.+)$/,
    toTailwind: ([, variant, modifier]) => [
      `background-color-${variant}-surface-${modifier}`,
      `--sgds-${variant}-surface-${modifier}`
    ]
  },
  // --sgds-{variant}-color-{modifier}  →  --text-color-{variant}-{modifier}
  {
    test: /^([\w]+(?:-[\w]+)*)-color-(.+)$/,
    toTailwind: ([, variant, modifier]) => [
      `text-color-${variant}-${modifier}`,
      `--sgds-${variant}-color-${modifier}`
    ]
  },
  // --sgds-line-height-{modifier}  →  --leading-{modifier}
  {
    test: /^line-height-(.+)$/,
    toTailwind: ([, modifier]) => [
      `leading-${modifier}`,
      `--sgds-line-height-${modifier}`
    ]
  }
];

function convert(varSuffix) {
  for (const rule of rules) {
    const m = varSuffix.match(rule.test);
    if (m) return rule.toTailwind(m);
  }
  return null;
}

// --- Group results by section (detect comment blocks from input CSS) ---

const COMMENT_RE = /\/\*\s*([^*]+?)\s*\*\//g;
const commentPositions = [];
let cm;
while ((cm = COMMENT_RE.exec(css)) !== null) {
  commentPositions.push({ pos: cm.index, label: cm[1].trim() });
}

function commentBefore(varName) {
  const varPos = css.indexOf(`--sgds-${varName}`);
  if (varPos === -1) return null;
  const preceding = commentPositions.filter(c => c.pos < varPos);
  return preceding.length ? preceding[preceding.length - 1].label : null;
}

// --- Build output ---

const lines = [];
let lastSection = null;
const skipped = [];

for (const varSuffix of filtered) {
  const section = commentBefore(varSuffix);
  if (section && section !== lastSection) {
    lines.push(`\n  /* ${section} */`);
    lastSection = section;
  }

  const result = convert(varSuffix);
  if (!result) {
    skipped.push(`--sgds-${varSuffix}`);
    continue;
  }
  const [tailwindProp, sgdsVar] = result;
  lines.push(`  --${tailwindProp}: var(${sgdsVar});`);
}

const output = lines.join("\n");

if (writeMode) {
  const utilityPath = resolve(ROOT, "src/css/utility.css");
  const section = `\n/* Auto-generated from ${inputFile} */\n@theme {\n${output}\n}\n`;
  appendFileSync(utilityPath, section, "utf8");
  console.log(`✓ Appended ${lines.filter(l => l.includes("var(")).length} mappings to src/css/utility.css`);
} else {
  console.log(`/* Generated from: ${inputFile} */`);
  console.log(`/* Paste inside the @theme { } block in src/css/utility.css */`);
  console.log(output);
}

if (skipped.length > 0) {
  console.error(`\n/* Skipped (no matching rule): */`);
  skipped.forEach(v => console.error(`/*   ${v} */`));
}

console.error(`\n/* Summary: ${lines.filter(l => l.includes("var(")).length} mappings, ${skipped.length} skipped */`);
