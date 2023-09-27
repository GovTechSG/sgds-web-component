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
  build: {
    outDir: "lib",
    sourcemap: true,
    lib: {
      entry: ["src/index.ts", "src/components.ts"],
      formats: ["es"]
    }
  }
});
