module.exports = {
  stories: [
    "../stories/frameworks/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../stories/getting-started/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../stories/components/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  addons: ["@storybook/addon-essentials", "@storybook/preset-scss"],
  framework: "@storybook/web-components",
  core: {
    builder: "@storybook/builder-webpack5"
  }
};
