'use client';

import { SgdsTooltip, SgdsButton } from '@govtechsg/sgds-web-component/react';

export const Tooltip = () => {
  return (
    <>
      <SgdsTooltip content="This is a tooltip">
        <SgdsButton>Hover me</SgdsButton>
      </SgdsTooltip>
    </>
  );
};
