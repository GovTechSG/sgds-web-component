'use client';

import SgdsMainnav from "@govtechsg/sgds-web-component/react/mainnav/index.js";
import SgdsMainnavProfile from "@govtechsg/sgds-web-component/react/mainnav-profile/index.js";
import SgdsDropdownItem from "@govtechsg/sgds-web-component/react/dropdown-item/index.js";
import SgdsDivider from "@govtechsg/sgds-web-component/react/divider/index.js";
import SgdsIconButton from "@govtechsg/sgds-web-component/react/icon-button/index.js";

const avatarStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: 'var(--sgds-surface-raised)',
  display: 'block',
};

export const Mainnav = () => {
  return (
    <SgdsMainnav fluid tone="gradient-1">
      <SgdsIconButton name="menu" slot="start" variant="ghost" tone="fixed-light" size="sm" />
      <div slot="brand">Logo</div>
      <SgdsIconButton slot="non-collapsible" name="moon" variant="ghost" tone="fixed-light" size="sm" />
      <SgdsMainnavProfile slot="profile" label="User Name" secondaryText="Agency (admin)" ariaLabel="Profile menu" close="outside">
        <span slot="avatar" style={avatarStyle}></span>
        <SgdsDropdownItem readonly>
          <div className="sgds:flex sgds:flex-col sgds:gap-4">
            <span className="sgds:text-label-xs sgds:leading-3-xs sgds:tracking-normal sgds:text-subtle">Account</span>
            <div className="sgds:flex sgds:items-center sgds:gap-3 sgds:py-1">
              <span className="sgds:h-12 sgds:w-12 sgds:shrink-0 sgds:overflow-hidden sgds:rounded-full">
                <span className="sgds:h-full sgds:w-full sgds:block sgds:bg-surface-raised sgds:rounded-[50%]" style={{ borderRadius: '50%' }}></span>
              </span>
              <div className="sgds:flex sgds:flex-col sgds:justify-center">
                <span className="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-default">User Name</span>
                <span className="sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle">user@agency.gov.sg</span>
              </div>
            </div>
          </div>
        </SgdsDropdownItem>
        <SgdsDivider thickness="thin" />
        <div className="sgds:px-4 sgds:pb-1 sgds:pt-4">
          <span className="sgds:text-label-xs sgds:leading-3-xs sgds:tracking-normal sgds:text-subtle">View</span>
        </div>
        <SgdsDropdownItem ariaLabel="Agency view selected">
          <span className="sgds:flex sgds:w-62 sgds:items-center sgds:justify-between sgds:gap-3 sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal sgds:text-default"><span>Agency</span></span>
        </SgdsDropdownItem>
        <SgdsDropdownItem ariaLabel="Switch to product view">
          <span className="sgds:flex sgds:w-62 sgds:items-center sgds:justify-between sgds:gap-3 sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal sgds:text-default"><span>Product</span></span>
        </SgdsDropdownItem>
        <SgdsDivider thickness="thin" />
        <SgdsDropdownItem ariaLabel="My profile">
          <span className="sgds:block sgds:w-62 sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal">My profile</span>
        </SgdsDropdownItem>
        <SgdsDropdownItem ariaLabel="Settings">
          <span className="sgds:block sgds:w-62 sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal">Settings</span>
        </SgdsDropdownItem>
        <SgdsDropdownItem ariaLabel="Log out">
          <span className="sgds:block sgds:w-62 sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal sgds:text-danger-default">Log out</span>
        </SgdsDropdownItem>
      </SgdsMainnavProfile>
    </SgdsMainnav>
  );
};
