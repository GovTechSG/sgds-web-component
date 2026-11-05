import { SgdsSidebar, SgdsSidebarSection, SgdsSidebarItem, SgdsSidebarGroup, SgdsIcon } from '@govtechsg/sgds-web-component/react';

export const Sidebar = () => {
  return (
    <>
      <SgdsSidebar active="dashboard">
        <SgdsSidebarSection title="Main" name="main">
          <SgdsSidebarItem name="dashboard" title="Dashboard">
            <SgdsIcon slot="icon" name="grid-fill" size="md"></SgdsIcon>
            <a href="#"></a>
          </SgdsSidebarItem>
          <SgdsSidebarGroup name="reports" title="Reports">
            <SgdsIcon slot="icon" name="file-earmark-text" size="md"></SgdsIcon>
            <SgdsSidebarItem name="yearly" title="Yearly">
              <SgdsIcon slot="icon" name="calendar" size="md"></SgdsIcon>
            </SgdsSidebarItem>
          </SgdsSidebarGroup>
        </SgdsSidebarSection>
      </SgdsSidebar>
    </>
  );
};
