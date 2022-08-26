import { esbuildPlugin } from "@web/dev-server-esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import rollupPostcss from 'rollup-plugin-postcss';
import rollupLitcss from 'rollup-plugin-postcss-lit';
import { fromRollup } from '@web/dev-server-rollup';

const postcss = fromRollup(rollupPostcss)
const litcss = fromRollup(rollupLitcss)
export default {
  files: "test-outdir/**/*.test.js",
  nodeResolve: true,
  plugins: [
    esbuildPlugin({
      ts: true,  // compile ts files
      // loaders: { ".scss": "text" }, // ignoring .scss files during unit testing
    }),
    // postcss({
    //   minimize: false,
    //   inject: false
    // }),
    // litcss()
  ], 
};
