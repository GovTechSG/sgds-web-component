'use client';

import { SgdsDrawer, SgdsButton } from '@govtechsg/sgds-web-component/react';

export const Drawer = () => {
  return (
    <>
      <SgdsButton variant="primary" onClick={(e) => { const d = e.currentTarget.nextElementSibling; if (d) d.open = true; }}>Open Drawer</SgdsButton>
      <SgdsDrawer label="Drawer Title">Drawer content goes here.</SgdsDrawer>
    </>
  );
};
