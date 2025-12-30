import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args =>
  html`
    <sgds-badge
      variant=${ifDefined(args.variant)}
      ?dismissible=${args.dismissible}
      ?outlined=${args.outlined}
      ?show=${args.show}
    >
      Badge label
    </sgds-badge>
  `;
export const args = {};

export const parameters = {};
