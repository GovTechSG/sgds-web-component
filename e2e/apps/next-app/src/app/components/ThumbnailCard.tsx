'use client';

import { SgdsThumbnailCard } from '@govtechsg/sgds-web-component/react';

export const ThumbnailCard = () => {
  return (
    <>
      <SgdsThumbnailCard orientation="vertical">
        <span slot="title">ThumbnailCard</span>
        <span slot="description">Description of the thumbnailcard.</span>
        <span slot="footer">Footer content</span>
        ThumbnailCard
      </SgdsThumbnailCard>
    </>
  );
};
