import { html } from "lit-html";

const ToneTemplate = () => html`
  <sgds-spinner variant="primary"></sgds-spinner>
  <sgds-spinner variant="neutral"></sgds-spinner>
  <sgds-spinner tone="brand"></sgds-spinner>
  <sgds-spinner tone="neutral"></sgds-spinner>
  <sgds-spinner tone="fixed-dark"></sgds-spinner>
`;

const ToneInverseAndFixedLightTemplate = () => html`
  <div style="padding: 12px; background-color: #222;">
    <sgds-spinner tone="inverse"></sgds-spinner>
    <sgds-spinner tone="fixed-light"></sgds-spinner>
  </div>
`;
const SizeTemplate = () => html`
  <sgds-spinner size="xs"></sgds-spinner>
  <sgds-spinner size="sm"></sgds-spinner>
  <sgds-spinner size="md"></sgds-spinner>
  <sgds-spinner size="lg"></sgds-spinner>
  <sgds-spinner size="xl"></sgds-spinner>
`;

export const Tone = {
  render: ToneTemplate.bind({}),
  name: "Tone",
  args: {},
  parameters: {
    backgrounds: { default: "custom-blue" }
  },
  tags: ["!dev"]
};
export const ToneInverseFixedLight = {
  render: ToneInverseAndFixedLightTemplate.bind({}),
  name: "Tone - inverse and fixed light",
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
