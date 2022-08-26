import { esbuildPlugin } from "@web/dev-server-esbuild";
import { sassPlugin } from "esbuild-sass-plugin";

export default {
  files: "test/**/*.test.ts",
  nodeResolve: true,
  plugins: [
    esbuildPlugin({
      ts: true,  // compile ts files
      loaders: { ".scss": "text" }, // ignoring .scss files during unit testing
    }),
  ], 
};
