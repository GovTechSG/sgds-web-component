'use client';

import { SgdsCloseButton } from '@govtechsg/sgds-web-component/react';

export const CloseButton = () => {
  return (
    <>
      <SgdsCloseButton></SgdsCloseButton>
      <SgdsCloseButton size="sm"></SgdsCloseButton>
      <SgdsCloseButton size="lg"></SgdsCloseButton>
    </>
  );
};
