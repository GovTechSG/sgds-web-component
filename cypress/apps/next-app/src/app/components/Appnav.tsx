'use client';

import { SgdsAppnav, SgdsAppnavProfile } from '@govtechsg/sgds-web-component/react';

export const Appnav = () => {
  return (
    <SgdsAppnav>
      <SgdsAppnavProfile slot="profile" name="John Doe" email="john.doe@example.com"></SgdsAppnavProfile>
    </SgdsAppnav>
  );
};
