'use client';

import { useState } from "react";
import { SgdsButton, SgdsDrawer } from "@govtechsg/sgds-web-component/react";

export const Drawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SgdsButton onClick={() => setOpen(true)}>Open end Drawer</SgdsButton>
      <SgdsDrawer open={open ? "" : undefined} label="" placement="end">
        <h2 slot="title">This is a Drawer</h2>
        <p slot="description">Description</p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dictum est vitae erat molestie blandit.
        Pellentesque at nunc at mi auctor imperdiet eu at leo. Integer aliquam, turpis vel ultricies ornare, sem massa
        commodo velit, pretium dictum quam nibh et ex. Suspendisse eu dignissim libero. Donec aliquam, lacus eu
        pellentesque interdum, arcu nisl blandit turpis, at tincidunt purus orci ut dolor. Morbi malesuada faucibus
        lorem, ornare accumsan sapien lacinia vel. In enim justo, hendrerit eu mi vitae, viverra fringilla nunc.
      </SgdsDrawer>
    </>
  );
};
