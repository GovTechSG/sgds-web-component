import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import litcss from "rollup-plugin-postcss-lit";
const packageJson = require("./package.json");
import { getFolders } from "./scripts/buildUtils";
import generatePackageJson from "rollup-plugin-generate-package-json";
import replace from "@rollup/plugin-replace";
import copy from "rollup-plugin-copy";
import path from 'path';

const plugins = [
  resolve({
    browser: true,
  }),
  replace({
    "process.env.NODE_ENV": JSON.stringify("production"),
    preventAssignment: true,
  }),
  postcss({
    minimize: false,
    inject: false,
  }),
  litcss(),
  typescript({
    useTsconfigDeclarationDir: true,
  }),
];
const subfolderPlugins = (folderName) => [
  ...plugins,
  generatePackageJson({
    baseContents: {
      name: `${packageJson.name}/${folderName}`,
      private: true,
      main: "../umd/index.js",
      module: "./index.js",
      types: "./index.d.ts",
    },
  }),
];
const folderBuilds = getFolders("./src").map((folder) => {
  return {
    input: `src/${folder}/index.ts`,
    output: [
      {
        file: `lib/${folder}/index.js`,
        sourcemap: true,
        exports: "named",
        format: "esm",
      },
    ],
    plugins: subfolderPlugins(folder),
  };
});

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
      {
        file: packageJson.main,
        format: "umd",
        sourcemap: true,
        name: "index",
      },
    ],
    plugins: [
      ...plugins,
      copy({
        copyOnce: true,
        targets: [
          {
            src: path.resolve(
              __dirname,
              "node_modules/@shoelace-style/shoelace/dist/assets"
            ),
            dest: [path.resolve(__dirname, "lib"), __dirname],
          },
        ],
      }),
    ],
  },
  ...folderBuilds,
];
