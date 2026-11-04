'use client';

import { SgdsInput } from '@govtechsg/sgds-web-component/react';

export const Input = () => {
  return (
    <>
      <SgdsInput
        type="text"
        label="Label"
        name="email"
        placeholder="Placeholder text"
        hintText="Hint text"
      ></SgdsInput>
    </>
  );
};
