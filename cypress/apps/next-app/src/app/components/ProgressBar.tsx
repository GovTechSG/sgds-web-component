'use client';

import { SgdsProgressBar } from "@govtechsg/sgds-web-component/react";

export const ProgressBar = () => {
  return (
    <SgdsProgressBar
      label="50%"
      variant="secondary"
      value="50"
      aria-label="Loading in progress"
    ></SgdsProgressBar>
  );
};
