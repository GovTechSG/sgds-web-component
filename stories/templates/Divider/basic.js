import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => html` <sgds-divider
  thickness=${ifDefined(args.thickness)}
  orientation=${ifDefined(args.orientation)}
></sgds-divider>`;

export const args = {};

export const parameters = {};
