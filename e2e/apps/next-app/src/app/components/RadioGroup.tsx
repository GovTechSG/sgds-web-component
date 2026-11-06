'use client';

import { SgdsRadioGroup, SgdsRadio } from '@govtechsg/sgds-web-component/react/ssr';

export const RadioGroup = () => {
  return (
    <>
      <SgdsRadioGroup label="RadioGroup">
        <SgdsRadio>
          Radio content
        </SgdsRadio>
      </SgdsRadioGroup>
    </>
  );
};
