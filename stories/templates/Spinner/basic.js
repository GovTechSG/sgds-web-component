import { html } from "lit-html";

export const Template = args =>
  html` <sgds-spinner .type=${args.type} .color=${args.color} .spinnerClasses=${args.spinnerClasses}> </sgds-spinner> `;

export const args = {};

export const parameters = {};
