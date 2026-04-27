import { html } from "lit";

const VariantTemplate = args => {
  return html`
    <sgds-button variant="primary">Primary button</sgds-button>
    <sgds-button variant="outline">Outline button</sgds-button>
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
const ToneTemplate = args => {
  return html`
    <div class="d-flex-column">
      <div class="d-flex-row">
        <sgds-button tone="brand" variant="primary">Brand Primary</sgds-button>
        <sgds-button tone="brand" variant="outline">Brand Outline</sgds-button>
        <sgds-button tone="brand" variant="ghost">Brand Ghost</sgds-button>
      </div>
      <div class="d-flex-row">
        <sgds-button tone="danger" variant="primary">Danger Primary</sgds-button>
        <sgds-button tone="danger" variant="outline">Danger Outline</sgds-button>
        <sgds-button tone="danger" variant="ghost">Danger Ghost</sgds-button>
      </div>
      <div class="d-flex-row">
        <sgds-button tone="neutral" variant="primary">Neutral Primary</sgds-button>
        <sgds-button tone="neutral" variant="outline">Neutral Outline</sgds-button>
        <sgds-button tone="neutral" variant="ghost">Neutral Ghost</sgds-button>
      </div>
      <div class="d-flex-row" style="padding: 12px; background-color: #333;">
        <sgds-button tone="fixed-light" variant="primary">Fixed Light Primary</sgds-button>
        <sgds-button tone="fixed-light" variant="outline">Fixed Light Outline</sgds-button>
        <sgds-button tone="fixed-light" variant="ghost">Fixed Light Ghost</sgds-button>
      </div>
    </div>
  `;
};

export const Tone = {
  render: ToneTemplate.bind({}),
  name: "Tone",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

const FullWidthTemplate = () => {
  return html`<sgds-button fullWidth>Full width button</sgds-button>`;
};

export const FullWidth = {
  render: FullWidthTemplate.bind({}),
  name: "Full Width",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

const SizeTemplate = () => {
  return html` <sgds-button size="xs"> extra small button </sgds-button>
    <sgds-button size="sm"> small button </sgds-button>
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
    <sgds-button variant="outline" active> Hover / Active </sgds-button>
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
    <sgds-button variant="outline" disabled> Disabled </sgds-button>
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

export const Loading = {
  render: () => html`
    <div class="d-flex-column">
      <div class="d-flex-row">
        <sgds-button variant="primary" loading> Loading... </sgds-button>
        <sgds-button variant="outline" loading> Loading... </sgds-button>
        <sgds-button variant="ghost" loading> Loading... </sgds-button>
      </div>
      <div class="d-flex-row">
        <sgds-button variant="primary" tone="danger" loading> Loading... </sgds-button>
        <sgds-button variant="outline" tone="danger" loading> Loading... </sgds-button>
        <sgds-button variant="ghost" tone="danger" loading> Loading... </sgds-button>
      </div>
      <div class="d-flex-row">
        <sgds-button variant="primary" tone="neutral" loading> Loading... </sgds-button>
        <sgds-button variant="outline" tone="neutral" loading> Loading... </sgds-button>
        <sgds-button variant="ghost" tone="neutral" loading> Loading... </sgds-button>
      </div>
      <div class="d-flex-row" style="padding: 12px; background-color: #333;">
        <sgds-button variant="primary" tone="fixed-light" loading> Loading... </sgds-button>
        <sgds-button variant="outline" tone="fixed-light" loading> Loading... </sgds-button>
        <sgds-button variant="ghost" tone="fixed-light" loading> Loading... </sgds-button>
      </div>
    </div>
  `,
  name: "Loading state",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
