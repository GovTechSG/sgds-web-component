import { defineConfig, createLogger } from "vite";
import postcssLit from "rollup-plugin-postcss-lit";
import replace from "@rollup/plugin-replace";

const logger = createLogger();
const originalWarning = logger.warn;
logger.warn = (msg, options) => {
  if (msg.includes("Default and named imports from CSS files are deprecated")) return;
  originalWarning(msg, options);
};


export default defineConfig({
  plugins: [
    replace({
      ".css": ".css?inline",
      preventAssignment: true
    }),
    postcssLit({ include: ["**/*.css", "**/*.css?*"] }),
  ],
  resolve: {
    alias: [
      {
        // this is required for the SCSS modules
        find: /^~(.*)$/,
        replacement: "$1"
      }
    ]
  },
  define: {
    "process.env.VITE_ENV": JSON.stringify(process.env.VITE_ENV)
  },
  customLogger: logger,
  build: {
    cssCodeSplit: false
  }
});
