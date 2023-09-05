import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import litcss from "rollup-plugin-postcss-lit";
import generatePackageJson from "rollup-plugin-generate-package-json";
import replace from "@rollup/plugin-replace";
import { visualizer } from "rollup-plugin-visualizer";
import { readFile } from 'fs/promises';

const external = ["@lit", "lit", "lit-element", "@popperjs", /@open-wc\/.*/, "bootstrap", "tslib", /lit\/.*/,  /bootstrap\/.*/]

const packageJson = JSON.parse(
  await readFile(
    new URL('./package.json', import.meta.url)
  )
);
const wcPlugins = [
  resolve({
    browser: true,
    dedupe: external,
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
  })
];
const buildSgdsPackage = () => {
  const sgdsWcPackage = [
    // bundled version for cdn 
    {
      input: ["src/index.ts"],
      output: {
        entryFileNames: "[name].js",
        dir: "lib",
        format: "esm",
        sourcemap: true
      },
      plugins: wcPlugins,
      external
    },
    // unbundled for local installation
    {
      input: ["src/components/index.ts"],
      output: {
        dir: "lib",
        format: "esm",
        preserveModules: true,
        preserveModulesRoot: "src",
        sourcemap: true,
        // entryFileNames: (chunkInfo) => {
        //   console.log(chunkInfo)
        //   if (chunkInfo.name.includes('node_modules')) {
            
        //     return chunkInfo.name.replace('node_modules', 'external') + '.js';
        //   }
  
        //   return '[name].js';
        // }
      },
      plugins: wcPlugins,
      external
    }
  ];

  if (process.env.NODE_ENV === "production") {
    const reactPackage = [
      {
        input: "src/react/index.ts",
        output: [
          {
            entryFileNames: "[name].js",

            dir: "lib",
            format: "esm",
            sourcemap: true,
            exports: "named",
            preserveModules: true,
            preserveModulesRoot: "src"
          }
        ],
        plugins: [
          ...reactBuildPlugins,
          // generatePackageJson({
          //   baseContents: {
          //     name: `${packageJson.name}/react`,
          //     private: false,
          //     main: "./cjs/index.js",
          //     module: "./index.js",
          //     types: "./index.d.ts"
          //   }
          // })
        ],
        external: ["@lit-labs/react", "react", ...external]
      },
      {
        input: "src/react/index.ts",
        output: [
          {
            file: "lib/react/cjs/index.js",
            format: "cjs",
            sourcemap: true,
            exports: "named"
          }
        ],
        plugins: [...reactBuildPlugins],
        external: ["@lit-labs/react", "react", ...external]
      }
    ];
    return sgdsWcPackage.concat(reactPackage);
  }
  return sgdsWcPackage;
};

export default buildSgdsPackage;
