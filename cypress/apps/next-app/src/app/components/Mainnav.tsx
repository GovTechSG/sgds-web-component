'use client';

import { SgdsMainnav, SgdsMainnavItem, SgdsMainnavDropdown, SgdsDropdownItem, SgdsButton, SgdsMainnavProfile, SgdsDivider } from '@govtechsg/sgds-web-component/react';

export const Mainnav = () => {
  return (
    <SgdsMainnav>
      <SgdsMainnavItem>
        <a href="#">ArgsTable Controlled</a>
      </SgdsMainnavItem>
      <SgdsMainnavDropdown close="default">
        <span slot="toggler">Dropdown</span>
        <SgdsDropdownItem disabled>
          <a href="https://google.com">Item 1</a>
        </SgdsDropdownItem>
        <SgdsDropdownItem>
          <a href="#">Item 2</a>
        </SgdsDropdownItem>
        <SgdsDropdownItem>
          <a href="#">Item 3</a>
        </SgdsDropdownItem>
      </SgdsMainnavDropdown>
      <SgdsMainnavItem>
        <a href="#">About</a>
      </SgdsMainnavItem>
      <SgdsMainnavItem slot="end">
        <a href="#">Contact Us</a>
      </SgdsMainnavItem>
      <SgdsButton slot="end">Login</SgdsButton>
      <SgdsMainnavProfile slot="profile" label="User Name" secondaryText="Agency (admin)" ariaLabel="Profile menu" close="outside">
        <span slot="avatar" className="sgds:h-10 sgds:w-10 sgds:shrink-0 sgds:overflow-hidden sgds:rounded-full">
          <span className="sgds:h-full sgds:w-full sgds:block sgds:bg-neutral-surface-muted sgds:rounded-[50%]"></span>
        </span>
        <SgdsDropdownItem readonly>
          <div className="sgds:flex sgds:flex-col sgds:gap-4">
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
      </SgdsMainnavProfile>
    </SgdsMainnav>
  );
};
