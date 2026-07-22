import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const VariantTemplate = args =>
  html`
    <sgds-toast show variant=${ifDefined(args.variant)} dismissible title=${capitalizeFirstLetter(args.variant)}>
      ${args.variant === "success"
        ? html`<sgds-icon slot="icon" name="check-circle-fill" size="md"></sgds-icon>`
        : args.variant === "danger"
        ? html`<sgds-icon slot="icon" name="exclamation-circle-fill" size="md"></sgds-icon>`
        : args.variant === "warning"
        ? html`<sgds-icon slot="icon" name="exclamation-triangle-fill" size="md"></sgds-icon>`
        : html`<sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>`}
      Message
      <sgds-link slot="action" size="sm"><a href="#" target="_blank">Action</a></sgds-link>
    </sgds-toast>
  `;

export const InfoVariant = {
  render: VariantTemplate.bind({}),
  name: "Variant info",
  args: { variant: "info" },
  parameters: {}
};
export const SuccessVariant = {
  render: VariantTemplate.bind({}),
  name: "Variant success",
  args: { variant: "success" },
  parameters: {}
};
export const DangerVariant = {
  render: VariantTemplate.bind({}),
  name: "Variant danger",
  args: { variant: "danger" },
  parameters: {}
};
export const WarningVariant = {
  render: VariantTemplate.bind({}),
  name: "Variant warning",
  args: { variant: "warning" },
  parameters: {}
};
export const NeutralVariant = {
  render: VariantTemplate.bind({}),
  name: "Variant neutral",
  args: { variant: "neutral" },
  parameters: {}
};

const DismissibleTemplate = args =>
  html`
    <div class="d-flex-column">
      <sgds-toast show dismissible title="Dismissible">
        <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
        Message
        <sgds-link slot="action" size="sm"><a href="#" target="_blank">Action</a></sgds-link>
      </sgds-toast>
      <sgds-toast show title="Not dismissible">
        <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
        Message
        <sgds-link slot="action" size="sm"><a href="#" target="_blank">Action</a></sgds-link>
      </sgds-toast>
    </div>
  `;

export const Dismissible = {
  render: DismissibleTemplate.bind({}),
  name: "Dismissible",
  args: {},
  parameters: {}
};

const PositionTemplate = args =>
  html`
    <div style="height:600px;">
      <sgds-masthead></sgds-masthead>
      <sgds-mainnav>
        <img alt="sgds logo" width="130" src="/logo.png" slot="brand" />
      </sgds-mainnav>
      <sgds-toast-container position=${ifDefined(args.position)}>
        <sgds-toast
          ?show=${args.show}
          variant=${ifDefined(args.variant)}
          ?autohide=${args.autohide}
          delay=${ifDefined(args.delay)}
          ?noAnimation=${args.noAnimation}
          ?dismissable=${args.dismissable}
          title=${ifDefined(args.title)}
        >
          <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
          This is a toast notifications
          <sgds-link slot="action" size="sm"><a href="#" target="_blank">Action</a></sgds-link>
        </sgds-toast>
      </sgds-toast-container>
    </div>
  `;
export const TopCenter = {
  render: PositionTemplate.bind({}),
  name: "Top center",
  args: { ...args, position: "top-center" },
  parameters: {}
};
export const TopEnd = {
  render: PositionTemplate.bind({}),
  name: "Top end",
  args: { ...args, position: "top-end" },
  parameters: {}
};
export const BottomStart = {
  render: PositionTemplate.bind({}),
  name: "Bottom start",
  args: { ...args, position: "bottom-start" },
  parameters: {}
};
export const BottomCenter = {
  render: PositionTemplate.bind({}),
  name: "Bottom center",
  args: { ...args, position: "bottom-center" },
  parameters: {}
};
export const BottomEnd = {
  render: PositionTemplate.bind({}),
  name: "Bottom end",
  args: { ...args, position: "bottom-end" },
  parameters: {}
};

const StackingTemplate = () =>
  html`
    <div style="height:400px;">
      <sgds-toast-container position=${ifDefined(args.position)}>
        <sgds-toast show>
          <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
          This is a toast notifications
          <sgds-link slot="action" size="sm"><a href="#" target="_blank">Action</a></sgds-link>
        </sgds-toast>
        <sgds-toast show>
          <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
          This is a toast notifications
          <sgds-link slot="action" size="sm"><a href="#" target="_blank">Action</a></sgds-link>
        </sgds-toast>
      </sgds-toast-container>
    </div>
  `;

export const Stacking = {
  render: StackingTemplate.bind({}),
  name: "Stacking the toasts",
  args: { position: "bottom-end" },
  parameters: {}
};

const ImperativeTemplate = () =>
  html`
    <div style="height:400px;">
      <sgds-toast-container id="imperative-container" position="bottom-end"></sgds-toast-container>
      <sgds-button
        @click=${() => {
          const container = document.getElementById("imperative-container");
          container.toast({
            title: "Success",
            message: "Your changes have been saved.",
            variant: "success",
            delay: 5000
          });
        }}
      >
        Show Toast
      </sgds-button>
    </div>
  `;

export const Imperative = {
  render: ImperativeTemplate.bind({}),
  name: "Imperative API (toast function)",
  args: {},
  parameters: {
    docs: {
      source: {
        code: `import { toast } from "@govtechsg/sgds-web-component";

// Call toast() to create and show a toast notification
toast({
  title: "Success",
  message: "Your changes have been saved.",
  variant: "success",   // "info" | "success" | "danger" | "warning" | "neutral"
  position: "bottom-end", // "top-center" | "top-end" | "bottom-start" | "bottom-center" | "bottom-end"
  delay: 5000,          // auto-hide delay in ms (default: 5000)
  dismissible: true     // show close button (default: true)
});`,
        language: "js"
      }
    }
  }
};
