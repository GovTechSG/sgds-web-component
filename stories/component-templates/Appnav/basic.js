import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { allModes } from "../../../.storybook/modes";

export const Template = ({ tone, expand, brandHref }) => {
  return html`
    <sgds-appnav tone=${ifDefined(tone)} expand=${ifDefined(expand)} brandHref=${ifDefined(brandHref)}>
      <sgds-icon-button
        name="menu"
        slot="start"
        variant="ghost"
        tone="fixed-light"
        size="sm"
        ariaLabel="Open side menu"
      ></sgds-icon-button>
      <img alt="sgds logo" width="130" src="/logo-white.svg" slot="brand" />
      <sgds-icon-button
        name="moon"
        variant="ghost"
        tone="fixed-light"
        size="sm"
        ariaLabel="Toggle dark mode"
      ></sgds-icon-button>
      <sgds-icon-button
        name="bell"
        variant="ghost"
        tone="fixed-light"
        size="sm"
        ariaLabel="Notifications"
      ></sgds-icon-button>
    </sgds-appnav>
  `;
};

export const args = {};

export const parameters = {
  layout: "fullscreen",
  chromatic: {
    modes: {
      mobile: allModes["sm"],
      desktop: allModes["lg"]
    }
  }
};

export const play = undefined;
