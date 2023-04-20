import { html } from "lit-html";

export const Template = args =>
  html`
    <sgds-quantity-toggle
      .count=${args.count}
      .step=${args.step}
      .quantityToggleClasses=${args.quantityToggleClasses}
      .disabled=${args.disabled}
      .size=${args.size}
    ></sgds-quantity-toggle>
  `;

export const args = {};
