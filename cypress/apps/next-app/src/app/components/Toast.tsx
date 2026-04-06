'use client';

import { SgdsToastContainer, SgdsToast, SgdsIcon, SgdsLink } from "@govtechsg/sgds-web-component/react";

export const Toast = () => {
  return (
    <SgdsToastContainer position="bottom-start">
      <SgdsToast show dismissible variant="warning">
        <SgdsIcon slot="icon" name="exclamation-triangle-fill"></SgdsIcon>
        <SgdsLink slot="action" href="#" target="_blank">Action</SgdsLink>
        This is a toast notification
      </SgdsToast>
    </SgdsToastContainer>
  );
};
