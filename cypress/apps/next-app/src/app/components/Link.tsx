'use client';

import { SgdsLink, SgdsIcon } from "@govtechsg/sgds-web-component/react";

export const Link = () => {
  return (
    <SgdsLink>
      <a href="#">
        <SgdsIcon name="placeholder"></SgdsIcon> light dom anchor
      </a>
    </SgdsLink>
  );
};
