import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args =>
  html`<sgds-close-button
    ariaLabel=${ifDefined(args.ariaLabel)}
    ?disabled=${args.disabled}
  ></sgds-close-button>`;

export const args = {};

export const parameters = {};
