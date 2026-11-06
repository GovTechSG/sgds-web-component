'use client';

import { SgdsTabGroup, SgdsTab, SgdsTabPanel } from '@govtechsg/sgds-web-component/react/ssr';

export const TabGroup = () => {
  return (
    <>
      <SgdsTabGroup variant="underlined" orientation="horizontal" density="default">
        <SgdsTab slot="nav" panel="tab1" ariaLabel="Tab 1">Tab 1</SgdsTab>
        <SgdsTab slot="nav" panel="tab2" ariaLabel="Tab 2">Tab 2</SgdsTab>
        <SgdsTabPanel name="tab1">Content for tab 1</SgdsTabPanel>
        <SgdsTabPanel name="tab2">Content for tab 2</SgdsTabPanel>
      </SgdsTabGroup>
    </>
  );
};
