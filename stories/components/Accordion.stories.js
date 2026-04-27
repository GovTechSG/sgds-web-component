
    import { Template, args, parameters, play } from "../templates/Accordion/basic.js";

    export default {
      title: 'Components/Accordion',
      component: 'sgds-accordion',
      argTypes: {"open":{"defaultValue":false,"control":"boolean"},"disabled":{"defaultValue":false,"control":"boolean"},"density":{"defaultValue":"default","control":"select","options":["default","compact"]},"allowMultiple":{"defaultValue":false,"control":"boolean"},"variant":{"defaultValue":"default","control":"select","options":["default","border"]}}
    }

    export const Basic = {
      render: Template.bind({}),
      name: "Basic",
      args,
      parameters,
      ...(play ? { play } : {}),
    }
  
export const BorderVariant = {
  render: Template.bind({}),
  name: "Border variant",
  args: { variant: "border" },
  parameters: {},
  tags: ["!dev"]
};

export const DensityVariant = {
  render: Template.bind({}),
  name: "Compact density",
  args: { density: "compact" },
  parameters: {},
  tags: ["!dev"]
};

export const AllowMultiple = {
  render: Template.bind({}),
  name: "Allow multiple active accordion",
  args: { allowMultiple: true },
  parameters: {},
  tags: ["!dev"]
};

export const Disabled = {
  render: Template.bind({}),
  name: "Disabled state",
  args: { disabled: true },
  parameters: {},
  tags: ["!dev"]
};
