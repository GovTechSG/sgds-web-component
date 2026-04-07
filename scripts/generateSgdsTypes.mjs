/**
 * generateSgdsTypes.mjs
 *
 * Auto-generates sgds-types.d.ts from custom-elements.json
 * and per-component lib/components/<Name>/types.d.ts files.
 *
 *   sgds-types.d.ts  – React JSX IntrinsicElements (event props: "onsgds-*")
 *
 * Run after Rollup, before frankBuild.js.
 */

import fs from "fs";
import path from "path";
import { getAllComponents, getSgdsComponents } from "./shared.mjs";
import {
  componentNameFromPath,
  toPropsInterface,
  toReactEventPropKey,
  shouldIncludeMember,
} from "./generateSgdsTypes.helpers.mjs";

const ROOT = process.cwd();
const CEM_PATH = path.join(ROOT, "custom-elements.json");
const LIB_DIR = path.join(ROOT, "lib");
const OUT_REACT = path.join(LIB_DIR, "types", "react.d.ts");

/**
 * Read lib/components/<Name>/types.d.ts, strip "export " prefixes so the
 * declarations become module-internal in the generated file.
 * Returns null if the file doesn't exist.
 */
function readComponentTypesDecl(componentName) {
  const typesPath = path.join(LIB_DIR, "components", componentName, "types.d.ts");
  if (!fs.existsSync(typesPath)) return null;
  const src = fs.readFileSync(typesPath, "utf8");
  return src.replace(/^export (interface|type) /gm, "$1 ").trim();
}

// ---------------------------------------------------------------------------
// Load data
// ---------------------------------------------------------------------------

const metadata = JSON.parse(fs.readFileSync(CEM_PATH, "utf8"));
const allComponents = getAllComponents(metadata);
const sgdsComponents = getSgdsComponents(allComponents);

// Collect event-detail interface blocks from lib/components/*/types.d.ts
const componentTypesBlocks = new Map(); // compName → stripped text

for (const comp of sgdsComponents) {
  const compName = componentNameFromPath(comp.modulePath);
  if (!compName) continue;
  const block = readComponentTypesDecl(compName);
  if (block) componentTypesBlocks.set(compName, block);
}

// ---------------------------------------------------------------------------
// Build sections
// ---------------------------------------------------------------------------

/** Lines for the "Event detail interfaces" section. */
function buildEventDetailSection() {
  const lines = [];
  const sortedCompNames = [...componentTypesBlocks.keys()].sort();
  if (sortedCompNames.length === 0) return lines;

  lines.push("");
  lines.push("// ---------------------------------------------------------------------------");
  lines.push("// Event detail interfaces (from per-component types.d.ts)");
  lines.push("// ---------------------------------------------------------------------------");
  for (const compName of sortedCompNames) {
    lines.push("");
    lines.push(`// ── ${compName} ─────────────────────────────────────────────────────────────`);
    lines.push("");
    lines.push(componentTypesBlocks.get(compName));
  }
  return lines;
}

/** Build per-component prop interface lines. */
function buildPropInterfaceSection() {
  const toEventPropKey = toReactEventPropKey;
  const lines = [];
  lines.push("");
  lines.push("// ---------------------------------------------------------------------------");
  lines.push("// Component prop interfaces");
  lines.push("// ---------------------------------------------------------------------------");

  const processed = new Set();
  for (const comp of sgdsComponents) {
    const { name: className, tagName, members = [], events = [], modulePath } = comp;
    if (!tagName?.startsWith("sgds-")) continue;
    if (!modulePath.startsWith("src/components/")) continue;
    if (processed.has(className)) continue;
    processed.add(className);

    const propsName = toPropsInterface(className);

    // De-duplicate members; own members take precedence
    const memberMap = new Map();
    for (const m of members) {
      if (!shouldIncludeMember(m)) continue;
      if (!memberMap.has(m.name)) memberMap.set(m.name, m);
    }

    const propLines = [];
    for (const [, m] of memberMap) {
      const desc = m.description ?? "";
      if (desc) propLines.push(`  /** ${desc.trim()} */`);
      propLines.push(`  ${m.name}?: ${m.type?.text ?? "unknown"};`);
    }

    for (const ev of events) {
      if (!ev.name) continue;
      const propKey = toEventPropKey(ev.name);
      if (ev.detailType) {
        propLines.push(`  ${propKey}?: (event: CustomEvent<${ev.detailType}>) => void;`);
      } else {
        propLines.push(`  ${propKey}?: SgdsEventHandler;`);
      }
    }

    lines.push("");
    lines.push(`// ── ${className.replace(/^Sgds/, "")} ─────────────────────────────────────────────────────────────`);
    lines.push("");
    lines.push(`interface ${propsName} extends SgdsBaseProps {`);
    lines.push(...propLines);
    lines.push("}");
  }
  return lines;
}

// ---------------------------------------------------------------------------
// Generate react.d.ts  (React)
// ---------------------------------------------------------------------------

function generateReactTypes() {
  const lines = [];

  lines.push(`/**
 * SGDS Web Components – React TypeScript Type Definitions
 *
 * Auto-generated by scripts/generateSgdsTypes.mjs — do not edit by hand.
 *
 * Provides typed JSX intrinsic elements for all \`sgds-*\` custom elements so
 * that React and Next.js TypeScript projects get IntelliSense and type-safety
 * without importing the full library at runtime.
 *
 * Usage – add ONE of the following to your project's \`types.d.ts\`:
 *
 *   // Triple-slash reference (works in any tsconfig):
 *   /// <reference path="node_modules/@govtechsg/sgds-web-component/sgds-types.d.ts" />
 *
 *   // ES import (tsconfig must include this file via \`include\` or \`typeRoots\`):
 *   import "@govtechsg/sgds-web-component/sgds-types";
 *
 * Custom event handlers use the lowercase kebab-case \`onsgds-*\` form —
 * React 19 maps these directly to native addEventListener calls:
 *   <sgds-input onsgds-change={handler} />
 */`);
  lines.push("");
  // `export {}` makes this a module so `declare module "react"` is a proper augmentation
  lines.push("export {};");
  lines.push("");
  lines.push("// ---------------------------------------------------------------------------");
  lines.push("// Helpers");
  lines.push("// ---------------------------------------------------------------------------");
  lines.push("");
  lines.push("type SgdsEventHandler = (event: CustomEvent) => void;");
  lines.push("");
  lines.push("/** Common props shared by every SGDS element */");
  lines.push("interface SgdsBaseProps extends React.HTMLAttributes<HTMLElement> {");
  lines.push('  /** Override the CSS `class` attribute (use `className` in JSX for React) */');
  lines.push("  class?: string;");
  lines.push("}");

  lines.push(...buildEventDetailSection());
  lines.push(...buildPropInterfaceSection());

  // React JSX IntrinsicElements
  lines.push("");
  lines.push("// ---------------------------------------------------------------------------");
  lines.push("// React JSX intrinsic element registrations");
  lines.push("// ---------------------------------------------------------------------------");
  lines.push("");
  lines.push('declare module "react" {');
  lines.push("  namespace JSX {");
  lines.push("    interface IntrinsicElements {");

  const seen = new Set();
  for (const comp of sgdsComponents) {
    const { name: className, tagName, modulePath } = comp;
    if (!tagName?.startsWith("sgds-")) continue;
    if (!modulePath.startsWith("src/components/")) continue;
    if (seen.has(tagName)) continue;
    seen.add(tagName);
    lines.push(`      "${tagName}": ${toPropsInterface(className)};`);
  }

  lines.push("    }");
  lines.push("  }");
  lines.push("}");

  // HTMLElementTagNameMap
  lines.push("");
  lines.push("// ---------------------------------------------------------------------------");
  lines.push("// Global HTMLElementTagNameMap augmentation (vanilla TypeScript / non-React)");
  lines.push("// ---------------------------------------------------------------------------");
  lines.push("");
  lines.push("declare global {");
  lines.push("  interface HTMLElementTagNameMap {");

  const seen2 = new Set();
  for (const comp of sgdsComponents) {
    const { tagName, modulePath } = comp;
    if (!tagName?.startsWith("sgds-")) continue;
    if (!modulePath.startsWith("src/components/")) continue;
    if (seen2.has(tagName)) continue;
    seen2.add(tagName);
    lines.push(`    "${tagName}": HTMLElement;`);
  }

  lines.push("  }");
  lines.push("}");
  lines.push("");

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Write output file
// ---------------------------------------------------------------------------

fs.mkdirSync(path.dirname(OUT_REACT), { recursive: true });
const reactOutput = generateReactTypes();
fs.writeFileSync(OUT_REACT, reactOutput, "utf8");
console.log(`Generated lib/types/react.d.ts (${reactOutput.length} chars) at ${OUT_REACT}`);
