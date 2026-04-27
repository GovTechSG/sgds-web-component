
    import { Template, args, parameters, play } from "../templates/OverflowMenu/basic.js";

    export default {
      title: 'Components/OverflowMenu',
      component: 'sgds-overflow-menu',
      argTypes: {"size":{"defaultValue":"md","control":"select","options":["sm","md"]}}
    }

    export const Basic = {
      render: Template.bind({}),
      name: "Basic",
      args,
      parameters,
      ...(play ? { play } : {}),
    }
  
import { html } from "lit";

const SizeTemplate = args => {
  return html`
    <sgds-overflow-menu size=${args.size}>
      <sgds-dropdown-item>View</sgds-dropdown-item>
      <sgds-dropdown-item>Edit</sgds-dropdown-item>
      <sgds-dropdown-item>Delete</sgds-dropdown-item>
    </sgds-overflow-menu>
  `;
};

export const SmallSize = {
  render: SizeTemplate.bind({}),
  name: "Small size",
  args: { size: "sm" },
  parameters: {},
  tags: ["!dev"]
};
export const MediumSize = {
  render: SizeTemplate.bind({}),
  name: "Medium size",
  args: { size: "md" },
  parameters: {},
  tags: ["!dev"]
};
