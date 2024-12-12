import { html } from "lit-html";

const VariantTemplate = args => {
  const variants = ["primary", "outlined", "danger", "ghost"];
  return html`
    <sgds-button variant="primary">Primary button</sgds-button>
    <sgds-button variant="outlined">Outlined button</sgds-button>
    <sgds-button variant="danger">Danger button</sgds-button>
    <sgds-button variant="ghost">Ghost button</sgds-button>
  `;
};

export const Variants = {
  render: VariantTemplate.bind({}),
  name: "Variants",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

const SizeTemplate = () => {
  return html`<sgds-button size="sm"> small button </sgds-button>
    <sgds-button> medium button </sgds-button>
    <sgds-button size="lg"> large button </sgds-button>`;
};

export const Sizes = {
  render: SizeTemplate.bind({}),
  name: "Sizes",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

const ActiveTemplate = () => {
  return html`
    <sgds-button variant="primary" active> Hover / Active </sgds-button>
    <sgds-button variant="outlined" active> Hover / Active </sgds-button>
    <sgds-button variant="danger" active> Hover / Active </sgds-button>
    <sgds-button variant="ghost" active> Hover / Active </sgds-button>
  `;
};

export const Active = {
  render: ActiveTemplate.bind({}),
  name: "Hover / Active state",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const Disabled = {
  render: () => html`
    <sgds-button variant="primary" disabled> Disabled </sgds-button>
    <sgds-button variant="outlined" disabled> Disabled </sgds-button>
    <sgds-button variant="ghost" disabled> Disabled </sgds-button>
    <sgds-button variant="danger" disabled> Disabled </sgds-button>
  `,
  name: "Disabled state",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const ButtonWithIcon = {
  render: () => html`
    <sgds-button><sgds-icon name="placeholder" slot="leftIcon"></sgds-icon>Leading icon</sgds-button>
    <sgds-button>
    <sgds-icon name="placeholder" slot="rightIcon"></sgds-icon>
      Trailing icon
    </sgds-button>
  `,
  name: "Button with Icon",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
