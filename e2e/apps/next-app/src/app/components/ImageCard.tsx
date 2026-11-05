'use client';

import { SgdsImageCard } from '@govtechsg/sgds-web-component/react';

export const ImageCard = () => {
  return (
    <>
      <SgdsImageCard imagePosition="before" imageAdjustment="default" orientation="vertical">
        <span slot="title">ImageCard</span>
        <span slot="description">Description of the imagecard.</span>
        <span slot="footer">Footer content</span>
        ImageCard
      </SgdsImageCard>
    </>
  );
};
