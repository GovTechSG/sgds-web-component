import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import litcss from 'rollup-plugin-postcss-lit';
// import autoprefixer from 'autoprefixer';
// import path from 'path'

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'lib',
      format: 'es',
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
      // modules: true,
      // extensions: ['.sass', '.scss'],
      // // namedExports: true,
      // plugins: [
      //     autoprefixer
      // ],
      // use: [
      //     [
      //         'sass', {
      //             includePaths: [path.resolve('node_modules')]
      //         }
      //     ]
      // ]
    }),
    litcss(),
  ],
};
