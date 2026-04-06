'use client';

import { SgdsComboBox, SgdsComboBoxOption } from "@govtechsg/sgds-web-component/react";

export const Combobox = () => {
  return (
    <div>
      <SgdsComboBox label="Fruits" hintText="single select" name="combobox-single" placeholder="Select a fruit">
        <SgdsComboBoxOption value="apple">Apple</SgdsComboBoxOption>
        <SgdsComboBoxOption value="orange">Orange</SgdsComboBoxOption>
        <SgdsComboBoxOption value="pear">Pear</SgdsComboBoxOption>
      </SgdsComboBox>
      <SgdsComboBox label="Fruits" hintText="multi select" name="combobox-multi" placeholder="Select fruits" multiselect>
        <SgdsComboBoxOption value="apple">Apple</SgdsComboBoxOption>
        <SgdsComboBoxOption value="orange">Orange</SgdsComboBoxOption>
        <SgdsComboBoxOption value="pear">Pear</SgdsComboBoxOption>
      </SgdsComboBox>
    </div>
  );
};
