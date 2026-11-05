import { SgdsDropdown, SgdsDropdownItem } from '@govtechsg/sgds-web-component/react';

export const Dropdown = () => {
  return (
    <>
      <SgdsDropdown drop="down" close="default">
        <SgdsDropdownItem ariaLabel="DropdownItem">
          DropdownItem content
        </SgdsDropdownItem>
      </SgdsDropdown>
    </>
  );
};
