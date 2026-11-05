import { SgdsSubnav, SgdsSubnavItem } from '@govtechsg/sgds-web-component/react';

export const Subnav = () => {
  return (
    <>
      <SgdsSubnav>
        <SgdsSubnavItem active><a href="/">Home</a></SgdsSubnavItem>
        <SgdsSubnavItem><a href="/about">About</a></SgdsSubnavItem>
      </SgdsSubnav>
    </>
  );
};
