import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => html`
  <sgds-link
    size=${ifDefined(args.size)}
    variant=${ifDefined(args.variant)}
    ?active=${args.active}
    ?disabled=${args.disabled}
  >
    <a href="#">Link</a>
  </sgds-link>
`;

export const args = {};

export const parameters = {};
