'use client';

import { SgdsSidebar, SgdsSidebarSection, SgdsSidebarGroup, SgdsSidebarItem, SgdsIcon } from '@govtechsg/sgds-web-component/react';

export const Sidebar = () => {
  return (
    <SgdsSidebar>
      <SgdsSidebarSection>
        <SgdsSidebarGroup>
          <SgdsSidebarItem>
            <SgdsIcon slot="icon" name="placeholder"></SgdsIcon>
            Dashboard
          </SgdsSidebarItem>
          <SgdsSidebarItem>
            <SgdsIcon slot="icon" name="placeholder"></SgdsIcon>
            Settings
          </SgdsSidebarItem>
        </SgdsSidebarGroup>
      </SgdsSidebarSection>
    </SgdsSidebar>
  );
};
