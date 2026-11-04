'use client';

import { SgdsStepper, SgdsStep } from '@govtechsg/sgds-web-component/react';

export const Stepper = () => {
  return (
    <>
      <SgdsStepper activeStep={0}>
        <SgdsStep stepHeader="Personal Info"></SgdsStep>
        <SgdsStep stepHeader="Contact Details"></SgdsStep>
        <SgdsStep stepHeader="Review"></SgdsStep>
      </SgdsStepper>
    </>
  );
};
