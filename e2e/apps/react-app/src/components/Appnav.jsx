import { SgdsAppnav, SgdsAppnavProfile, SgdsIconButton, SgdsDropdownItem } from '@govtechsg/sgds-web-component/react';

export const Appnav = () => {
  return (
    <>
      <SgdsAppnav tone="gradient-3">
        <SgdsIconButton name="menu" slot="start" variant="ghost" tone="fixed-light" size="sm" ariaLabel="Open side menu"></SgdsIconButton>
        <a slot="brand" href="/"><strong style={{color: "white"}}>My App</strong></a>
        <SgdsIconButton name="bell" variant="ghost" tone="fixed-light" size="sm" ariaLabel="Notifications"></SgdsIconButton>
        <SgdsAppnavProfile slot="profile" label="User Name" secondaryText="Agency" ariaLabel="Profile menu">
          <SgdsDropdownItem ariaLabel="My profile"><span>My profile</span></SgdsDropdownItem>
          <SgdsDropdownItem ariaLabel="Log out"><span>Log out</span></SgdsDropdownItem>
        </SgdsAppnavProfile>
      </SgdsAppnav>
    </>
  );
};
