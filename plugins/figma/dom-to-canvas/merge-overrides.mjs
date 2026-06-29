#!/usr/bin/env node
/**
 * Merge Override Diff Tool
 *
 * Compares manual-overrides.draft.json (auto-generated) against
 * manual-overrides.json (hand-curated) and shows:
 * - NEW: components/entries not in the current overrides
 * - DIFFERENT: entries where the draft differs from current
 * - MISSING: entries in current that the draft didn't infer (likely manual-only)
 *
 * Usage:
 *   node plugins/figma/dom-to-canvas/merge-overrides.mjs
 *   node plugins/figma/dom-to-canvas/merge-overrides.mjs --apply  (writes merged output)
 *
 * With --apply, writes manual-overrides.merged.json which you can review
 * and rename to manual-overrides.json when satisfied.
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CURRENT_PATH = resolve(__dirname, "manual-overrides.json");
const DRAFT_PATH = resolve(__dirname, "manual-overrides.draft.json");
const MERGED_PATH = resolve(__dirname, "manual-overrides.merged.json");

const shouldApply = process.argv.includes("--apply");

const current = JSON.parse(readFileSync(CURRENT_PATH, "utf-8"));
const draft = JSON.parse(readFileSync(DRAFT_PATH, "utf-8"));

// --- Collect all component tags from current overrides ---
function getCurrentComponents() {
  const tags = new Set();
  for (const section of ["textMapping", "slotMapping", "iconSlots", "itemPatterns", "attrOverrides", "valueOverrides", "structureNames", "cardSlots"]) {
    if (current[section]) {
      for (const key of Object.keys(current[section])) {
        if (!key.startsWith("_")) tags.add(key);
      }
    }
  }
  return tags;
}

const currentTags = getCurrentComponents();
const draftTags = new Set(Object.keys(draft));

// --- Diff report ---
console.log("=== Override Merge Diff ===\n");

// 1. NEW components (in draft but not in current)
const newTags = [...draftTags].filter(t => !currentTags.has(t));
if (newTags.length > 0) {
  console.log(`NEW components (${newTags.length}) — not yet in manual-overrides.json:`);
  for (const tag of newTags) {
    const d = draft[tag];
    console.log(`\n  ${tag} [${d._confidence}]`);
    if (d.textMapping) {
      for (const [name, cfg] of Object.entries(d.textMapping)) {
        console.log(`    textMapping.${name}: key="${cfg.key}" source="${cfg.source}"`);
      }
    }
    if (d.slotMapping) {
      for (const [name, cfg] of Object.entries(d.slotMapping)) {
        console.log(`    slotMapping.${name}: boolean="${cfg.booleanKey}"${cfg.swapKey ? ` swap="${cfg.swapKey}"` : ""}`);
      }
    }
    if (d.itemPatterns) {
      console.log(`    itemPattern: "${d.itemPatterns.pattern}" childTag="${d.itemPatterns.childTag}" countVariant="${d.itemPatterns.childCountVariant}"`);
    }
    if (d._unmapped.length > 0) {
      console.log(`    ⚠ unmapped: ${d._unmapped.join(", ")}`);
    }
  }
  console.log("");
}

// 2. DIFFERENT text mappings (key or source differs)
console.log("---\nDIFFERENCES in existing components:\n");
let diffCount = 0;

for (const tag of [...currentTags]) {
  if (!draft[tag]) continue;
  const d = draft[tag];

  // Compare text mappings
  if (d.textMapping && current.textMapping && current.textMapping[tag]) {
    for (const [name, draftCfg] of Object.entries(d.textMapping)) {
      const currentCfg = current.textMapping[tag][name];
      if (!currentCfg) {
        console.log(`  ${tag}.textMapping.${name}: NEW (draft: key="${draftCfg.key}" source="${draftCfg.source}")`);
        diffCount++;
      } else if (currentCfg.key !== draftCfg.key) {
        console.log(`  ${tag}.textMapping.${name}.key: CURRENT="${currentCfg.key}" vs DRAFT="${draftCfg.key}"`);
        diffCount++;
      }
    }
  }

  // Compare slot mappings
  if (d.slotMapping) {
    const currentSlots = current.slotMapping?.[tag] || {};
    const currentIcons = current.iconSlots?.[tag] || {};
    for (const [name, draftCfg] of Object.entries(d.slotMapping)) {
      // Check both slotMapping and iconSlots
      const inSlots = currentSlots[name];
      const inIcons = currentIcons[name];
      if (!inSlots && !inIcons) {
        console.log(`  ${tag}.slot.${name}: NEW (draft: boolean="${draftCfg.booleanKey}"${draftCfg.swapKey ? ` swap="${draftCfg.swapKey}"` : ""})`);
        diffCount++;
      }
    }
  }

  // Compare item patterns
  if (d.itemPatterns && current.itemPatterns) {
    const currentPattern = current.itemPatterns[tag];
    if (!currentPattern) {
      console.log(`  ${tag}.itemPattern: NEW (draft: pattern="${d.itemPatterns.pattern}" childTag="${d.itemPatterns.childTag}")`);
      diffCount++;
    } else if (currentPattern.pattern !== d.itemPatterns.pattern) {
      console.log(`  ${tag}.itemPattern.pattern: CURRENT="${currentPattern.pattern}" vs DRAFT="${d.itemPatterns.pattern}"`);
      diffCount++;
    }
  }
}

if (diffCount === 0) {
  console.log("  (none — draft matches current overrides)");
}

// 3. Summary of unmapped across all components
console.log("\n---\nUNMAPPED properties (need Figma console discovery):\n");
let unmappedCount = 0;
for (const [tag, d] of Object.entries(draft)) {
  if (d._unmapped.length > 0) {
    // Filter out booleans that are already handled as booleanKey in textMapping
    const currentText = current.textMapping?.[tag] || {};
    const handledKeys = Object.values(currentText).map(t => t.booleanKey).filter(Boolean);
    const trulyUnmapped = d._unmapped.filter(u => {
      const key = u.replace("BOOLEAN: ", "");
      return !handledKeys.includes(key);
    });
    if (trulyUnmapped.length > 0) {
      console.log(`  ${tag}: ${trulyUnmapped.join(", ")}`);
      unmappedCount += trulyUnmapped.length;
    }
  }
}
if (unmappedCount === 0) {
  console.log("  (none — all booleans are accounted for)");
}

// 4. Optionally write merged output
if (shouldApply) {
  const merged = JSON.parse(JSON.stringify(current));

  for (const tag of newTags) {
    const d = draft[tag];
    // Add text mappings
    if (d.textMapping) {
      if (!merged.textMapping) merged.textMapping = {};
      merged.textMapping[tag] = {};
      for (const [name, cfg] of Object.entries(d.textMapping)) {
        merged.textMapping[tag][name] = { key: cfg.key, source: cfg.source };
      }
    }
    // Add slot mappings
    if (d.slotMapping) {
      for (const [name, cfg] of Object.entries(d.slotMapping)) {
        if (name.includes("Icon") || name.includes("icon")) {
          if (!merged.iconSlots) merged.iconSlots = {};
          if (!merged.iconSlots[tag]) merged.iconSlots[tag] = {};
          merged.iconSlots[tag][name] = {};
          if (cfg.booleanKey) merged.iconSlots[tag][name].booleanKey = cfg.booleanKey;
          if (cfg.swapKey) merged.iconSlots[tag][name].swapKey = cfg.swapKey;
        } else {
          if (!merged.slotMapping) merged.slotMapping = {};
          if (!merged.slotMapping[tag]) merged.slotMapping[tag] = {};
          merged.slotMapping[tag][name] = {};
          if (cfg.booleanKey) merged.slotMapping[tag][name].booleanKey = cfg.booleanKey;
          if (cfg.swapKey) merged.slotMapping[tag][name].swapKey = cfg.swapKey;
        }
      }
    }
    // Add item patterns
    if (d.itemPatterns) {
      if (!merged.itemPatterns) merged.itemPatterns = {};
      merged.itemPatterns[tag] = {
        pattern: d.itemPatterns.pattern,
        childTag: d.itemPatterns.childTag,
        childCountVariant: d.itemPatterns.childCountVariant,
        itemProps: d.itemPatterns.itemProps || {}
      };
    }
  }

  writeFileSync(MERGED_PATH, JSON.stringify(merged, null, 2));
  console.log(`\n✓ Merged output written to: ${MERGED_PATH}`);
  console.log("  Review it, then rename to manual-overrides.json when satisfied.");
} else {
  console.log("\n---\nRun with --apply to generate manual-overrides.merged.json");
}
