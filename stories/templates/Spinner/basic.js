import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args =>
  html`
    <sgds-spinner
      label=${ifDefined(args.label)}
      tone=${ifDefined(args.tone)}
      size=${ifDefined(args.size)}
      orientation=${ifDefined(args.orientation)}
    >
    </sgds-spinner>
  `;

export const args = {};

export const parameters = {};
