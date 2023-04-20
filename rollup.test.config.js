import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import litcss from 'rollup-plugin-postcss-lit';
import path from 'path';
import replace from '@rollup/plugin-replace';
const packageJson = require('./package.json');
const fs = require('fs');

export const getFiles = (entry, extensions = [], excludeExtensions = []) => {
  const files = fs.readdirSync(entry);
  const filePaths = files.map(fileName => path.join(entry, fileName));
  return filePaths;
};

export default [
  {
    input: getFiles('./test'),
    output: [
      {
        dir: 'test-outdir',
        format: 'es'
      }
    ],
    plugins: [
      resolve({
        browser: true
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      typescript({
        tsconfig: './tsconfig.test.json'
      }),
      postcss({
        // process .scss files
        minimize: false,
        inject: false
      }),
      litcss() // process adoptedStylesheets for lit
    ]
  }
];
