import remarkGfm from "remark-gfm";

module.exports = {
  stories: [
    "../stories-new/frameworks/**/*.mdx",
    "../stories-new/getting-started/**/*.mdx",
    "../stories-new/components/*.@(mdx|stories.@(js|jsx|ts|tsx))"
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-mdx-gfm",
    "@chromatic-com/storybook",
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm]
          }
        }
      }
    }
  ],
  framework: "@storybook/web-components-vite",
  docs: {
    autodocs: "tag"
  }
};
