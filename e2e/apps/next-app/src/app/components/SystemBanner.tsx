'use client';

import { SgdsSystemBanner, SgdsSystemBannerItem, SgdsIcon } from '@govtechsg/sgds-web-component/react';

export const SystemBanner = () => {
  return (
    <>
      <SgdsSystemBanner show>
        <SgdsSystemBannerItem>
          <SgdsIcon slot="icon" name="info-circle-fill" size="md"></SgdsIcon>
          System maintenance is scheduled for this weekend.
        </SgdsSystemBannerItem>
      </SgdsSystemBanner>
    </>
  );
};
