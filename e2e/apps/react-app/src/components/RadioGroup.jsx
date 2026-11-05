import { SgdsRadioGroup, SgdsRadio } from '@govtechsg/sgds-web-component/react';

export const RadioGroup = () => {
  return (
    <>
      <SgdsRadioGroup name="gender" label="Gender">
        <SgdsRadio value="male">Male</SgdsRadio>
        <SgdsRadio value="female">Female</SgdsRadio>
      </SgdsRadioGroup>
    </>
  );
};
