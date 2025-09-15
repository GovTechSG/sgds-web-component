# Contributing Guide

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Thank you so much for contributing to @govtechsg/sgds-web-component. Please read this guideline before starting your development works.

## Contributing workflow

To contribute, please start off at the Issue section of our github repository.

1. Checkout our Issue section to search for similar bugs/issues/feature request that you encounter. Someone else might have already raised a similar issue.
2. If your issue is not found, open an issue !
3. Follow the instructions of the issue request form and answer them
4. Describe your bug / new feature request as detailed as possible. For new feature request, let us know your motivation behind your proposal and how you intend to build the feature. For bug fixes, let us know how you intend to fix the bug.
5. An SGDS admin will pick up on the discussion and notify you if the proposal is accepted
6. Once accepted, you can fork the repository and start working away !
7. Raise a PR, tagging the issue number, and request a review from one of our admins.

## Development

1. `npm run dev` uses Vite to serve the HTML files. Use it for development for a faster dev experience
2. `/playground` is setup for easier dev preview when developing on a single component rather than the component dump in index.html.
   For example, to preview masthead, navigate to http://localhost:5173/playground/Masthead.html 

### Recommended : Auto-generate boilerplate code

A simple plop generator is written to help kickstart component writing. On your terminal, run `npm run write:component`. This will generate the boilerplate code for the main component, its storybook template, test file and playground html file for dev preview.

**NOTE** Please add any sub-component manually

Alternatively, you can set up your files and folders manually. See the instructions below

### Folder Structure

Build new components in src folder. Create folder name according to the component you are building.
SCSS files specific to the component should be stored here. Create an entry point (index.ts) file per folder to export the components/classes and its types/interface

Place common/reusable functions and global stylings in utils folder

### Filename

Custom elements must be in kebab case. Prefix the files with sgds-\*.ts

## Testing

Unit test is written in typescript, compiled to javascript by rollup, dumped into test-outdir. The resulting test-outdir/\*\*.test.js files are run by web-test-runner. Configuration wise, rollup has plugins to convert sass files to css, but web-test-runner does not have great support for sass files atm. Hence, this approach was taken. See configurations in rollup.test.config.js and web-test-runner.config.mjs.

All test needs to pass in order for aws amplify deployment build to pass

### Run single test file

To run single test file, run the output javascript test file instead of the typescript file
`npm run test test-outdir/mainnav.test.js`

## Storybook

To start the storybook server

1. `npm run build`

2. `npm run storybook`

The basic storybook documentation is auto-generated from the cem metadata. Write your basic template example inside `stories/templates/<Component>/basic.js`. Follow this template and be sure to export `args` and `Template`

```hbs
import { html } from "lit-html";

export const Template = args =>
      html`<sgds-{{kebabCase main-component-name}}></sgds-{{kebabCase main-component-name}}>`


export const args = {};

export const parameters= {};

```

Beyond basic template, any additional documentation and storybook template examples should go into `stories/templates/<Component>/additional.mdx file`.
This file will be concatenated with the basic template to give the final stories.mdx files

## Markdown files and README.md

.md files are located in docs folder. These markdown files are used in both Storybook and github's README.
Do not edit README.md file directly. Instead edit the markdown files in docs folder and run `npm run build:readme`. Note that Gulp-concat will combine the files in alphabetical order - name any new markdown files with this in mind.

## Output React components

- Using custom-elements-manifest/analzyer to obtain metadata info of the Lit components. Read more [here](https://custom-elements-manifest.open-wc.org/analyzer/getting-started/#how-it-works)

- Document your component class with the relevant [jsdoc tags](https://api-viewer.open-wc.org/docs/guide/writing-jsdoc/). See examples in Button, Masthead, Sidenav folder.

- `npm run build:react` runs the cem analyer which reads custom-elements-manifest.config.mjs file. This manifest file tells cem analyzer what files to process and generate the output file custom-elements.json. Script file in scripts/makeReact.mjs reads custom-elements.json file and outputs the react components of all components automatically using @lit/react.

- `src/react` and `custom-elements.json` are untracked and will be generated by CI github actions during build step `npm run build:lib`

- During rollup build step, the `src/react` folder is read and output in `lib/react` and the rest of the Lit components in `lib`

- React users should import as such :
  named exports when importing from whole library entry point
  `import {SgdsMasthead} from 'clk-web-components/react';`

- All steps in this section are included in `npm run build:lib`

## Publishing (for admin only)

Library publication is performed in workflow by github actions. When ready for publishing, perform the following steps

##### Bump version

1. run `npm version <major|minor|path> `
   or for alpha releases
   `npm version <version-name>`
   **version number should observe SEMVER
   **this step will auto-generate a git tag on your local
2. `git push ` the changes

##### Generate Changelog

3. run `cz changelog` to update CHANGELOG.md file (ensure that you have set up [commitizen](https://commitizen-tools.github.io/commitizen/#installation) globally)
   \*\*`cz changelog` updates based on your local git tags
4. Push the changes

##### Push git tag

4. run `git tag` to check the newly generated git tag on local
5. `git push origin <newly-created-tag> `
   \*\* this triggers gh action workflow to publish the library to npm

##### Create a release

6. Manually create a release on github
