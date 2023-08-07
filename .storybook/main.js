const mode = process.env.STORYBOOK_ENV;

const V1_0_0_rc = [
  "Accordion",
  "Alert",
  "ActionCard",
  "Badge",
  "Breadcrumb",
  "Button",
  "Checkbox",
  "Card",
  "Drawer",
  "Dropdown",
  "FileUpload",
  "Footer",
  "Input",
  "Mainnav",
  "Masthead",
  "Modal",
  "QuantityToggle",
  "Radio",
  "Sidenav",
  "Spinner",
  "Tab",
  "Table",
  "Textarea",
  "Toast",
  "Tooltip",
  "Pagination"
];

// const componentStories = () => {
//   // const productionStories = V1_0_0_rc.map(c => `../stories/components/${c}.stories.@(js|jsx|ts|tsx|mdx)`);
//   // if (mode === "development") {
//     return ["../stories/components/*.stories.@(js|jsx|ts|tsx|mdx)"];
//   // } else return productionStories;
// };

module.exports = {
  stories: [
    "../stories/frameworks/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../stories/getting-started/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../stories/components/*.stories.@(js|jsx|ts|tsx|mdx)"
    // ...componentStories()
  ],
  addons: ["@storybook/addon-essentials", "@storybook/preset-scss"],
  framework: "@storybook/web-components",
  core: {
    builder: "@storybook/builder-webpack5"
  }
};
