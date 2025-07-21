export default function (plop) {
  // controller generator
  plop.setGenerator("component-boiler-plate", {
    description: "Set up component boiler plate code",
    prompts: [
      {
        type: "input",
        name: "main-component-name",
        message: "Enter the main component name in PascalCase. E.g. Accordion",
        filter: value => plop.getHelper('pascalCase')(value),
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{main-component-name}}/index.ts",
        templateFile: "plop-templates/index.hbs"
      },
      {
        type: "add",
        path: "src/components/{{main-component-name}}/sgds-{{kebabCase main-component-name}}.ts",
        templateFile: "plop-templates/component.hbs"
      },
      {
        type: "add",
        path: "stories/templates/{{main-component-name}}/basic.js",
        templateFile: "plop-templates/basic.hbs"
      },
      {
        type: "add",
        path: "test/{{kebabCase main-component-name}}.test.ts",
        templateFile: "plop-templates/test.hbs"
      },
      {
        type: "add",
        path: "playground/{{main-component-name}}.html",
        templateFile: "plop-templates/playground.hbs"
      },
      {
        type: 'modify',
        path: 'src/components/index.ts',
        pattern: /(\/\/ COMPONENT EXPORTS)/g,
        template: 'export * from "./{{main-component-name}}/sgds-{{kebabCase main-component-name}}";\n$1',
    },
      {
        type: 'modify',
        path: 'src/index.ts',
        pattern: /(\/\/ COMPONENT IMPORTS)/g,
        template: 'import "./components/{{main-component-name}}";\n$1',
    },
    ]
  });
}
