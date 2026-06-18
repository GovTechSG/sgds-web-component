import { html } from "lit";

const VariantTemplate = () => html`
  <sgds-spinner variant="primary"></sgds-spinner>
  <sgds-spinner variant="neutral"></sgds-spinner>
`;

const ToneTemplate = () => html`
  <div class="sgds:p-component-xs">
    <sgds-spinner tone="brand"></sgds-spinner>
    <sgds-spinner tone="neutral"></sgds-spinner>
    <sgds-spinner tone="fixed-dark"></sgds-spinner>
  </div>
  <div class="sgds:p-component-xs sgds:bg-surface-fixed-dark">
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

export const Variant = {
  render: VariantTemplate.bind({}),
  name: "Variant",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const Tone = {
  render: ToneTemplate.bind({}),
  name: "Tone",
  args: {},
  parameters: {
    backgrounds: { default: "custom-blue" }
  },
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

export const LabelHorizontal = {
  render: Template.bind({}),
  name: "Label - Horizontal",
  args: { label: "Label", orientation: "horizontal" },
  parameters: {},
  tags: ["!dev"]
};
