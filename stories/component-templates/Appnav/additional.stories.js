import { html } from "lit";

export const ToneBrand = {
  render: Template.bind({}),
  name: "Tone: Brand",
  args: { tone: "brand" },
  parameters: { layout: "fullscreen" },
  tags: []
};

export const ToneGradient1 = {
  render: Template.bind({}),
  name: "Tone: Gradient 1",
  args: { tone: "gradient-1" },
  parameters: { layout: "fullscreen" },
  tags: []
};

export const ToneGradient2 = {
  render: Template.bind({}),
  name: "Tone: Gradient 2",
  args: { tone: "gradient-2" },
  parameters: { layout: "fullscreen" },
  tags: []
};

export const ToneGradient3 = {
  render: Template.bind({}),
  name: "Tone: Gradient 3",
  args: { tone: "gradient-3" },
  parameters: { layout: "fullscreen" },
  tags: []
};

export const ToneGradient4 = {
  render: Template.bind({}),
  name: "Tone: Gradient 4",
  args: { tone: "gradient-4" },
  parameters: { layout: "fullscreen" },
  tags: []
};

export const WithProfile = {
  render: ({ tone }) => html`
    <sgds-appnav tone=${tone}>
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
      <sgds-appnav-profile
        slot="profile"
        label="User Name"
        secondaryText="Agency (admin)"
        ariaLabel="Profile menu"
        close="inside"
      >
        <span slot="avatar" class="sgds:h-10 sgds:w-10 sgds:shrink-0 sgds:overflow-hidden sgds:rounded-full">
          <span
            class="sgds:h-full sgds:w-full sgds:block sgds:bg-neutral-surface-muted sgds:rounded-[50%]"
            style="border-radius: 50%;"
          ></span>
        </span>
        <sgds-dropdown-item readonly>
          <div class="sgds:flex sgds:flex-col sgds:gap-4">
            <span class="sgds:text-label-xs sgds:leading-3-xs sgds:tracking-normal sgds:text-subtle">Account</span>
            <div class="sgds:flex sgds:items-center sgds:gap-3 sgds:py-1">
              <span class="sgds:h-12 sgds:w-12 sgds:shrink-0 sgds:rounded-full sgds:bg-neutral-surface-muted"></span>
              <div class="sgds:flex sgds:flex-col sgds:justify-center">
                <span
                  class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-default"
                  >User Name</span
                >
                <span class="sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle"
                  >user@agency.gov.sg</span
                >
              </div>
            </div>
          </div>
        </sgds-dropdown-item>
        <sgds-divider thickness="thin"></sgds-divider>
        <sgds-dropdown-item ariaLabel="My profile"
          ><span class="sgds:block sgds:w-62 sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal"
            >My profile</span
          ></sgds-dropdown-item
        >
        <sgds-dropdown-item ariaLabel="Settings"
          ><span class="sgds:block sgds:w-62 sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal"
            >Settings</span
          ></sgds-dropdown-item
        >
        <sgds-dropdown-item ariaLabel="Log out"
          ><span
            class="sgds:block sgds:w-62 sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal sgds:text-danger-default"
            >Log out</span
          ></sgds-dropdown-item
        >
      </sgds-appnav-profile>
    </sgds-appnav>
  `,
  name: "With Profile",
  args: { tone: "gradient-3" },
  parameters: { layout: "fullscreen" },
  tags: []
};

export const ProfileReadOnly = {
  render: ({ tone }) => html`
    <sgds-appnav tone=${tone}>
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
      <sgds-appnav-profile slot="profile" label="User Name" secondaryText="Agency (admin)" ariaLabel="Profile info">
        <span slot="avatar" class="sgds:h-10 sgds:w-10 sgds:shrink-0 sgds:overflow-hidden sgds:rounded-full">
          <span
            class="sgds:h-full sgds:w-full sgds:block sgds:bg-neutral-surface-muted sgds:rounded-[50%]"
            style="border-radius: 50%;"
          ></span>
        </span>
      </sgds-appnav-profile>
    </sgds-appnav>
  `,
  name: "Profile Read-Only (No Dropdown)",
  args: { tone: "brand" },
  parameters: { layout: "fullscreen" },
  tags: []
};
