'use client';

import { SgdsStepper, SgdsStep } from '@govtechsg/sgds-web-component/react';

export const Stepper = () => {
  return (
    <>
      <SgdsStepper activeStep={0} orientation="horizontal">
        <SgdsStep stepHeader="Personal Details">Provide your personal information.</SgdsStep>
        <SgdsStep stepHeader="Address">Enter your address and contact details.</SgdsStep>
        <SgdsStep stepHeader="Review">Review all details before submitting.</SgdsStep>
      </SgdsStepper>
    </>
  );
};
