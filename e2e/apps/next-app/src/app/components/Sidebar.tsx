'use client';

import { SgdsSidebar, SgdsSidebarSection, SgdsSidebarGroup, SgdsSidebarItem, SgdsIcon } from '@govtechsg/sgds-web-component/react';

export const Sidebar = () => {
  return (
    <>
      <SgdsSidebar active="meetings" variant="collapsible" ariaLabel="Sidebar navigation">
        <div slot="upper">SGDS Sidebar</div>
        <SgdsSidebarSection title="Main" name="main">
          <SgdsSidebarGroup title="Dashboard" name="dashboard">
            <SgdsIcon name="house" slot="icon" size="md"></SgdsIcon>
            <SgdsSidebarItem title="Meetings" name="meetings">
              <SgdsIcon name="calendar" slot="icon" size="md"></SgdsIcon>
              <a href="#"></a>
            </SgdsSidebarItem>
            <SgdsSidebarItem title="Gallery" name="gallery">
              <SgdsIcon name="camera" slot="icon" size="md"></SgdsIcon>
              <a href="#"></a>
            </SgdsSidebarItem>
          </SgdsSidebarGroup>
          <SgdsSidebarItem title="Settings" name="settings">
            <SgdsIcon name="gear" slot="icon" size="md"></SgdsIcon>
          </SgdsSidebarItem>
        </SgdsSidebarSection>
      </SgdsSidebar>
    </>
  );
};
