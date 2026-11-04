'use client';

import { SgdsImageCard } from '@govtechsg/sgds-web-component/react';

export const ImageCard = () => {
  return (
    <>
      <SgdsImageCard>
        <span slot="title">Image Card</span>
        <span slot="description">Description of the image card.</span>
      </SgdsImageCard>
    </>
  );
};
