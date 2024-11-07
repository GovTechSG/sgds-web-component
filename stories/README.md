# Storybook setup

## Folder structure

1. `stories/components`

- The files in this folder are generated on the fly everytime we run `npm run storybook`
- Hence, this folder is .gitignored
- Do not modify contents in this folder, as it will be overwritten everytime user runs `npm run storybook`

2. `stories/getting-started`

- This folder contains the written documentation how to use the library 
- Most source files come from the `/docs` folder. 

3. `templates`

- This folder contains the content of individual components that will make up the final files in `stories/components`
- Hence it is named templates

## How the stories are written

Stories are written in CSF format, imported into the *.mdx files to show in Docs format. 
Each component consist of Basic story and Additional stories. Basic story makes up of the first component preview in the Storybook Docs example. Additional stories are further examples that appear below API documentation and methods table.

1.  Basic stories are written in `stories/templates/**/basic.js`
    - basic.js is used in `stories/components/*.stories.js`
2.  Additional stories CSF format are written in `stories/templates/**/additional.stories.js`. These CSF stories are then imported to `stories/templates/**/additional.mdx` for mdx format. 
Write your text description in `additional.mdx` and the respective CSF story in the `additional.stories.js`
3. The script that help writes the final `stories/components/*.stories.js` and `stories/components/*.mdx` is in `scripts/generateStories.mjs` file
4. `stories/templates/**/additional.stories.js is concatenated with `stories/components/*.stories.js`
5. `stories/templates/**/additional.mdx` is added to the final mdx file in `stories/components/*.mdx` via gulp concatenation. See `gulpfile.babel.js` for the gulp concatenation action. 
   

        TL;DR

        `stories/components/*.stories.js` concat with `stories/templates/**/additional.stories.js` 
        `stories/components/*.mdx` concat with `stories/templates/**/additional.mdx` 

## Docs mode only 

- To enable docs mode with no canvas mode, script is  `storybook dev --docs`

## Table of Contents in Docs mode

- TOC is enabled, so be mindful of the h1, h2, h3 used as those will go into the TOC