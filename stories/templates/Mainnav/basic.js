import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = ({ expand, brandHref, active, href, disabled, menuIsOpen, close, target }) => {
  return html`
    <sgds-mainnav expand=${ifDefined(expand)} brandHref=${ifDefined(brandHref)}>
      <img
        alt="sgds logo"
        width="130"
        src="https://www.designsystem.tech.gov.sg/assets/img/logo-sgds.svg"
        slot="brand"
      />
      <sgds-mainnav-item ?active=${active} ?disabled=${disabled}>
        <a href="#">ArgsTable Controlled</a>
      </sgds-mainnav-item>
      <sgds-mainnav-item>
        <a href="#">About</a>
      </sgds-mainnav-item>
      <sgds-mainnav-dropdown ?active=${active} ?menuIsOpen=${menuIsOpen} close=${ifDefined(close)}>
        <span slot="toggler">Dropdown</span>
        <sgds-dropdown-item><a href="https://google.com">Item 1</a></sgds-dropdown-item>
        <sgds-dropdown-item><a href="#">Item 2</a></sgds-dropdown-item>
        <sgds-dropdown-item><a href="#">Item 3</a></sgds-dropdown-item>
      </sgds-mainnav-dropdown>
      <sgds-mainnav-item slot="end">
        <a href="#">Contact Us</a>
      </sgds-mainnav-item>
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

export const args = {};

export const parameters = {};
