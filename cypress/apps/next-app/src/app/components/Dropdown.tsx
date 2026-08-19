'use client';

import SgdsDropdown from '@govtechsg/sgds-web-component/react/dropdown/index.js';
import SgdsButton from '@govtechsg/sgds-web-component/react/button/index.js';
import SgdsDropdownItem from '@govtechsg/sgds-web-component/react/dropdown-item/index.js';

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
