import commandLineArgs from 'command-line-args';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { deleteSync } from 'del';
import prettier from 'prettier';
import prettierConfig from '../prettier.config.cjs';
import { getAllComponents } from './shared.mjs';

const storiesDir = path.join('stories-test');

// Clear build directory
deleteSync(storiesDir);
fs.mkdirSync(storiesDir, { recursive: true });

// Fetch component metadata
const metadata = JSON.parse(fs.readFileSync(path.join('./', 'custom-elements.json'), 'utf8'));

// Wrap components
console.log('Wrapping components for Storybook...');

const components = getAllComponents(metadata);
const index = [];

components.map(component => {
  // console.log(component);
  const componentFolderName = component.modulePath.split('/')[1];
  const nameWithoutPrefix = component.name.replace(/^Sgds/, '');
  const tagWithoutPrefix = component.tagName.replace(/^sgds-/, '');
  const componentDir = path.join(storiesDir, tagWithoutPrefix);
  const componentFile = path.join(storiesDir, `${nameWithoutPrefix}.mdx`);
  const importPath = component.modulePath.replace(/^src\//, '').replace(/\.ts$/, '');
  const events = (component.events || []).map(event => `${event.reactName}: '${event.name}'`).join(',\n');
  const props = component.members.filter(member => member.kind === 'field');
  const makeArgTypes = props.reduce((obj, item) => {
    let controlType
    switch(true) {
      case /string/.test(item.type?.text):
        controlType = 'text';
        break;
      case /boolean/.test(item.type?.text):
        controlType = 'boolean';
        break;
      case /number/.test(item.type?.text):
        controlType = 'number';
        break;
      case /|/.test(item.type?.text):
        controlType = 'select';
        break;
      case /array/.test(item.type?.text):
        controlType = 'object';
        break;
        default:
        controlType = 'object'
      
    }
      
  return Object.assign(obj, { [item.name]: { "control": controlType} });
  }, {});

  // fs.mkdirSync(componentDir, { recursive: true });

  const source = prettier.format(
    `
      import { Canvas, Meta, Story, ArgsTable } from "@storybook/addon-docs";
      import { html } from "lit-html";
      import "../../lib/${componentFolderName}";
      import { getCustomElements } from '@storybook/web-components';  

      <Meta
      title="Components/${nameWithoutPrefix}"
      argTypes={${JSON.stringify(makeArgTypes)}}
    />
    `,
    Object.assign(prettierConfig, {
      parser: 'babel-ts'
    })
  );

    fs.writeFileSync(componentFile, source, 'utf8');
});

// // Generate the index file
// fs.writeFileSync(path.join(storiesDir, 'index.ts'), index.join('\n'), 'utf8');

// console.log(chalk.cyan(`\nComponents have been wrapped for React! 📦\n`));
