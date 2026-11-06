/**
 * Generates component-html.json by importing each Storybook basic.js template,
 * rendering it via @lit-labs/ssr, and collecting the HTML output.
 *
 * Run from root: tsx e2e/utils/generate-component-html.ts
 */
import { render } from "@lit-labs/ssr";
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "../..");
const templatesDir = resolve(root, "stories/component-templates");
const outDir = resolve(__dirname, "../fixtures");

async function collectRenderResult(result: Iterable<string | Promise<unknown>>): Promise<string> {
  let html = "";
  for (const chunk of result) {
    if (typeof chunk === "string") {
      html += chunk;
    } else if (chunk instanceof Promise) {
      const resolved = await chunk;
      if (resolved && typeof resolved === "object" && Symbol.iterator in resolved) {
        html += await collectRenderResult(resolved as Iterable<string | Promise<unknown>>);
      }
    }
  }
  return html;
}

async function main() {
  const dirs = readdirSync(templatesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  const htmlMap: Record<string, string> = {};
  const errors: string[] = [];

  for (const dirName of dirs) {
    const basicPath = resolve(templatesDir, dirName, "basic.js");
    if (!existsSync(basicPath)) {
      errors.push(`${dirName}: no basic.js found`);
      continue;
    }

    try {
      const mod = await import(pathToFileURL(basicPath).href);
      const { Template, args = {} } = mod;

      if (typeof Template !== "function") {
        errors.push(`${dirName}: Template is not a function`);
        continue;
      }

      const templateResult = Template(args);
      const ssrResult = render(templateResult);
      const html = await collectRenderResult(ssrResult);

      // Clean up the HTML: remove lit SSR markers (<!--lit-part-->)
      const cleanHtml = html
        .replace(/<!--\/?lit-part.*?-->/g, "")
        .replace(/<!--\?lit\$.*?-->/g, "")
        .replace(/<!--lit-node.*?-->/g, "")
        .trim();

      if (cleanHtml) {
        htmlMap[dirName] = cleanHtml;
      } else {
        errors.push(`${dirName}: empty render output`);
      }
    } catch (err) {
      errors.push(`${dirName}: ${(err as Error).message}`);
    }
  }

  // Also collect args for React apps to use as props
  const argsMap: Record<string, Record<string, unknown>> = {};
  for (const dirName of dirs) {
    const basicPath = resolve(templatesDir, dirName, "basic.js");
    if (!existsSync(basicPath)) continue;
    try {
      const mod = await import(pathToFileURL(basicPath).href);
      const args = mod.args || {};
      // Only include serializable args (skip functions, complex objects like menuList)
      const cleanArgs: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(args)) {
        if (
          typeof value === "string" ||
          typeof value === "number" ||
          typeof value === "boolean"
        ) {
          cleanArgs[key] = value;
        }
      }
      if (Object.keys(cleanArgs).length > 0) {
        argsMap[dirName] = cleanArgs;
      }
    } catch {
      // Already reported in htmlMap errors
    }
  }

  mkdirSync(outDir, { recursive: true });
  writeFileSync(
    resolve(outDir, "component-html.json"),
    JSON.stringify(htmlMap, null, 2) + "\n"
  );
  writeFileSync(
    resolve(outDir, "component-args.json"),
    JSON.stringify(argsMap, null, 2) + "\n"
  );

  console.log(
    `Generated component-html.json: ${Object.keys(htmlMap).length} components, component-args.json: ${Object.keys(argsMap).length} with args`
  );
  if (errors.length > 0) {
    console.warn(`Warnings (${errors.length}):`);
    errors.forEach((e) => console.warn(`  - ${e}`));
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
