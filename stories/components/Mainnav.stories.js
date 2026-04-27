
    import { Template, args, parameters, play } from "../templates/Mainnav/basic.js";

    export default {
      title: 'Components/Mainnav',
      component: 'sgds-mainnav',
      argTypes: {"active":{"defaultValue":false,"control":"boolean"},"disabled":{"defaultValue":false,"control":"boolean"},"brandHref":{"defaultValue":"","control":"text"},"expand":{"defaultValue":"lg","control":"select","options":["sm","md","lg","xl","xxl","always","never"]},"fluid":{"defaultValue":false,"control":"boolean"}}
    }

    export const Basic = {
      render: Template.bind({}),
      name: "Basic",
      args,
      parameters,
      ...(play ? { play } : {}),
    }
  
export const Fluid = {
  render: Template.bind({}),
  name: "Fluid",
  args: { fluid: true },
  parameters,
  tags: []
};
