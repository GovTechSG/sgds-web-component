import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => {
  return html`
    <sgds-checkbox
      name=${ifDefined(args.name)}
      disabled=${ifDefined(args.disabled)}
      value=${ifDefined(args.value)}
      required=${ifDefined(args.required)}
      checked=${ifDefined(args.checked)}
      invalid=${ifDefined(args.invalid)}
      invalidFeedback=${ifDefined(args.invalidFeedback)}
      hasFeedback=${ifDefined(args.hasFeedback)}
      ariaLabel=${ifDefined(args.ariaLabel)}
      isInline=${ifDefined(args.isInline)}
      >Check me</sgds-checkbox
    >
  `;
};
export const args = {
  name: "check-me",
  value: "check-me"
};

export const parameters = {};
