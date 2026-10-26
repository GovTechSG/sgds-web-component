'use client';

import { SgdsSubnav, SgdsSubnavItem } from '@govtechsg/sgds-web-component/react';

export const Subnav = () => {
  return (
    <SgdsSubnav>
      <SgdsSubnavItem active>
        <a href="#">Tab 1</a>
      </SgdsSubnavItem>
      <SgdsSubnavItem>
        <a href="#">Tab 2</a>
      </SgdsSubnavItem>
      <SgdsSubnavItem>
        <a href="#">Tab 3</a>
      </SgdsSubnavItem>
    </SgdsSubnav>
  );
};
