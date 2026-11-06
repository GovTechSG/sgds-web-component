import { copyFileSync, mkdirSync, rmSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturesDir = resolve(__dirname, "../fixtures");
const appsDir = resolve(__dirname, "../apps");

const filesToCopy = ["component-list.json", "component-html.json", "component-args.json"];

const targetDirs = [
  resolve(appsDir, "vue-app/public"),
  resolve(appsDir, "nuxt-app/public"),
  resolve(appsDir, "angular-app/src/assets"),
  resolve(appsDir, "next-app/public"),
  resolve(appsDir, "react-app/public"),
];

const appDirs = ["next-app", "nuxt-app", "react-app", "vue-app", "angular-app"];

const buildCacheDirs = [
  resolve(appsDir, "next-app/.next"),
  resolve(appsDir, "next-app/.next-prod"),
  resolve(appsDir, "next-app/.next-dev"),
  resolve(appsDir, "nuxt-app/.nuxt-prod"),
  resolve(appsDir, "nuxt-app/.output"),
];

export default function globalSetup() {
  // Clean build caches so tests always run against a fresh build
  for (const dir of buildCacheDirs) {
    rmSync(dir, { recursive: true, force: true });
  }
  console.log("Cleared build caches.");

  // Copy fixture files to each app's public directory
  let copied = 0;
  for (const dir of targetDirs) {
    mkdirSync(dir, { recursive: true });
    for (const file of filesToCopy) {
      copyFileSync(resolve(fixturesDir, file), resolve(dir, file));
      copied++;
    }
  }
  console.log(`Copied ${filesToCopy.length} fixtures to ${targetDirs.length} apps (${copied} total)`);

  // Install dependencies for all apps sequentially to avoid concurrent install conflicts
  // (e.g. Nuxt's postinstall "nuxt prepare" breaks when two installs run in the same dir)
  for (const app of appDirs) {
    const cwd = resolve(appsDir, app);
    console.log(`Installing dependencies for ${app}...`);
    execSync("pnpm install --no-frozen-lockfile", { cwd, stdio: "inherit" });
  }
  console.log("All app dependencies installed.");
}
