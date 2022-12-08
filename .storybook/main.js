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
    "builder": "webpack5"
  },
  webpackFinal: async (config) => {
    config.optimization.minimize = false;
    return config;
  },
}