'use client';

import { SgdsBadge, SgdsIcon } from '@govtechsg/sgds-web-component/react/ssr';

export const Badge = () => {
  return (
    <>
      <SgdsBadge show>
        <SgdsIcon slot="icon" name="placeholder" size="md"></SgdsIcon>
        Badge
      </SgdsBadge>
    </>
  );
};
