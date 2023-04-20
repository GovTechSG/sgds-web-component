import { html } from "lit-html";

export const Template = args =>
  html`
    <sgds-quantitytoggle
      .count=${args.count}
      .step=${args.step}
      .quantityToggleClasses=${args.quantityToggleClasses}
      .disabled=${args.disabled}
      .size=${args.size}
    ></sgds-quantitytoggle>
  `;

export const args = {};
