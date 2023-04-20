import { html } from 'lit-html';

export const Template = args =>
  html`
    <sgds-button
      .variant=${args.variant}
      .buttonClasses=${args.buttonClasses}
      .size=${args.size}
      .active=${args.active}
      .disabled=${args.disabled}
      .href=${args.href}
      .target=${args.target}
      .download=${args.download}
    >
      ${args.variant}
    </sgds-button>
  `;
export const args = {};
