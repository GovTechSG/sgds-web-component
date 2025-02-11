import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const VariantTemplate = args =>
  html`
    <sgds-toast show variant=${ifDefined(args.variant)} dismissible title=${capitalizeFirstLetter(args.variant)}>
      ${args.variant === "warning"
        ? html`<sgds-icon slot="icon" name="exclamation-triangle-fill"></sgds-icon>`
        : html`<sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>`}
      Message
      <sgds-link slot="action"><a href="#" target="_blank">Action</a></sgds-link>
    </sgds-toast>
  `;

export const InfoVariant = {
  render: VariantTemplate.bind({}),
  name: "Variant info",
  args: { variant: "info" },
  parameters: {},
  tags: ["!dev"]
};
export const SuccessVariant = {
  render: VariantTemplate.bind({}),
  name: "Variant success",
  args: { variant: "success" },
  parameters: {},
  tags: ["!dev"]
};
export const DangerVariant = {
  render: VariantTemplate.bind({}),
  name: "Variant danger",
  args: { variant: "danger" },
  parameters: {},
  tags: ["!dev"]
};
export const WarningVariant = {
  render: VariantTemplate.bind({}),
  name: "Variant warning",
  args: { variant: "warning" },
  parameters: {},
  tags: ["!dev"]
};
export const NeutralVariant = {
  render: VariantTemplate.bind({}),
  name: "Variant neutral",
  args: { variant: "neutral" },
  parameters: {},
  tags: ["!dev"]
};

const DismissibleTemplate = args =>
  html`
    <div class="d-flex-column">
      <sgds-toast show dismissible title="Dismissible">
        <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
        Message
        <sgds-link slot="action"><a href="#" target="_blank">Action</a></sgds-link>
      </sgds-toast>
      <sgds-toast show title="Not dismissible">
        <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
        Message
        <sgds-link slot="action"><a href="#" target="_blank">Action</a></sgds-link>
      </sgds-toast>
    </div>
  `;

export const Dismissible = {
  render: DismissibleTemplate.bind({}),
  name: "Dismissible",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const TopStart = {
  render: Template.bind({}),
  name: "Top start",
  args: { ...args, position: "top-start" },
  parameters: {},
  tags: ["!dev"]
};
export const TopCenter = {
  render: Template.bind({}),
  name: "Top center",
  args: { ...args, position: "top-center" },
  parameters: {},
  tags: ["!dev"]
};
export const TopEnd = {
  render: Template.bind({}),
  name: "Top end",
  args: { ...args, position: "top-end" },
  parameters: {},
  tags: ["!dev"]
};
export const MiddleStart = {
  render: Template.bind({}),
  name: "Middle start",
  args: { ...args, position: "middle-start" },
  parameters: {},
  tags: ["!dev"]
};
export const MiddleCenter = {
  render: Template.bind({}),
  name: "Middle center",
  args: { ...args, position: "middle-center" },
  parameters: {},
  tags: ["!dev"]
};
export const MiddleEnd = {
  render: Template.bind({}),
  name: "Middle end",
  args: { ...args, position: "middle-end" },
  parameters: {},
  tags: ["!dev"]
};
export const BottomStart = {
  render: Template.bind({}),
  name: "Bottom start",
  args: { ...args, position: "bottom-start" },
  parameters: {},
  tags: ["!dev"]
};
export const BottomCenter = {
  render: Template.bind({}),
  name: "Bottom Center",
  args: { ...args, position: "bottom-center" },
  parameters: {},
  tags: ["!dev"]
};
export const BottomEnd = {
  render: Template.bind({}),
  name: "Bottom End",
  args: { ...args, position: "bottom-end" },
  parameters: {},
  tags: ["!dev"]
};

const StackingTemplate = () =>
  html`
    <div style="height:400px;">
      <sgds-toast-container position=${ifDefined(args.position)}>
        <sgds-toast show>
          <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
          This is a toast notifications
          <sgds-link slot="action"><a href="#" target="_blank">Action</a></sgds-link>
        </sgds-toast>
        <sgds-toast show>
          <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
          This is a toast notifications
          <sgds-link slot="action"><a href="#" target="_blank">Action</a></sgds-link>
        </sgds-toast>
      </sgds-toast-container>
    </div>
  `;

export const Stacking = {
  render: StackingTemplate.bind({}),
  name: "Stacking the toasts",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
