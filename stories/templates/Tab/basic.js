import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = ({ variant, orientation, density }) => html`
  <sgds-tab-group variant=${ifDefined(variant)} orientation=${ifDefined(orientation)} density=${ifDefined(density)}>
    <sgds-tab slot="nav" panel="home">Home</sgds-tab>
    <sgds-tab slot="nav" panel="profile">Profile</sgds-tab>
    <sgds-tab slot="nav" panel="contact">Contact</sgds-tab>
    <sgds-tab-panel name="home"
      >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
      type specimen book.</sgds-tab-panel
    >
    <sgds-tab-panel name="profile"
      >It is a long established fact that a reader will be distracted by the readable content of a page when looking at
      its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
      opposed to using 'Content here, content here',</sgds-tab-panel
    >
    <sgds-tab-panel name="contact">Contact information</sgds-tab-panel>
  </sgds-tab-group>
`;

export const args = {
  // name: "home",
  // panel: "home"
};

export const parameters = {
  // controls: { exclude: ["name", "panel", "active", "variant"] }
};
