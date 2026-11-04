'use client';

import { SgdsThumbnailCard } from '@govtechsg/sgds-web-component/react';

export const ThumbnailCard = () => {
  return (
    <>
      <SgdsThumbnailCard>
        <span slot="title">Thumbnail Card</span>
        <span slot="description">Description of the thumbnail card.</span>
      </SgdsThumbnailCard>
    </>
  );
};
