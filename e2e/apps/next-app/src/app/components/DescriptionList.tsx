'use client';

import { SgdsDescriptionList, SgdsDescriptionListGroup } from '@govtechsg/sgds-web-component/react';

export const DescriptionList = () => {
  return (
    <>
      <SgdsDescriptionListGroup bordered>
        <SgdsDescriptionList>Name<span slot="data">John Doe</span></SgdsDescriptionList>
        <SgdsDescriptionList>Email<span slot="data">john@example.com</span></SgdsDescriptionList>
      </SgdsDescriptionListGroup>
    </>
  );
};
