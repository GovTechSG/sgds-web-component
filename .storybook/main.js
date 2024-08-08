import remarkGfm from "remark-gfm";
module.exports = {
  stories: [
    "../stories/frameworks/**/*.mdx",
    "../stories/getting-started/**/*.mdx",
    "../stories/components/*.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/*.mdx"
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-mdx-gfm",
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
