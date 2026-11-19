/* eslint-disable no-console */
const { resolve, join, basename } = require("path");
const { readFile, writeFile, copy, mkdir, readdir, stat } = require("fs-extra");
const packagePath = process.cwd();
const distPath = join(packagePath, "./lib");

const writeJson = (targetPath, obj) => writeFile(targetPath, JSON.stringify(obj, null, 2), "utf8");

async function createPackageFile() {
  const packageData = await readFile(resolve(packagePath, "./package.json"), "utf8");
  const { scripts, devDependencies, ...packageOthers } = JSON.parse(packageData);
  const newPackageData = {
    ...packageOthers,
    private: false,
    sideEffects: true,
    typings: "./index.d.ts",
    main: "./index.umd.js",
    module: "./index.js",
    exports: {
      ".": "./index.js",
      "./themes/*": "./themes/*",
      "./css/*": "./css/*",
      "./components": "./components/index.js",
      "./components/*": "./components/*",
      "./react": {
        node: "./react-ssr/index.js",
        default: "./react/index.js"
      },
      "./react/ssr": "./react/_ssr/index.js",
      "./react/*": {
        node: "./react-ssr/*",
        default: "./react/*"
      },
      "./base/*": null,
      "./utils/*": null,
      "./types/react": "./types/react.d.ts"
    },
    customElements: "./custom-elements.json"
  };

  const targetPath = resolve(distPath, "./package.json");

  await writeJson(targetPath, newPackageData);
  console.log(`Created package.json in ${targetPath}`);
}

async function includeFileInBuild(file, targetFolder = distPath) {
  const sourcePath = resolve(packagePath, file);
  const targetPath = resolve(targetFolder, basename(file));
  await copy(sourcePath, targetPath);
  console.log(`Copied ${sourcePath} to ${targetPath}`);
}
/**
 * Copying Masthead umd file to root Masthead for backward compatibility of CDN users (version <1.0.0) of Masthead
 *  <script type="module" src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component/Masthead/index.js">
 */
async function copyMastheadCdnToRoot() {
  await mkdir("./lib/Masthead");
  await copy("./lib/components/Masthead/index.umd.min.js", "./lib/Masthead/index.js");
}

/**
 * Generate lib/react-ssr/ with thin re-export wrappers that import _ssr-init
 * before re-exporting from the CSR version. This lets the "./react/*" export
 * condition resolve to SSR-aware wrappers on Node.js.
 */
async function generateReactSsrWrappers() {
  const reactDir = resolve(distPath, "react");
  const ssrDir = resolve(distPath, "react-ssr");
  const skipDirs = new Set(["utils", "ssr", "components", "base", "_virtual", "styles", "types", "Masthead"]);

  await mkdir(ssrDir, { recursive: true });

  // Copy _ssr-init.js to react-ssr/ so relative imports work
  await copy(resolve(reactDir, "_ssr-init.js"), resolve(ssrDir, "_ssr-init.js"));
  if (await stat(resolve(reactDir, "_ssr-init.js.map")).catch(() => null)) {
    await copy(resolve(reactDir, "_ssr-init.js.map"), resolve(ssrDir, "_ssr-init.js.map"));
  }

  // Copy utils/ (needed by _ssr-init for nonce-patch)
  await copy(resolve(reactDir, "utils"), resolve(ssrDir, "utils"));

  const entries = await readdir(reactDir);
  let count = 0;

  for (const entry of entries) {
    if (skipDirs.has(entry) || entry.startsWith("_") || entry.startsWith(".")) continue;

    const entryPath = resolve(reactDir, entry);
    const entryStat = await stat(entryPath);
    if (!entryStat.isDirectory()) continue;

    // Check this is a component dir with an index.js
    const indexPath = resolve(entryPath, "index.js");
    if (!(await stat(indexPath).catch(() => null))) continue;

    const wrapperDir = resolve(ssrDir, entry);
    await mkdir(wrapperDir, { recursive: true });
    await writeFile(
      resolve(wrapperDir, "index.js"),
      `import "../_ssr-init.js";\nexport { default } from "../../react/${entry}/index.js";\n`,
      "utf8"
    );
    count++;
  }

  // Also create the barrel re-export
  await writeFile(
    resolve(ssrDir, "index.js"),
    `import "./_ssr-init.js";\nexport * from "../react/index.js";\n`,
    "utf8"
  );

  console.log(`Generated ${count} SSR wrappers + barrel in lib/react-ssr/`);
}

async function run() {
  try {
    await createPackageFile();
    await includeFileInBuild("./README.md");
    await includeFileInBuild("./custom-elements.json");
    // Copy raw ssr-nonce-patch.js (bypasses Rolldown to preserve bare require)
    await copy(
      resolve(packagePath, "./src/utils/ssr-nonce-patch.raw.js"),
      resolve(distPath, "./react/utils/ssr-nonce-patch.js")
    );
    console.log("Copied ssr-nonce-patch.raw.js → lib/react/utils/ssr-nonce-patch.js");
    await generateReactSsrWrappers();
    // await copy(resolve(packagePath, "./src/themes"), distPath)
    await copyMastheadCdnToRoot();
    // await includeFileInBuild('../../LICENSE');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
