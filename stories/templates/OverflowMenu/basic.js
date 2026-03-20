import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { userEvent } from "@storybook/test";

export const Template = args => html`
  <sgds-overflow-menu size=${ifDefined(args.size)}>
    <sgds-dropdown-item>View</sgds-dropdown-item>
    <sgds-dropdown-item>Edit</sgds-dropdown-item>
    <sgds-dropdown-item>Delete</sgds-dropdown-item>
  </sgds-overflow-menu>
`;

export const args = {
  size: "md"
};

export const parameters = {};

export const play = async ({ canvasElement }) => {
  const host = canvasElement.querySelector("sgds-overflow-menu");
  const trigger = host.shadowRoot.querySelector(".overflow-btn");
  await userEvent.click(trigger);
};
