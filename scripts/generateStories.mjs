import { deleteSync } from "del";
import fs from "fs";
import groupBy from "lodash/groupBy.js";
import path from "path";
import prettier from "prettier";
import { makeArgTypes } from "./makeArgTypes.mjs";
import { methodsTable, writeParams } from "./methodsTable.mjs";
import { getAllComponents, getSgdsComponents, pascalToKebab } from "./shared.mjs";
import packageJson from "../package.json" with { type: "json" };
import generateSriFromUrl from "./generateSriFromUrl.mjs";
const storiesDir = path.join("stories/components");

// Clear build directory
deleteSync(storiesDir);
fs.mkdirSync(storiesDir, { recursive: true });

// Resolve latest published npm version to use for CDN URLs and SRI hashes
let latestVersion = packageJson.version;
try {
  const response = await fetch("https://registry.npmjs.org/@govtechsg/sgds-web-component/latest");
  if (response.ok) {
    const data = await response.json();
    latestVersion = data.version;
  }
} catch (e) {
  console.warn("Could not resolve latest npm version, falling back to package.json version");
}
console.log(`Using CDN version ${latestVersion} for SRI hashes...`);

// Fetch component metadata
const metadata = JSON.parse(fs.readFileSync(path.join("./", "custom-elements.json"), "utf8"));

// Wrap components
console.log("Wrapping components for Storybook...");

// should get all components except base components
const components = getSgdsComponents(getAllComponents(metadata));
const groupedComponents = groupBy(components, (k, v) => {
  return k.modulePath.split("/")[2];
});

// Pre-fetch SRI hashes for all components in parallel
const componentKeys = Object.keys(groupedComponents);
const sriMap = Object.fromEntries(
  await Promise.all(
    componentKeys.map(async key => {
      const cdnUrl = `https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@${latestVersion}/components/${key}/index.umd.min.js`;
      try {
        const hash = await generateSriFromUrl(cdnUrl);
        return [key, hash];
      } catch (e) {
        console.warn(`Could not fetch SRI for ${key}: ${e.message}`);
        return [key, null];
      }
    })
  )
);

for (const [key, value] of Object.entries(groupedComponents)) {
  const allMembers = value
    .map(i => i.members)
    .flat()
    .filter(member => !(member.privacy && member.privacy === "private"));
  const methodsMeta = methodsTable(value);
  const summary = value
    .filter(i => i.summary)
    .map(i => i.summary)
    .join("<br/>");
  const args = allMembers.filter(member => member.kind === "field");
  const mdxFilePath = path.join(storiesDir, `${key}.mdx`);
  const reactComponentPaths = value
    .map(v => {
      const folderName = v.tagName.replace("sgds-", "");
      return `
    \`\`\` jsx
    import ${v.name}  from "@govtechsg/sgds-web-component/react/${folderName}/index.js";
    \`\`\`
    `;
    })
    .join("");

  // Only add in the ArgType table when there is at least one attribute
  const ArgsType = value.map(component =>
    component.attributes || component.slots || component.events
      ? `### ${component.tagName}
<ArgTypes of="${component.tagName}"/>\n
  `
      : ""
  );

  const mdxSource = prettier.format(
    `
import { Canvas, Meta, Story, ArgTypes, Markdown } from "@storybook/blocks";
import { html } from "lit";
import * as ${key}Stories from './${key}.stories';

<Meta of={${key}Stories}/>

# ${key}  
${summary ? summary + "\n" : "\n"}
<Canvas>
  <Story of={${key}Stories.Basic} />
</Canvas>

## Import

### React

${reactComponentPaths}

### Others (Vue, Angular, plain HTML etc.)

\`\`\`js
import "@govtechsg/sgds-web-component/components/${key}";
\`\`\`

### CDN

\`\`\`html
<script src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@${latestVersion}/components/${key}/index.umd.min.js"${sriMap[key] ? ` integrity="${sriMap[key]}" crossorigin="anonymous"` : ""}></script>
\`\`\`

## API

${ArgsType.join("\n")}


${methodsMeta
  .map(meta => {
    if (meta.methods.length > 0) {
      return `## Methods \n ### ${meta.tagName}\n<table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          ${meta.methods
            .map(
              method =>
                `<tr>
              <td>${method.name}(${writeParams(method)})</td>
              <td>${method.description}</td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>
    `;
    } else return;
  })
  .join("")}
    `,
    { parser: "mdx" }
  );
  const csfFilePath = path.join(storiesDir, `${key}.stories.js`);
  const componentTagName = `sgds-${pascalToKebab(key)}`;
  const storiesSource = `
    import { Template, args, parameters, play } from "../templates/${key}/basic.js";

    export default {
      title: 'Components/${key}',
      component: '${componentTagName}',
      argTypes: ${JSON.stringify(makeArgTypes(args))}
    }

    export const Basic = {
      render: Template.bind({}),
      name: "Basic",
      args,
      parameters,
      ...(play ? { play } : {}),
    }
  `;
  fs.writeFileSync(csfFilePath, storiesSource, "utf8");
  fs.writeFileSync(mdxFilePath, mdxSource, "utf8");
}
