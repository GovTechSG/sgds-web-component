import { SgdsSidenav, SgdsSidenavItem, SgdsSidenavLink } from '@govtechsg/sgds-web-component/react';

export const Sidenav = () => {
  return (
    <>
      <SgdsSidenav>
        <SgdsSidenavItem ariaLabel="Reports">
          <span slot="title">Reports</span>
          <SgdsSidenavLink><a href="#">Sales Report</a></SgdsSidenavLink>
          <SgdsSidenavLink><a href="#">Inventory Report</a></SgdsSidenavLink>
          <SgdsSidenavItem ariaLabel="Custom Reports">
            <span slot="title">Custom Reports</span>
            <SgdsSidenavLink><a href="#">Custom 1</a></SgdsSidenavLink>
            <SgdsSidenavLink><a href="#">Custom 2</a></SgdsSidenavLink>
          </SgdsSidenavItem>
        </SgdsSidenavItem>
        <SgdsSidenavItem ariaLabel="Settings">
          <a href="#">Settings</a>
        </SgdsSidenavItem>
      </SgdsSidenav>
    </>
  );
};
