import { html } from "lit-html";

export const Template = args => {
  return html`
    <sgds-button @click=${showDrawer}>Open ${args.placement} Drawer</sgds-button>
    <sgds-drawer
      ?open=${args.open}
      label=${args.label}
      placement=${args.placement}
      ?noHeader=${args.noHeader}
      ?noAnimation=${args.noAnimation}
      ?contained=${args.contained}
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
