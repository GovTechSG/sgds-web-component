import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import litcss from "rollup-plugin-postcss-lit";
import path from "path";
import replace from "@rollup/plugin-replace";
const packageJson = require("./package.json");
import * as fs from "fs";

function getFilesInDirectorySync(directoryPath) {
  try {
    const files = fs.readdirSync(directoryPath);
    const result = files.map(file => {
      const filePath = path.join(directoryPath, file);
      const stats = fs.statSync(filePath);
      if (stats.isFile()) {
        return filePath;
      }
    });

    // Filter out undefined values (directories)
    return result.filter(filePath => filePath !== undefined);
  } catch (error) {
    console.error("Error reading directory:", error);
    throw error;
  }
}

export default [
  {
    input: [...getFilesInDirectorySync("./test"), ...getFilesInDirectorySync("./test/utils")],
    output: [
      {
        dir: "test-outdir",
        format: "es"
      }
    ],
    plugins: [
      resolve({
        browser: true
      }),
      replace({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
      }),
      typescript({
        tsconfig: "./tsconfig.test.json"
      }),
      postcss({
        // process .scss files
        minimize: false,
        inject: false
      }),
      litcss() // process adoptedStylesheets for lit
    ]
  }
];
