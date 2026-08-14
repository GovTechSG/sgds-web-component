import { html } from "lit";

export const Fluid = {
  render: Template.bind({}),
  name: "Fluid",
  args: { fluid: true },
  parameters,
  tags: []
};

const ToneTemplate = ({ tone }) => {
  return html`
    <sgds-mainnav tone=${tone} fluid>
      <img slot="brand" alt="logo" width="130" src="/logo-white.svg" />
      <sgds-icon-button
        slot="non-collapsible"
        name="moon"
        variant="ghost"
        tone="fixed-light"
        size="sm"
      ></sgds-icon-button>
    </sgds-mainnav>
  `;
};

const ToneBrandTemplate = () => {
  return html`
    <sgds-mainnav tone="brand" fluid>
      <img slot="brand" alt="logo" width="130" src="/logo-white.svg" />
      <sgds-mainnav-item active><a href="#">Home</a></sgds-mainnav-item>
      <sgds-mainnav-item><a href="#">About</a></sgds-mainnav-item>
      <sgds-mainnav-item><a href="#">Services</a></sgds-mainnav-item>
      <sgds-icon-button
        slot="non-collapsible"
        name="moon"
        variant="ghost"
        tone="fixed-light"
        size="sm"
      ></sgds-icon-button>
    </sgds-mainnav>
  `;
};

export const ToneBrand = {
  render: ToneBrandTemplate.bind({}),
  name: "Tone: Brand",
  args: {},
  parameters: { layout: "fullscreen" },
  tags: []
};

export const ToneGradient1 = {
  render: ToneTemplate.bind({}),
  name: "Tone: Gradient 1",
  args: { tone: "gradient-1" },
  parameters: { layout: "fullscreen" },
  tags: []
};

export const ToneGradient2 = {
  render: ToneTemplate.bind({}),
  name: "Tone: Gradient 2",
  args: { tone: "gradient-2" },
  parameters: { layout: "fullscreen" },
  tags: []
};

export const ToneGradient3 = {
  render: ToneTemplate.bind({}),
  name: "Tone: Gradient 3",
  args: { tone: "gradient-3" },
  parameters: { layout: "fullscreen" },
  tags: []
};

export const ToneGradient4 = {
  render: ToneTemplate.bind({}),
  name: "Tone: Gradient 4",
  args: { tone: "gradient-4" },
  parameters: { layout: "fullscreen" },
  tags: []
};

export const StartSlot = {
  render: () => html`
    <sgds-mainnav fluid togglerIconName="three-dots-vertical">
      <sgds-icon-button name="menu" slot="start" variant="ghost" size="sm"></sgds-icon-button>
      <img alt="sgds logo" width="130" src="/logo.svg" slot="brand" />
      <sgds-mainnav-item active>
        <a href="#">Home</a>
      </sgds-mainnav-item>
      <sgds-mainnav-item>
        <a href="#">About</a>
      </sgds-mainnav-item>
      <sgds-icon-button slot="non-collapsible" name="moon" variant="ghost" size="sm"></sgds-icon-button>
    </sgds-mainnav>
  `,
  name: "Start Slot",
  parameters: { layout: "fullscreen" },
  tags: []
};

export const ProfileSlot = {
  render: () => html`
    <sgds-mainnav>
      <img alt="sgds logo" width="130" src="/logo.svg" slot="brand" />
      <sgds-mainnav-item active>
        <a href="#">Home</a>
      </sgds-mainnav-item>
      <sgds-mainnav-item>
        <a href="#">About</a>
      </sgds-mainnav-item>
      <sgds-mainnav-dropdown ariaLabel="Dropdown menu">
        <span slot="toggler">Services</span>
        <sgds-dropdown-item ariaLabel="Item 1"><a href="#">Service 1</a></sgds-dropdown-item>
        <sgds-dropdown-item ariaLabel="Item 2"><a href="#">Service 2</a></sgds-dropdown-item>
      </sgds-mainnav-dropdown>
      <sgds-icon-button slot="non-collapsible" name="moon" variant="ghost" size="sm"></sgds-icon-button>
      <sgds-mainnav-profile slot="profile" ariaLabel="Profile menu" close="outside">
        <div slot="toggler" class="sgds:flex sgds:flex-row sgds:items-center sgds:gap-3">
          <span class="sgds:h-10 sgds:w-10 sgds:rounded-full sgds:bg-neutral-subtle-default"></span>
          <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
            <span class="sgds:text-body-xs sgds:font-semibold sgds:leading-3-xs">User Name</span>
            <span class="sgds:text-body-xs sgds:leading-3-xs">Agency (admin)</span>
          </div>
        </div>
        <span slot="avatar" class="sgds:h-10 sgds:w-10 sgds:rounded-full sgds:bg-neutral-subtle-default sgds:block"></span>
        <sgds-dropdown-item readonly>
          <div class="sgds:flex sgds:flex-col sgds:gap-4">
            <span class="sgds:text-label-xs sgds:leading-3-xs sgds:tracking-normal sgds:text-subtle">Account</span>
            <div class="sgds:flex sgds:items-center sgds:gap-3 sgds:py-1">
              <span class="sgds:h-12 sgds:w-12 sgds:shrink-0 sgds:rounded-full sgds:bg-neutral-subtle-default"></span>
              <div class="sgds:flex sgds:flex-col sgds:justify-center">
                <span class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-default">User Name</span>
                <span class="sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle">user@agency.gov.sg</span>
              </div>
            </div>
          </div>
        </sgds-dropdown-item>
        <sgds-divider thickness="thin"></sgds-divider>
        <div class="sgds:px-4 sgds:pb-1 sgds:pt-4">
          <span class="sgds:text-label-xs sgds:leading-3-xs sgds:tracking-normal sgds:text-subtle">View</span>
        </div>
        <sgds-dropdown-item ariaLabel="Agency"><span class="sgds:block sgds:w-62 sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal">Agency</span></sgds-dropdown-item>
        <sgds-dropdown-item ariaLabel="Product"><span class="sgds:block sgds:w-62 sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal">Product</span></sgds-dropdown-item>
        <sgds-divider thickness="thin"></sgds-divider>
        <sgds-dropdown-item ariaLabel="My profile"><span class="sgds:block sgds:w-62 sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal">My profile</span></sgds-dropdown-item>
        <sgds-dropdown-item ariaLabel="Settings"><span class="sgds:block sgds:w-62 sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal">Settings</span></sgds-dropdown-item>
        <sgds-dropdown-item ariaLabel="Log out"><span class="sgds:block sgds:w-62 sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal sgds:text-danger-default">Log out</span></sgds-dropdown-item>
      </sgds-mainnav-profile>
    </sgds-mainnav>
  `,
  name: "Profile Slot",
  parameters: { layout: "fullscreen" },
  tags: []
};

export const ProfileSlotBrand = {
  render: () => html`
    <sgds-mainnav tone="brand" fluid>
      <img slot="brand" alt="logo" width="130" src="/logo-white.svg" />
      <sgds-mainnav-item active><a href="#">Home</a></sgds-mainnav-item>
      <sgds-mainnav-item><a href="#">About</a></sgds-mainnav-item>
      <sgds-icon-button slot="non-collapsible" name="moon" variant="ghost" tone="fixed-light" size="sm"></sgds-icon-button>
      <sgds-mainnav-profile slot="profile" ariaLabel="Profile menu" close="outside">
        <div slot="toggler" class="sgds:flex sgds:flex-row sgds:items-center sgds:gap-3">
          <span class="sgds:h-10 sgds:w-10 sgds:rounded-full sgds:bg-neutral-subtle-default"></span>
          <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
            <span class="sgds:text-body-xs sgds:font-semibold sgds:leading-3-xs">User Name</span>
            <span class="sgds:text-body-xs sgds:leading-3-xs">Agency (admin)</span>
          </div>
        </div>
        <span slot="avatar" class="sgds:h-10 sgds:w-10 sgds:rounded-full sgds:bg-neutral-subtle-default sgds:block"></span>
        <sgds-dropdown-item readonly>
          <div class="sgds:flex sgds:flex-col sgds:gap-4">
            <span class="sgds:text-label-xs sgds:leading-3-xs sgds:tracking-normal sgds:text-subtle">Account</span>
            <div class="sgds:flex sgds:items-center sgds:gap-3 sgds:py-1">
              <span class="sgds:h-12 sgds:w-12 sgds:shrink-0 sgds:rounded-full sgds:bg-neutral-subtle-default"></span>
              <div class="sgds:flex sgds:flex-col sgds:justify-center">
                <span class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-default">User Name</span>
                <span class="sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle">user@agency.gov.sg</span>
              </div>
            </div>
          </div>
        </sgds-dropdown-item>
        <sgds-divider thickness="thin"></sgds-divider>
        <div class="sgds:px-4 sgds:pb-1 sgds:pt-4">
          <span class="sgds:text-label-xs sgds:leading-3-xs sgds:tracking-normal sgds:text-subtle">View</span>
        </div>
        <sgds-dropdown-item ariaLabel="Agency"><span class="sgds:block sgds:w-62 sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal">Agency</span></sgds-dropdown-item>
        <sgds-dropdown-item ariaLabel="Product"><span class="sgds:block sgds:w-62 sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal">Product</span></sgds-dropdown-item>
        <sgds-divider thickness="thin"></sgds-divider>
        <sgds-dropdown-item ariaLabel="My profile"><span class="sgds:block sgds:w-62 sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal">My profile</span></sgds-dropdown-item>
        <sgds-dropdown-item ariaLabel="Settings"><span class="sgds:block sgds:w-62 sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal">Settings</span></sgds-dropdown-item>
        <sgds-dropdown-item ariaLabel="Log out"><span class="sgds:block sgds:w-62 sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal sgds:text-danger-default">Log out</span></sgds-dropdown-item>
      </sgds-mainnav-profile>
    </sgds-mainnav>
  `,
  name: "Profile Slot (Brand)",
  parameters: { layout: "fullscreen" },
  tags: []
};

export const TogglerIconName = {
  render: Template.bind({}),
  name: "Custom Toggler Icon",
  args: { togglerIconName: "three-dots-vertical" },
  parameters,
  tags: []
};
