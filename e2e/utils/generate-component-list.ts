/**
 * Parses src/components/index.ts and src/react/index.ts to generate
 * a component manifest used by all E2E test apps.
 *
 * Run: tsx e2e/utils/generate-component-list.ts
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "../..");

// Parse src/components/index.ts for tag names
const componentsIndex = readFileSync(resolve(root, "src/components/index.ts"), "utf-8");

const tagRegex = /export \* from "\.\/[^/]+\/(sgds-[^"]+)"/g;
const tags: string[] = [];
let match: RegExpExecArray | null;
while ((match = tagRegex.exec(componentsIndex)) !== null) {
  tags.push(match[1]);
}

// Parse src/react/index.ts for React component name → tag name mapping
const reactIndex = readFileSync(resolve(root, "src/react/index.ts"), "utf-8");

const reactRegex = /export \{ default as (\w+) \} from '\.\/([^']+)'/g;
const react: Record<string, string> = {};
while ((match = reactRegex.exec(reactIndex)) !== null) {
  const componentName = match[1]; // e.g. SgdsButton
  const importPath = match[2]; // e.g. button
  // Convert import path to tag name: button → sgds-button
  react[componentName] = `sgds-${importPath}`;
}

const manifest = { tags, react };

const outDir = resolve(__dirname, "../fixtures");
mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, "component-list.json"), JSON.stringify(manifest, null, 2) + "\n");

console.log(`Generated component-list.json: ${tags.length} tags, ${Object.keys(react).length} React wrappers`);
