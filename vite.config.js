import { defineConfig } from "vite";
import postcssLit from "rollup-plugin-postcss-lit";

export default defineConfig({
  plugins: [postcssLit({ include: ["**/*.scss", "**/*.scss?*"] })],
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
  }
});
