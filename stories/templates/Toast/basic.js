import { html } from "lit-html";

export const Template = args =>
  html`
    <sgds-toast
      .show=${args.show}
      .bg=${args.bg}
      .variant=${args.variant}
      .status=${args.status}
      .closeLabel=${args.closeLabel}
      .autohide=${args.autohide}
      .delay=${args.delay}
    ></sgds-toast>
  `;

export const args = {};

export const parameters = {};
