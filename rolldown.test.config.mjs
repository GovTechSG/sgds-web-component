import { defineConfig } from "rolldown";
import { replacePlugin } from "rolldown/plugins";
import postcss from "rollup-plugin-postcss";
import litcss from "rollup-plugin-postcss-lit";
import * as fs from "fs";
import path from "path";

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

export default defineConfig({
  input: [
    ...getFilesInDirectorySync("./test"),
    ...getFilesInDirectorySync("./test/utils"),
    ...getFilesInDirectorySync("./test/a11y/axe-core")
  ],
  output: {
    dir: "test-outdir",
    format: "es"
  },
  platform: "browser",
  moduleTypes: {
    ".css": "js",
    ".scss": "js"
  },
  plugins: [
    replacePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      preventAssignment: true
    }),
    postcss({
      minimize: false,
      inject: false
    }),
    litcss()
  ]
});
