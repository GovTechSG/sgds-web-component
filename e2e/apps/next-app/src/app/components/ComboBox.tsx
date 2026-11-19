'use client';

import { SgdsComboBox, SgdsComboBoxOption } from '@govtechsg/sgds-web-component/react';

export const ComboBox = () => {
  return (
    <>
      <SgdsComboBox label="Select fruit" placeholder="Choose...">
        <SgdsComboBoxOption value="apple">Apple</SgdsComboBoxOption>
        <SgdsComboBoxOption value="banana">Banana</SgdsComboBoxOption>
        <SgdsComboBoxOption value="cherry">Cherry</SgdsComboBoxOption>
      </SgdsComboBox>
    </>
  );
};
