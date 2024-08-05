import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = ({ fluid }) => html` <sgds-masthead fluid=${ifDefined(fluid)}></sgds-masthead> `;

export const args = {};

export const parameters = {};
