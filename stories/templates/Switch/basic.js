import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => html`
  <sgds-switch
    name=${ifDefined(args.name)}
    ?disabled=${args.disabled}
    value=${ifDefined(args.value)}
    ?hasFeedback=${args.required}
    ?checked=${args.checked}
    ?invalid=${args.invalid}
    invalidFeedback=${ifDefined(args.invalidFeedback)}
    ?hasFeedback=${args.hasFeedback}
    ariaLabel=${ifDefined(args.ariaLabel)}
    ?isInline=${args.isInline}
    >Switch me
  </sgds-switch>
`;

export const args = {};

export const parameters = {};
