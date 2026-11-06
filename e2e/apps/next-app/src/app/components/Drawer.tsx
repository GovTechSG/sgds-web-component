'use client';

import { SgdsDrawer, SgdsButton } from '@govtechsg/sgds-web-component/react/ssr';

export const Drawer = () => {
  return (
    <>
      <SgdsButton variant="primary" onClick={(e) => { const el = e.currentTarget.nextElementSibling; if (el) el.open = true; }}>Open Drawer</SgdsButton>
      <SgdsDrawer size="sm" placement="end" ariaLabel="Drawer">
        <span slot="title">Drawer</span>
        <span slot="description">Description of the drawer.</span>
        <span slot="footer">Footer content</span>
        Drawer
      </SgdsDrawer>
    </>
  );
};
