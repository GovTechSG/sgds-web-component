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
      invalidFeedback=${ifDefined(args.invalidFeedback)}
      ?invalid=${args.invalid}
      label=${ifDefined(args.label)}
      hintText=${ifDefined(args.hintText)}
    ></sgds-quantity-toggle>
  `;

export const args = {};

export const parameters = {};
