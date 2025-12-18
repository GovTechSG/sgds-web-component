import { html } from "lit-html";
import { allModes } from "../../../.storybook/modes";

export const Template = ({ fluid }) => html` <sgds-masthead ?fluid=${fluid}></sgds-masthead> `;

export const args = {};

export const parameters = {
  layout: "fullscreen",
   chromatic: {
      modes: {
        mobile: allModes["sm"],
        desktop: allModes["lg"],
      },
    },
};
