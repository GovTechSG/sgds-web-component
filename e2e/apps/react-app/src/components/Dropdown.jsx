import { SgdsDropdown, SgdsDropdownItem, SgdsButton } from '@govtechsg/sgds-web-component/react';

export const Dropdown = () => {
  return (
    <>
      <SgdsDropdown>
        <SgdsButton slot="toggler" ariaLabel="Options menu">Options</SgdsButton>
        <SgdsDropdownItem ariaLabel="View"><a href="#">View</a></SgdsDropdownItem>
        <SgdsDropdownItem ariaLabel="Edit"><a href="#">Edit</a></SgdsDropdownItem>
        <SgdsDropdownItem ariaLabel="Delete"><a href="#">Delete</a></SgdsDropdownItem>
      </SgdsDropdown>
    </>
  );
};
