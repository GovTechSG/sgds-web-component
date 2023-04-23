import { html } from "lit-html";

export const Template = args =>
  html`
    <sgds-alert
      .alertClasses=${args.alertClasses}
      .dismissible=${args.dismissible}
      .variant=${args.variant}
      .show=${args.show}
      .closeLabel=${args.closeLabel}
      ><sl-icon name="info-circle" class="flex-shrink-0 me-4"></sl-icon>
      <div>This is an Alert component. You may add the dismissible option.</div></sgds-alert
    >
  `;
export const args = {
  alertClasses : "d-flex align-items-center"
}
;
