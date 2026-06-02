import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => html` <sgds-icon-button
  name=${ifDefined(args.name)}
  variant=${ifDefined(args.variant)}
  ?loading=${args.loading}
  size=${ifDefined(args.size)}
  ariaLabel=${ifDefined(args.ariaLabel)}
></sgds-icon-button>`;

export const args = {
  name: "plus",
  ariaLabel: "Add"
};

export const parameters = {};

export const play = undefined;
