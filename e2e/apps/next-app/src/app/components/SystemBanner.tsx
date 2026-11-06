'use client';

import { SgdsSystemBanner, SgdsSystemBannerItem, SgdsIcon } from '@govtechsg/sgds-web-component/react/ssr';

export const SystemBanner = () => {
  return (
    <>
      <SgdsSystemBanner show>
        <SgdsSystemBannerItem>
          <SgdsIcon slot="icon" name="placeholder" size="md"></SgdsIcon>
          SystemBannerItem content
        </SgdsSystemBannerItem>
      </SgdsSystemBanner>
    </>
  );
};
