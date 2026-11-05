import { SgdsDropdown, SgdsButton, SgdsDropdownItem, SgdsIcon } from '@govtechsg/sgds-web-component/react';

export const Dropdown = () => {
  return (
    <>
      <SgdsDropdown>
        <SgdsButton slot="toggler" variant="primary" tone="brand" ariaLabel="Dropdown">Dropdown
          <SgdsIcon name="chevron-down" slot="rightIcon"></SgdsIcon>
        </SgdsButton>
        <SgdsDropdownItem ariaLabel="Item 1"><a href="#">Item 1</a></SgdsDropdownItem>
        <SgdsDropdownItem ariaLabel="Item 2"><a href="#">Item 2</a></SgdsDropdownItem>
        <SgdsDropdownItem ariaLabel="Item 3">Item 3</SgdsDropdownItem>
      </SgdsDropdown>
    </>
  );
};
