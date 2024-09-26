import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import { getAllComponents, getSgdsComponents, pascalToKebab } from './shared.mjs';

const playgroundDir = path.join('stories/templates');

// Fetch component metadata
const metadata = JSON.parse(fs.readFileSync(path.join('./', 'custom-elements.json'), 'utf8'));

// Get and group components
const components = getSgdsComponents(getAllComponents(metadata));

for (const component of components) {
  const componentName = component.name;
  const strippedName = componentName.replace("Sgds", "");
  console.log(strippedName);
  const componentTagName = `sgds-${pascalToKebab(strippedName)}`;

  // Generate the file path similar to how mdxFilePath is done
  const filePath = path.join(playgroundDir, `${strippedName}/additional.stories.js`);
  if (!filePath || !fs.existsSync(filePath)) {
    console.error(`File for component ${strippedName} not found at ${filePath}`);
    continue;
  }

  // Generate playground HTML and JS
  const playgroundHtml = generatePlaygroundHtml(componentTagName, component);
  const formattedContent = prettier.format(playgroundHtml, { parser: 'babel' });

  // Inject the generated playground into the file
  injectPlaygroundIntoFile(filePath, formattedContent, componentName);
}

// Function to generate playground HTML and JS
function generatePlaygroundHtml(componentTagName, component) {
  return `
  import { html } from "lit-html";
  

  export const ${component.name}Playground = {
    render: () => html\`
      <playground-ide editable-file-system line-numbers resizable>
        <script type="sample/html" filename="index.html">
          <!doctype html>
          <html lang="en">
          <head>
            <link href='https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@2.0.0/themes/day.css' rel='stylesheet' type='text/css' />
            <script src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component">&lt;/script>
            
           
              <script src="./events.js">&lt;/script>
            
            ${generateCssParts(component.cssParts, componentTagName) ? 
              `<style>
                 ${generateCssParts(component.cssParts, componentTagName)}
               </style>` 
              : ''}
              ${generateCssProperties(component.cssProperties) ? 
                `<style>
                   ${componentTagName} {
                     ${generateCssProperties(component.cssProperties)}
                   }
                 </style>` 
                : ''}
          </head>
          <body>
            
          </body>
          </html>
        </script>

        ${generateEventScript(component) ? 
          `<script type="sample/js" filename="events.js">
            document.addEventListener('DOMContentLoaded', () => {
              const componentElement = document.getElementById('comp');
              if (componentElement) {
                ${generateEventScript(component)}
              }
            });
          </script>` 
          : ''}
      </playground-ide>

      ${generateDocsSection(component)}
    \`,
    name: "Playground",
    args: {},
    parameters: {}
  };
  `;
}


// Helper function to generate custom CSS based on cssParts
function generateCssParts(cssParts, componentTagName) {
  return cssParts?.map(part => `
    ${componentTagName}::part(${part.name}) {
      /* Your CSS here */
    }
  `).join('\n');
}

function generateCssProperties(cssProperties) {
    return cssProperties?.map(prop => `${prop.name}`).join('\n');
  }

// Helper function to generate event handling script
function generateEventScript(component) {
  const eventMethods = component.events;
  if (eventMethods && eventMethods.length > 0) {
    return `
      componentElement.addEventListener('${eventMethods[0].name}', () => {
        console.log('${eventMethods[0].name} event triggered');
      });
    `;
  }
  return '';
}

// Helper function to generate documentation section
function generateDocsSection(component) {
  const cssProperties = component.cssProperties?.length > 0 ? component.cssProperties[0].name : 'custom-css-property';
  return `
    <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
      <h3>1. Edit the Custom CSS</h3>
      <p>You can edit the ${component.name}'s styles by modifying its custom CSS properties. For example:</p>
      <pre><code>
        ${component.tagName} {
          --${cssProperties}: value;
        }
      </code></pre>
      <h3>2. Modify Event Handling</h3>
      <p>You can customize how the ${component.name} responds to events. For example:</p>
      <pre><code>
        componentElement.addEventListener('insert component event'}', () => {
          console.log( event triggered');
        });
      </code></pre>
      <h3>3. Change ${component.name} Attributes</h3>
      <p>You can modify the ${component.name}'s attributes directly within the HTML. For example:</p>
      <pre><code>
        ${component.tagName} some-attribute="value" 
      </code></pre>
    </div>
  `;
}

// Helper function to inject generated playground into the target file
function injectPlaygroundIntoFile(filePath, content, componentName) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  console.log("file content is", content);
 
  // Inject the generated content into the appropriate place in the file
  const injectionMarker = `// Playground Injection Point`;
  const newContent = fileContent.replace(injectionMarker, content);

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Injected playground for ${componentName} into ${filePath}`);
}

