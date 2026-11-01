import { copyFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturesDir = resolve(__dirname, "../fixtures");

const filesToCopy = ["component-list.json", "component-html.json", "component-args.json"];

const targetDirs = [
  resolve(__dirname, "../apps/vue-app/public"),
  resolve(__dirname, "../apps/nuxt-app/public"),
  resolve(__dirname, "../apps/angular-app/src/assets"),
  resolve(__dirname, "../apps/next-app/public"),
  resolve(__dirname, "../apps/react-app/public"),
];

export default function globalSetup() {
  let copied = 0;
  for (const dir of targetDirs) {
    mkdirSync(dir, { recursive: true });
    for (const file of filesToCopy) {
      copyFileSync(resolve(fixturesDir, file), resolve(dir, file));
      copied++;
    }
  }
  console.log(`Copied ${filesToCopy.length} fixtures to ${targetDirs.length} apps (${copied} total)`);
}
