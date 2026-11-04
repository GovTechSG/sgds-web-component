'use client';

import { SgdsSidebar, SgdsSidebarSection, SgdsSidebarGroup, SgdsSidebarItem, SgdsIcon } from '@govtechsg/sgds-web-component/react';

export const Sidebar = () => {
  return (
<div className="sgds:h-screen sgds:flex">
  <SgdsSidebar active="meetings" scrim>
    <div slot="upper">SGDS Sidebar</div>

    <SgdsSidebarSection title="Main" name="main">
      <SgdsSidebarGroup title="Dashboard" name="dashboard" hasIconSlot>
        <SgdsIcon name="house" slot="icon" size="md"></SgdsIcon>
        <SgdsSidebarGroup title="Summary" name="summary" hasIconSlot>
          <SgdsIcon name="building" slot="icon" size="md"></SgdsIcon>
          <SgdsSidebarItem title="Latest Sales" name="latest-sales" hasIconSlot>
            <SgdsIcon name="building" slot="icon" size="md"></SgdsIcon>
            <a href="#"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem title="Refunds" name="refunds" hasIconSlot>
            <SgdsIcon name="building" slot="icon" size="md"></SgdsIcon>
          </SgdsSidebarItem>
        </SgdsSidebarGroup>

        <SgdsSidebarItem title="Meetings" name="meetings" hasIconSlot>
          <SgdsIcon name="calendar" slot="icon" size="md"></SgdsIcon>
          <a href="#"></a>
        </SgdsSidebarItem>
        <SgdsSidebarItem title="Gallery" name="gallery" hasIconSlot>
          <SgdsIcon name="camera" slot="icon" size="md"></SgdsIcon>
          <a href="#"></a>
        </SgdsSidebarItem>
      </SgdsSidebarGroup>

      <SgdsSidebarGroup title="Reports" name="reports" hasIconSlot>
        <SgdsIcon name="file-text" slot="icon" size="md"></SgdsIcon>
        <SgdsIcon name="placeholder" slot="indicator" size="md"></SgdsIcon>

        <SgdsSidebarItem title="Yearly" name="yearly" hasIconSlot>
          <SgdsIcon name="house" slot="icon" size="md"></SgdsIcon>
        </SgdsSidebarItem>
        <SgdsSidebarItem title="Monthly" name="monthly" hasIconSlot>
          <SgdsIcon name="house" slot="icon" size="md"></SgdsIcon>
        </SgdsSidebarItem>
      </SgdsSidebarGroup>

      <SgdsSidebarItem title="Public Members" name="public-members" hasIconSlot>
        <SgdsIcon name="user-circle" slot="icon" size="md"></SgdsIcon>
        <SgdsIcon name="summary" slot="indicator" size="md"></SgdsIcon>
      </SgdsSidebarItem>
    </SgdsSidebarSection>

    {/* Configuration Section (Collapsible) */}
    <SgdsSidebarSection title="Configuration" name="configuration" collapsible separator>
      <SgdsSidebarItem title="Settings" name="settings" hasIconSlot>
        <SgdsIcon name="gear" slot="icon" size="md"></SgdsIcon>
      </SgdsSidebarItem>
    </SgdsSidebarSection>

    <SgdsSidebarSection>
      <SgdsSidebarItem title="Help &amp; Support" name="help-support" hasIconSlot>
        <SgdsIcon name="question-circle" slot="icon" size="md"></SgdsIcon>
        <span slot="indicator" className="sgds:bg-error-default sgds:text-fixed-light sgds:rounded-full sgds:w-5 sgds:h-5 sgds:flex sgds:items-center sgds:justify-center sgds:text-xs sgds:font-semibold">3</span>
      </SgdsSidebarItem>
    </SgdsSidebarSection>

    <SgdsSidebarSection slot="lower">
      <SgdsSidebarItem title="Premium Features" name="premium-features" hasIconSlot>
        <SgdsIcon name="star" slot="icon" size="md"></SgdsIcon>
      </SgdsSidebarItem>
    </SgdsSidebarSection>
  </SgdsSidebar>
</div>
  );
};
