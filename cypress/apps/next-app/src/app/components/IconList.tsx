'use client';

import { SgdsIconList, SgdsIcon } from '@govtechsg/sgds-web-component/react';

export const IconList = () => {
  return (
    <SgdsIconList size="sm">
      <div role="listitem">
        <SgdsIcon size="sm" name="placeholder"></SgdsIcon>item one
      </div>
      <div role="listitem">
        <SgdsIcon name="placeholder" size="sm"></SgdsIcon>item two
      </div>
      <div role="listitem">
        <SgdsIcon name="placeholder" size="sm"></SgdsIcon>item three
      </div>
    </SgdsIconList>
  );
};
