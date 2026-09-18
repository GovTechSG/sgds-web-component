import { defineConfig } from "rolldown";
import { replacePlugin } from "rolldown/plugins";
import postcss from "rollup-plugin-postcss";
import litcss from "rollup-plugin-postcss-lit";
import { visualizer } from "rollup-plugin-visualizer";
import { glob } from "glob";
import path from "node:path";
import { fileURLToPath } from "node:url";
import copy from "rollup-plugin-copy";

const external = [
  "@lit",
  "lit",
  "lit-element",
  /@open-wc\/.*/,
  "tslib",
  /lit\/.*/,
  "@floating-ui/dom"
];

const copyPlugin = copy({
  targets: [
    { src: "src/themes/**/*", dest: "lib/themes" },
    { src: "src/css/**/*", dest: "lib/css" },
    { src: "src/icons/**/*", dest: "lib/icons" }
  ]
});

const sharedModuleTypes = {
  ".css": "js",
  ".scss": "js"
};

const createPlugins = () => [
  replacePlugin({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    preventAssignment: true
  }),
  postcss({
    minimize: true,
    inject: false
  }),
  litcss(),
  visualizer()
];

const wcPlugins = createPlugins();
const umdPlugins = createPlugins();

const reactBuildPlugins = [
  replacePlugin({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    preventAssignment: true
  }),
  postcss({
    minimize: true,
    inject: false
  }),
  litcss()
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

  return indexFilesMetadata.map(meta =>
    defineConfig({
      input: meta.inputPath,
      output: {
        name: `${meta.name}Bundle`,
        file: `lib/${meta.outputPath}.umd.min.js`,
        format: "umd",
        sourcemap: true,
        inlineDynamicImports: true,
        minify: true
      },
      platform: "browser",
      moduleTypes: sharedModuleTypes,
      resolve: {
        conditionNames: ["default", "import"]
      },
      plugins: [...umdPlugins]
    })
  );
};

const buildSgdsPackage = () => {
  const esmModules = [
    //generate subpath entry points for individual components side effects ce file
    defineConfig({
      input: ["src/index.ts", "src/components/index.ts"],
      output: {
        entryFileNames: "[name].js",
        dir: "lib",
        format: "esm",
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: "src"
      },
      platform: "browser",
      moduleTypes: sharedModuleTypes,
      resolve: {
        conditionNames: ["development", "import", "default"]
      },
      plugins: [...wcPlugins, copyPlugin],
      external
    })
  ];

  const umdBundles = [
    // bundled form for cdn
    defineConfig({
      input: ["src/index.ts"],
      output: {
        entryFileNames: "[name].umd.min.js",
        dir: "lib",
        format: "umd",
        sourcemap: true,
        inlineDynamicImports: true,
        minify: true
      },
      platform: "browser",
      moduleTypes: sharedModuleTypes,
      resolve: {
        conditionNames: ["default", "import"]
      },
      plugins: [...umdPlugins]
    }),
    ...buildUMDComponentBundles()
  ];

  const reactPackage = [
    defineConfig({
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
      platform: "browser",
      moduleTypes: sharedModuleTypes,
      plugins: [...reactBuildPlugins],
      external: ["@lit/react", "react", ...external]
    }),
    defineConfig({
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
      platform: "browser",
      moduleTypes: sharedModuleTypes,
      plugins: [...reactBuildPlugins],
      external: ["@lit/react", "react", ...external]
    })
  ];

  return [...reactPackage, ...esmModules, ...umdBundles];
};

export default buildSgdsPackage;
