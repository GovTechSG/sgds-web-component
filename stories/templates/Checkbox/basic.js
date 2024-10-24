import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => {
  return html`
    <sgds-checkbox
      name=${ifDefined(args.name)}
      ?disabled=${args.disabled}
      value=${ifDefined(args.value)}
      ?required=${args.required}
      ?checked=${args.checked}
      ?invalid=${args.invalid}
      invalidFeedback=${ifDefined(args.invalidFeedback)}
      ?hasFeedback=${args.hasFeedback}
      ariaLabel=${ifDefined(args.ariaLabel)}
      ?isInline=${args.isInline}
      >Check me</sgds-checkbox
    >
    <sgds-checkbox
      >Lorem ipsum dolor sit amet. Et itaque natus sit laborum voluptatem aut rerum ducimus eum tenetur molestias quo
      reiciendis ratione aut eaque voluptates est</sgds-checkbox
    >
  `;
};
export const args = {
  name: "check-me",
  value: "check-me"
};

export const parameters = {};
