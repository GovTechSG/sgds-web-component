
module.exports = {
  stories: [
    "../stories/frameworks/**/*.mdx",
    "../stories/getting-started/**/*.mdx",
    "../stories/components/*.@(mdx|stories.@(js|jsx|ts|tsx))"
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y"
  ],
  framework: "@storybook/web-components-vite",
  docs: {
    autodocs: "tag"
  }
};
