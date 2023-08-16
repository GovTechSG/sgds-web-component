import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import litcss from "rollup-plugin-postcss-lit";
const packageJson = require("./package.json");
import generatePackageJson from "rollup-plugin-generate-package-json";
import replace from "@rollup/plugin-replace";

const wcPlugins = [
  resolve({
    browser: true
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
  })
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
    {
      input: ["src/index.ts","src/components.ts"],
      output: {
        entryFileNames: "[name].js",
        dir: "lib",
        format: "esm",
        sourcemap: true,
      },
      plugins: wcPlugins
    }
  ];

  if (process.env.NODE_ENV === "production") {
    const reactPackage = [
      {
        input: "src/react/index.ts",
        output: [
          {
            file: "lib/react/index.js",
            format: "esm",
            sourcemap: true,
            exports: "named"
          }
        ],
        plugins: [
          ...reactBuildPlugins,
          generatePackageJson({
            baseContents: {
              name: `${packageJson.name}/react`,
              private: false,
              main: "./cjs/index.js",
              module: "./index.js",
              types: "./index.d.ts"
            }
          })
        ],
        external: ["@lit-labs/react", "react"]
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
        external: ["@lit-labs/react", "react"]
      }
    ];
    return sgdsWcPackage.concat(reactPackage);
  }
  return sgdsWcPackage;
};

export default buildSgdsPackage;
