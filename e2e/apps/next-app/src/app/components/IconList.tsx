'use client';

import { SgdsIconList, SgdsIcon } from '@govtechsg/sgds-web-component/react';

export const IconList = () => {
  return (
    <>
      <SgdsIconList icon="check-circle-fill">
        <div role="listitem">
          <SgdsIcon name="check-circle-fill"></SgdsIcon>
          First item
        </div>
        <div role="listitem">
          <SgdsIcon name="check-circle-fill"></SgdsIcon>
          Second item
        </div>
        <div role="listitem">
          <SgdsIcon name="check-circle-fill"></SgdsIcon>
          Third item
        </div>
      </SgdsIconList>
    </>
  );
};
