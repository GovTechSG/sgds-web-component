import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => html` <sgds-switch
  size=${ifDefined(args.size)}
  ?icon=${args.icon}
  ?checked=${args.checked}
  ?disabled=${args.disabled}
>
</sgds-switch>`;

export const args = {};

export const parameters = {};
