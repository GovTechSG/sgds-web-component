
    import { Template, args, parameters, play } from "../templates/Breadcrumb/basic.js";

    export default {
      title: 'Components/Breadcrumb',
      component: 'sgds-breadcrumb',
      argTypes: {"dependencies":{"defaultValue":"{\n    sgds-overflow-menu: SgdsOverflowMenu\n  }","control":"object"},"active":{"defaultValue":false,"control":"boolean"},"ariaLabel":{"defaultValue":"breadcrumb","control":"text"}}
    }

    export const Basic = {
      render: Template.bind({}),
      name: "Basic",
      args,
      parameters,
      ...(play ? { play } : {}),
    }
  
import { html } from "lit";

const OverflowTemplate = args => {
  return html`
    <sgds-breadcrumb>
      <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
      <sgds-breadcrumb-item><a href="#">About</a></sgds-breadcrumb-item>
      <sgds-breadcrumb-item><a href="#">Contacts</a></sgds-breadcrumb-item>
      <sgds-breadcrumb-item><a href="#">Link-1</a></sgds-breadcrumb-item>
      <sgds-breadcrumb-item><a href="#">Link-2</a></sgds-breadcrumb-item>
      <sgds-breadcrumb-item><a href="#">Link-3</a></sgds-breadcrumb-item>
      <sgds-breadcrumb-item><a href="#">Link-4</a></sgds-breadcrumb-item>
    </sgds-breadcrumb>
  `;
};

export const Overflow = {
  render: OverflowTemplate.bind({}),
  name: "Overflow",
  args: {},
  parameters: {
    docs: {
      story: {
        height: "500px"
      }
    }
  },
  tags: ["!dev"]
};
