'use client';

import { SgdsTableOfContents, SgdsLink } from "@govtechsg/sgds-web-component/react";

export const TableOfContents = () => {
  return (
    <SgdsTableOfContents>
      <h2>Header</h2>
      <li slot="contents">
        <SgdsLink><a href="#">Link</a></SgdsLink>
      </li>
      <li slot="contents">
        <SgdsLink><a href="#">Link</a></SgdsLink>
      </li>
      <li slot="contents">
        <SgdsLink><a href="#">Link</a></SgdsLink>
      </li>
      <li slot="contents">
        <SgdsLink><a href="#">Link</a></SgdsLink>
      </li>
    </SgdsTableOfContents>
  );
};
