import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args =>
  html`
    <sgds-breadcrumb ariaLabel=${ifDefined(args.ariaLabel)}>
      <sgds-breadcrumb-item rel=${ifDefined(args.rel)} href=${ifDefined(args.href)} target=${ifDefined(args.target)}>Home</sgds-breadcrumb-item>
      <sgds-breadcrumb-item href="https://www.google.com">Item 1</sgds-breadcrumb-item>
      <sgds-breadcrumb-item href="https://www.google.com">Item 2</sgds-breadcrumb-item>
      <sgds-breadcrumb-item href="https://www.google.com">Item 3</sgds-breadcrumb-item>
      <sgds-breadcrumb-item>Last Item</sgds-breadcrumb-item>
    </sgds-breadcrumb>
  `;
export const args = {};

export const parameters = {};
