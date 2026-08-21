import { html } from "lit";

export const Fluid = {
  render: Template.bind({}),
  name: "Fluid",
  args: { fluid: true },
  parameters,
  tags: []
};

export const ProfileReadOnly = {
  render: () => html`
    <sgds-mainnav fluid>
      <img alt="sgds logo" width="130" src="/logo.svg" slot="brand" />
      <sgds-mainnav-item active>
        <a href="#">Home</a>
      </sgds-mainnav-item>
      <sgds-mainnav-item>
        <a href="#">About</a>
      </sgds-mainnav-item>
      <sgds-icon-button
        slot="non-collapsible"
        name="moon"
        variant="ghost"
        size="sm"
        ariaLabel="Toggle dark mode"
      ></sgds-icon-button>
      <sgds-mainnav-profile slot="profile" label="User Name" secondaryText="Agency (admin)" ariaLabel="Profile info">
        <span slot="avatar" class="sgds:h-10 sgds:w-10 sgds:shrink-0 sgds:overflow-hidden sgds:rounded-full">
          <span
            class="sgds:h-full sgds:w-full sgds:block sgds:bg-neutral-surface-muted sgds:rounded-[50%]"
            style="border-radius: 50%;"
          ></span>
        </span>
      </sgds-mainnav-profile>
    </sgds-mainnav>
  `,
  name: "Profile Read-Only (No Dropdown)",
  parameters: { layout: "fullscreen" },
  tags: []
};

export const ProfileSlot = {
  render: () => html`
    <sgds-mainnav fluid>
      <img alt="sgds logo" width="130" src="/logo.svg" slot="brand" />
      <sgds-mainnav-item active>
        <a href="#">Home</a>
      </sgds-mainnav-item>
      <sgds-mainnav-item>
        <a href="#">About</a>
      </sgds-mainnav-item>
      <sgds-icon-button
        slot="non-collapsible"
        name="moon"
        variant="ghost"
        size="sm"
        ariaLabel="Toggle dark mode"
      ></sgds-icon-button>
      <sgds-mainnav-profile
        slot="profile"
        label="User Name"
        secondaryText="Agency (admin)"
        ariaLabel="Profile menu"
        close="outside"
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
      </sgds-mainnav-profile>
    </sgds-mainnav>
  `,
  name: "Profile Slot",
  parameters: { layout: "fullscreen" },
  tags: []
};
