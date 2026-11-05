import { SgdsComboBox, SgdsComboBoxOption } from '@govtechsg/sgds-web-component/react';

export const ComboBox = () => {
  return (
    <>
      <SgdsComboBox label="Select a country" placeholder="Search...">
        <SgdsComboBoxOption value="sg">Singapore</SgdsComboBoxOption>
        <SgdsComboBoxOption value="my">Malaysia</SgdsComboBoxOption>
        <SgdsComboBoxOption value="id">Indonesia</SgdsComboBoxOption>
      </SgdsComboBox>
    </>
  );
};
