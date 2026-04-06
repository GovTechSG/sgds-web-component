'use client';

import { SgdsCheckboxGroup, SgdsCheckbox } from "@govtechsg/sgds-web-component/react";

export const Checkbox = () => {
  return (
    <SgdsCheckboxGroup label="Select Your Preferences" hintText="Please choose one or more options:">
      <SgdsCheckbox value="option1">Option 1</SgdsCheckbox>
      <SgdsCheckbox indeterminate value="option2">Option 2 indeterminate</SgdsCheckbox>
      <SgdsCheckbox disabled value="option3">Option 3</SgdsCheckbox>
    </SgdsCheckboxGroup>
  );
};
