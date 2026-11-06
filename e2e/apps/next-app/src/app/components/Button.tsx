'use client';

import { SgdsButton } from '@govtechsg/sgds-web-component/react/ssr';

export const Button = () => {
  return (
    <>
      <SgdsButton type="button" variant="primary" tone="brand" size="md" target="_self" ariaLabel="Button">
        Button
      </SgdsButton>
    </>
  );
};
