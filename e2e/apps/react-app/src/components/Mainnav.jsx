import { SgdsMainnav, SgdsMainnavItem, SgdsMainnavDropdown, SgdsDropdownItem } from '@govtechsg/sgds-web-component/react';

export const Mainnav = () => {
  return (
    <>
      <SgdsMainnav expand="lg">
        <a slot="brand" href="/"><strong>My App</strong></a>
        <SgdsMainnavItem active><a href="#">Home</a></SgdsMainnavItem>
        <SgdsMainnavItem><a href="#">About</a></SgdsMainnavItem>
        <SgdsMainnavDropdown ariaLabel="Dropdown menu">
          <span slot="toggler">Dropdown</span>
          <SgdsDropdownItem ariaLabel="Item 1"><a href="#">Item 1</a></SgdsDropdownItem>
          <SgdsDropdownItem ariaLabel="Item 2"><a href="#">Item 2</a></SgdsDropdownItem>
        </SgdsMainnavDropdown>
        <SgdsMainnavItem slot="end"><a href="#">Contact Us</a></SgdsMainnavItem>
      </SgdsMainnav>
    </>
  );
};
