import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args =>
  html`
    <sgds-breadcrumb>
      <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
      <sgds-breadcrumb-item><a href="#">About</a></sgds-breadcrumb-item>
      <sgds-breadcrumb-item active><a href="https://www.google.com/">Contacts</a></sgds-breadcrumb-item>
    </sgds-breadcrumb>
  `;
export const args = {};

export const parameters = {};
