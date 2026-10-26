import chalk from 'chalk';
import { deleteSync } from 'del';
import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import prettierConfig from '../prettier.config.js';
import { getAllComponents, getSgdsComponents } from './shared.mjs';

const reactDir = path.join('src/react');

// Clear build directory
deleteSync(reactDir);
fs.mkdirSync(reactDir, { recursive: true });

// Fetch component metadata
const metadata = JSON.parse(fs.readFileSync(path.join("./", 'custom-elements.json'), 'utf8'));

// Generate SSR init module (enables DSD rendering + nonce support)
// Order matters: ssr-nonce-patch patches React BEFORE enable-lit-ssr.js saves
// the functions as its "originals". This way Lit calls our nonce wrapper internally.
const ssrInitSource = `import '../utils/ssr-nonce-patch';\nimport '@lit-labs/ssr-react/enable-lit-ssr.js';\n`;
fs.writeFileSync(path.join(reactDir, '_ssr-init.ts'), ssrInitSource, 'utf8');

// Generate SSR public API (for consumers to set CSP nonce)
const ssrDir = path.join(reactDir, '_ssr');
fs.mkdirSync(ssrDir, { recursive: true });
const ssrApiSource = `export { setCSPNonce, getCSPNonce } from '../../utils/ssr-nonce';\n`;
fs.writeFileSync(path.join(ssrDir, 'index.ts'), ssrApiSource, 'utf8');

// Wrap components
console.log('Wrapping components for React...');

const components = getSgdsComponents(getAllComponents(metadata))
const index = [];

components.map(component => {
  const tagWithoutPrefix = component.tagName.replace(/^sgds-/, '');
  const componentDir = path.join(reactDir, tagWithoutPrefix);
  const componentFile = path.join(componentDir, 'index.ts');
  const importPath = component.modulePath.replace(/^src\/components\//, '').replace(/\.ts$/, '')
  const events = (component.events || []).map(event => `${event.reactName}: '${event.name}'`).join(',\n');

  fs.mkdirSync(componentDir, { recursive: true });

  const source = prettier.format(
    `
      import '../_ssr-init';
      import * as React from 'react';
      import { createComponent } from '@lit/react';
      import Component from '../../components/${importPath}';
      import { register } from "../../utils/ce-registry";

      register("${component.tagName}", Component)

      export default createComponent({
        react: React,
        tagName: "${component.tagName}",
        elementClass: Component,
        events: {
          ${events}
        }
      });
    `,
    Object.assign(prettierConfig, {
      parser: 'babel-ts'
    })
  );

  index.push(`export { default as ${component.name} } from './${tagWithoutPrefix}';`);

  fs.writeFileSync(componentFile, source, 'utf8');
});

// Generate the index file
fs.writeFileSync(path.join(reactDir, 'index.ts'), index.join('\n'), 'utf8');

console.log(chalk.cyan(`\nComponents have been wrapped for React! 📦\n`));
