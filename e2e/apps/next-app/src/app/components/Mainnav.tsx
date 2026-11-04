'use client';

import { SgdsMainnav, SgdsMainnavItem } from '@govtechsg/sgds-web-component/react';

export const Mainnav = () => {
  return (
    <>
      <SgdsMainnav>
        <strong slot="brand">My App</strong>
        <SgdsMainnavItem><a href="/">Home</a></SgdsMainnavItem>
        <SgdsMainnavItem><a href="/about">About</a></SgdsMainnavItem>
      </SgdsMainnav>
    </>
  );
};
