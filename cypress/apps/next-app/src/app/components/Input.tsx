'use client';

import { SgdsInput } from "@govtechsg/sgds-web-component/react";

export const Input = () => {
  return (
    <SgdsInput
      type="text"
      label="Label"
      hintText="This is a hint text"
      name="email"
      placeholder="Placeholder"
    ></SgdsInput>
  );
};
