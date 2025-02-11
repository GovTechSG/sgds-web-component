import remarkGfm from "remark-gfm";
module.exports = {
  stories: [
    "../stories/style/**/*.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/usage/**/*.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/migration/**/*.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/frameworks/**/*.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/getting-started/**/*.@(mdx|stories.@(js|jsx|ts|tsx))",
    // "../stories/components/*.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/Accordion.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/Alert.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/Badge.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/Breadcrumb.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/Button.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/Checkbox.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/ComboBox.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/Datepicker.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/DescriptionList.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/Divider.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/Footer.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/Icon.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/IconButton.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/Input.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/Link.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/Radio.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/Masthead.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/Modal.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/Pagination.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/ProgressBar.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/Skeleton.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/Spinner.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/Stepper.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/Switch.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/Tab.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/Textarea.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/Toast.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/components/Tooltip.@(mdx|stories.@(js|jsx|ts|tsx))",
    // "../stories/components/*.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../stories/form-validation/*.@(mdx|stories.@(js|jsx|ts|tsx))",
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
