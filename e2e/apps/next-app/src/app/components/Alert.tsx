'use client';

import { SgdsAlert, SgdsIcon } from '@govtechsg/sgds-web-component/react/ssr';

export const Alert = () => {
  return (
    <>
      <SgdsAlert show variant="info">
        <SgdsIcon slot="icon" name="placeholder" size="md"></SgdsIcon>
        Alert
      </SgdsAlert>
    </>
  );
};
