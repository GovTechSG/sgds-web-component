'use client';

import { SgdsSidenav, SgdsSidenavItem, SgdsSidenavLink } from '@govtechsg/sgds-web-component/react';

export const Sidenav = () => {
  return (
    <>
      <SgdsSidenav>
        <SgdsSidenavItem active ariaLabel="Getting Started">
          <span slot="title">Getting Started</span>
          <SgdsSidenavLink active><a href="/">Overview</a></SgdsSidenavLink>
          <SgdsSidenavLink><a href="/install">Installation</a></SgdsSidenavLink>
        </SgdsSidenavItem>
      </SgdsSidenav>
    </>
  );
};
