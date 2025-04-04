import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args =>
  html`
    <sgds-button
      variant=${ifDefined(args.variant)}
      size=${ifDefined(args.size)}
      ?active=${args.active}
      ?disabled=${args.disabled}
      href=${ifDefined(args.href)}
      target=${ifDefined(args.target)}
      download=${ifDefined(args.download)}
      type=${ifDefined(args.type)}
      form=${ifDefined(args.form)}
      formAction=${ifDefined(args.formAction)}
      formMethod=${ifDefined(args.formMethod)}
      ?formNoValidate=${args.formNoValidate}
      formTarget=${ifDefined(args.formTarget)}
    >
      Button
    </sgds-button>
  `;
export const args = {};

export const parameters = {};
