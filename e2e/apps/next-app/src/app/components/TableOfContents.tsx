'use client';

import { SgdsTableOfContents, SgdsLink } from '@govtechsg/sgds-web-component/react';

export const TableOfContents = () => {
  return (
    <>
      <SgdsTableOfContents>
        <h5>Table of Contents</h5>
        <li slot="contents"><SgdsLink size="sm"><a href="#">Introduction</a></SgdsLink></li>
        <li slot="contents"><SgdsLink size="sm"><a href="#">Usage</a></SgdsLink></li>
        <li slot="contents"><SgdsLink size="sm"><a href="#">Examples</a></SgdsLink></li>
      </SgdsTableOfContents>
    </>
  );
};
