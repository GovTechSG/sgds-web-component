import { html } from "lit-html";

const VariantTemplate = args => {
  return html`
    <sgds-icon-button variant="primary" name="plus"></sgds-icon-button>
    <sgds-icon-button variant="outline" name="dash"></sgds-icon-button>
    <sgds-icon-button variant="danger" name="three-dots"></sgds-icon-button>
    <sgds-icon-button variant="ghost" name="star"></sgds-icon-button>
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
  return html`<sgds-icon-button size="sm" name="plus"></sgds-icon-button>
    <sgds-icon-button name="plus"></sgds-icon-button>
    <sgds-icon-button size="lg" name="plus"></sgds-icon-button>`;
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
    <sgds-icon-button variant="primary" active name="plus"></sgds-icon-button>
    <sgds-icon-button variant="outline" active name="dash"></sgds-icon-button>
    <sgds-icon-button variant="danger" active name="three-dots"></sgds-icon-button>
    <sgds-icon-button variant="ghost" active name="star"></sgds-icon-button>
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
    <sgds-icon-button variant="primary" disabled name="plus"></sgds-icon-button>
    <sgds-icon-button variant="outline" disabled name="dash"></sgds-icon-button>
    <sgds-icon-button variant="ghost" disabled name="three-dots"></sgds-icon-button>
    <sgds-icon-button variant="danger" disabled name="star"></sgds-icon-button>
  `,
  name: "Disabled state",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
