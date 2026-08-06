import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";

const oobeeDir = resolve("node_modules/@govtechsg/oobee");
const pkgPath = resolve(oobeeDir, "package.json");

// Pin crawlee to ~3.17.0 — oobee passes absolute paths to Dataset.open()
// which crawlee 3.18+ rejects with resolveWithinDirectory validation
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
pkg.pnpm = { overrides: { crawlee: "~3.17.0" } };
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

execSync("pnpm install && pnpm run build && pnpm exec playwright install chromium", {
  cwd: oobeeDir,
  stdio: "inherit"
});
