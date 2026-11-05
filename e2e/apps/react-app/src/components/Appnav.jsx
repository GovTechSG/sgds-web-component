import { SgdsAppnav, SgdsAppnavProfile, SgdsIconButton, SgdsDropdownItem, SgdsDivider } from '@govtechsg/sgds-web-component/react';

export const Appnav = () => {
  return (
    <>
      <SgdsAppnav tone="gradient-3">
        <SgdsIconButton
          name="menu"
          slot="start"
          variant="ghost"
          tone="fixed-light"
          size="sm"
          ariaLabel="Open side menu"
        ></SgdsIconButton>
        <a slot="brand" href="/"><strong style={{color: "white"}}>My App</strong></a>
        <SgdsIconButton
          name="moon"
          variant="ghost"
          tone="fixed-light"
          size="sm"
          ariaLabel="Toggle dark mode"
        ></SgdsIconButton>
        <SgdsIconButton
          name="bell"
          variant="ghost"
          tone="fixed-light"
          size="sm"
          ariaLabel="Notifications"
        ></SgdsIconButton>
        <SgdsAppnavProfile slot="profile" label="User Name" secondaryText="Agency (admin)" ariaLabel="Profile menu">
          <span slot="avatar" className="sgds:h-10 sgds:w-10 sgds:shrink-0 sgds:overflow-hidden sgds:rounded-full">
            <span className="sgds:h-full sgds:w-full sgds:block sgds:bg-neutral-surface-muted sgds:rounded-full"></span>
          </span>
          <SgdsDropdownItem ariaLabel="My profile"><span>My profile</span></SgdsDropdownItem>
          <SgdsDropdownItem ariaLabel="Settings"><span>Settings</span></SgdsDropdownItem>
          <SgdsDivider thickness="thin"></SgdsDivider>
          <SgdsDropdownItem ariaLabel="Log out"><span className="sgds:text-danger-default">Log out</span></SgdsDropdownItem>
        </SgdsAppnavProfile>
      </SgdsAppnav>
    </>
  );
};
