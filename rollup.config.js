import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import litcss from "rollup-plugin-postcss-lit";
const packageJson = require("./package.json");
import { getFolders } from "./scripts/buildUtils";
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
const subfolderWCPlugins = folderName => [
  ...wcPlugins,
  generatePackageJson({
    baseContents: {
      name: `${packageJson.name}/${folderName}`,
      private: true,
      main: "../umd/index.js",
      module: "./index.js",
      types: `../components/${folderName}/index.d.ts`
    }
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
const reactSubFolderBuildPlugins = folderName => [
  ...reactBuildPlugins,
  generatePackageJson({
    baseContents: {
      name: `${packageJson.name}/react/${folderName}`,
      private: true,
      main: "../cjs/index.js",
      module: "./index.js",
      types: "./index.d.ts"
    }
  })
];

// const wcfolderBuilds = getFolders("./src/components").map(folder => {
//   return {
//     input: `src/components/${folder}/index.ts`,
//     output: [
//       {
//         file: `lib/${folder}/index.js`,
//         sourcemap: true,
//         exports: "named",
//         format: "esm"
//       }
//     ],
//     plugins: subfolderWCPlugins(folder)
//   };
// });

const buildSgdsPackage = () => {
  const sgdsWcPackage = [
    {
      input: "src/index.ts",
      output: {
        file: packageJson.module,
        format: "esm",
        sourcemap: true
      },
      plugins: wcPlugins
    },
    // {
    //   input: "src/main.ts",
    //   output: {
    //     file: packageJson.main,
    //     format: "umd",
    //     sourcemap: true,
    //     name: "index"
    //   },
    //   plugins: wcPlugins
    // }
    // ...wcfolderBuilds
  ];

  if (process.env.NODE_ENV === "production") {
    // const reactFolderBuilds = getFolders("src/react").map(folder => {
    //   return {
    //     input: `src/react/${folder}/index.ts`,
    //     output: [
    //       {
    //         file: `lib/react/${folder}/index.js`,
    //         sourcemap: true,
    //         exports: "named",
    //         format: "esm"
    //       }
    //     ],
    //     external: ["@lit-labs/react", "react"],
    //     plugins: reactSubFolderBuildPlugins(folder)
    //   };
    // });
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
      // ...reactFolderBuilds
    ];
    return sgdsWcPackage.concat(reactPackage);
  }
  return sgdsWcPackage;
};

export default buildSgdsPackage;
