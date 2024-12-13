import SgdsDropdownItem from "@govtechsg/sgds-web-component/react/dropdown-item/index.js";
import dynamic from "next/dynamic"
const SgdsDropdown = dynamic(
    () => import("@govtechsg/sgds-web-component/react/dropdown/index.js"),
    {
      ssr: false,
    }
  );
  import SgdsButton from "@govtechsg/sgds-web-component/react/button/index.js"


export const Dropdown = () => {
  return (
    <SgdsDropdown  drop="down" variant="secondary" close="default">
      <SgdsButton slot="toggler">Dropdown</SgdsButton>
      <SgdsDropdownItem href="#" target="_self">
        item #1 (argsTable controlled)
      </SgdsDropdownItem>
      <SgdsDropdownItem href="https://google.com">item #2</SgdsDropdownItem>
      <SgdsDropdownItem href="#" disabled>
        item #3
      </SgdsDropdownItem>
    </SgdsDropdown>
  );
};
