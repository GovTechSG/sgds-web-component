'use client';

import { SgdsIconButton } from "@govtechsg/sgds-web-component/react";

export const IconButton = () => {
  return (
    <>
      <SgdsIconButton name="placeholder"></SgdsIconButton>
      <SgdsIconButton variant="ghost" name="placeholder"></SgdsIconButton>
      <SgdsIconButton variant="outline" name="placeholder"></SgdsIconButton>
      <SgdsIconButton variant="danger" name="placeholder"></SgdsIconButton>
    </>
  );
};
