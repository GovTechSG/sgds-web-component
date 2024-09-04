import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => html` <sgds-progress>
  <sgds-progress-bar
    label=${ifDefined(args.label)}
    variant=${ifDefined(args.variant)}
    value=${ifDefined(args.value)}
    ariamin=${ifDefined(args.ariamin)}
    ariamax=${ifDefined(args.ariamax)}
    arialabel=${ifDefined(args.arialabel)}
  >
  </sgds-progress-bar>
</sgds-progress>`;

export const args = {
  label: "50%",
  value: 50,
  arialabel: `Loading in progress`,
  variant: "secondary",
  ariamin: 0,
  ariamax: 100
};

export const parameters = {};
