import { html } from "lit-html";
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
        >
          <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
          <span slot="duration">2 mins ago</span>
          This is a toast notifications
        </sgds-toast>
      </sgds-toast-container>
    </div>
  `;

export const args = {
  show: true
};

export const parameters = {
  docs: { iframeHeight: 400 }
};
