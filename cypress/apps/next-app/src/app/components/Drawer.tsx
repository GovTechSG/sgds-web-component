"use client"
import SgdsButton from "@govtechsg/sgds-web-component/react/button/index.js";
import dynamic from "next/dynamic";
import { useState } from "react";
const SgdsDrawer = dynamic(
  () => import("@govtechsg/sgds-web-component/react/drawer/index.js"),
  {
    ssr: false,
  }
)
export const Drawer = () => {
  const [open, setOpen] = useState(false)
  const toggleDrawer = () => {
    setOpen(!open)
  };

  return (
    <>
      <SgdsButton onClick={toggleDrawer}>Open end Drawer</SgdsButton>
      <SgdsDrawer open={open} label="" placement="end">
        This is a Drawer
        <SgdsButton onClick={toggleDrawer} slot="footer" variant="link">
          Close
        </SgdsButton>
        <SgdsButton slot="footer" variant="primary" type="submit" form="formA">
          Submit
        </SgdsButton>
      </SgdsDrawer>
    </>
  );
};
