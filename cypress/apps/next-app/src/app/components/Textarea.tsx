'use client';

import { SgdsTextarea } from "@govtechsg/sgds-web-component/react";

export const Textarea = () => {
  return (
    <SgdsTextarea
      label="Label"
      name="textarea"
      rows="4"
      placeholder="Placeholder"
      maxlength="100"
      resize="vertical"
    ></SgdsTextarea>
  );
};
