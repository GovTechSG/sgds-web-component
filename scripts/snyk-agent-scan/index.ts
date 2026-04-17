import * as fs from "fs";
import { glob } from "fs/promises";
import { getChangedFiles } from "./utils/git.js";
import { printChangedFiles, printScanHeader, printSummary } from "./utils/reporter.js";
import { scanFile, type ScanResult } from "./utils/scanner.js";

const SCAN_PATHS = ["skills/", ".github/skills/"];

async function resolveFiles(): Promise<string[]> {
  const args = process.argv.slice(2);

  if (args.length > 0) {
    const files: string[] = [];
    for (const pattern of args) {
      for await (const match of glob(pattern)) {
        files.push(match);
      }
    }
    return files;
  }

  const baseSha = process.env.GIT_BASE_SHA;
  if (baseSha) {
    if (/^0+$/.test(baseSha)) {
      console.log("No previous commit to diff against, skipping scan.");
      process.exit(0);
    }
    return getChangedFiles(baseSha, SCAN_PATHS);
  }

  console.error("Usage: pnpm scan:snyk-agent -- <glob|file> [...]\n" + "       Or set GIT_BASE_SHA for CI mode.");
  process.exit(1);
}

async function main(): Promise<void> {
  const allFiles = await resolveFiles();
  const mdFiles = allFiles.filter(f => f.endsWith(".md") && fs.existsSync(f));

  if (mdFiles.length === 0) {
    console.log("No .md files to scan, skipping.");
    process.exit(0);
  }

  printChangedFiles(mdFiles);

  const results: ScanResult[] = [];
  for (const file of mdFiles) {
    printScanHeader(file);
    const result = scanFile(file);
    results.push(result);
    if (result.unauthorized) {
      printSummary(results);
      break;
    }
  }

  printSummary(results);
}

main();
