import { chromium } from "playwright";
import oobeeA11yInit from "@govtechsg/oobee";
import * as fs from "fs";
import * as path from "path";
import { startViteServer, stopViteServer } from "./utils/vite-server.js";
import { scanPage, type ScanPageResult } from "./utils/scanner.js";
import { OOBEE_CONFIG, VITE_PORT, VITE_BASE_URL } from "./utils/config.js";

const COLORS = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
  reset: "\x1b[0m"
};

function discoverPlaygroundPages(): string[] {
  const oobeeDir = path.resolve("./test/a11y/oobee");
  const entries = fs.readdirSync(oobeeDir, { withFileTypes: true });
  return entries.filter(e => e.isFile() && e.name.endsWith(".html")).map(e => `test/a11y/oobee/${e.name}`);
}

function printPageResult(result: ScanPageResult, index: number) {
  const hasMustFix = result.mustFix > 0;
  const hasGoodToFix = result.goodToFix > 0;
  const status = result.error
    ? `${COLORS.red}ERROR${COLORS.reset}`
    : hasMustFix
    ? `${COLORS.red}FAIL${COLORS.reset}`
    : hasGoodToFix
    ? `${COLORS.yellow}WARN${COLORS.reset}`
    : `${COLORS.green}PASS${COLORS.reset}`;

  const pageName = result.page.replace("test/a11y/oobee/", "").replace(".html", "");
  console.log(
    `  ${status}  ${pageName}  ${COLORS.dim}(mustFix: ${result.mustFix}, goodToFix: ${result.goodToFix}, passed: ${result.passed})${COLORS.reset}`
  );

  if (result.error) {
    console.log(`         ${COLORS.red}${result.error}${COLORS.reset}`);
    return;
  }

  // Print mustFix violations with details
  for (const rule of result.mustFixRules) {
    console.log(
      `         ${COLORS.red}✗${COLORS.reset} ${rule.description} ${COLORS.dim}[${rule.rule}] (${rule.count} occurrences)${COLORS.reset}`
    );
    if (rule.helpUrl) {
      console.log(`           ${COLORS.dim}→ ${rule.helpUrl}${COLORS.reset}`);
    }
    for (const node of rule.nodes) {
      console.log(`           ${COLORS.dim}Element:${COLORS.reset} ${node.target}`);
      if (node.html) {
        const truncatedHtml = node.html.length > 120 ? node.html.slice(0, 120) + "..." : node.html;
        console.log(`           ${COLORS.dim}HTML:${COLORS.reset}    ${truncatedHtml}`);
      }
      if (node.failureSummary) {
        const lines = node.failureSummary.split("\n").filter(l => l.trim());
        for (const line of lines) {
          console.log(`           ${COLORS.red}${line.trim()}${COLORS.reset}`);
        }
      }
      console.log();
    }
  }

  // Print goodToFix violations with details
  for (const rule of result.goodToFixRules) {
    console.log(
      `         ${COLORS.yellow}!${COLORS.reset} ${rule.description} ${COLORS.dim}[${rule.rule}] (${rule.count} occurrences)${COLORS.reset}`
    );
    if (rule.helpUrl) {
      console.log(`           ${COLORS.dim}→ ${rule.helpUrl}${COLORS.reset}`);
    }
    for (const node of rule.nodes) {
      console.log(`           ${COLORS.dim}Element:${COLORS.reset} ${node.target}`);
      if (node.html) {
        const truncatedHtml = node.html.length > 120 ? node.html.slice(0, 120) + "..." : node.html;
        console.log(`           ${COLORS.dim}HTML:${COLORS.reset}    ${truncatedHtml}`);
      }
      if (node.failureSummary) {
        const lines = node.failureSummary.split("\n").filter(l => l.trim());
        for (const line of lines) {
          console.log(`           ${COLORS.yellow}${line.trim()}${COLORS.reset}`);
        }
      }
      console.log();
    }
  }
}

async function main() {
  const filterArg = process.argv[2];
  const allPages = discoverPlaygroundPages();
  const pages = filterArg ? allPages.filter(p => p.toLowerCase().includes(filterArg.toLowerCase())) : allPages;

  if (pages.length === 0) {
    console.error(`No playground pages matching "${filterArg}"`);
    process.exit(1);
  }

  console.log(`\n${COLORS.bold}Oobee A11y Scan${COLORS.reset}`);
  console.log(`${COLORS.dim}Scanning ${pages.length} playground pages...${COLORS.reset}\n`);

  // Start Vite dev server
  const server = await startViteServer(VITE_PORT);

  // Initialize Oobee
  const oobeeA11y = await oobeeA11yInit({
    entryUrl: VITE_BASE_URL,
    testLabel: "SGDS Web Components A11y Scan",
    includeScreenshots: OOBEE_CONFIG.includeScreenshots,
    viewportSettings: OOBEE_CONFIG.viewportSettings,
    thresholds: OOBEE_CONFIG.thresholds,
    scanAboutMetadata: OOBEE_CONFIG.scanAboutMetadata,
    deviceChosen: "Desktop",
    zip: "oobee-a11y-report.zip"
  });

  // Launch headless Chromium
  const browser = await chromium.launch({ headless: true });

  const results: ScanPageResult[] = [];

  for (const pagePath of pages) {
    try {
      const result = await scanPage(browser, pagePath, oobeeA11y);
      results.push(result);
    } catch (err: any) {
      results.push({
        page: pagePath,
        mustFix: 0,
        goodToFix: 0,
        passed: 0,
        mustFixRules: [],
        goodToFixRules: [],
        error: err.message ?? String(err)
      });
    }
  }

  // Close browser
  await browser.close();

  // Generate report before checking thresholds
  // (testThresholds terminates the instance on failure, so terminate first)
  await oobeeA11y.terminate();

  // Check accumulated thresholds
  let thresholdsPassed = true;
  try {
    oobeeA11y.testThresholds();
  } catch (err: any) {
    thresholdsPassed = false;
  }

  // Stop Vite
  await stopViteServer(server);

  // Print results per page
  console.log(`\n${COLORS.bold}Results:${COLORS.reset}\n`);
  results.forEach((r, i) => printPageResult(r, i));

  // Print summary
  const totalMustFix = results.reduce((sum, r) => sum + r.mustFix, 0);
  const totalGoodToFix = results.reduce((sum, r) => sum + r.goodToFix, 0);
  const totalPassed = results.reduce((sum, r) => sum + r.passed, 0);
  const pagesWithErrors = results.filter(r => r.error).length;
  const pagesFailing = results.filter(r => r.mustFix > 0).length;
  const pagesPassing = results.filter(r => !r.error && r.mustFix === 0).length;

  console.log(`\n${COLORS.bold}─── Summary ───${COLORS.reset}`);
  console.log(`  Pages scanned:    ${results.length}`);
  console.log(`  ${COLORS.green}Pages passing:    ${pagesPassing}${COLORS.reset}`);
  console.log(`  ${COLORS.red}Pages failing:    ${pagesFailing}${COLORS.reset}`);
  if (pagesWithErrors > 0) {
    console.log(`  ${COLORS.red}Pages with errors: ${pagesWithErrors}${COLORS.reset}`);
  }
  console.log();
  console.log(`  Total mustFix:    ${totalMustFix}`);
  console.log(`  Total goodToFix:  ${totalGoodToFix}`);
  console.log(`  Total passed:     ${totalPassed}`);
  console.log();
  console.log(
    `  Thresholds:       mustFix <= ${OOBEE_CONFIG.thresholds.mustFix}, goodToFix <= ${OOBEE_CONFIG.thresholds.goodToFix}`
  );
  console.log(
    `  Result:           ${
      thresholdsPassed ? `${COLORS.green}PASSED${COLORS.reset}` : `${COLORS.red}FAILED${COLORS.reset}`
    }`
  );
  console.log(`  Report:           results/`);
  console.log();

  if (!thresholdsPassed) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
