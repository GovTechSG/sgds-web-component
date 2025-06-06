import SgdsDropdownItem from "@govtechsg/sgds-web-component/react/dropdown-item/index.js";
import dynamic from "next/dynamic";
const SgdsDropdown = dynamic(() => import("@govtechsg/sgds-web-component/react/dropdown/index.js"), {
  ssr: false
});
import SgdsButton from "@govtechsg/sgds-web-component/react/button/index.js";

export const Dropdown = () => {
  return (
    <div>
      <SgdsDropdown drop="down" menuVariant="default">
        <SgdsButton slot="toggler">Dropdown</SgdsButton>
        <SgdsDropdownItem>item #1 (argsTable controlled)</SgdsDropdownItem>
        <SgdsDropdownItem>item #2</SgdsDropdownItem>
        <SgdsDropdownItem disabled>item #3</SgdsDropdownItem>
      </SgdsDropdown>
    </div>
  );
};
