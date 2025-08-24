import { stat, readFile, readdir, writeFile } from "fs/promises";
import * as path from "path";
import { Token } from "./token_types";

export function arrangeSgdsFiles(fileName: string): string {
  const isPrimitive = fileName.startsWith("Primitive");
  const isSemantic = fileName.startsWith("Semantic");
  const isSemanticLight = isSemantic && fileName.includes("Light");
  const isSemanticDark = isSemantic && fileName.includes("Dark");
  const isSemanticGeneral = isSemantic && !isSemanticLight && !isSemanticDark;
  const isThemeSgds = fileName === "Theme.SGDS.json";
  const forRoot = isPrimitive || isSemanticGeneral || isThemeSgds;
  const forLightRoot = isSemanticLight;
  const forDarkRoot = isSemanticDark;

  if (forRoot) return "root";
  if (forLightRoot) return "day";
  if (forDarkRoot) return "night";
  return "";
}
export async function saveToMap(filePath: string, map: Map<string, object>, mapKey: string) {
  const content: string = await readFile(filePath, "utf-8");
  const contentObj = JSON.parse(content);
  console.log(contentObj);
  const cssVars = flattenTokensToCssVars(contentObj);
  if (map.has(mapKey)) {
    const existing = map.get(mapKey) as Record<string, string>;
    map.set(mapKey, { ...existing, ...cssVars });
  } else {
    map.set(mapKey, cssVars);
  }
}

function generateCss(tokenMap: object, type?: "day" | "night"): string {
  const content = Object.entries(tokenMap)
    .map(([key, value]) => `${key}: ${value};`)
    .join("\n");

  if (type && type === "day") {
    return `
        @import "./root.css";

        :root {
            color-scheme: only light;
            ${content}
        }
        `;
  }

  if (type && type === "night") {
    return `
        @import "./root.css";

        :root.sgds-night-theme {
            color-scheme: only dark;
            ${content}    
        `;
  }
  return `
    :root {
      ${content}
    }`;
}

/**
 * Converts a token name like '{sgds-dimension-320}' to a CSS var() reference.
 * Example: '{sgds-dimension-320}' => 'var(--sgds-dimension-320)'
 */
export function tokenNameToCssVar(tokenName: string): string | undefined {
  if (tokenName.startsWith("{sgds") && tokenName.endsWith("}")) {
    // Remove leading and trailing curly braces if present
    const cleaned = tokenName.replace(/^\{|\}$/g, "");
    return `var(--${cleaned})`;
  }
  return tokenName;
}

function flattenTokensToCssVars(obj: Token, prefix: string[] = []): Record<string, string> {
  let result: Record<string, string> = {};
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === "object" && value !== null && !("$value" in value)) {
      // Continue traversing
      result = {
        ...result,
        ...flattenTokensToCssVars(value, [...prefix, key])
      };
    } else if (typeof value === "object" && value !== null && "$value" in value) {
      // Leaf node with $value
      const varName = `--${[...prefix, key].join("-")}`;
      if (!varName.startsWith("--sgds")) continue;
      result[varName] = typeof value["$value"] === "string" ? tokenNameToCssVar(value["$value"]) : value["$value"];
    }
  }

  return result;
}

export async function tokenToCssVars(): Promise<void> {
  const tokensDir: string = path.join(__dirname, "tokens_new");
  const rootMap = new Map<string, object>();
  //   const darkRootMap = new Map<string, object>();
  //   const lightRootMap = new Map<string, object>();
  const tokenFiles = await readdir(tokensDir);
  const saveTokenToMap = tokenFiles.map(async (file: string) => {
    const isPrimitive = file.startsWith("Primitive");
    const isSemantic = file.startsWith("Semantic");
    const isSemanticLight = isSemantic && file.includes("Light");
    const isSemanticDark = isSemantic && file.includes("Dark");
    const isSemanticGeneral = isSemantic && !isSemanticLight && !isSemanticDark;

    const isThemeSgds = file === "Theme.SGDS.json";

    const forRoot = isPrimitive || isSemanticGeneral || isThemeSgds;
    const forLightRoot = isSemanticLight;
    const forDarkRoot = isSemanticDark;

    const shouldLog: boolean = isPrimitive || isSemantic || isThemeSgds;

    const filePath: string = path.join(tokensDir, file);
    const isFile = (await stat(filePath)).isFile();

    if (forRoot && isFile) {
      await saveToMap(filePath, rootMap, "root");
    }
    if (forLightRoot && isFile) {
      await saveToMap(filePath, rootMap, "day");
    }
    if (forDarkRoot && isFile) {
      await saveToMap(filePath, rootMap, "night");
    }
  });
  await Promise.all(saveTokenToMap);
  const rootFilePath = path.join(__dirname, "tokens_new", "root.css");
  const lightFilePath = path.join(__dirname, "tokens_new", "day.css");
  const darkFilePath = path.join(__dirname, "tokens_new", "night.css");
  try {
    await writeFile(rootFilePath, generateCss(rootMap.get("root")));
    await writeFile(lightFilePath, generateCss(rootMap.get("day"), "day"));
    await writeFile(darkFilePath, generateCss(rootMap.get("night"), "night"));
  } catch (e) {
    console.log(e);
  }
}
