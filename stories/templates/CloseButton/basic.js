// Basic usage story for sgds-close-button
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => {
  return html`
    <sgds-close-button
      size=${ifDefined(args.size)}
      tone=${ifDefined(args.tone)}
      ?disabled=${args.disabled}
    ></sgds-close-button>
  `;
};

export const args = {};

export const parameters = {};
