import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import litcss from "rollup-plugin-postcss-lit";
import replace from "@rollup/plugin-replace";
import { visualizer } from "rollup-plugin-visualizer";
import glob from "glob";
import path from "node:path";
import { fileURLToPath } from "node:url";
import copy from "rollup-plugin-copy";
import preserveDirectives from "rollup-plugin-preserve-directives";

const external = [
  "@lit",
  "lit",
  "lit-element",
  "@popperjs",
  /@open-wc\/.*/,
  "bootstrap",
  "tslib",
  /lit\/.*/,
  /bootstrap\/.*/,
  "imask",
  "date-fns"
];

const copyPlugin = copy({
  targets: [
    { src: "src/themes/**/*", dest: "lib/themes" },
    { src: "src/css/**/*", dest: "lib/css" },
    { src: "src/icons/**/*", dest: "lib/icons" }
  ]
});
const wcPlugins = [
  resolve({
    browser: true,
    dedupe: external,
    exportConditions: ["development"]
  }),
  replace({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    preventAssignment: true
  }),
  postcss({
    minimize: true,
    inject: false
  }),
  litcss(),
  typescript({
    tsconfig: "tsconfig.json",
    useTsconfigDeclarationDir: true
  }),
  visualizer()
];

const reactBuildPlugins = [
  resolve(),
  postcss({
    minimize: true,
    inject: false
  }),
  litcss(),
  typescript({
    useTsconfigDeclarationDir: true
  }),
  preserveDirectives()
];
const buildUMDComponentBundles = () => {
  const indexFilesMetadata = glob
    .sync("src/components/**/index.ts")
    .map(file => ({
      name: file.split("/")[2],
      outputPath: path.relative("src", file.slice(0, file.length - path.extname(file).length)),
      inputPath: fileURLToPath(new URL(file, import.meta.url))
    }))
    .flat();

  return indexFilesMetadata.map(meta => ({
    input: meta.inputPath,
    output: {
      name: `${meta.name}Bundle`,
      file: `lib/${meta.outputPath}.umd.js`,
      format: "umd",
      sourcemap: true,
      inlineDynamicImports: true
    },
    plugins: wcPlugins
  }));
};
const buildSgdsPackage = () => {
  const esmModules = [
    //generate subpath entry points for individual components side effects ce file
    {
      input: ["src/index.ts", "src/components/index.ts"],
      output: {
        entryFileNames: "[name].js",
        dir: "lib",
        format: "esm",
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: "src"
      },
      plugins: [...wcPlugins, copyPlugin],
      external
    }
  ];

  const umdBundles = [
    // bundled form for cdn
    {
      input: ["src/index.ts"],
      output: {
        entryFileNames: "[name].umd.js",
        dir: "lib",
        format: "umd",
        sourcemap: true,
        inlineDynamicImports: true
      },
      plugins: wcPlugins
    },
    ...buildUMDComponentBundles()
  ];

  const reactPackage = [
    {
      input: "src/react/index.ts",
      output: [
        {
          entryFileNames: "[name].js",
          dir: "lib/react",
          format: "esm",
          sourcemap: true,
          exports: "named",
          preserveModules: true,
          preserveModulesRoot: "src/react",
          banner: `'use client';`
        }
      ],
      plugins: [...reactBuildPlugins],
      external: ["@lit/react", "react", ...external]
    },
    {
      input: "src/react/index.ts",
      output: [
        {
          entryFileNames: "[name].cjs.js",
          dir: "lib/react",
          format: "cjs",
          sourcemap: true,
          exports: "named",
          preserveModules: true,
          preserveModulesRoot: "src/react",
          banner: `'use client';`
        }
      ],
      plugins: [...reactBuildPlugins],
      external: ["@lit/react", "react", ...external]
    }
  ];

  return [...reactPackage, ...esmModules, ...umdBundles];
};

export default buildSgdsPackage;
