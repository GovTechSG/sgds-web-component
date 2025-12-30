import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => html` <sgds-icon-button
  name=${ifDefined(args.name)}
  variant=${ifDefined(args.variant)}
  ?loading=${args.loading}
  size=${ifDefined(args.size)}
></sgds-icon-button>`;

export const args = {
  name: "plus"
};

export const parameters = {};
