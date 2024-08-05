import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args =>
  html` <sgds-spinner type=${ifDefined(args.type)} color=${ifDefined(args.color)}> </sgds-spinner> `;

export const args = {};

export const parameters = {};
