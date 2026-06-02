/**
 * Extracts HTML snippets from axe-core a11y test files and generates
 * corresponding HTML files for oobee scanning in test/a11y/oobee/.
 */
import * as fs from "fs";
import * as path from "path";

const AXE_DIR = path.resolve("test/a11y/axe-core");
const OOBEE_DIR = path.resolve("test/a11y/oobee");

const HTML_TEMPLATE = (componentName, snippets) => `<html>
  <head>
    <script type="module" src="/src/index.ts"></script>
    <link href="/src/themes/day.css" rel="stylesheet" type="text/css" />
    <link href="/src/css/sgds.css" rel="stylesheet" type="text/css" />
  </head>
  <body>
    ${snippets.join("\n\n    ")}
  </body>
</html>
`;

function extractHtmlSnippets(fileContent) {
  const snippets = [];
  // Match html` ... ` template literals (handles both single-line and multi-line)
  const regex = /html`([\s\S]*?)`/g;
  let match;
  while ((match = regex.exec(fileContent)) !== null) {
    let snippet = match[1].trim();
    // Remove leading/trailing whitespace from each line but preserve structure
    snippet = snippet
      .split("\n")
      .map(line => line.trimStart())
      .join("\n")
      .trim();
    snippets.push(snippet);
  }
  return snippets;
}

// Ensure output dir exists
fs.mkdirSync(OOBEE_DIR, { recursive: true });

const files = fs.readdirSync(AXE_DIR).filter(f => f.endsWith(".a11y.test.ts"));

let generated = 0;
for (const file of files) {
  const content = fs.readFileSync(path.join(AXE_DIR, file), "utf-8");
  const snippets = extractHtmlSnippets(content);

  if (snippets.length === 0) continue;

  const baseName = file.replace(".a11y.test.ts", "");
  const outPath = path.join(OOBEE_DIR, `${baseName}.html`);

  fs.writeFileSync(outPath, HTML_TEMPLATE(baseName, snippets));
  generated++;
}

console.log(`Generated ${generated} HTML files in test/a11y/oobee/`);
