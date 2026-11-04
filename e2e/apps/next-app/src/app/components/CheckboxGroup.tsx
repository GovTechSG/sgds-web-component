'use client';

import { SgdsCheckboxGroup, SgdsCheckbox } from '@govtechsg/sgds-web-component/react';

export const CheckboxGroup = () => {
  return (
    <>
      <SgdsCheckboxGroup label="Select options">
        <SgdsCheckbox value="a">Option A</SgdsCheckbox>
        <SgdsCheckbox value="b">Option B</SgdsCheckbox>
      </SgdsCheckboxGroup>
    </>
  );
};
