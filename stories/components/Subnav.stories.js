
    import { Template, args, parameters, play } from "../templates/Subnav/basic.js";

    export default {
      title: 'Components/Subnav',
      component: 'sgds-subnav',
      argTypes: {"active":{"defaultValue":false,"control":"boolean"},"disabled":{"defaultValue":false,"control":"boolean"},"hasActionsSlot":{"defaultValue":false,"control":"boolean"}}
    }

    export const Basic = {
      render: Template.bind({}),
      name: "Basic",
      args,
      parameters,
      ...(play ? { play } : {}),
    }
  