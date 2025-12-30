import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args =>
  html`
    <sgds-alert
      title=${ifDefined(args.title)}
      ?dismissible=${args.dismissible}
      variant=${ifDefined(args.variant)}
      ?show=${args.show}
      ><sgds-icon slot="icon" name="exclamation-circle-fill"></sgds-icon>
      <div>Description with <sgds-alert-link href="#">link</sgds-alert-link></div>
    </sgds-alert>
  `;
export const args = {
  href: "#",
  show: true,
  variant: "info",
  title: "Title",
  dismissible: true
};

export const parameters = {};
