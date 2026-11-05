'use client';

import { SgdsSidenav, SgdsSidenavItem, SgdsIcon, SgdsSidenavLink } from '@govtechsg/sgds-web-component/react';

export const Sidenav = () => {
  return (
    <>
      <SgdsSidenav>
        <SgdsSidenavItem ariaLabel="SidenavItem">
          <span slot="title">SidenavItem</span>
          <SgdsIcon slot="icon" name="placeholder" size="md"></SgdsIcon>
          SidenavItem content
        </SgdsSidenavItem>
        <SgdsSidenavLink>
          SidenavLink content
        </SgdsSidenavLink>
      </SgdsSidenav>
    </>
  );
};
