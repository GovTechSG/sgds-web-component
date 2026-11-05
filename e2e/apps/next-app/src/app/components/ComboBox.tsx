'use client';

import { SgdsComboBox, SgdsComboBoxOption } from '@govtechsg/sgds-web-component/react';

export const ComboBox = () => {
  return (
    <>
      <SgdsComboBox scrollBottomOffset={0} label="ComboBox" placeholder="Enter text..." autocomplete="on">
        <SgdsComboBoxOption>
          ComboBoxOption content
        </SgdsComboBoxOption>
      </SgdsComboBox>
    </>
  );
};
