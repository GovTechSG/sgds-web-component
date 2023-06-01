import { html } from "lit-html";

export const Template = args =>
  html`
    <sgds-button
      variant=${args.variant}
      buttonClasses=${args.buttonClasses}
      size=${args.size}
      ?active=${args.active}
      ?disabled=${args.disabled}
      href=${args.href}
      target=${args.target}
      download=${args.download}
      type=${args.type}
      form=${args.form}
      formAction=${args.formAction}
      formMethod=${args.formMethod}
      ?formNoValidate=${args.formNoValidate}
      formTarget=${args.formTarget}
    >
      ${args.variant}
    </sgds-button>
  `;
export const args = {};
