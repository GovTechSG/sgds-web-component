# Contributing Guide
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Thank you so much for contributing to @govtechsg/sgds-web-component. Please read this guideline before starting your development works. 

## Development 

This project uses Lit 2.0 + SASS + TS and bundled with rollup 

### Folder Structure

Build new components in src folder. Create folder name according to the component you are building.
SCSS files specific to the component should be stored here. Create an entry point (index.ts) file per folder to export the components/classes and its types/interface 

Place common/reusable functions and global stylings in utils folder 

### Filename 
Custom elements must be in kebab case. Prefix the files with *-element.ts

## Testing 

Unit test is written in typescript, compiled to javascript by rollup, dumped into test-outdir. The resulting test-outdir/**.test.js files are run by web-test-runner. Configuration wise, rollup has plugins to convert sass files to css, but web-test-runner does not have great support for sass files atm. Hence, this approach was taken. See configurations in rollup.test.config.js and web-test-runner.config.mjs.

All test needs to pass in order for aws amplify deployment build to pass

### Run single test file

To run single test file, run the output javascript test file instead of the typescript file
```npm run test test-outdir/button-element.test.js```

## Storybook 

Write documentation in storybook in MDX format. Include API argstable, import instructions, at least a basic example and custom css properties table (if present)

## Publishing (for admin only)
Library publication is performed in workflow by github actions. When ready for publishing, perform the following steps

##### Bump version 
1) run ```npm version <major|minor|path> ```
    or for alpha releases
    ``` npm version <version-name> ```
    **version number should observe SEMVER
    **this step will auto-generate a git tag on your local
2) ```git push ``` the changes

##### Generate Changelog 
3) run ```cz changelog``` to update CHANGELOG.md file (ensure that you have set up [cz-cli](https://github.com/commitizen/cz-cli) globally)
**`cz changelog` updates based on your local git tags
4) Push the changes 
    
##### Push git tag
4) run `git tag` to check the newly generated git tag on local
5) ```npm push origin <newly-created-tag> ```
** this triggers gh action workflow to publish the library to npm 
##### Create a release
6) Manually create a release on github 