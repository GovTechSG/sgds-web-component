const fs = require("fs");
const path = require("path");

const iconsDir = path.resolve(__dirname, "../src/components/Icon/icons");
const outputFile = path.resolve(__dirname, "../src/components/Icon/icon-registry.ts");

function kebabToPascalCase(str) {
  return str
    .split("-")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

const files = fs.readdirSync(iconsDir).filter(file => {
  const ext = path.extname(file);
  return ext === ".ts" || ext === ".js";
});

const imports = [];
const registryEntries = [];

files.forEach(file => {
  const nameWithoutExt = path.basename(file, path.extname(file));
  const pascalName = kebabToPascalCase(nameWithoutExt);
  imports.push(`import ${pascalName} from "./icons/${nameWithoutExt}";`);
  registryEntries.push(`  '${nameWithoutExt}': ${pascalName},`);
});

const content = `// Auto-generated icon registry. Do not edit manually.

${imports.join("\n")}

export const iconRegistry = {
${registryEntries.join("\n")}
};
`;

fs.writeFileSync(outputFile, content);
console.log("icon-registry.ts generated successfully.");
