require("dotenv").config();

const mode = process.env.STORYBOOK_ENV;

const componentStories = () => {
  const productionStories = JSON.parse(process.env.STORIES_TO_BUILD).map(
    c => `../stories/components/${c}.stories.@(js|jsx|ts|tsx|mdx)`
  );
  if (mode === "development") {
    return ["../stories/components/*.stories.@(js|jsx|ts|tsx|mdx)"];
  } else return productionStories;
};

module.exports = {
  stories: [
    "../stories/frameworks/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../stories/getting-started/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    ...componentStories()
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-scss",
    "@storybook/addon-controls"
  ],
  framework: "@storybook/web-components",
  core: {
    builder: "@storybook/builder-webpack5"
  }
};
