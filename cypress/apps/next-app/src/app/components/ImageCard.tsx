'use client';

import { SgdsImageCard } from '@govtechsg/sgds-web-component/react';

export const ImageCard = () => {
  return (
    <SgdsImageCard>
      <span slot="title">Image Card Title</span>
      <span slot="description">This is an image card with a description.</span>
      <a href="#" slot="link">Learn more</a>
    </SgdsImageCard>
  );
};
