import { html } from "lit-html";

const VariantTemplate = args => {
  const variants = [
    { variant: "Info", icon: "info-circle-fill" },
    { variant: "Success", icon: "check-circle-fill" },
    { variant: "Danger", icon: "exclamation-circle-fill" },
    { variant: "Warning", icon: "exclamation-triangle-fill" },
    { variant: "Neutral", icon: "info-circle-fill" }
  ];
  return html`
    <div class="d-flex-column">
      ${variants.map(
        v => html`
        <sgds-alert variant=${v.variant.toLowerCase()} show title="${v.variant} alert">
          <sgds-icon slot="icon" name=${v.icon}></sgds-icon>
          <div> Description with <sgds-alert-link href="#">link</sgds-alert-link></div>
        </sgds-alert>
    </div>    
        `
      )}
    </div>
  `;
};
const OutlinedVariantTemplate = args => {
  const variants = [
    { variant: "Info", icon: "info-circle-fill" },
    { variant: "Success", icon: "check-circle-fill" },
    { variant: "Danger", icon: "exclamation-circle-fill" },
    { variant: "Warning", icon: "exclamation-triangle-fill" },
    { variant: "Neutral", icon: "info-circle-fill" }
  ];
  return html`
    <div class="d-flex-column">
      ${variants.map(
        v => html`
        <sgds-alert variant=${v.variant.toLowerCase()} show title="${v.variant} alert" outlined>
          <sgds-icon slot="icon" name=${v.icon}></sgds-icon>
          <div> Description with <sgds-alert-link href="#">link</sgds-alert-link></div>
        </sgds-alert>
    </div>    
        `
      )}
    </div>
  `;
};
const DismissibleTemplate = args => {
  return html`
    <div class="d-flex-column">
      <sgds-alert show title="Title" dismissible>
        <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
        <div>A dismissible alert</div>
      </sgds-alert>
      <sgds-alert show title="Title" outlined dismissible>
        <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
        <div>A non-dismissible alert</div>
      </sgds-alert>
    </div>
  `;
};
const IconTemplate = args => {
  return html`
    <div class="d-flex-column">
      <sgds-alert show title="Title">
        <div>Alert with no leading icon</div>
      </sgds-alert>
      <sgds-alert show title="Title">
        <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
        <div>Alert with leading icon</div>
      </sgds-alert>
    </div>
  `;
};

const TitleTemplate = args => {
  return html`
    <div class="d-flex-column">
        <sgds-alert show>
            <div> Alert with no title</sgds-alert-link></div>
        </sgds-alert>
        <sgds-alert show title="Title">
            <div> Alert with title</sgds-alert-link>
        </sgds-alert>
    </div>
    `;
};

const LinkTemplate = args => {
  return html`
    <sgds-alert variant="info" show title="Alert with link">
      <div>Description with <sgds-alert-link href="#">link</sgds-alert-link></div>
    </sgds-alert>
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

export const WithTitle = {
  render: TitleTemplate.bind({}),
  name: "Title",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const WithLink = {
  render: LinkTemplate.bind({}),
  name: "Link",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
