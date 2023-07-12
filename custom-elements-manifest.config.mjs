import fs from 'fs';
import { parse } from 'comment-parser';
import { pascalCase } from 'pascal-case';
import { resolveTypeAliasPlugin } from './scripts/resolveTypeAliasPlugin.mjs';

const packageData = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const { name, description, version, author, homepage, license } = packageData;
// eslint-disable-next-line func-style
const noDash = string => string.replace(/^\s?-/, '').trim();


const typesByAliasMap = new Map()

export default {
  globs: ['src/**/sgds-*.ts', 'src/**/*-element.ts'],
  exclude: ['**/*.scss', 'src/utils/'],
  plugins: [
    // Append package data
    {
      name: 'sgds-package-data',
      packageLinkPhase({ customElementsManifest }) {
        customElementsManifest.package = { name, description, version, author, homepage, license };
      }
    },
    // Parse custom jsDoc tags
    resolveTypeAliasPlugin(typesByAliasMap),
    // Add custom element tagname,
    {
      name: 'sgds-custom-element-tag-name',
      analyzePhase({ ts, node, moduleDoc }) {
        switch (node.kind) {
          case ts.SyntaxKind.ClassDeclaration: {
            const className = node.name.getText();
            const classDoc = moduleDoc?.declarations?.find(declaration => declaration.name === className);
            const tagName = classDoc.name.replace(/([a-z0–9])([A-Z])/g, "$1-$2").toLowerCase();
            if(!classDoc.tagName) {
              classDoc.tagName = tagName
            }
          }
        }
      }
    },
    {
      name: 'sgds-custom-tags',
      analyzePhase({ ts, node, moduleDoc }) {
        switch (node.kind) {
          case ts.SyntaxKind.ClassDeclaration: {
            const className = node.name.getText();
            const classDoc = moduleDoc?.declarations?.find(declaration => declaration.name === className);
            const customTags = ['animation', 'dependency', 'method'/*  'since', 'status' */];
            let customComments = '/**';

            node.jsDoc?.forEach(jsDoc => {
              jsDoc?.tags?.forEach(tag => {
                const tagName = tag.tagName.getText();

                if (customTags.includes(tagName)) {
                  customComments += `\n * @${tagName} ${tag.comment}`;
                }
              });
            });

            const parsed = parse(`${customComments}\n */`);
            parsed[0]?.tags.forEach(t => {
              switch (t.tag) {
                // Animations
                case 'animation':
                  if (!Array.isArray(classDoc['animations'])) {
                    classDoc['animations'] = [];
                  }
                  classDoc['animations'].push({
                    name: t.name,
                    description: noDash(t.description)
                  });
                  break;

                // Dependencies
                case 'dependency':
                  if (!Array.isArray(classDoc['dependencies'])) {
                    classDoc['dependencies'] = [];
                  }
                  classDoc['dependencies'].push(t.name);
                  break;

                // Value-only metadata tags
                // case 'since':
                // case 'status':
                //   classDoc[t.tag] = t.name;
                //   break;

                // All other tags
                default:
                  if (!Array.isArray(classDoc[t.tag])) {
                    classDoc[t.tag] = [];
                  }

                  classDoc[t.tag].push({
                    name: t.name,
                    description: t.description,
                    type: t.type || undefined
                  });
              }
            });
          }
        }
      }
    },
    {
      name: 'sgds-react-event-names',
      analyzePhase({ ts, node, moduleDoc }) {
        switch (node.kind) {
          case ts.SyntaxKind.ClassDeclaration: {
            const className = node.name.getText();
            const classDoc = moduleDoc?.declarations?.find(declaration => declaration.name === className);
            if (classDoc?.events) {
              classDoc.events.forEach(event => {
                event.reactName = `on${pascalCase(event.name)}`;
              });
            }
          }
        }
      }
    }
  ]
};
