'use client';

import { SgdsSubnav, SgdsSubnavItem } from '@govtechsg/sgds-web-component/react/ssr';

export const Subnav = () => {
  return (
    <>
      <SgdsSubnav>
        <div slot="header">Header text</div>
        <SgdsSubnavItem>
          SubnavItem content
        </SgdsSubnavItem>
      </SgdsSubnav>
    </>
  );
};
