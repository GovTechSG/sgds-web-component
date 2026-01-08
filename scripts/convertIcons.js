const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

// Paths
const svgDir = path.resolve(__dirname, "../src/components/Icon/sgds-icons"); // folder with SVGs
const iconsDir = path.resolve(__dirname, "../src/components/Icon/icons"); // output TS files

// Ensure output folder exists
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Prettier config
const prettierOptions = prettier.resolveConfig.sync(process.cwd()) || {
  parser: "typescript"
};

// Convert SVG content to Lit template
function svgToLitTemplate(svgContent, iconName) {
  const shouldPreserveFill = iconName === "sg-crest";

  const processedSvg = shouldPreserveFill
    ? svgContent
    : svgContent.replace(/fill="#[0-9A-Fa-f]{3,6}"/g, 'fill="currentColor"');

  return `
    import { html } from "lit";

    export default html\`
    ${processedSvg.replace(/\r?\n\s*/g, "\n  ")}
    \`;
  `;
}

// Read SVG files
const svgFiles = fs.readdirSync(svgDir).filter(file => path.extname(file) === ".svg");

// Convert each SVG to TS file
svgFiles.forEach(file => {
  const nameWithoutExt = path.basename(file, ".svg");
  const svgContent = fs.readFileSync(path.join(svgDir, file), "utf8");
  const tsContent = svgToLitTemplate(svgContent);

  const tsFilePath = path.join(iconsDir, `${nameWithoutExt}.ts`);

  const formatted = prettier.format(tsContent, {
    ...prettierOptions,
    parser: "typescript"
  });

  fs.writeFileSync(tsFilePath, formatted, "utf8");

  console.log(`Converted: ${file} → ${nameWithoutExt}.ts`);
});

console.log("All SVGs converted to Lit TS successfully.");
