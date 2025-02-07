/* eslint-disable no-console */
const { resolve, join, basename } = require("path");
const { readFile, writeFile, copy, mkdir } = require("fs-extra");
const packagePath = process.cwd();
const distPath = join(packagePath, "./lib");

const writeJson = (targetPath, obj) => writeFile(targetPath, JSON.stringify(obj, null, 2), "utf8");

async function createPackageFile() {
  const packageData = await readFile(resolve(packagePath, "./package.json"), "utf8");
  const { scripts, devDependencies, ...packageOthers } = JSON.parse(packageData);
  const newPackageData = {
    ...packageOthers,
    private: false,
    typings: "./index.d.ts",
    main: "./index.umd.js",
    module: "./index.js",
    exports: {
      ".": "./index.js",
      "./themes/*": "./themes/*",
      "./css/*": "./css/*",
      "./components": "./components/index.js",
      "./components/*": "./components/*",
      "./react": "./react/index.js",
      "./react/*": "./react/*",
      "./base/*": null,
      "./utils/*": null
    }
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
  await copy("./lib/components/Masthead/index.umd.js", "./lib/Masthead/index.js");
}
async function run() {
  try {
    await createPackageFile();
    await includeFileInBuild("./README.md");
    // await copy(resolve(packagePath, "./src/themes"), distPath)
    await copyMastheadCdnToRoot();
    // await includeFileInBuild('../../LICENSE');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
