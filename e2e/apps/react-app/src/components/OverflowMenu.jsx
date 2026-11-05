import { SgdsOverflowMenu, SgdsDropdownItem } from '@govtechsg/sgds-web-component/react';

export const OverflowMenu = () => {
  return (
    <>
      <SgdsOverflowMenu size="md">
        <SgdsDropdownItem ariaLabel="View">View</SgdsDropdownItem>
        <SgdsDropdownItem ariaLabel="Edit">Edit</SgdsDropdownItem>
        <SgdsDropdownItem ariaLabel="Delete">Delete</SgdsDropdownItem>
      </SgdsOverflowMenu>
    </>
  );
};
