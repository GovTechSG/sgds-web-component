import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = ({ expand, brandHref, active, href, disabled, menuIsOpen, togglerText, close, target }) => {
  return html`
    <sgds-mainnav expand=${ifDefined(expand)} brandHref=${ifDefined(brandHref)}>
      <img alt="sgds logo" width="130" src="https://www.designsystem.tech.gov.sg/assets/img/logo-sgds.svg" slot="brand" />
      <sgds-mainnav-item ?active=${active} href=${ifDefined(href)} ?disabled=${disabled} target=${ifDefined(target)}
        >ArgsTable Controlled
      </sgds-mainnav-item>
      <sgds-mainnav-dropdown
        ?active=${active}
        togglerText=${ifDefined(togglerText)}
        ?menuIsOpen=${menuIsOpen}
        close=${ifDefined(close)}
      >
        <sgds-dropdown-item href="https://google.com">Item 1</sgds-dropdown-item>
        <sgds-dropdown-item href="#">Item 2</sgds-dropdown-item>
        <sgds-dropdown-item href="#">Item 3</sgds-dropdown-item>
      </sgds-mainnav-dropdown>
      <sgds-mainnav-item href="#">About</sgds-mainnav-item>
      <sgds-mainnav-item href="#" slot="end">Contact Us</sgds-mainnav-item>
      <sgds-button slot="end">Login</sgds-button>
      <dev-console-widget
        slot="non-collapsible"
        iconColor="black"
        iconWidth="28px"
        iconHeight="28px"
      ></dev-console-widget>
    </sgds-mainnav>
  `;
};

export const args = {
  togglerText: "Dropdown"
};

export const parameters = {};
