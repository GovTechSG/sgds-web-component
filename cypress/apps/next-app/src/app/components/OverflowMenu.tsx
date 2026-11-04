'use client';

import { SgdsOverflowMenu, SgdsDropdownItem } from '@govtechsg/sgds-web-component/react';

export const OverflowMenu = () => {
  return (
    <SgdsOverflowMenu>
      <SgdsDropdownItem>Action 1</SgdsDropdownItem>
      <SgdsDropdownItem>Action 2</SgdsDropdownItem>
      <SgdsDropdownItem>Action 3</SgdsDropdownItem>
    </SgdsOverflowMenu>
  );
};
