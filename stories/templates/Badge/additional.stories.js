import { html } from "lit-html";

const VariantTemplate = args => {
  const variants = ["Info", "Success", "Danger", "Warning", "Neutral"];
  return html`
    <div class="d-flex-row flex-wrap">
      ${variants.map(v => html` <sgds-badge variant=${v.toLowerCase()}>Filled Badge</sgds-badge> `)}
    </div>
  `;
};
const OutlinedVariantTemplate = args => {
  const variants = ["Info", "Success", "Danger", "Warning", "Neutral"];
  return html`
    <div class="d-flex-row flex-wrap">
      ${variants.map(v => html` <sgds-badge variant=${v.toLowerCase()} outlined>Outlined Badge</sgds-badge> `)}
    </div>
  `;
};
const DismissibleTemplate = args => {
  return html` <sgds-badge show dismissible>Dismissible badge</sgds-badge> `;
};
const IconTemplate = args => {
  return html`
    <div class="d-flex-row flex-wrap">
      <sgds-badge variant="danger">
        <sgds-icon slot="icon" name="placeholder" size="sm"></sgds-icon>
        Leading icon badge
      </sgds-badge>
    </div>
  `;
};

const TruncationTemplate = _ => {
  return html`
    <div class="d-flex-row flex-wrap" style="width:250px;padding: 60px 24px 60px;">
      <sgds-badge outlined>
        <sgds-icon slot="icon" name="placeholder" size="sm"></sgds-icon>
        A long badge text that needs to be truncated
      </sgds-badge>
    </div>
  `;
};

export const Variants = {
  render: VariantTemplate.bind({}),
  name: "Variants",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const OutlinedVariants = {
  render: OutlinedVariantTemplate.bind({}),
  name: "Outlined variants",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const Dismissible = {
  render: DismissibleTemplate.bind({}),
  name: "Dismissible",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const WithIcon = {
  render: IconTemplate.bind({}),
  name: "Icon",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const WithTruncation = {
  render: TruncationTemplate.bind({}),
  name: "Truncation",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
