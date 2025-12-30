import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args =>
  html`
    <div style="height:400px;">
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
          <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
          This is a toast notifications
          <sgds-link slot="action"><a href="#" target="_blank">Action</a></sgds-link>
        </sgds-toast>
      </sgds-toast-container>
    </div>
  `;

export const args = {
  show: true
};

export const parameters = {
  docs: {}
};
