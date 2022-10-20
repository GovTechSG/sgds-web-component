import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import litcss from "rollup-plugin-postcss-lit";
const packageJson = require("./package.json");
import { getFolders } from './scripts/buildUtils';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import replace from '@rollup/plugin-replace'; 

const plugins = [
  resolve({
    browser: true,
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify("production"),
    preventAssignment: true
  }),
  postcss({
    minimize: false,
    inject: false,
  }),
  litcss(),
  typescript({
    tsconfig: 'tsconfig.json',
    useTsconfigDeclarationDir: true,
  }),
]
const reactBuildPlugins = [
  resolve(),
  postcss({
    minimize: false,
    inject: false,
  }),
  litcss(),
  typescript({
    useTsconfigDeclarationDir: true,
  })
]
const reactSubFolderBuildPlugins = (folderName) =>  [
  ...reactBuildPlugins,
  generatePackageJson({
    baseContents: {
      name: `${packageJson.name}/react/${folderName}`,
      private: true,
      main: '../cjs/index.js',
      module: './index.js',
      types: './index.d.ts',
    },
  }),
]
const subfolderPlugins = (folderName) => [
  ...plugins,
  generatePackageJson({
    baseContents: {
      name: `${packageJson.name}/${folderName}`,
      private: true,
      main: '../umd/index.js',
      module: './index.js',
      types: './index.d.ts',
    },
  }),
];
const folderBuilds = getFolders('./src').map((folder) => {
  return {
    input: `src/${folder}/index.ts`,
    output: [
      {
      file: `lib/${folder}/index.js`,
      sourcemap: true,
      exports: 'named',
      format: 'esm',
      }
    ],
    plugins: subfolderPlugins(folder),
  };
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const reactFolderBuilds = getFolders('src/react').map((folder) => {
  return {
    input: `src/react/${folder}/index.ts`,
    output: [
      {
      file: `lib/react/${folder}/index.js`,
      sourcemap: true,
      exports: 'named',
      format: 'esm',
      }
    ],
    external: ['@lit-labs/react', 'react'],
    plugins : reactSubFolderBuildPlugins(folder)
  }
})
export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
      {
        file: packageJson.main,
        format: "umd",
        sourcemap: true,
        name: "index"
      },
    ],
    plugins
  },
  ...folderBuilds,
  {
    input: 'src/react/index.ts',
    output: [
      {
        file: "lib/react/index.js",
        format: 'esm',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: "lib/react/cjs/index.js",
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins: reactBuildPlugins,
    external: ['@lit-labs/react', 'react'],
  },
  ...reactFolderBuilds
];
