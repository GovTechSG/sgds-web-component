
    import { Template, args, parameters, play } from "../templates/DescriptionList/basic.js";

    export default {
      title: 'Components/DescriptionList',
      component: 'sgds-description-list',
      argTypes: {"bordered":{"defaultValue":false,"control":"boolean"},"stacked":{"defaultValue":false,"control":"boolean"},"hasTitleSlot":{"defaultValue":false,"control":"boolean"},"hasDescriptionSlot":{"defaultValue":false,"control":"boolean"}}
    }

    export const Basic = {
      render: Template.bind({}),
      name: "Basic",
      args,
      parameters,
      ...(play ? { play } : {}),
    }
  
export const OptionalTitleDescription = {
  render: Template.bind({}),
  name: "Optional title and description",
  args: { title: true, description: true },
  parameters: {},
  tags: ["!dev"]
};
export const Stacked = {
  render: Template.bind({}),
  name: "Stacked layout",
  args: { stacked: true },
  parameters: {},
  tags: ["!dev"]
};
export const Bordered = {
  render: Template.bind({}),
  name: "Bordered",
  args: { bordered: true },
  parameters: {},
  tags: ["!dev"]
};
