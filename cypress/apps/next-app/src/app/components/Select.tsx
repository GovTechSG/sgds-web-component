'use client';

import { SgdsSelect, SgdsSelectOption } from "@govtechsg/sgds-web-component/react";

export const Select = () => {
  return (
    <div>
      <SgdsSelect label="Fruits" hintText="single select" name="select" placeholder="Select a fruit" value="1">
        <SgdsSelectOption value="1">One</SgdsSelectOption>
        <SgdsSelectOption value="2">Two</SgdsSelectOption>
        <SgdsSelectOption value="3">Three</SgdsSelectOption>
      </SgdsSelect>
    </div>
  );
};
