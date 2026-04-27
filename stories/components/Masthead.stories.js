
    import { Template, args, parameters, play } from "../templates/Masthead/basic.js";

    export default {
      title: 'Components/Masthead',
      component: 'sgds-masthead',
      argTypes: {"fluid":{"defaultValue":false,"control":"boolean"}}
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
