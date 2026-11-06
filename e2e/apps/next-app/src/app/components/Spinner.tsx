'use client';

import { SgdsSpinner } from '@govtechsg/sgds-web-component/react/ssr';

export const Spinner = () => {
  return (
    <>
      <SgdsSpinner tone="brand" size="md" label="Spinner" orientation="vertical"></SgdsSpinner>
    </>
  );
};
