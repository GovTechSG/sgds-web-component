
    import { Template, args, parameters, play } from "../templates/TableOfContents/basic.js";

    export default {
      title: 'Components/TableOfContents',
      component: 'sgds-table-of-contents',
      argTypes: {}
    }

    export const Basic = {
      render: Template.bind({}),
      name: "Basic",
      args,
      parameters,
      ...(play ? { play } : {}),
    }
  