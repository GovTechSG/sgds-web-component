import commandLineArgs from 'command-line-args';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { deleteSync } from 'del';
import prettier from 'prettier';
import prettierConfig from '../prettier.config.cjs';
import { getAllComponents, getSgdsComponents } from './shared.mjs';
import { makeArgTypes } from './makeArgTypes.mjs';
import groupBy from 'lodash/groupBy.js';
const storiesDir = path.join('stories-test');
import { methodsTable } from './methodsTable.mjs';
// Clear build directory
deleteSync(storiesDir);
fs.mkdirSync(storiesDir, { recursive: true });

// Fetch component metadata
const metadata = JSON.parse(fs.readFileSync(path.join('./', 'custom-elements.json'), 'utf8'));

// Wrap components
console.log('Wrapping components for Storybook...');

// should get all components except base components
const components = getSgdsComponents(getAllComponents(metadata));
const index = [];

const groupedComponents = groupBy(components, (k, v) => {
  return k.modulePath.split('/')[1];
});

for (const [key, value] of Object.entries(groupedComponents)) {
  const allMembers = value.map(i => i.members).flat();
  const methodsMeta = methodsTable(value);
  const summary = value.filter(i => i.summary).map(i => i.summary).join('')
  const args = allMembers.filter(member => member.kind === 'field');
  const componentFile = path.join(storiesDir, `${key}.stories.mdx`);
  const ArgsTable = value.map(
    component =>
      `### ${component.tagName}
<ArgsTable of="${component.tagName}"/>\n
  `
  );

  const source = prettier.format(
    `
import { Canvas, Meta, Story, ArgsTable } from "@storybook/addon-docs";
import { html } from "lit-html";
import { getCustomElements } from '@storybook/web-components';
import {Template} from '../stories/templates/Accordion.mdx';

<Meta
 title="Components/${key}"
 argTypes={${JSON.stringify(makeArgTypes(args))}}
 />

# ${key}  
${summary ? summary +"\n" : "\n"}
<Canvas>
  <Story name="Basic" args={{ summary: "This is an accordion" }}>
    {Template.bind({})}
  </Story>
</Canvas>

## API
${ArgsTable.join('\n')}


${methodsMeta.map(meta => {
  if (meta.methods.length > 0){
    return `## Methods \n### ${meta.tagName}\n<table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          ${meta.methods.map(method => (
            `<tr>
              <td>${method.name}</td>
              <td>${method.description}</td>
            </tr>`
          )).join('')}
        </tbody>
      </table>
    `
  } else return
}
 ).join('')}
    `,
    { parser: 'mdx' }
  );
  fs.writeFileSync(componentFile, source, 'utf8');
}

// // Generate the index file
// fs.writeFileSync(path.join(storiesDir, 'index.ts'), index.join('\n'), 'utf8');

// console.log(chalk.cyan(`\nComponents have been wrapped for React! 📦\n`));
