import { html } from "lit-html";

const VariantTemplate = () => html`
  <sgds-spinner variant="primary"></sgds-spinner>
  <sgds-spinner variant="neutral"></sgds-spinner>
`;
const SizeTemplate = () => html`
  <sgds-spinner size="sm"></sgds-spinner>
  <sgds-spinner size="md"></sgds-spinner>
  <sgds-spinner size="lg"></sgds-spinner>
`;

export const Variant = {
  render: VariantTemplate.bind({}),
  name: "Variant",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
export const Size = {
  render: SizeTemplate.bind({}),
  name: "Size",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const Label = {
  render: Template.bind({}),
  name: "Label",
  args: { label: "Label" },
  parameters: {},
  tags: ["!dev"]
};
