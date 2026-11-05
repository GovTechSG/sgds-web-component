'use client';

import { SgdsSelect, SgdsSelectOption } from '@govtechsg/sgds-web-component/react';

export const Select = () => {
  return (
    <>
      <SgdsSelect label="Select" placeholder="Enter text..." autocomplete="on">
        <SgdsSelectOption>
          SelectOption content
        </SgdsSelectOption>
      </SgdsSelect>
    </>
  );
};
