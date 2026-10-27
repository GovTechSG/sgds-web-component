import { html, nothing } from "lit";

export const Template = args => html`
  <sgds-otp-input
    variant=${args.variant}
    .length=${args.length}
    prefix=${args.prefix}
    .value=${args.value}
    ?required=${args.required}
    ?invalid=${args.invalid}
    invalidFeedback=${args.invalidFeedback}
    >${args.hideLabel ? nothing : html`<span slot="label">Verification code</span>`}</sgds-otp-input
  >
`;

export const args = {
  variant: "numbers-only",
  length: 6,
  prefix: "KRM-",
  value: "",
  required: false,
  invalid: false,
  invalidFeedback: ""
};
export const parameters = {};
export const play = undefined;
