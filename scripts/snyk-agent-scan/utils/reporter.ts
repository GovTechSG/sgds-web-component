import type { ScanResult } from "./scanner.js";

const RED = "\x1b[0;31m";
const GREEN = "\x1b[0;32m";
const YELLOW = "\x1b[1;33m";
const CYAN = "\x1b[0;36m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

export function printChangedFiles(files: string[]): void {
  console.log(`${CYAN}${BOLD}Changed files:${RESET}`);
  for (const f of files) console.log(f);
  console.log();
}

export function printScanHeader(file: string): void {
  console.log(`${CYAN}--- Scanning: ${file} ---${RESET}`);
}

export function printSummary(results: ScanResult[]): void {
  const passed = results.filter((r) => r.passed);
  const failed = results.filter((r) => !r.passed);

  console.log();
  console.log(`${BOLD}========== Scan Summary ==========${RESET}`);

  if (passed.length > 0) {
    console.log(`${GREEN}${BOLD}PASSED (${passed.length}):${RESET}`);
    for (const r of passed) console.log(`  ${GREEN}✔ ${r.file}${RESET}`);
  }

  const unauthorized = results.filter((r) => r.unauthorized);

  if (unauthorized.length > 0) {
    console.log(`${YELLOW}${BOLD}UNAUTHORIZED (${unauthorized.length}):${RESET}`);
    for (const r of unauthorized) console.log(`  ${YELLOW}⚠ ${r.file}${RESET}`);
    console.log(
      `${YELLOW}${BOLD}SNYK_TOKEN is invalid or missing. Scan results are incomplete.${RESET}`,
    );
    process.exit(1);
  }

  if (failed.length > 0) {
    console.log(`${RED}${BOLD}FAILED (${failed.length}):${RESET}`);
    for (const r of failed) {
      console.log(`  ${RED}✘ ${r.file}${RESET}`);
      console.log(r.output.trimEnd());
      console.log();
    }
    console.log(
      `${RED}${BOLD}Job failed due to security findings in the files above.${RESET}`,
    );
    process.exit(1);
  }

  console.log(`${GREEN}${BOLD}All scans passed.${RESET}`);
}
