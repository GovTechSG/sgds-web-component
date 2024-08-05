import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args =>
  html`
    <sgds-quantity-toggle
      value=${ifDefined(args.value)}
      step=${ifDefined(args.step)}
      quantityToggleClasses=${ifDefined(args.quantityToggleClasses)}
      ?disabled=${args.disabled}
      size=${ifDefined(args.size)}
      name=${ifDefined(args.name)}
      min=${ifDefined(args.min)}
      max=${ifDefined(args.max)}
      buttonVariant=${ifDefined(args.buttonVariant)}
      defaultValue=${ifDefined(args.defaultValue)}
    ></sgds-quantity-toggle>
  `;

export const args = {};

export const parameters = {};
