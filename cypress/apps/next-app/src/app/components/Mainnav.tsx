"use client"
import SgdsButton from "@govtechsg/sgds-web-component/react/button/index.js";
import SgdsMainnavItem from "@govtechsg/sgds-web-component/react/mainnav-item/index.js";
import SgdsDropdownItem from "@govtechsg/sgds-web-component/react/dropdown-item/index.js";
import SgdsMainnav from "@govtechsg/sgds-web-component/react/mainnav/index.js";
import dynamic from "next/dynamic";

const SgdsMainnavDropdown = dynamic(() => import("@govtechsg/sgds-web-component/react/mainnav-dropdown/index.js"), {
  ssr: false
});

export const Mainnav = () => {
  return (
    <SgdsMainnav>
      <img width="130" src="https://www.designsystem.tech.gov.sg/assets/img/logo-sgds.svg" slot="brand" />
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
