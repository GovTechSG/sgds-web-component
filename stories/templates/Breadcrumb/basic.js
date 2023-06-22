import { html } from "lit-html";

export const Template = args =>
  html`
    <sgds-breadcrumb ariaLabel=${args.ariaLabel}>
      <sgds-breadcrumb-item rel=${args.rel} href=${args.href} target=${args.target}>Home</sgds-breadcrumb-item>
      <sgds-breadcrumb-item href="https://www.google.com">Item 1</sgds-breadcrumb-item>
      <sgds-breadcrumb-item href="https://www.google.com">Item 2</sgds-breadcrumb-item>
      <sgds-breadcrumb-item href="https://www.google.com">Item 3</sgds-breadcrumb-item>
      <sgds-breadcrumb-item>Last Item</sgds-breadcrumb-item>
    </sgds-breadcrumb>
  `;
export const args = {};

export const parameters = {};
