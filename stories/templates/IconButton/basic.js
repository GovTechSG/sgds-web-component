import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => html` <sgds-icon-button
  name=${ifDefined(args.name)}
  variant=${ifDefined(args.variant)}
></sgds-icon-button>`;

export const args = {
  name: "plus"
};

export const parameters = {};
