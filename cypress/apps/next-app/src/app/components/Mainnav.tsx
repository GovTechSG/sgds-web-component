'use client';

import { SgdsMainnav, SgdsMainnavItem, SgdsMainnavDropdown, SgdsDropdownItem, SgdsButton } from "@govtechsg/sgds-web-component/react";

export const Mainnav = () => {
  return (
    <SgdsMainnav>
      <SgdsMainnavItem>
        <a href="#">ArgsTable Controlled</a>
      </SgdsMainnavItem>
      <SgdsMainnavDropdown close="default">
        <span slot="toggler">Dropdown</span>
        <SgdsDropdownItem disabled>
          <a href="https://google.com">Item 1</a>
        </SgdsDropdownItem>
        <SgdsDropdownItem>
          <a href="#">Item 2</a>
        </SgdsDropdownItem>
        <SgdsDropdownItem>
          <a href="#">Item 3</a>
        </SgdsDropdownItem>
      </SgdsMainnavDropdown>
      <SgdsMainnavItem>
        <a href="#">About</a>
      </SgdsMainnavItem>
      <SgdsMainnavItem slot="end">
        <a href="#">Contact Us</a>
      </SgdsMainnavItem>
      <SgdsButton slot="end">Login</SgdsButton>
    </SgdsMainnav>
  );
};
