import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import litcss from 'rollup-plugin-postcss-lit';
const packageJson = require('./package.json');

export default [
  {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    }
  ],
  plugins: [
    resolve({
      browser: true,
    }),
    typescript(),
    postcss({
      minimize: false,
      inject: false
    }),
    litcss(),
  ],
},
];
