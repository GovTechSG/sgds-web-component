import remarkGfm from "remark-gfm";
module.exports = {
  stories: [
    "../stories/style/**/*.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/usage/**/*.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/migration/**/*.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/frameworks/**/*.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/getting-started/**/*.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/*.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/form-validation/*.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/troubleshoot/*.@(mdx|stories.@(js|jsx|ts|tsx))",
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
    },
    "@storybook/addon-themes"
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {
      builder: {
        viteConfigPath: "./.storybook/storybookVite.config.js"
      }
    }
  },
  staticDirs: ["./static"]
};
