import { html } from "lit-html";

export const Template = args => {
  return html`
    <sgds-checkbox
      name=${args.name}
      ?disabled=${args.disabled}
      value=${args.value}
      ?required=${args.required}
      .checked=${args.checked}
      .invalid=${args.invalid}
      .valid=${args.valid}
      invalidFeedback=${args.invalidFeedback}
      ?hasFeedback=${args.hasFeedback}
      ariaLabel=${args.ariaLabel}
      >Check me</sgds-checkbox
    >
  `;
};
export const args = {
  name: "check-me",
  value: "check-me"
};

export const parameters = {};
