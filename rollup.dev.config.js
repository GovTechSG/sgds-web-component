import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import litcss from 'rollup-plugin-postcss-lit';
const packageJson = require('./package.json');
import { getFolders } from './scripts/buildUtils';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import replace from '@rollup/plugin-replace';

const wcPlugins = [
  resolve({
    browser: true
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify('development'),
    preventAssignment: true
  }),
  postcss({
    minimize: false,
    inject: false
  }),
  litcss(),
  typescript({
    tsconfig: 'tsconfig.json',
    useTsconfigDeclarationDir: true
  })
];
const subfolderWCPlugins = folderName => [
  ...wcPlugins,
  generatePackageJson({
    baseContents: {
      name: `${packageJson.name}/${folderName}`,
      private: true,
      main: '../umd/index.js',
      module: './index.js',
      types: './index.d.ts'
    }
  })
];

const wcfolderBuilds = getFolders('./src').map(folder => {
  return {
    input: `src/${folder}/index.ts`,
    output: [
      {
        file: `lib/${folder}/index.js`,
        sourcemap: true,
        exports: 'named',
        format: 'esm'
      }
    ],
    plugins: subfolderWCPlugins(folder)
  };
});

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true
      },
      {
        file: packageJson.main,
        format: 'umd',
        sourcemap: true,
        name: 'index'
      }
    ],
    plugins: wcPlugins
  },
  ...wcfolderBuilds
];
