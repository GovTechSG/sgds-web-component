import { html } from "lit";

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
          <sgds-icon slot="icon" name=${v.icon} size="md"></sgds-icon>
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
          <sgds-icon slot="icon" name=${v.icon} size="md"></sgds-icon>
          <div> Description with <sgds-alert-link href="#">link</sgds-alert-link></div>
        </sgds-alert>
    </div>    
        `
      )}
    </div>
  `;
};
const DismissibleTemplate = args => {
  const variants = [
    { variant: "info", icon: "info-circle-fill" },
    { variant: "success", icon: "check-circle-fill" },
    { variant: "danger", icon: "exclamation-circle-fill" },
    { variant: "warning", icon: "exclamation-triangle-fill" },
    { variant: "neutral", icon: "info-circle-fill" }
  ];
  return html`
    <div class="d-flex-column">
      ${variants.map(
        v => html`
          <sgds-alert
            show
            variant=${v.variant}
            title="${v.variant.charAt(0).toUpperCase() + v.variant.slice(1)} alert"
            dismissible
          >
            <sgds-icon slot="icon" name=${v.icon} size="md"></sgds-icon>
            <div>A dismissible alert</div>
          </sgds-alert>
        `
      )}
      ${variants.map(
        v => html`
          <sgds-alert
            show
            variant=${v.variant}
            title="${v.variant.charAt(0).toUpperCase() + v.variant.slice(1)} outlined alert"
            outlined
            dismissible
          >
            <sgds-icon slot="icon" name=${v.icon} size="md"></sgds-icon>
            <div>A dismissible outlined alert</div>
          </sgds-alert>
        `
      )}
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
        <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
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

const FilledActionTemplate = args => {
  const variants = [
    { variant: "info", icon: "info-circle-fill", tone: "fixed-light" },
    { variant: "success", icon: "check-circle-fill", tone: "fixed-light" },
    { variant: "danger", icon: "exclamation-circle-fill", tone: "fixed-light" },
    { variant: "warning", icon: "exclamation-triangle-fill", tone: "neutral" },
    { variant: "neutral", icon: "info-circle-fill", tone: "fixed-light" }
  ];
  return html`
    <div class="d-flex-column">
      ${variants.map(
        v => html`
          <sgds-alert
            variant=${v.variant}
            show
            title="${v.variant.charAt(0).toUpperCase() + v.variant.slice(1)} alert"
            class="sgds:mb-md"
          >
            <sgds-icon slot="icon" name=${v.icon} size="md"></sgds-icon>
            <div>Description with <sgds-alert-link href="#">link</sgds-alert-link></div>
            <sgds-button slot="action" variant="outline" size="sm" tone=${v.tone}>Take Action</sgds-button>
          </sgds-alert>
        `
      )}
    </div>
  `;
};

const OutlinedActionTemplate = args => {
  const variants = [
    { variant: "info", icon: "info-circle-fill" },
    { variant: "success", icon: "check-circle-fill" },
    { variant: "danger", icon: "exclamation-circle-fill" },
    { variant: "warning", icon: "exclamation-triangle-fill" },
    { variant: "neutral", icon: "info-circle-fill" }
  ];
  return html`
    <div class="d-flex-column">
      ${variants.map(
        v => html`
          <sgds-alert
            variant=${v.variant}
            show
            title="${v.variant.charAt(0).toUpperCase() + v.variant.slice(1)} alert"
            outlined
            class="sgds:mb-md"
          >
            <sgds-icon slot="icon" name=${v.icon} size="md"></sgds-icon>
            <div>Description with <sgds-alert-link href="#">link</sgds-alert-link></div>
            <sgds-button slot="action" variant="outline" size="sm" tone="neutral">Take Action</sgds-button>
          </sgds-alert>
        `
      )}
    </div>
  `;
};

export const FilledWithAction = {
  render: FilledActionTemplate.bind({}),
  name: "Filled with action",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const OutlinedWithAction = {
  render: OutlinedActionTemplate.bind({}),
  name: "Outlined with action",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
