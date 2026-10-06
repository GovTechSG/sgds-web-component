import { html } from "lit";

const variants = ["primary", "accent", "success", "danger", "warning", "cyan", "purple", "neutral", "white"];

const VariantTemplate = _ => {
  return html`
    <div class="sgds:flex sgds:flex-wrap sgds:gap-xs">
      ${variants.map(v => html` <sgds-badge variant=${v}>Filled Badge</sgds-badge> `)}
    </div>
  `;
};
const OutlinedVariantTemplate = _ => {
  return html`
    <div class="sgds:flex sgds:flex-wrap sgds:gap-xs">
      ${variants.map(v => html` <sgds-badge variant=${v} outlined>Outlined Badge</sgds-badge> `)}
    </div>
  `;
};
const DismissibleTemplate = _ => {
  return html`
    <div class="sgds:flex sgds:flex-wrap sgds:gap-xs">
      ${variants.map(v => html` <sgds-badge variant=${v} show dismissible>Filled Badge</sgds-badge> `)}
    </div>
  `;
};
const DismissibleOutlinedTemplate = _ => {
  return html`
    <div class="sgds:flex sgds:flex-wrap sgds:gap-xs">
      ${variants.map(v => html` <sgds-badge variant=${v} show dismissible outlined>Outlined Badge</sgds-badge> `)}
    </div>
  `;
};
const IconTemplate = _ => {
  return html`
    <div class="sgds:flex sgds:flex-wrap sgds:gap-xs">
      <sgds-badge variant="danger">
        <sgds-icon slot="icon" name="placeholder" size="sm"></sgds-icon>
        Leading icon badge
      </sgds-badge>
    </div>
  `;
};

const TruncationTemplate = _ => {
  return html`
    <div class="sgds:flex sgds:flex-wrap sgds:gap-xs" style="width:300px;padding: 60px 24px 60px;">
      <sgds-badge outlined>
        <sgds-icon slot="icon" name="placeholder" size="sm"></sgds-icon>
        A long badge text that needs to be truncated
      </sgds-badge>

      <sgds-badge variant="neutral" outlined fullWidth>
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
  parameters: {}
};

export const OutlinedVariants = {
  render: OutlinedVariantTemplate.bind({}),
  name: "Outlined variants",
  args: {},
  parameters: {}
};

export const Dismissible = {
  render: DismissibleTemplate.bind({}),
  name: "Dismissible",
  args: {},
  parameters: {}
};

export const DismissibleOutlined = {
  render: DismissibleOutlinedTemplate.bind({}),
  name: "Dismissible outlined",
  args: {},
  parameters: {}
};

export const WithIcon = {
  render: IconTemplate.bind({}),
  name: "Icon",
  args: {},
  parameters: {}
};

export const WithTruncation = {
  render: TruncationTemplate.bind({}),
  name: "Truncation",
  args: {},
  parameters: {}
};
