import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => html`
  <sgds-progress-bar
    label=${ifDefined(args.label)}
    variant=${ifDefined(args.variant)}
    value=${ifDefined(args.value)}
    ariamin=${ifDefined(args.ariamin)}
    ariamax=${ifDefined(args.ariamax)}
    arialabel=${ifDefined(args.arialabel)}
  >
  </sgds-progress-bar>
`;

export const args = {
  label: "40%",
  value: 40,
  arialabel: `Loading in progress`,
  ariamin: 0,
  ariamax: 100
};

export const parameters = {};
