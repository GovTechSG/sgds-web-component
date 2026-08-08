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
      <sgds-icon-button name="menu" slot="start" variant="ghost" tone="fixed-light" size="sm"></sgds-icon-button>
      <img slot="brand" alt="logo" width="130" src="/logo-white.svg" />
      <sgds-mainnav-item slot="end"
        ><a href="#"><sgds-icon name="moon"></sgds-icon></a
      ></sgds-mainnav-item>
      <sgds-mainnav-dropdown slot="end" ariaLabel="User menu">
        <div slot="toggler" class="sgds:flex sgds:flex-row sgds:items-center sgds:gap-3">
          <span class="sgds:h-10 sgds:w-10 sgds:rounded-full sgds:bg-neutral-subtle-default"></span>
          <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
            <span class="sgds:text-body-xs sgds:font-semibold sgds:leading-3-xs sgds:text-fixed-light">User Name</span>
            <span class="sgds:text-body-xs sgds:leading-3-xs sgds:text-fixed-light">Agency (admin)</span>
          </div>
        </div>
        <sgds-dropdown-item ariaLabel="My profile"><span>My profile</span></sgds-dropdown-item>
        <sgds-dropdown-item ariaLabel="Settings"><span>Settings</span></sgds-dropdown-item>
        <sgds-dropdown-item ariaLabel="Log out"><span>Log out</span></sgds-dropdown-item>
      </sgds-mainnav-dropdown>
    </sgds-mainnav>
  `;
};

export const ToneBrand = {
  render: ToneTemplate.bind({}),
  name: "Tone: Brand",
  args: { tone: "brand" },
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
