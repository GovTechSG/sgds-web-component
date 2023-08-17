import { html } from "lit-html";

export const Template = args => html` <sgds-progress>
  <sgds-progress-bar
    label=${args.label}
    ?striped=${args.striped}
    ?animated=${args.animated}
    variant=${args.variant}
    .value=${args.value}
    aria-valuenow=${args.value}
    aria-minvalue=${args.ariamin}
    aria-maxvalue=${args.ariamax}
    aria-label=${args.arialabel}
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
