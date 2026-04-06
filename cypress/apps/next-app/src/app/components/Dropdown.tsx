'use client';

import { SgdsDropdown, SgdsDropdownItem, SgdsButton } from "@govtechsg/sgds-web-component/react";

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
