"use client";

import { SgdsBadge, SgdsIcon } from "@govtechsg/sgds-web-component/react";

export const Badge = () => {
  return (
    <>
      <SgdsBadge>primary</SgdsBadge>
      <SgdsBadge>
        <i slot="leftIcon" className="bi bi-credit-card-fill"></i>
        leftIcon slot
      </SgdsBadge>
      <SgdsBadge>
        <i slot="rightIcon" className="bi bi-credit-card-fill"></i>
        rightIcon slot
      </SgdsBadge>
      <SgdsBadge outlined>
        <SgdsIcon slot="icon" name="placeholder" size="sm"></SgdsIcon>A long badge text that needs to be truncated
      </SgdsBadge>
    </>
  );
};
