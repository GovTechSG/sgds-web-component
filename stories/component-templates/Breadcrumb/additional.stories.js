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
