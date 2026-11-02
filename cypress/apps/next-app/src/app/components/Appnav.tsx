'use client';

import { SgdsAppnav, SgdsAppnavProfile, SgdsIconButton, SgdsDropdownItem, SgdsDivider } from '@govtechsg/sgds-web-component/react';

export const Appnav = () => {
  return (
    <SgdsAppnav tone="gradient-3">
  <SgdsIconButton name="menu" slot="start" variant="ghost" tone="fixed-light" size="sm" ariaLabel="Open side menu"></SgdsIconButton>
  <a slot="brand" href="/"><img alt="sgds logo" width="130" src="/logo-white.svg"/></a>
  <SgdsIconButton name="moon" variant="ghost" tone="fixed-light" size="sm" ariaLabel="Toggle dark mode"></SgdsIconButton>
  <SgdsAppnavProfile slot="profile" label="User Name" secondaryText="Agency (admin)" ariaLabel="Profile menu">
    <span slot="avatar" className="sgds:h-10 sgds:w-10 sgds:shrink-0 sgds:overflow-hidden sgds:rounded-full">
      <span className="sgds:h-full sgds:w-full sgds:block sgds:bg-neutral-surface-muted sgds:rounded-[50%]"></span>
    </span>
    <SgdsDropdownItem readonly>
      <div className="sgds:flex sgds:flex-col sgds:gap-2">
        <span className="sgds:text-label-xs sgds:leading-3-xs sgds:tracking-normal sgds:text-subtle">Account</span>
        <div className="sgds:flex sgds:items-center sgds:gap-3 sgds:py-1">
          <span className="sgds:h-12 sgds:w-12 sgds:shrink-0 sgds:rounded-full sgds:bg-neutral-surface-muted"></span>
          <div className="sgds:flex sgds:flex-col sgds:justify-center">
            <span className="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-default">User Name</span>
            <span className="sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle">user@agency.gov.sg</span>
          </div>
        </div>
      </div>
    </SgdsDropdownItem>
    <SgdsDivider thickness="thin"></SgdsDivider>
    <SgdsDropdownItem ariaLabel="My profile"><span className="sgds:block sgds:w-62 sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal">My profile</span></SgdsDropdownItem>
    <SgdsDropdownItem ariaLabel="Settings"><span className="sgds:block sgds:w-62 sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal">Settings</span></SgdsDropdownItem>
    <SgdsDropdownItem ariaLabel="Log out"><span className="sgds:block sgds:w-62 sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal sgds:text-danger-default">Log out</span></SgdsDropdownItem>
  </SgdsAppnavProfile>
</SgdsAppnav>
  );
};
