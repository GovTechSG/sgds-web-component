'use client';

import { SgdsSelect, SgdsSelectOption } from '@govtechsg/sgds-web-component/react/ssr';

export const Select = () => {
  return (
    <>
      <SgdsSelect label="Select country" placeholder="Choose...">
        <SgdsSelectOption value="sg">Singapore</SgdsSelectOption>
        <SgdsSelectOption value="us">United States</SgdsSelectOption>
        <SgdsSelectOption value="uk">United Kingdom</SgdsSelectOption>
      </SgdsSelect>
    </>
  );
};
