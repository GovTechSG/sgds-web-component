module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@storybook/preset-scss',
  ],
  "framework": "@storybook/web-components",
  "core": {
    "builder": "@storybook/builder-webpack5"
  }
}