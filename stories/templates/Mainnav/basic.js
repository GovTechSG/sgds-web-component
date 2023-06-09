import { html } from "lit-html";

export const Template = ({ expand, brandHref, active, href, disabledMNI, menuIsOpen }) => {
  return html`
    <sgds-mainnav .expand=${expand} .brandHref=${brandHref}>
      <img width="130" src="https://www.designsystem.tech.gov.sg/assets/img/logo-sgds.svg" slot="brand" />
      <sgds-mainnav-item .active=${active} .href=${href} .disabled=${disabledMNI}
        >ArgsTable Controlled
      </sgds-mainnav-item>
      <sgds-mainnav-dropdown togglerText="Dropdown" ?menuIsOpen=${menuIsOpen}>
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

export const args = {};
// export const storyProps = {
//   height: "500px",
// }
