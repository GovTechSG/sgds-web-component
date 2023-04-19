import { html } from "lit-html";

export const Template = (args) => {
  return html`
    <sgds-checkbox
      .name=${args.name}
      ?disabled=${args.disabled}
      value=${args.value}
      ?required=${args.required}
      .checked=${args.checked}
      .invalid=${args.invalid}
      .valid=${args.valid}
      .checkboxId=${args.checkboxId}
      >${args.defaultSlot}<span slot="feedback">${args.feedbackSlot}<span></sgds-checkbox
    >
  `;
};
