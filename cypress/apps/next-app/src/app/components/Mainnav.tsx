import SgdsButton from "@govtechsg/sgds-web-component/react/button/index.js";
import SgdsMainnavItem from "@govtechsg/sgds-web-component/react/mainnav-item/index.js";
import SgdsDropdownItem from "@govtechsg/sgds-web-component/react/dropdown-item/index.js";
import dynamic from "next/dynamic"

const SgdsMainnav = dynamic(
  () => import("@govtechsg/sgds-web-component/react/mainnav/index.js"),
  {
    ssr: false,
  }
);
const SgdsMainnavDropdown = dynamic(
  () => import("@govtechsg/sgds-web-component/react/mainnav-dropdown/index.js"),
  {
    ssr: false,
  }
);
export const Mainnav = () => {
  return (
    <SgdsMainnav>
      <img width="130" src="https://www.designsystem.tech.gov.sg/assets/img/logo-sgds.svg" slot="brand" />
      <SgdsMainnavItem>ArgsTable Controlled </SgdsMainnavItem>
      <SgdsMainnavDropdown togglertext="Dropdown" close="default">
        <SgdsDropdownItem href="https://google.com">Item 1</SgdsDropdownItem>
        <SgdsDropdownItem href="#">Item 2</SgdsDropdownItem>
        <SgdsDropdownItem href="#">Item 3</SgdsDropdownItem>
      </SgdsMainnavDropdown>
      <SgdsMainnavItem href="#">About</SgdsMainnavItem>
      <SgdsMainnavItem href="#" slot="end">
        Contact Us
      </SgdsMainnavItem>
      <SgdsButton slot="end">Login</SgdsButton>
    </SgdsMainnav>
  );
};
