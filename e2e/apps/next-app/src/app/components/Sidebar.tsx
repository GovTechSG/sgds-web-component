'use client';

import { SgdsSidebar, SgdsSidebarGroup, SgdsSidebarItem, SgdsIcon, SgdsSidebarSection } from '@govtechsg/sgds-web-component/react';

export const Sidebar = () => {
  return (
    <>
      <SgdsSidebar variant="collapsible" ariaLabel="Sidebar navigation">
        <SgdsSidebarGroup>
          SidebarGroup content
        </SgdsSidebarGroup>
        <SgdsSidebarItem>
          <SgdsIcon slot="icon" name="placeholder" size="md"></SgdsIcon>
          SidebarItem content
        </SgdsSidebarItem>
        <SgdsSidebarSection></SgdsSidebarSection>
      </SgdsSidebar>
    </>
  );
};
