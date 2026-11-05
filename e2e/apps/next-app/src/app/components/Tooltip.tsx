'use client';

import { SgdsTooltip, SgdsButton } from '@govtechsg/sgds-web-component/react';

export const Tooltip = () => {
  return (
    <>
      <SgdsButton variant="primary" onClick={(e) => { const el = e.currentTarget.nextElementSibling; if (el) el.open = true; }}>Open Tooltip</SgdsButton>
      <SgdsTooltip placement="top" trigger="hover focus">
        Tooltip
      </SgdsTooltip>
    </>
  );
};
