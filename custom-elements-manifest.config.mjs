import fs from 'fs';
import { parse } from 'comment-parser';
import { pascalCase } from 'pascal-case';
import BetterLitTypesPlugin from 'cem-plugin-better-lit-types';
import { log } from 'console';
import { type } from 'os';

const transformMember = (member) => {
  const unionTypes = splitUnionTypes(member?.type?.text);
 const resolvedTypes = unionTypes?.flatMap((type) => {
    if (typesByAliasMap.has(type)) return typesByAliasMap.get(type);
    else return type;
  });
  
    return {
      ...member,
      type: { text: resolvedTypes?.join(" | ") },
    };
};

const transformDeclaration = (declaration) => {
  if (declaration.members) {
    const members = declaration.members?.map((member) => transformMember(member));
    return {
      ...declaration,
      members,
    };
  }
else return declaration
};

const transformDeclarations = (declarations) => {
  return declarations?.map((d) => transformDeclaration(d));
};

const splitUnionTypes = (unionTypes) => {
 if (unionTypes) return unionTypes.split(" | ") 
 else return unionTypes
} 

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
    // BetterLitTypesPlugin,
    // Parse custom jsDoc tags
    // {
    //   name: 'my-plugin',
    //   // Runs for all modules in a project, before continuing to the `analyzePhase`
    //   collectPhase({ts, node, context}){},
    //   // Runs for each module
    //   analyzePhase({ts, node, moduleDoc, context}){
    //     switch (node.kind) {
    //       case ts.SyntaxKind.TypeAliasDeclaration: {
    //         const typeName = node.name.getText();
    //         const enumValues = node.type?.types?.map(n => '"' + n.literal?.text + '"')
    //         typesByAliasMap.set(typeName, enumValues)
    //       }
    //     }
    //     // You can use this phase to access a module's AST nodes and mutate the custom-elements-manifest
    //   },
    //   // Runs for each module, after analyzing, all information about your module should now be available
    //   moduleLinkPhase({moduleDoc, context}){
    //     moduleDoc.declarations = transformDeclarations(moduleDoc?.declarations)
    //   },
    //   // Runs after modules have been parsed and after post-processing
    //   packageLinkPhase({customElementsManifest, context}){},
    // },
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
