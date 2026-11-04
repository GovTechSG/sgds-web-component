'use client';

import { SgdsAlert } from '@govtechsg/sgds-web-component/react';

export const Alert = () => {
  return (
    <>
      <SgdsAlert variant="info" show>This is an informational alert.</SgdsAlert>
    </>
  );
};
