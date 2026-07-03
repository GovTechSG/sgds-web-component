import { html } from "lit";

const SidenavItemAsLinkTemplate = args =>
  html` <sgds-sidenav-item ariaLabel="Item as a link"><a href="#">Item as a link</a></sgds-sidenav-item> `;

const SidenavItemAsMenuTemplate = args =>
  html`
    <sgds-sidenav-item ariaLabel="SidenavItem as menu">
      <span slot="title"> SidenavItem as menu </span>
      <sgds-sidenav-link>
        <a href="#"> SidenavLink 1</a>
      </sgds-sidenav-link>
      <sgds-sidenav-link>
        <a href="#">SidenavLink 2</a>
      </sgds-sidenav-link>
    </sgds-sidenav-item>
  `;
const EmbeddedMenuTemplate = args =>
  html`
    <sgds-sidenav>
      <sgds-sidenav-item ariaLabel="SidenavItem L1">
        <span slot="title"> SidenavItem L1</span>
        <sgds-sidenav-link>
          <a href="#"> SidenavLink 1 L2</a>
        </sgds-sidenav-link>
        <sgds-sidenav-link>
          <a href="#">SidenavLink 2 L2</a>
        </sgds-sidenav-link>
        <sgds-sidenav-item ariaLabel="SidenavItem L2">
          <span slot="title"> SidenavItem L2 </span>
          <sgds-sidenav-link>
            <a href="#"> SidenavLink 1 L3</a>
          </sgds-sidenav-link>
          <sgds-sidenav-link active>
            <a href="#">SidenavLink 2 L3</a>
          </sgds-sidenav-link>
        </sgds-sidenav-item>
      </sgds-sidenav-item>
    </sgds-sidenav>
  `;
const IconTemplate = args =>
  html`
    <sgds-sidenav>
      <sgds-sidenav-item ariaLabel="SidenavItem L1">
        <span slot="title"> SidenavItem L1</span>
        <sgds-icon slot="icon" name="placeholder"></sgds-icon>
        <sgds-sidenav-link>
          <a href="#"> SidenavLink 1 L2</a>
        </sgds-sidenav-link>
        <sgds-sidenav-link>
          <a href="#">SidenavLink 2 L2</a>
        </sgds-sidenav-link>
      </sgds-sidenav-item>
      <sgds-sidenav-item ariaLabel="SidenavItem L1 (link)">
        <a href="#"> <sgds-icon name="placeholder"></sgds-icon> SidenavItem L1 (link)</a>
      </sgds-sidenav-item>
    </sgds-sidenav>
  `;
const DisabledTemplate = args =>
  html`
    <sgds-sidenav>
      <sgds-sidenav-item ariaLabel="SidenavItem L1" disabled>
        <span slot="title"> SidenavItem L1</span>
        <sgds-icon slot="icon" name="placeholder"></sgds-icon>
        <sgds-sidenav-link>
          <a href="#"> SidenavLink 1 L2</a>
        </sgds-sidenav-link>
        <sgds-sidenav-link>
          <a href="#">SidenavLink 2 L2</a>
        </sgds-sidenav-link>
      </sgds-sidenav-item>
      <sgds-sidenav-item ariaLabel="SidenavItem L1 (link)" disabled>
        <a href="#"> <sgds-icon name="placeholder"></sgds-icon> SidenavItem L1 (link)</a>
      </sgds-sidenav-item>
    </sgds-sidenav>
  `;
const DisabledLinkTemplate = args =>
  html`
    <sgds-sidenav>
      <sgds-sidenav-item ariaLabel="SidenavItem L1">
        <span slot="title"> SidenavItem L1</span>
        <sgds-icon slot="icon" name="placeholder"></sgds-icon>
        <sgds-sidenav-link disabled>
          <a href="#"> SidenavLink 1 L2</a>
        </sgds-sidenav-link>
        <sgds-sidenav-link>
          <a href="#">SidenavLink 2 L2</a>
        </sgds-sidenav-link>
      </sgds-sidenav-item>
    </sgds-sidenav>
  `;

export const SidenavItemAsLink = {
  render: SidenavItemAsLinkTemplate.bind({}),
  name: "SidenavItem as first level link",
  args: {},
  parameters: {}
};

export const SidenavItemAsMenu = {
  render: SidenavItemAsMenuTemplate.bind({}),
  name: "SidenavItem as menu",
  args: {},
  parameters: {}
};

export const EmbeddedMenu = {
  render: EmbeddedMenuTemplate.bind({}),
  name: "SidenavItem as an embedded menu",
  args: {},
  parameters: {}
};

export const IconsOnFirstLevel = {
  render: IconTemplate.bind({}),
  name: "Icons",
  args: {},
  parameters: {}
};
export const ActiveLinkState = {
  render: Template.bind({}),
  name: "Active sidenav link",
  args: { ...args, activeSNL: true },
  parameters: {}
};
export const ActiveaSidenavItemAsLinkState = {
  render: Template.bind({}),
  name: "Active sidenav item as a link",
  args: { ...args, activeSNIAsLink: true },
  parameters: {}
};
export const ActiveaSidenavItemAsMenu = {
  render: Template.bind({}),
  name: "Active sidenav item as a menu",
  args: { ...args, active: true },
  parameters: {}
};
export const DisabledItem = {
  render: DisabledTemplate.bind({}),
  name: "Disabled sidenav item",
  args: { ...args, active: true },
  parameters: {}
};
export const DisabledLink = {
  render: DisabledLinkTemplate.bind({}),
  name: "Disabled sidenav link",
  args: { ...args, active: true },
  parameters: {}
};
