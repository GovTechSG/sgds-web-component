'use client';

import { SgdsMainnav, SgdsMainnavDropdown, SgdsMainnavItem, SgdsMainnavProfile } from '@govtechsg/sgds-web-component/react';

export const Mainnav = () => {
  return (
    <>
      <SgdsMainnav expand="lg">
        <strong slot="brand">Mainnav</strong>
        <SgdsMainnavDropdown ariaLabel="MainnavDropdown">
          MainnavDropdown content
        </SgdsMainnavDropdown>
        <SgdsMainnavItem>
          MainnavItem content
        </SgdsMainnavItem>
        <SgdsMainnavProfile label="MainnavProfile" ariaLabel="MainnavProfile" close="default">
          MainnavProfile content
        </SgdsMainnavProfile>
      </SgdsMainnav>
    </>
  );
};
