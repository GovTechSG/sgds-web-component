import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args =>
  html`
    <sgds-spinner label=${ifDefined(args.label)} variant=${ifDefined(args.variant)} size=${ifDefined(args.size)}>
    </sgds-spinner>
  `;

export const args = {};

export const parameters = {};
