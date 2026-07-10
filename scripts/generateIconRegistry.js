const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

const iconsDir = path.resolve(__dirname, "../src/components/Icon/icons");
const outputFile = path.resolve(__dirname, "../src/components/Icon/icon-registry.ts");

const prettierOptions = prettier.resolveConfig.sync(process.cwd()) || {
  parser: "typescript"
};

const files = fs.readdirSync(iconsDir).filter(file => {
  const ext = path.extname(file);
  return ext === ".ts" || ext === ".js";
});

const registryEntries = [];

files.forEach(file => {
  const nameWithoutExt = path.basename(file, path.extname(file));
  registryEntries.push(`  '${nameWithoutExt}': () => import("./icons/${nameWithoutExt}"),`);
});

const content = `// Auto-generated icon registry. Do not edit manually.

import type { TemplateResult } from "lit";

export const iconRegistry: Record<string, () => Promise<{ default: TemplateResult }>> = {
${registryEntries.join("\n")}
};
`;

const formatted = prettier.format(content, {
  ...prettierOptions,
  parser: "typescript"
});

fs.writeFileSync(outputFile, formatted);
console.log("icon-registry.ts generated successfully.");
