'use client';

import { SgdsSwitch } from "@govtechsg/sgds-web-component/react";

export const Switch = () => {
  return (
    <>
      <SgdsSwitch>Switch</SgdsSwitch>
      <SgdsSwitch icon>Switch with icon</SgdsSwitch>
      <SgdsSwitch icon size="sm">Switch with icon</SgdsSwitch>
      <SgdsSwitch icon size="lg">Switch with icon</SgdsSwitch>
      <SgdsSwitch disabled>Switch</SgdsSwitch>
      <SgdsSwitch size="sm">Switch</SgdsSwitch>
      <SgdsSwitch size="lg">Switch</SgdsSwitch>
      <SgdsSwitch size="lg">
        <span slot="leftLabel">Switch</span>
      </SgdsSwitch>
    </>
  );
};
