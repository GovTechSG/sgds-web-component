import { html } from "lit-html";

export const Template = args =>
  html`
    <sgds-quantity-toggle
      .value=${args.value}
      step=${args.step}
      quantityToggleClasses=${args.quantityToggleClasses}
      ?disabled=${args.disabled}
      size=${args.size}
      name=${args.name}
      inputId=${args.inputId}
      min=${args.min}
      max=${args.max}
      buttonVariant=${args.buttonVariant}
      defaultValue=${args.defaultValue}
    ></sgds-quantity-toggle>
  `;

export const args = {};
