import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => {
  return html`
    <sgds-button @click=${showDrawer}>Open ${args.placement} Drawer</sgds-button>
    <sgds-drawer
      open=${ifDefined(args.open)}
      label=${ifDefined(args.label)}
      placement=${ifDefined(args.placement)}
      noHeader=${ifDefined(args.noHeader)}
      noAnimation=${ifDefined(args.noAnimation)}
      contained=${ifDefined(args.contained)}
    >
      This is a Drawer
      <sgds-button @click=${closeDrawer} slot="footer" variant="link" class="close-drawer">Close</sgds-button>
      <sgds-button slot="footer" variant="primary" type="submit" form="formA">Submit</sgds-button>
    </sgds-drawer>
  `;
};

export const showDrawer = () => {
  const drawer = document.querySelector("sgds-drawer");
  drawer.show();
};
export const closeDrawer = () => {
  const drawer = document.querySelector("sgds-drawer");
  drawer.hide();
};

export const args = {};

export const parameters = {};
