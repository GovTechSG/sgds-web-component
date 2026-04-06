'use client';

import { SgdsSidenav, SgdsSidenavItem, SgdsSidenavLink, SgdsIcon } from "@govtechsg/sgds-web-component/react";

export const Sidenav = () => {
  return (
    <SgdsSidenav className="mt-3" id="test-id">
      <SgdsSidenavItem>
        <SgdsIcon name="placeholder" slot="icon"></SgdsIcon>
        <span slot="title">Title</span>
        <SgdsSidenavLink disabled>
          <a href="#"> disabled-test</a>
        </SgdsSidenavLink>
        <SgdsSidenavLink active>
          <a href="#"> first-test</a>
        </SgdsSidenavLink>
        <SgdsSidenavItem>
          <span slot="title">Title level 2 very long so just wrap</span>
          <SgdsSidenavLink>
            <a href="#"> first-test</a>
          </SgdsSidenavLink>
          <SgdsSidenavLink>
            <a href="#"> first-test</a>
          </SgdsSidenavLink>
        </SgdsSidenavItem>
      </SgdsSidenavItem>
      <SgdsSidenavItem disabled>
        <SgdsIcon slot="icon" name="placeholder"></SgdsIcon>
        <span slot="title">Title</span>
        <SgdsSidenavLink>
          <a href="#"> first-test</a>
        </SgdsSidenavLink>
        <SgdsSidenavLink>
          <a href="#"> first-test</a>
        </SgdsSidenavLink>
      </SgdsSidenavItem>
      <SgdsSidenavItem active>
        <a href="#">
          {" "}
          <SgdsIcon slot="icon" name="placeholder"></SgdsIcon>anchor
        </a>
      </SgdsSidenavItem>
      <SgdsSidenavItem>
        <a href="https://www.google.com">
          <SgdsIcon slot="icon" name="placeholder"></SgdsIcon> Google
        </a>
      </SgdsSidenavItem>
    </SgdsSidenav>
  );
};
